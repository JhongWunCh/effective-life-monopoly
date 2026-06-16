import { describe, expect, it } from "vitest";
import { boardSpaces } from "./data";
import { getBoardCellPlacement } from "./boardLayout";

describe("board layout", () => {
  it("places all 24 spaces on a 7 by 7 Monopoly-style outer ring", () => {
    const placements = boardSpaces.map((space) => getBoardCellPlacement(space.id));

    expect(new Set(placements.map((placement) => `${placement.row}:${placement.column}`)).size).toBe(
      24
    );
    expect(placements.every(({ row, column }) => row >= 1 && row <= 7 && column >= 1 && column <= 7)).toBe(
      true
    );
    expect(placements.every(({ row, column }) => row === 1 || row === 7 || column === 1 || column === 7)).toBe(
      true
    );
  });

  it("keeps each six-space period on one side of the square board", () => {
    expect(getBoardCellPlacement(0)).toEqual({ row: 1, column: 1 });
    expect(getBoardCellPlacement(5)).toEqual({ row: 1, column: 6 });
    expect(getBoardCellPlacement(6)).toEqual({ row: 1, column: 7 });
    expect(getBoardCellPlacement(11)).toEqual({ row: 6, column: 7 });
    expect(getBoardCellPlacement(12)).toEqual({ row: 7, column: 7 });
    expect(getBoardCellPlacement(17)).toEqual({ row: 7, column: 2 });
    expect(getBoardCellPlacement(18)).toEqual({ row: 7, column: 1 });
    expect(getBoardCellPlacement(23)).toEqual({ row: 2, column: 1 });
  });

  it.each([-1, 24, 4.5, Number.NaN])("rejects invalid board space id %s", (spaceId) => {
    expect(() => getBoardCellPlacement(spaceId)).toThrow(RangeError);
  });
});
