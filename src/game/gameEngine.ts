import { bossChallengeCards } from "./bossQuestions";
import { boardSpaces, teams as initialTeams } from "./data";
import { indicatorKeys } from "./indicators";
import type { Indicators } from "./types";
import type { CardOption, ResolvedOutcome, Team } from "./types";

const BOARD_SPACE_COUNT = 24;
const STARTING_POSITION = 0;
const DEFAULT_TARGET_ROUNDS = 3;
const MIN_TARGET_ROUNDS = 1;
const MAX_TARGET_ROUNDS = 5;

export type GameSettings = {
  targetRounds: number;
};

export type RoundProgress = {
  completedTurns: number;
  completedTeamsThisRound: number;
  currentRound: number;
  targetRounds: number;
  totalTurns: number;
  isReadyToFinish: boolean;
};

export const defaultGameSettings: GameSettings = {
  targetRounds: DEFAULT_TARGET_ROUNDS
};

export type GameStateSnapshot = {
  teams: Team[];
  currentTeamIndex: number;
  currentCardId?: string;
  lastRoll?: number;
  lastOutcome?: ResolvedOutcome;
  isResultsVisible: boolean;
  settings: GameSettings;
  completedTurns: number;
};

export type GameState = GameStateSnapshot & {
  history: GameStateSnapshot[];
};

type GameStateParts = GameStateSnapshot & {
  history: GameStateSnapshot[];
};

export function createInitialGameState(settings: GameSettings = defaultGameSettings): GameState {
  const normalizedSettings = normalizeSettings(settings);

  return createState({
    teams: initialTeams.map((team) => ({
      ...team,
      remainingHours: team.startingHours,
      effectiveMarks: 0
    })),
    currentTeamIndex: 0,
    isResultsVisible: false,
    settings: normalizedSettings,
    completedTurns: 0,
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
    currentCardId: getCardIdForLanding(state, nextPosition),
    lastRoll: roll,
    isResultsVisible: false,
    settings: state.settings,
    completedTurns: state.completedTurns,
    history: historyWithSnapshot(state)
  });
}

export function applyOption(
  state: GameState,
  option: CardOption,
  random: () => number = Math.random
): GameState {
  const resolvedOutcome = normalizeResolvedOutcomeTime(resolveOptionOutcome(option, random));
  const nextTeams = state.teams.map((team, index) =>
    index === state.currentTeamIndex
      ? {
          ...team,
          remainingHours: applyTimeEffect(team.remainingHours, resolvedOutcome.timeDeltaHours),
          effectiveMarks: Math.max(0, team.effectiveMarks + resolvedOutcome.effectiveMarks),
          indicators: applyIndicatorDeltas(team.indicators, resolvedOutcome.indicatorDeltas)
        }
      : { ...team }
  );
  const activeTeamCount = countActiveTeams(nextTeams);
  const nextTeamIndex =
    activeTeamCount === 0
      ? state.currentTeamIndex
      : findNextActiveTeamIndex(nextTeams, (state.currentTeamIndex + 1) % nextTeams.length);

  return createState({
    teams: nextTeams,
    currentTeamIndex: nextTeamIndex,
    lastOutcome: resolvedOutcome,
    isResultsVisible: activeTeamCount === 0,
    settings: state.settings,
    completedTurns: state.completedTurns + 1,
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
    tone: option.isCorrect === undefined ? "fixed" : option.isCorrect ? "good" : "bad",
    title: option.isCorrect === undefined ? "選擇結果" : option.isCorrect ? "答對" : "答錯",
    text: option.explanation ?? "這個選擇立即生效。",
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
    lastOutcome: state.lastOutcome,
    isResultsVisible: true,
    settings: state.settings,
    completedTurns: state.completedTurns,
    history: historyWithSnapshot(state)
  });
}

export function returnToBoard(state: GameState): GameState {
  return createState({
    ...cloneSnapshot(state),
    isResultsVisible: false,
    history: historyWithSnapshot(state)
  });
}

export function resetGame(state?: GameState, settings: GameSettings = state?.settings ?? defaultGameSettings): GameState {
  return createInitialGameState(settings);
}

export function undoLastAction(state: GameState): GameState {
  const previous = state.history.at(-1);

  return previous ? createState({ ...previous, history: state.history.slice(0, -1) }) : cloneState(state);
}

export function getRoundProgress(state: GameState): RoundProgress {
  const teamCount = Math.max(1, state.teams.length);
  const targetRounds = state.settings.targetRounds;
  const totalTurns = targetRounds * teamCount;
  const completedTurns = Math.min(state.completedTurns, totalTurns);
  const isReadyToFinish = completedTurns >= totalTurns;
  const completedTeamsThisRound = isReadyToFinish ? teamCount : completedTurns % teamCount;
  const currentRound = Math.min(targetRounds, Math.floor(completedTurns / teamCount) + 1);

  return {
    completedTurns,
    completedTeamsThisRound,
    currentRound,
    targetRounds,
    totalTurns,
    isReadyToFinish
  };
}

export function getActiveTeamCount(state: Pick<GameStateSnapshot, "teams">): number {
  return countActiveTeams(state.teams);
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
    isResultsVisible: snapshot.isResultsVisible,
    settings: { ...snapshot.settings },
    completedTurns: snapshot.completedTurns
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

function countActiveTeams(teams: Team[]): number {
  return teams.filter(hasRemainingHours).length;
}

function hasRemainingHours(team: Team): boolean {
  return team.remainingHours > 0;
}

function findNextActiveTeamIndex(teams: Team[], startIndex: number): number {
  for (let offset = 0; offset < teams.length; offset += 1) {
    const index = (startIndex + offset) % teams.length;

    if (hasRemainingHours(teams[index]!)) {
      return index;
    }
  }

  return startIndex;
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

function normalizeResolvedOutcomeTime(outcome: ResolvedOutcome): ResolvedOutcome {
  return {
    ...outcome,
    timeDeltaHours: normalizeTimeDeltaHours(outcome.timeDeltaHours)
  };
}

function applyTimeEffect(remainingHours: number, timeDeltaHours: number): number {
  const consumedHours = Math.abs(normalizeTimeDeltaHours(timeDeltaHours));

  return Math.max(0, remainingHours - consumedHours);
}

function normalizeTimeDeltaHours(timeDeltaHours: number): number {
  return timeDeltaHours < 0 ? timeDeltaHours : -1;
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

function getCardIdForLanding(state: GameState, position: number): string | undefined {
  const space = boardSpaces.find((item) => item.id === position);

  if (!space) {
    return undefined;
  }

  const nextTurnRound = Math.floor(state.completedTurns / Math.max(1, state.teams.length)) + 1;
  const isSecondRound = nextTurnRound === 2;
  const isBossExemptSpace = space.type === "opportunity" || space.type === "fate";
  const shouldUseBossChallenge = isSecondRound || (nextTurnRound >= 3 && !isBossExemptSpace);

  if (shouldUseBossChallenge) {
    return getBossChallengeCardId(state.completedTurns, position);
  }

  return getFirstCardIdForPosition(position);
}

function getBossChallengeCardId(completedTurns: number, position: number): string | undefined {
  if (bossChallengeCards.length === 0) {
    return undefined;
  }

  const challengeIndex = positiveModulo(completedTurns + position, bossChallengeCards.length);

  return bossChallengeCards[challengeIndex]?.id;
}

function normalizeSettings(settings: GameSettings): GameSettings {
  const targetRounds = Number.isFinite(settings.targetRounds)
    ? Math.round(settings.targetRounds)
    : DEFAULT_TARGET_ROUNDS;

  return {
    targetRounds: Math.max(MIN_TARGET_ROUNDS, Math.min(MAX_TARGET_ROUNDS, targetRounds))
  };
}
