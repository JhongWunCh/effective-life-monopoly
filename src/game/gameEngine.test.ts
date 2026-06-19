import { describe, expect, it } from "vitest";
import { bossChallengeCards } from "./bossQuestions";
import { boardSpaces, cards, teams } from "./data";
import {
  applyOption,
  createInitialGameState,
  getActiveTeamCount,
  getRoundProgress,
  moveCurrentTeam,
  resetGame,
  returnToBoard,
  showResults,
  undoLastAction
} from "./gameEngine";
import type { GameState } from "./gameEngine";

type StateSnapshot = Omit<GameState, "history">;

function toSnapshot(state: GameState): StateSnapshot {
  const { history: _history, teams: stateTeams, ...snapshot } = state;

  return {
    ...snapshot,
    teams: stateTeams.map((team) => ({ ...team }))
  };
}

function expectFlatHistory(state: GameState): void {
  state.history.forEach((snapshot) => {
    expect(snapshot).not.toHaveProperty("history");
  });
}

function completeTurns(state: GameState, turnCount: number): GameState {
  const option = {
    id: "A" as const,
    label: "stable boss round fixture",
    timeDeltaHours: -1,
    effectiveMarks: 1
  };

  return Array.from({ length: turnCount }).reduce<GameState>(
    (currentState) => applyOption(currentState, option),
    state
  );
}

function expectBossCard(cardId: string | undefined): void {
  expect(bossChallengeCards.map((card) => card.id)).toContain(cardId);
}

describe("game engine", () => {
  it("creates initial state from data teams using cloned zero-based positions", () => {
    const state = createInitialGameState();

    expect(state.currentTeamIndex).toBe(0);
    expect(state.currentCardId).toBeUndefined();
    expect(state.lastRoll).toBeUndefined();
    expect(state.isResultsVisible).toBe(false);
    expect(state.settings).toEqual({ targetRounds: 3 });
    expect(state.completedTurns).toBe(0);
    expect(state.history).toEqual([]);
    expect(state.teams).toEqual(
      teams.map((team) => ({
        ...team,
        position: team.position,
        remainingHours: team.startingHours,
        effectiveMarks: 0
      }))
    );
    expect(state.teams).not.toBe(teams);
    state.teams.forEach((team, index) => {
      expect(team).not.toBe(teams[index]);
    });
  });

  it("creates initial state with configurable target rounds", () => {
    const state = createInitialGameState({ targetRounds: 2 });

    expect(state.settings).toEqual({ targetRounds: 2 });
    expect(getRoundProgress(state)).toEqual({
      completedTeamsThisRound: 0,
      completedTurns: 0,
      currentRound: 1,
      isReadyToFinish: false,
      targetRounds: 2,
      totalTurns: 8
    });
  });

  it("moves current team on the zero-based board and records a history snapshot", () => {
    const state = createInitialGameState();
    const moved = moveCurrentTeam(state, 6);

    expect(moved.teams[0]!.position).toBe(6);
    expect(moved.currentCardId).toBe(boardSpaces[6]!.cardIds[0]);
    expect(moved.lastRoll).toBe(6);
    expect(moved.isResultsVisible).toBe(false);
    expect(moved.history).toEqual([toSnapshot(state)]);
    expectFlatHistory(moved);
    expect(moved.teams).not.toBe(state.teams);
    expect(moved.teams[0]).not.toBe(state.teams[0]);
    expect(state.teams[0]!.position).toBe(0);
    expect(state.currentCardId).toBeUndefined();
    expect(state.lastRoll).toBeUndefined();
    expect(state.history).toEqual([]);
  });

  it("uses boss challenge cards for every team in the second round", () => {
    const secondRoundState = completeTurns(createInitialGameState({ targetRounds: 3 }), 4);

    expectBossCard(moveCurrentTeam(secondRoundState, 1).currentCardId);
    expectBossCard(moveCurrentTeam(secondRoundState, 3).currentCardId);
  });

  it("uses normal opportunity and fate spaces as boss exemptions from the third round onward", () => {
    const thirdRoundState = completeTurns(createInitialGameState({ targetRounds: 3 }), 8);
    const opportunityLanding = moveCurrentTeam(thirdRoundState, 3);
    const fateLanding = moveCurrentTeam(thirdRoundState, 1);

    expect(boardSpaces[3]!.type).toBe("opportunity");
    expect(opportunityLanding.currentCardId).toBe(boardSpaces[3]!.cardIds[0]);
    expect(boardSpaces[1]!.type).toBe("fate");
    expect(fateLanding.currentCardId).toBe(boardSpaces[1]!.cardIds[0]);
  });

  it("uses boss challenge cards on non-opportunity and non-fate spaces from the third round onward", () => {
    const thirdRoundState = completeTurns(createInitialGameState({ targetRounds: 3 }), 8);
    const actionLanding = moveCurrentTeam(thirdRoundState, 2);

    expect(boardSpaces[2]!.type).toBe("action");
    expectBossCard(actionLanding.currentCardId);
  });

  it("wraps over 24 spaces using zero-based board positions", () => {
    const state = {
      ...createInitialGameState(),
      teams: teams.map((team, index) => (index === 0 ? { ...team, position: 23 } : { ...team }))
    };

    const moved = moveCurrentTeam(state, 3);

    expect(moved.teams[0]!.position).toBe(2);
    expect(moved.currentCardId).toBe(boardSpaces[2]!.cardIds[0]);
    expect(state.teams[0]!.position).toBe(23);
  });

  it("applies selected option and clears transient turn fields", () => {
    const state = {
      ...createInitialGameState(),
      currentCardId: "signature-baby",
      lastRoll: 4,
      isResultsVisible: true
    };
    const option = { id: "B" as const, label: "stable engine fixture", timeDeltaHours: -0.5, effectiveMarks: 2 };

    const next = applyOption(state, option);

    expect(next.teams[0]!.remainingHours).toBe(18);
    expect(next.teams[0]!.effectiveMarks).toBe(2);
    expect(next.currentTeamIndex).toBe(1);
    expect(next.completedTurns).toBe(1);
    expect(next.currentCardId).toBeUndefined();
    expect(next.lastRoll).toBeUndefined();
    expect(next.isResultsVisible).toBe(false);
    expect(next.history).toEqual([toSnapshot(state)]);
    expectFlatHistory(next);
    expect(state.teams[0]!.remainingHours).toBe(18.5);
    expect(state.teams[0]!.effectiveMarks).toBe(0);
    expect(state.currentCardId).toBe("signature-baby");
    expect(state.lastRoll).toBe(4);
    expect(state.isResultsVisible).toBe(true);
  });

  it("spends at least one hour even when a choice protects time", () => {
    const state = {
      ...createInitialGameState(),
      teams: teams.map((team, index) =>
        index === 0 ? { ...team, remainingHours: 17 } : { ...team }
      )
    };
    const option = {
      id: "A" as const,
      label: "stable protected-time fixture",
      timeDeltaHours: 1,
      effectiveMarks: 2
    };

    const next = applyOption(state, option);

    expect(next.teams[0]!.remainingHours).toBe(16);
    expect(next.teams[0]!.effectiveMarks).toBe(2);
  });

  it("applies the selected random outcome and records it for reveal", () => {
    const state = {
      ...createInitialGameState(),
      currentCardId: "morning-fate-meeting",
      lastRoll: 3,
      teams: teams.map((team, index) =>
        index === 0 ? { ...team, remainingHours: 20, effectiveMarks: 3 } : { ...team }
      )
    };
    const option = {
      id: "A" as const,
      label: "先問清楚目的",
      timeDeltaHours: 0,
      effectiveMarks: 0,
      outcomes: [
        {
          id: "good",
          tone: "good" as const,
          title: "問對問題",
          text: "會議縮短，還抓到真正決策點。",
          timeDeltaHours: 0.5,
          effectiveMarks: 2
        },
        {
          id: "bad",
          tone: "bad" as const,
          title: "對方準備不足",
          text: "問題問清楚了，但會議仍然拖長。",
          timeDeltaHours: -1,
          effectiveMarks: -1
        }
      ]
    };

    const next = applyOption(state, option, () => 0.99);

    expect(next.teams[0]!.remainingHours).toBe(19);
    expect(next.teams[0]!.effectiveMarks).toBe(2);
    expect(next.lastOutcome).toEqual({
      optionId: "A",
      optionLabel: "先問清楚目的",
      isRandom: true,
      tone: "bad",
      title: "對方準備不足",
      text: "問題問清楚了，但會議仍然拖長。",
      timeDeltaHours: -1,
      effectiveMarks: -1
    });
    expect(next.currentTeamIndex).toBe(1);
  });

  it("marks the game ready to finish after every team completes the target rounds", () => {
    const option = { id: "A" as const, label: "stable round fixture", timeDeltaHours: 0, effectiveMarks: 1 };
    let state = createInitialGameState({ targetRounds: 1 });

    for (let turn = 0; turn < state.teams.length; turn += 1) {
      state = applyOption(state, option);
    }

    expect(state.completedTurns).toBe(4);
    expect(state.currentTeamIndex).toBe(0);
    expect(getRoundProgress(state)).toEqual({
      completedTeamsThisRound: 4,
      completedTurns: 4,
      currentRound: 1,
      isReadyToFinish: true,
      targetRounds: 1,
      totalTurns: 4
    });
  });

  it("applies key indicator growth from selected options", () => {
    const state = {
      ...createInitialGameState(),
      currentCardId: "morning-opportunity-focus",
      lastRoll: 7
    };
    const option = {
      id: "A" as const,
      label: "stable indicator fixture",
      timeDeltaHours: 0,
      effectiveMarks: 0,
      indicatorDeltas: { focus: 2, energy: 1 }
    };

    const next = applyOption(state, option);

    expect(next.teams[0]!.indicators.focus).toBe(state.teams[0]!.indicators.focus + 2);
    expect(next.teams[0]!.indicators.energy).toBe(state.teams[0]!.indicators.energy + 1);
    expect(next.teams[0]!.indicators.health).toBe(state.teams[0]!.indicators.health);
  });

  it("does not allow remaining hours below zero", () => {
    const state = {
      ...createInitialGameState(),
      currentCardId: "evening-fate-overtime",
      lastRoll: 21,
      teams: teams.map((team, index) => (index === 0 ? { ...team, remainingHours: 1 } : { ...team }))
    };
    const option = {
      id: "B" as const,
      label: "stable overrun fixture",
      timeDeltaHours: -3,
      effectiveMarks: 2
    };

    const next = applyOption(state, option, () => 0);

    expect(next.teams[0]!.remainingHours).toBe(0);
    expect(next.teams[0]!.effectiveMarks).toBe(2);
  });

  it("skips teams with no remaining hours when advancing the turn", () => {
    const state = {
      ...createInitialGameState({ targetRounds: 5 }),
      teams: teams.map((team, index) => ({
        ...team,
        remainingHours: index === 0 ? 0.5 : index === 1 ? 0 : team.startingHours
      }))
    };
    const option = { id: "A" as const, label: "use last half hour", timeDeltaHours: -1, effectiveMarks: 1 };

    const next = applyOption(state, option);

    expect(next.teams[0]!.remainingHours).toBe(0);
    expect(next.currentTeamIndex).toBe(2);
    expect(next.isResultsVisible).toBe(false);
    expect(getActiveTeamCount(next)).toBe(2);
  });

  it("automatically shows results when every team has used all remaining time", () => {
    const state = {
      ...createInitialGameState({ targetRounds: 5 }),
      currentCardId: "evening-fate-overtime",
      lastRoll: 3,
      teams: teams.map((team, index) => ({
        ...team,
        remainingHours: index === 0 ? 0.5 : 0
      }))
    };
    const option = { id: "A" as const, label: "spend final time", timeDeltaHours: -1, effectiveMarks: 1 };

    const next = applyOption(state, option);

    expect(next.teams.every((team) => team.remainingHours === 0)).toBe(true);
    expect(getActiveTeamCount(next)).toBe(0);
    expect(next.currentTeamIndex).toBe(0);
    expect(next.currentCardId).toBeUndefined();
    expect(next.lastRoll).toBeUndefined();
    expect(next.isResultsVisible).toBe(true);
  });

  it("shows results while preserving selected card and roll", () => {
    const state = {
      ...createInitialGameState(),
      currentCardId: "morning-reflection-prioritize",
      lastRoll: 6
    };

    const shown = showResults(state);

    expect(shown.currentCardId).toBe("morning-reflection-prioritize");
    expect(shown.lastRoll).toBe(6);
    expect(shown.isResultsVisible).toBe(true);
    expect(shown.settings).toEqual(state.settings);
    expect(shown.completedTurns).toBe(state.completedTurns);
    expect(shown.history).toEqual([toSnapshot(state)]);
    expectFlatHistory(shown);
    expect(state.isResultsVisible).toBe(false);
  });

  it("returns from results to the board without resetting scores or settings", () => {
    const shown = showResults(createInitialGameState({ targetRounds: 2 }));

    const board = returnToBoard(shown);

    expect(board.isResultsVisible).toBe(false);
    expect(board.teams).toEqual(shown.teams);
    expect(board.completedTurns).toBe(0);
    expect(board.settings).toEqual({ targetRounds: 2 });
    expect(board.history).toEqual([...shown.history, toSnapshot(shown)]);
    expectFlatHistory(board);
  });

  it("resets game state to a fresh initial snapshot", () => {
    const moved = moveCurrentTeam(createInitialGameState(), 2);
    const initial = createInitialGameState({ targetRounds: 5 });

    const reset = resetGame(moved, { targetRounds: 5 });

    expect(reset).toEqual(initial);
    expect(reset).not.toBe(initial);
    expect(reset.teams[0]).not.toBe(initial.teams[0]);
  });

  it("undoes the last action and drops one history entry", () => {
    const moved = moveCurrentTeam(createInitialGameState(), 2);
    const option = cards.find((card) => card.id === "midnight-action-sleep")!.options[0]!;
    const applied = applyOption(moved, option);

    const undone = undoLastAction(applied);

    expect(undone).toEqual(moved);
    expect(undone.history).toHaveLength(1);
    expectFlatHistory(undone);
  });

  it("keeps history flat while undoing through a longer action chain", () => {
    const initial = createInitialGameState();
    const moved = moveCurrentTeam(initial, 2);
    const option = cards.find((card) => card.id === "midnight-action-sleep")!.options[0]!;
    const applied = applyOption(moved, option);
    const shown = showResults(applied);

    expect(shown.history).toEqual([toSnapshot(initial), toSnapshot(moved), toSnapshot(applied)]);
    expectFlatHistory(shown);

    const backToApplied = undoLastAction(shown);
    const backToMoved = undoLastAction(backToApplied);
    const backToInitial = undoLastAction(backToMoved);

    expect(backToApplied).toEqual(applied);
    expect(backToMoved).toEqual(moved);
    expect(backToInitial).toEqual(initial);
    expectFlatHistory(backToApplied);
    expectFlatHistory(backToMoved);
    expectFlatHistory(backToInitial);
  });

  it.each([0, 7, -1, 2.5, Number.NaN, Number.POSITIVE_INFINITY])(
    "rejects invalid die roll %s without mutating state",
    (roll) => {
      const state = createInitialGameState();
      const before = structuredClone(state);

      expect(() => moveCurrentTeam(state, roll)).toThrow(RangeError);
      expect(() => moveCurrentTeam(state, roll)).toThrow("Roll must be an integer from 1 through 6.");
      expect(state).toEqual(before);
    }
  );

  it.each([1, 2, 3, 4, 5, 6])("accepts valid die roll %s", (roll) => {
    const state = createInitialGameState();

    const moved = moveCurrentTeam(state, roll);

    expect(moved.lastRoll).toBe(roll);
  });

  it("returns an equivalent state when undo has no history", () => {
    const state = createInitialGameState();

    const undone = undoLastAction(state);

    expect(undone).toEqual(state);
    expect(undone).not.toBe(state);
  });
});
