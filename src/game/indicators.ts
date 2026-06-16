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
  time: "可支配時間",
  energy: "身心能量",
  focus: "深度專注",
  health: "身心健康",
  relationship: "人際關係",
  achievement: "有效產出"
};
