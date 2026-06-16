import { describe, expect, it } from "vitest";
import { boardSpaces, cards, teams } from "./data";
import {
  applyOption,
  createInitialGameState,
  moveCurrentTeam,
  resetGame,
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

describe("game engine", () => {
  it("creates initial state from data teams using cloned zero-based positions", () => {
    const state = createInitialGameState();

    expect(state.currentTeamIndex).toBe(0);
    expect(state.currentCardId).toBeUndefined();
    expect(state.lastRoll).toBeUndefined();
    expect(state.isResultsVisible).toBe(false);
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

    expect(next.teams[0]!.remainingHours).toBe(20);
    expect(next.teams[0]!.effectiveMarks).toBe(2);
    expect(next.currentTeamIndex).toBe(1);
    expect(next.currentCardId).toBeUndefined();
    expect(next.lastRoll).toBeUndefined();
    expect(next.isResultsVisible).toBe(false);
    expect(next.history).toEqual([toSnapshot(state)]);
    expectFlatHistory(next);
    expect(state.teams[0]!.remainingHours).toBe(20.5);
    expect(state.teams[0]!.effectiveMarks).toBe(0);
    expect(state.currentCardId).toBe("signature-baby");
    expect(state.lastRoll).toBe(4);
    expect(state.isResultsVisible).toBe(true);
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
    const option = cards.find((card) => card.id === "evening-fate-overtime")!.options[1]!;

    const next = applyOption(state, option);

    expect(next.teams[0]!.remainingHours).toBe(0);
    expect(next.teams[0]!.effectiveMarks).toBe(1);
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
    expect(shown.history).toEqual([toSnapshot(state)]);
    expectFlatHistory(shown);
    expect(state.isResultsVisible).toBe(false);
  });

  it("resets game state to a fresh initial snapshot", () => {
    const moved = moveCurrentTeam(createInitialGameState(), 2);
    const initial = createInitialGameState();

    const reset = resetGame(moved);

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
