import { boardSpaces, teams as initialTeams } from "./data";
import { indicatorKeys } from "./indicators";
import type { Indicators } from "./types";
import type { CardOption, ResolvedOutcome, Team } from "./types";

const BOARD_SPACE_COUNT = 24;
const STARTING_POSITION = 0;

export type GameStateSnapshot = {
  teams: Team[];
  currentTeamIndex: number;
  currentCardId?: string;
  lastRoll?: number;
  lastOutcome?: ResolvedOutcome;
  isResultsVisible: boolean;
};

export type GameState = GameStateSnapshot & {
  history: GameStateSnapshot[];
};

type GameStateParts = GameStateSnapshot & {
  history: GameStateSnapshot[];
};

export function createInitialGameState(): GameState {
  return createState({
    teams: initialTeams.map((team) => ({
      ...team,
      remainingHours: team.startingHours,
      effectiveMarks: 0
    })),
    currentTeamIndex: 0,
    isResultsVisible: false,
    history: []
  });
}

export function moveCurrentTeam(state: GameState, roll: number): GameState {
  validateRoll(roll);

  const nextPosition = wrapBoardPosition(state.teams[state.currentTeamIndex]!.position, roll);

  return createState({
    teams: state.teams.map((team, index) =>
      index === state.currentTeamIndex ? { ...team, position: nextPosition } : { ...team }
    ),
    currentTeamIndex: state.currentTeamIndex,
    currentCardId: getFirstCardIdForPosition(nextPosition),
    lastRoll: roll,
    isResultsVisible: false,
    history: historyWithSnapshot(state)
  });
}

export function applyOption(
  state: GameState,
  option: CardOption,
  random: () => number = Math.random
): GameState {
  const resolvedOutcome = resolveOptionOutcome(option, random);

  return createState({
    teams: state.teams.map((team, index) =>
      index === state.currentTeamIndex
        ? {
            ...team,
            remainingHours: Math.max(0, team.remainingHours + resolvedOutcome.timeDeltaHours),
            effectiveMarks: Math.max(0, team.effectiveMarks + resolvedOutcome.effectiveMarks),
            indicators: applyIndicatorDeltas(team.indicators, resolvedOutcome.indicatorDeltas)
          }
        : { ...team }
    ),
    currentTeamIndex: (state.currentTeamIndex + 1) % state.teams.length,
    lastOutcome: resolvedOutcome,
    isResultsVisible: false,
    history: historyWithSnapshot(state)
  });
}

export function resolveOptionOutcome(
  option: CardOption,
  random: () => number = Math.random
): ResolvedOutcome {
  if (option.outcomes?.length) {
    const outcomeIndex = Math.min(
      option.outcomes.length - 1,
      Math.floor(random() * option.outcomes.length)
    );
    const outcome = option.outcomes[outcomeIndex]!;

    return {
      optionId: option.id,
      optionLabel: option.label,
      isRandom: true,
      tone: outcome.tone,
      title: outcome.title,
      text: outcome.text,
      timeDeltaHours: outcome.timeDeltaHours,
      effectiveMarks: outcome.effectiveMarks,
      indicatorDeltas: outcome.indicatorDeltas
    };
  }

  return {
    optionId: option.id,
    optionLabel: option.label,
    isRandom: false,
    tone: "fixed",
    title: "選擇結果",
    text: "這個選擇立即生效。",
    timeDeltaHours: option.timeDeltaHours,
    effectiveMarks: option.effectiveMarks,
    indicatorDeltas: option.indicatorDeltas
  };
}

export function showResults(state: GameState): GameState {
  return createState({
    teams: cloneTeams(state.teams),
    currentTeamIndex: state.currentTeamIndex,
    currentCardId: state.currentCardId,
    lastRoll: state.lastRoll,
    isResultsVisible: true,
    history: historyWithSnapshot(state)
  });
}

export function resetGame(_state?: GameState): GameState {
  return createInitialGameState();
}

export function undoLastAction(state: GameState): GameState {
  const previous = state.history.at(-1);

  return previous ? createState({ ...previous, history: state.history.slice(0, -1) }) : cloneState(state);
}

function createState(parts: GameStateParts): GameState {
  return {
    ...cloneSnapshot(parts),
    history: parts.history.map(cloneSnapshot)
  };
}

function cloneState(state: GameState): GameState {
  return createState({
    ...cloneSnapshot(state),
    history: state.history
  });
}

function cloneSnapshot(snapshot: GameStateSnapshot): GameStateSnapshot {
  const cloned: GameStateSnapshot = {
    teams: cloneTeams(snapshot.teams),
    currentTeamIndex: snapshot.currentTeamIndex,
    isResultsVisible: snapshot.isResultsVisible
  };

  if (snapshot.currentCardId !== undefined) {
    cloned.currentCardId = snapshot.currentCardId;
  }

  if (snapshot.lastRoll !== undefined) {
    cloned.lastRoll = snapshot.lastRoll;
  }

  if (snapshot.lastOutcome !== undefined) {
    cloned.lastOutcome = {
      ...snapshot.lastOutcome,
      indicatorDeltas: snapshot.lastOutcome.indicatorDeltas
        ? { ...snapshot.lastOutcome.indicatorDeltas }
        : undefined
    };
  }

  return cloned;
}

function cloneTeams(teams: Team[]): Team[] {
  return teams.map((team) => ({ ...team, indicators: { ...team.indicators } }));
}

function applyIndicatorDeltas(
  currentIndicators: Indicators,
  indicatorDeltas: CardOption["indicatorDeltas"]
): Indicators {
  if (!indicatorDeltas) {
    return { ...currentIndicators };
  }

  return Object.fromEntries(
    indicatorKeys.map((indicatorKey) => [
      indicatorKey,
      clampIndicator(currentIndicators[indicatorKey] + (indicatorDeltas[indicatorKey] ?? 0))
    ])
  ) as Indicators;
}

function clampIndicator(value: number): number {
  return Math.max(0, Math.min(10, value));
}

function historyWithSnapshot(state: GameState): GameStateSnapshot[] {
  return [...state.history.map(cloneSnapshot), cloneSnapshot(state)];
}

function validateRoll(roll: number): void {
  if (!Number.isInteger(roll) || roll < 1 || roll > 6) {
    throw new RangeError("Roll must be an integer from 1 through 6.");
  }
}

function wrapBoardPosition(position: number, roll: number): number {
  const normalizedPosition =
    position >= STARTING_POSITION && position < BOARD_SPACE_COUNT ? position : STARTING_POSITION;

  return positiveModulo(normalizedPosition + roll, BOARD_SPACE_COUNT);
}

function positiveModulo(value: number, divisor: number): number {
  return ((value % divisor) + divisor) % divisor;
}

function getFirstCardIdForPosition(position: number): string | undefined {
  return boardSpaces.find((space) => space.id === position)?.cardIds[0];
}
