type HostControlsProps = {
  currentTeamName: string;
  lastRoll?: number;
  rollStatus: "idle" | "rolling" | "moving";
  canRoll: boolean;
  canUndo: boolean;
  canShowResults: boolean;
  canReset: boolean;
  onRoll: () => void;
  onUndo: () => void;
  onReset: () => void;
  onShowResults: () => void;
};

export function HostControls({
  currentTeamName,
  lastRoll,
  rollStatus,
  canRoll,
  canUndo,
  canShowResults,
  canReset,
  onRoll,
  onUndo,
  onReset,
  onShowResults
}: HostControlsProps) {
  const dieLabel =
    rollStatus === "rolling" ? "擲骰中" : lastRoll ? `骰子：${lastRoll}` : "等待擲骰";
  const dieFace = rollStatus === "rolling" ? "?" : (lastRoll ?? "?");

  return (
    <section className="host-controls" aria-label="主持人控制台">
      <div className="host-current">
        <span>目前隊伍</span>
        <strong>{currentTeamName}</strong>
      </div>
      <div className={`die-display is-${rollStatus}`} aria-live="polite">
        <span className="die-cube" aria-hidden="true">
          {dieFace}
        </span>
        <span className="die-copy">{dieLabel}</span>
        {rollStatus === "moving" ? <span className="move-copy">走格中</span> : null}
      </div>
      <div className="control-row">
        <button className="primary-control" type="button" onClick={onRoll} disabled={!canRoll}>
          擲骰
        </button>
        <button type="button" onClick={onUndo} disabled={!canUndo}>
          復原上一動
        </button>
        <button type="button" onClick={onShowResults} disabled={!canShowResults}>
          顯示結果
        </button>
        <button className="danger-control" type="button" onClick={onReset} disabled={!canReset}>
          重設遊戲
        </button>
      </div>
    </section>
  );
}
