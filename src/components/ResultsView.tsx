import { calculateAwards, calculateTeamScore } from "../game/scoring";
import type { Team } from "../game/types";

type ResultsViewProps = {
  teams: Team[];
};

const formatHours = (hours: number) => `${hours.toFixed(1).replace(/\.0$/, "")}h`;

export function ResultsView({ teams }: ResultsViewProps) {
  const awards = calculateAwards(teams);
  const teamScores = teams.map(calculateTeamScore);

  return (
    <section className="results-panel" aria-labelledby="results-heading">
      <div className="panel-heading">
        <p className="panel-kicker">Results</p>
        <h2 id="results-heading">結算結果</h2>
      </div>

      <div className="award-grid">
        <article className="award-card" aria-label="時間管理獎">
          <span>時間管理獎</span>
          <strong>{awards.timeManagement}</strong>
        </article>
        <article className="award-card" aria-label="人生有效點獎">
          <span>人生有效點獎</span>
          <strong>{awards.effectiveChoice}</strong>
        </article>
        <article className="award-card" aria-label="有效人生獎">
          <span>有效人生獎</span>
          <strong>{awards.effectiveLife}</strong>
        </article>
      </div>

      <div className="results-table-wrap">
        <table className="results-table">
          <thead>
            <tr>
              <th scope="col">隊伍</th>
              <th scope="col">已花時間</th>
              <th scope="col">剩餘時間</th>
              <th scope="col">人生有效點</th>
              <th scope="col">有效人生分</th>
            </tr>
          </thead>
          <tbody>
            {teamScores.map((score) => (
              <tr key={score.teamId}>
                <th scope="row">{score.teamName}</th>
                <td>{formatHours(score.spentHours)}</td>
                <td>{formatHours(score.remainingHours)}</td>
                <td>{score.effectiveMarks}</td>
                <td>{score.effectiveLifeScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
