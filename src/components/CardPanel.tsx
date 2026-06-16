import type { Card, CardOption, Period, SpaceType } from "../game/types";
import { indicatorKeys, indicatorLabels } from "../game/indicators";

type CardPanelProps = {
  card?: Card;
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

export function CardPanel({ card, onApplyOption }: CardPanelProps) {
  if (!card) {
    return (
      <section className="card-panel card-panel-empty" aria-label="事件卡">
        <p>擲骰後會在這裡顯示事件卡。</p>
      </section>
    );
  }

  return (
    <section className={`card-panel period-${card.period}`} aria-label="事件卡">
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
                  {formatDelta(option.timeDeltaHours)} / {option.effectiveMarks} 效能
                </span>
                {indicatorImpact ? <span className="indicator-impact">{indicatorImpact}</span> : null}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
