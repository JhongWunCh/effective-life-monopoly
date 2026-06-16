export type BoardCellPlacement = {
  row: number;
  column: number;
};

const BOARD_SIZE = 7;
const SPACES_PER_SIDE = 6;
const BOARD_SPACE_COUNT = 24;

export function getBoardCellPlacement(spaceId: number): BoardCellPlacement {
  if (!Number.isInteger(spaceId) || spaceId < 0 || spaceId >= BOARD_SPACE_COUNT) {
    throw new RangeError("Board space id must be an integer from 0 through 23.");
  }

  if (spaceId < SPACES_PER_SIDE) {
    return { row: 1, column: spaceId + 1 };
  }

  if (spaceId < SPACES_PER_SIDE * 2) {
    return { row: spaceId - SPACES_PER_SIDE + 1, column: BOARD_SIZE };
  }

  if (spaceId < SPACES_PER_SIDE * 3) {
    return { row: BOARD_SIZE, column: BOARD_SIZE - (spaceId - SPACES_PER_SIDE * 2) };
  }

  return { row: BOARD_SIZE - (spaceId - SPACES_PER_SIDE * 3), column: 1 };
}
