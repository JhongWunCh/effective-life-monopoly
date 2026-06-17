import type { Card, CardOption, Period, ResolvedOutcome, SpaceType } from "../game/types";
import { indicatorKeys, indicatorLabels } from "../game/indicators";

type CardPanelProps = {
  card?: Card;
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
  reflection: "反思"
};

const formatDelta = (hours: number) => {
  if (hours > 0) {
    return `+${hours} 小時`;
  }

  if (hours < 0) {
    return `${hours} 小時`;
  }

  return "時間不變";
};

const formatPoints = (points: number) => {
  if (points > 0) {
    return `人生有效點 +${points}`;
  }

  if (points < 0) {
    return `人生有效點 ${points}`;
  }

  return "人生有效點不變";
};

const formatIndicatorDeltas = (option: CardOption) => {
  const deltas = option.indicatorDeltas;

  if (!deltas) {
    return "";
  }

  return indicatorKeys
    .filter((indicatorKey) => (deltas[indicatorKey] ?? 0) > 0)
    .map((indicatorKey) => `${indicatorLabels[indicatorKey]} +${deltas[indicatorKey]}`)
    .join("、");
};

export function CardPanel({ card, lastOutcome, onApplyOption }: CardPanelProps) {
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
            <span>{formatDelta(lastOutcome.timeDeltaHours)}</span>
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
        <span>{periodLabels[card.period]}</span>
      </div>
      <h2>{card.title}</h2>
      <p className="card-text">{card.text}</p>
      <div className="option-list">
        {card.options.map((option) => {
          const indicatorImpact = formatIndicatorDeltas(option);

          return (
            <button
              className="option-button"
              key={option.id}
              type="button"
              onClick={() => onApplyOption(option)}
            >
              <span className="option-id">{option.id}</span>
              <span className="option-copy">{option.label}</span>
              <span className="option-impact">
                <span>
                  {formatDelta(option.timeDeltaHours)} / {formatPoints(option.effectiveMarks)}
                </span>
                {option.outcomes?.length ? <span className="indicator-impact">選後揭示好壞結果</span> : null}
                {indicatorImpact ? <span className="indicator-impact">{indicatorImpact}</span> : null}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
