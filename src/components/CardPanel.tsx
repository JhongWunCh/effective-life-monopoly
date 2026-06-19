import type { Card, CardOption, Period, ResolvedOutcome, SpaceType } from "../game/types";

type CardPanelProps = {
  card?: Card;
  displayedOptions?: CardOption[];
  lastOutcome?: ResolvedOutcome;
  onApplyOption: (option: CardOption) => void;
};

const periodLabels: Record<Period, string> = {
  midnight: "深夜",
  morning: "早上",
  afternoon: "下午",
  evening: "晚上"
};

const typeLabels: Record<SpaceType, string> = {
  action: "行動",
  opportunity: "機會",
  fate: "命運",
  reflection: "反思",
  boss: "魔王"
};

const formatTimeEffect = (hours: number) => {
  const spentHours = hours < 0 ? Math.abs(hours) : 1;

  return `消耗 ${spentHours} 小時`;
};

const formatPoints = (points: number) => {
  if (points > 0) {
    return `人生有效點增加 ${points}`;
  }

  if (points < 0) {
    return `人生有效點扣除 ${Math.abs(points)}`;
  }

  return "人生有效點不變";
};

export function CardPanel({ card, displayedOptions, lastOutcome, onApplyOption }: CardPanelProps) {
  if (!card) {
    if (lastOutcome) {
      return (
        <section
          className={`card-panel outcome-panel outcome-${lastOutcome.tone}`}
          aria-label="事件結果"
        >
          <div className="card-meta">
            <span>{lastOutcome.isRandom ? "隨機結果" : "固定結果"}</span>
            <span>{lastOutcome.tone === "good" ? "好結果" : lastOutcome.tone === "bad" ? "壞結果" : "結果"}</span>
          </div>
          <h2>結果揭曉</h2>
          <p className="card-text">
            <strong>{lastOutcome.optionId}. {lastOutcome.optionLabel}</strong>
          </p>
          <div className="outcome-copy">
            <strong>{lastOutcome.title}</strong>
            <p>{lastOutcome.text}</p>
          </div>
          <div className="outcome-impact" aria-label="結果影響">
            <span>{formatTimeEffect(lastOutcome.timeDeltaHours)}</span>
            <span>{formatPoints(lastOutcome.effectiveMarks)}</span>
          </div>
        </section>
      );
    }

    return (
      <section className="card-panel card-panel-empty card-panel-deck" aria-label="事件卡">
        <p>擲骰後會在這裡顯示事件卡。</p>
      </section>
    );
  }

  return (
    <section className={`card-panel card-panel-drawn period-${card.period} type-${card.type}`} aria-label="事件卡">
      <div className="card-meta">
        <span>{typeLabels[card.type]}</span>
        <span>{card.type === "boss" ? "特殊問題" : periodLabels[card.period]}</span>
      </div>
      <h2>{card.title}</h2>
      <p className="card-text">{card.text}</p>
      <div className="option-list">
        {(displayedOptions ?? card.options).map((option) => (
          <button
            className="option-button"
            key={option.id}
            type="button"
            onClick={() => onApplyOption(option)}
          >
            <span className="option-id">{option.id}</span>
            <span className="option-copy">{option.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
