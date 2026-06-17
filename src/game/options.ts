import type { CardOption } from "./types";

export type DisplayedCardOption = CardOption & {
  sourceOptionId: CardOption["id"];
};

const displayOptionIds: CardOption["id"][] = ["A", "B", "C"];

export function createDisplayedOptions(
  options: CardOption[],
  random: () => number = Math.random
): DisplayedCardOption[] {
  const shuffledOptions = [...options];

  for (let index = shuffledOptions.length - 1; index > 0; index -= 1) {
    const targetIndex = Math.floor(random() * (index + 1));
    const currentOption = shuffledOptions[index]!;

    shuffledOptions[index] = shuffledOptions[targetIndex]!;
    shuffledOptions[targetIndex] = currentOption;
  }

  return shuffledOptions.map((option, index) => ({
    ...option,
    id: displayOptionIds[index]!,
    sourceOptionId: option.id
  }));
}
