import type { IndicatorKey } from "./types";

export const indicatorKeys = [
  "time",
  "energy",
  "focus",
  "health",
  "relationship",
  "achievement"
] as const satisfies readonly IndicatorKey[];

export const indicatorLabels: Record<IndicatorKey, string> = {
  time: "時間",
  energy: "精力",
  focus: "專注",
  health: "健康",
  relationship: "關係",
  achievement: "成就"
};
