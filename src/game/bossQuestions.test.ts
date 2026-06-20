import { describe, expect, it } from "vitest";
import { bossChallengeCards } from "./bossQuestions";

const STEPHEN_CHOW_TOPIC_PATTERN =
  /周星馳|唐伯虎|國產凌凌漆|九品芝麻官|喜劇之王|逃學威龍|大話西遊/;

describe("boss challenge cards", () => {
  it("keeps Stephen Chow questions from dominating the boss deck", () => {
    const stephenChowCards = bossChallengeCards.filter((card) =>
      STEPHEN_CHOW_TOPIC_PATTERN.test(`${card.title} ${card.text}`)
    );

    expect(stephenChowCards.length).toBeLessThanOrEqual(4);
  });

  it("keeps every boss question as a three-choice single-answer card", () => {
    bossChallengeCards.forEach((card) => {
      expect(card.type).toBe("boss");
      expect(card.options).toHaveLength(3);
      expect(card.options.filter((option) => option.isCorrect)).toHaveLength(1);
    });
  });
});
