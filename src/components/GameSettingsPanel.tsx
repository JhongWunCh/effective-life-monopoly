type GameSettingsPanelProps = {
  targetRounds: number;
  onTargetRoundsChange: (targetRounds: number) => void;
};

const roundOptions = [1, 2, 3, 4, 5];

export function GameSettingsPanel({
  targetRounds,
  onTargetRoundsChange
}: GameSettingsPanelProps) {
  return (
    <section className="settings-page" aria-label="遊戲設定">
      <div className="settings-hero">
        <p className="panel-kicker">Game Setup</p>
        <h2>遊戲設定</h2>
        <p className="settings-lead">四隊各完成一次選擇，算 1 輪。</p>
      </div>

      <div className="round-settings-panel">
        <div className="panel-heading">
          <p className="panel-kicker">Round Limit</p>
          <h3>完賽輪數</h3>
        </div>
        <div className="round-picker" aria-label="完賽輪數">
          {roundOptions.map((roundOption) => (
            <button
              key={roundOption}
              type="button"
              aria-pressed={targetRounds === roundOption}
              onClick={() => onTargetRoundsChange(roundOption)}
            >
              {roundOption} 輪
            </button>
          ))}
        </div>
        <p className="settings-note">
          建議 3 輪；短場次可用 1 輪，完整討論可拉到 4 至 5 輪。
        </p>
      </div>
    </section>
  );
}
