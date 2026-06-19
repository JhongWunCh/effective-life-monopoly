export type Period = "midnight" | "morning" | "afternoon" | "evening";
export type SpaceType = "action" | "opportunity" | "fate" | "reflection" | "boss";
export type IndicatorKey =
  | "time"
  | "energy"
  | "focus"
  | "health"
  | "relationship"
  | "achievement";

export type Indicators = Record<IndicatorKey, number>;

export type Team = {
  id: string;
  name: string;
  protagonistId: string;
  position: number;
  startingHours: number;
  remainingHours: number;
  effectiveMarks: number;
  indicators: Indicators;
};

export type OutcomeTone = "good" | "bad";

export type Protagonist = {
  id: string;
  name: string;
  identity: string;
  fixedBurdens: Array<{
    label: string;
    hours: number;
    period?: Period;
  }>;
  startingDeductionHours: number;
  signatureCardId: string;
  baseIndicators: Indicators;
};

export type BoardSpace = {
  id: number;
  hour: string;
  period: Period;
  type: SpaceType;
  title: string;
  cardIds: string[];
};

export type CardOption = {
  id: "A" | "B" | "C";
  label: string;
  timeDeltaHours: number;
  effectiveMarks: number;
  indicatorDeltas?: Partial<Indicators>;
  outcomes?: CardOutcome[];
  isCorrect?: boolean;
  explanation?: string;
};

export type CardOutcome = {
  id: string;
  tone: OutcomeTone;
  title: string;
  text: string;
  timeDeltaHours: number;
  effectiveMarks: number;
  indicatorDeltas?: Partial<Indicators>;
};

export type ResolvedOutcome = {
  optionId: CardOption["id"];
  optionLabel: string;
  isRandom: boolean;
  tone: OutcomeTone | "fixed";
  title: string;
  text: string;
  timeDeltaHours: number;
  effectiveMarks: number;
  indicatorDeltas?: Partial<Indicators>;
};

export type Card = {
  id: string;
  type: SpaceType;
  period: Period;
  title: string;
  text: string;
  options: CardOption[];
};
