import { protagonists } from "../game/data";
import type { Team } from "../game/types";

type ScoreboardProps = {
  teams: Team[];
  currentTeamId: string;
  ariaLabel?: string;
  className?: string;
  title?: string;
};

const formatHours = (hours: number) => `${hours.toFixed(1).replace(/\.0$/, "")}h`;

export function Scoreboard({
  teams,
  currentTeamId,
  ariaLabel = "隊伍記分板",
  className = "",
  title = "隊伍記分板"
}: ScoreboardProps) {
  return (
    <aside className={`scoreboard${className ? ` ${className}` : ""}`} aria-label={ariaLabel}>
      <div className="panel-heading">
        <p className="panel-kicker">Score</p>
        <h2>{title}</h2>
      </div>
      <div className="score-list">
        {teams.map((team) => {
          const protagonist = protagonists.find((item) => item.id === team.protagonistId);
          const spentHours = Math.max(0, team.startingHours - team.remainingHours);
          const indicatorTotal = Object.values(team.indicators).reduce((sum, value) => sum + value, 0);

          return (
            <article
              className={`score-card player-state-card${team.id === currentTeamId ? " is-current" : ""}`}
              key={team.id}
            >
              <div className="score-card-header">
                <div>
                  <h3>{team.name}</h3>
                  {protagonist ? <p>{protagonist.name}</p> : null}
                </div>
                <span className="score-badge">{team.effectiveMarks} 人生有效點</span>
              </div>
              <dl className="score-stats">
                <div>
                  <dt>起始時間</dt>
                  <dd>{formatHours(team.startingHours)}</dd>
                </div>
                <div>
                  <dt>已花時間</dt>
                  <dd>{formatHours(spentHours)}</dd>
                </div>
                <div>
                  <dt>剩餘時間</dt>
                  <dd>{formatHours(team.remainingHours)}</dd>
                </div>
                <div>
                  <dt>人生有效點</dt>
                  <dd>{team.effectiveMarks}</dd>
                </div>
                <div>
                  <dt>關鍵指標</dt>
                  <dd>{indicatorTotal}</dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>
    </aside>
  );
}
