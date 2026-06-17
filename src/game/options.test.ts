import { describe, expect, it } from "vitest";
import { createDisplayedOptions } from "./options";
import type { CardOption } from "./types";

const options: CardOption[] = [
  { id: "A", label: "原本 A", timeDeltaHours: -1, effectiveMarks: 1 },
  { id: "B", label: "原本 B", timeDeltaHours: -2, effectiveMarks: 2 },
  { id: "C", label: "原本 C", timeDeltaHours: -3, effectiveMarks: 3 }
];

describe("displayed card options", () => {
  it("shuffles source options and relabels them from A for the visible card", () => {
    const displayedOptions = createDisplayedOptions(options, () => 0);

    expect(displayedOptions.map(({ id, label, sourceOptionId }) => ({ id, label, sourceOptionId }))).toEqual([
      { id: "A", label: "原本 B", sourceOptionId: "B" },
      { id: "B", label: "原本 C", sourceOptionId: "C" },
      { id: "C", label: "原本 A", sourceOptionId: "A" }
    ]);
  });

  it("does not mutate the source option ids", () => {
    createDisplayedOptions(options, () => 0);

    expect(options.map((option) => option.id)).toEqual(["A", "B", "C"]);
  });
});
