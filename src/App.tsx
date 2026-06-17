import { useEffect, useMemo, useRef, useState } from "react";
import { ActivityIntro } from "./components/ActivityIntro";
import { Board } from "./components/Board";
import { CardPanel } from "./components/CardPanel";
import { CharacterIntro } from "./components/CharacterIntro";
import { GameSettingsPanel } from "./components/GameSettingsPanel";
import { HostControls } from "./components/HostControls";
import { ResultsView } from "./components/ResultsView";
import { Scoreboard } from "./components/Scoreboard";
import { boardSpaces, cards } from "./game/data";
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
} from "./game/gameEngine";
import type { Team } from "./game/types";

const ROLL_ANIMATION_MS = 900;
const MOVE_STEP_MS = 220;

type RollStatus = "idle" | "rolling" | "moving";
type ActiveView = "intro" | "characters" | "settings" | "game";

type TurnAnimation = {
  phase: RollStatus;
  displayedRoll?: number;
  movingTeamId?: string;
  visualPositions: Record<string, number>;
};

const createIdleAnimation = (): TurnAnimation => ({
  phase: "idle",
  visualPositions: {}
});

export default function App() {
  const [state, setState] = useState(createInitialGameState);
  const [activeView, setActiveView] = useState<ActiveView>("intro");
  const [animation, setAnimation] = useState<TurnAnimation>(createIdleAnimation);
  const [revealedSpaceIds, setRevealedSpaceIds] = useState<Set<number>>(() => new Set());
  const timerIds = useRef<number[]>([]);
  const currentTeam = state.teams[state.currentTeamIndex];
  const currentCard = cards.find((card) => card.id === state.currentCardId);
  const isAnimating = animation.phase !== "idle";
  const roundProgress = useMemo(() => getRoundProgress(state), [state]);
  const activeTeamCount = useMemo(() => getActiveTeamCount(state), [state]);
  const canRoll =
    activeTeamCount > 0 &&
    !roundProgress.isReadyToFinish &&
    !state.currentCardId &&
    !state.isResultsVisible &&
    !isAnimating;
  const resultsButtonLabel =
    activeTeamCount === 0 || roundProgress.isReadyToFinish ? "完成結算" : "提前結算";
  const displayedTeams = useMemo<Team[]>(
    () =>
      state.teams.map((team) => ({
        ...team,
        position: animation.visualPositions[team.id] ?? team.position
      })),
    [animation.visualPositions, state.teams]
  );
  const displayedRoll = animation.displayedRoll ?? state.lastRoll;
  const leftTeams = displayedTeams.slice(0, 2);
  const rightTeams = displayedTeams.slice(2);

  const clearAnimationTimers = () => {
    timerIds.current.forEach((timerId) => window.clearTimeout(timerId));
    timerIds.current = [];
  };

  useEffect(() => {
    if (state.isResultsVisible) {
      window.scrollTo({ left: 0, top: 0 });
    }
  }, [state.isResultsVisible]);

  useEffect(
    () => () => {
      clearAnimationTimers();
    },
    []
  );

  if (!currentTeam) {
    return null;
  }

  const startRollAnimation = () => {
    if (!canRoll) {
      return;
    }

    clearAnimationTimers();

    const roll = Math.floor(Math.random() * 6) + 1;
    const movingTeam = currentTeam;
    const startPosition = movingTeam.position;
    const path = Array.from(
      { length: roll },
      (_, index) => (startPosition + index + 1) % boardSpaces.length
    );

    setAnimation({
      phase: "rolling",
      movingTeamId: movingTeam.id,
      visualPositions: { [movingTeam.id]: startPosition }
    });

    const rollTimer = window.setTimeout(() => {
      setAnimation({
        phase: "moving",
        displayedRoll: roll,
        movingTeamId: movingTeam.id,
        visualPositions: { [movingTeam.id]: startPosition }
      });

      path.forEach((position, index) => {
        const moveTimer = window.setTimeout(() => {
          setAnimation((currentAnimation) => ({
            ...currentAnimation,
            phase: "moving",
            displayedRoll: roll,
            movingTeamId: movingTeam.id,
            visualPositions: {
              ...currentAnimation.visualPositions,
              [movingTeam.id]: position
            }
          }));

          if (index === path.length - 1) {
            const settleTimer = window.setTimeout(() => {
              setRevealedSpaceIds((currentRevealedSpaceIds) => {
                const nextRevealedSpaceIds = new Set(currentRevealedSpaceIds);
                nextRevealedSpaceIds.add(path[index]!);
                return nextRevealedSpaceIds;
              });
              setState((currentState) => moveCurrentTeam(currentState, roll));
              setAnimation(createIdleAnimation());
              timerIds.current = [];
            }, 40);

            timerIds.current.push(settleTimer);
          }
        }, (index + 1) * MOVE_STEP_MS);

        timerIds.current.push(moveTimer);
      });
    }, ROLL_ANIMATION_MS);

    timerIds.current.push(rollTimer);
  };

  const resetToInitialGame = () => {
    if (!window.confirm("確定要重設遊戲嗎？")) {
      return;
    }

    restartGame();
  };

  const restartGame = () => {
    clearAnimationTimers();
    setAnimation(createIdleAnimation());
    setRevealedSpaceIds(new Set());
    setState((currentState) => resetGame(currentState));
    setActiveView("game");
  };

  const updateTargetRounds = (targetRounds: number) => {
    clearAnimationTimers();
    setAnimation(createIdleAnimation());
    setRevealedSpaceIds(new Set());
    setState((currentState) => resetGame(currentState, { targetRounds }));
  };

  const showGameResults = () => {
    if (
      activeTeamCount > 0 &&
      !roundProgress.isReadyToFinish &&
      !window.confirm("還沒完成設定輪數，要提前結算嗎？")
    ) {
      return;
    }

    clearAnimationTimers();
    setAnimation(createIdleAnimation());
    setState((currentState) => showResults(currentState));
    setActiveView("game");
  };

  return (
    <main className="app-shell">
      <section className="top-bar">
        <div>
          <p className="eyebrow">24 小時挑戰</p>
          <h1>有效人生大富翁</h1>
        </div>
        <div className="view-tabs" aria-label="頁面切換">
          <button
            type="button"
            aria-pressed={activeView === "intro"}
            onClick={() => setActiveView("intro")}
          >
            活動介紹
          </button>
          <button
            type="button"
            aria-pressed={activeView === "characters"}
            onClick={() => setActiveView("characters")}
          >
            角色介紹
          </button>
          <button
            type="button"
            aria-pressed={activeView === "settings"}
            onClick={() => setActiveView("settings")}
          >
            遊戲設定
          </button>
          <button
            type="button"
            aria-pressed={activeView === "game"}
            onClick={() => setActiveView("game")}
          >
            遊戲棋盤
          </button>
        </div>
      </section>
      {activeView === "intro" ? (
        <ActivityIntro onOpenCharacters={() => setActiveView("characters")} />
      ) : activeView === "characters" ? (
        <CharacterIntro />
      ) : activeView === "settings" ? (
        <GameSettingsPanel
          targetRounds={state.settings.targetRounds}
          onTargetRoundsChange={updateTargetRounds}
        />
      ) : (
      <section className={`game-layout${state.isResultsVisible ? " game-layout-results" : ""}`}>
        {state.isResultsVisible ? (
          <ResultsView
            teams={state.teams}
            roundProgress={roundProgress}
            isTimeExhausted={activeTeamCount === 0}
            onBackToBoard={() => setState((currentState) => returnToBoard(currentState))}
            onReset={restartGame}
          />
        ) : (
          <>
            <Scoreboard
              ariaLabel="左側隊伍記分板"
              className="scoreboard-left"
              currentTeamId={currentTeam.id}
              teams={leftTeams}
              title="左側記分板"
            />
            <div className="center-column">
              <Board
                spaces={boardSpaces}
                teams={displayedTeams}
                currentTeamId={currentTeam.id}
                revealedSpaceIds={revealedSpaceIds}
                movingTeamId={animation.movingTeamId}
                centerContent={
                  <HostControls
                    currentTeamName={currentTeam.name}
                    lastRoll={displayedRoll}
                    rollStatus={animation.phase}
                    roundProgress={roundProgress}
                    canRoll={canRoll}
                    canUndo={state.history.length > 0 && !isAnimating}
                    canShowResults={!state.currentCardId && !isAnimating}
                    canReset={!isAnimating}
                    resultsButtonLabel={resultsButtonLabel}
                    onRoll={startRollAnimation}
                    onUndo={() => {
                      clearAnimationTimers();
                      setAnimation(createIdleAnimation());
                      setState((currentState) => undoLastAction(currentState));
                    }}
                    onReset={resetToInitialGame}
                    onShowResults={showGameResults}
                  />
                }
              />
              <CardPanel
                card={currentCard}
                lastOutcome={state.lastOutcome}
                onApplyOption={(option) =>
                  setState((currentState) => applyOption(currentState, option))
                }
              />
            </div>
            <Scoreboard
              ariaLabel="右側隊伍記分板"
              className="scoreboard-right"
              currentTeamId={currentTeam.id}
              teams={rightTeams}
              title="右側記分板"
            />
          </>
        )}
      </section>
      )}
    </main>
  );
}
