import type { ReactNode } from "react";
import type { BoardSpace, Period, Team } from "../game/types";
import { getBoardCellPlacement } from "../game/boardLayout";

type BoardProps = {
  spaces: BoardSpace[];
  teams: Team[];
  currentTeamId: string;
  revealedSpaceIds: Set<number>;
  movingTeamId?: string;
  centerContent?: ReactNode;
};

const periodLabels: Record<Period, string> = {
  midnight: "深夜",
  morning: "早上",
  afternoon: "下午",
  evening: "晚上"
};

const typeLabels = {
  opportunity: "機會",
  fate: "命運"
};

const teamTokenLabels: Record<string, string> = {
  阿里爸爸組: "里",
  阿吐伯組: "吐",
  孫小梅組: "梅",
  金被被組: "金"
};

const getTeamTokenLabel = (team: Team) => teamTokenLabels[team.name] ?? team.name.slice(0, 1);

export function Board({
  spaces,
  teams,
  currentTeamId,
  revealedSpaceIds,
  movingTeamId,
  centerContent
}: BoardProps) {
  return (
    <section className="board-panel board-panel-tabletop" aria-label="有效人生大富翁棋盤">
      <div className="board-frame">
        <div className="board-grid">
          <div className="board-center">
            <div className="board-center-bg" aria-hidden="true">
              <div className="board-center-emblem">
                <span>有效人生</span>
                <strong>選擇</strong>
              </div>
              <div className="period-legend">
                {Object.entries(periodLabels).map(([period, label]) => (
                  <span className={`legend-item period-${period}`} key={period}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="board-center-content">{centerContent}</div>
          </div>
          {spaces.map((space) => {
            const teamsOnSpace = teams.filter((team) => team.position === space.id);
            const placement = getBoardCellPlacement(space.id);
            const isRevealed = revealedSpaceIds.has(space.id);
            const spaceTitle = isRevealed ? space.title : "未揭露任務";
            const typeClass = `type-${space.type}`;
            const revealClass = isRevealed ? "is-revealed" : "board-space-card-back";

            return (
              <article
                className={`board-space period-${space.period} ${typeClass} ${revealClass}`}
                key={space.id}
                aria-label={isRevealed ? spaceTitle : `未揭露任務 ${space.id + 1}`}
                data-board-space-id={space.id}
                style={{ gridColumn: placement.column, gridRow: placement.row }}
              >
                <div className="space-meta">
                  <span className="space-index">{String(space.id + 1).padStart(2, "0")}</span>
                  <span className="space-period">{periodLabels[space.period]}</span>
                </div>
                {space.type === "opportunity" || space.type === "fate" ? (
                  <span className={`space-type type-${space.type}`}>{typeLabels[space.type]}</span>
                ) : null}
                <h3 className={`space-title${isRevealed ? "" : " is-hidden"}`}>
                  {isRevealed ? space.title : "?"}
                </h3>
                <div className="token-row" aria-label={`${spaceTitle} 隊伍位置`}>
                  {teamsOnSpace.map((team) => (
                    <span
                      className={`team-token${team.id === currentTeamId ? " is-current" : ""}${
                        team.id === movingTeamId ? " is-moving" : ""
                      }`}
                      key={team.id}
                      title={team.name}
                      aria-label={team.name}
                    >
                      {getTeamTokenLabel(team)}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
