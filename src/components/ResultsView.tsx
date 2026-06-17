import { calculateAwards, calculateTeamScore } from "../game/scoring";
import type { RoundProgress } from "../game/gameEngine";
import type { Team } from "../game/types";

type ResultsViewProps = {
  teams: Team[];
  roundProgress: RoundProgress;
  onBackToBoard: () => void;
  onReset: () => void;
};

const formatHours = (hours: number) => `${hours.toFixed(1).replace(/\.0$/, "")}h`;

export function ResultsView({ teams, roundProgress, onBackToBoard, onReset }: ResultsViewProps) {
  const awards = calculateAwards(teams);
  const teamScores = teams.map(calculateTeamScore);
  const champion = teamScores.find((score) => score.teamName === awards.effectiveLife) ?? teamScores[0]!;
  const teamCount = roundProgress.totalTurns / roundProgress.targetRounds;
  const completedRoundCount = roundProgress.isReadyToFinish
    ? roundProgress.targetRounds
    : Math.floor(roundProgress.completedTurns / teamCount);

  return (
    <section className="results-panel" aria-labelledby="results-heading">
      <div className="finish-hero">
        <div>
          <p className="panel-kicker">Finish</p>
          <h2 id="results-heading">完賽結算</h2>
          <p>
            完成 {completedRoundCount} / {roundProgress.targetRounds} 輪，共{" "}
            {roundProgress.completedTurns} 次選擇
          </p>
        </div>
        <article className="champion-card" aria-label="有效人生冠軍">
          <span>今天最值得的是</span>
          <strong>{champion.teamName}</strong>
          <p>{champion.effectiveLifeScore} 分</p>
        </article>
        <div className="results-actions">
          <button type="button" onClick={onBackToBoard}>
            回棋盤檢查
          </button>
          <button className="primary-control" type="button" onClick={onReset}>
            再玩一次
          </button>
        </div>
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
