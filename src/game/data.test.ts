import { describe, expect, it } from "vitest";
import { boardSpaces, cards, protagonists, teams } from "./data";
import { indicatorKeys } from "./indicators";

const expectUniqueValues = <T>(values: T[]) => {
  expect(new Set(values).size).toBe(values.length);
};

describe("game data", () => {
  it("defines four protagonist teams with starting hours from fixed burdens", () => {
    expect(teams).toHaveLength(4);
    expect(teams.map((team) => team.name)).toEqual([
      "阿里爸爸組",
      "阿吐伯組",
      "孫小梅組",
      "金被被組"
    ]);

    expect(teams.map((team) => team.startingHours)).toEqual([18.5, 20, 19, 16]);
  });

  it("defines 24 board spaces split into four six-space periods", () => {
    expect(boardSpaces).toHaveLength(24);
    expect(boardSpaces.slice(0, 6).every((space) => space.period === "midnight")).toBe(true);
    expect(boardSpaces.slice(6, 12).every((space) => space.period === "morning")).toBe(true);
    expect(boardSpaces.slice(12, 18).every((space) => space.period === "afternoon")).toBe(true);
    expect(boardSpaces.slice(18, 24).every((space) => space.period === "evening")).toBe(true);
  });

  it("defines one signature card for every protagonist", () => {
    const cardIds = new Set(cards.map((card) => card.id));

    for (const protagonist of protagonists) {
      expect(cardIds.has(protagonist.signatureCardId)).toBe(true);
    }
  });

  it("defines Chad's approved protagonist personas and fixed burdens", () => {
    expect(
      protagonists.map(({ baseIndicators: _baseIndicators, ...protagonist }) => protagonist)
    ).toEqual([
      {
        id: "ali",
        name: "阿里爸爸",
        identity: "沙巴上海島上的謎樣富翁，有很多小孩，最小的小孩只有 1 歲。",
        fixedBurdens: [
          { label: "早晚接送小孩", hours: 1, period: "morning" },
          { label: "帶小孩", hours: 2, period: "evening" },
          { label: "幫老婆洗碗", hours: 0.5, period: "evening" },
          { label: "煮飯洗衣", hours: 2, period: "evening" }
        ],
        startingDeductionHours: 5.5,
        signatureCardId: "signature-ali"
      },
      {
        id: "atu",
        name: "阿吐伯",
        identity: "台灣台南的神秘地主。",
        fixedBurdens: [
          { label: "早上耕田", hours: 2, period: "morning" },
          { label: "去醫院看護理師拿藥", hours: 1, period: "afternoon" },
          { label: "看八點檔", hours: 1, period: "evening" }
        ],
        startingDeductionHours: 4,
        signatureCardId: "signature-atu"
      },
      {
        id: "sun",
        name: "孫小梅",
        identity: "台北信義區富家千金，出入都搭 taxi，很愛逛百貨公司也很會花錢。",
        fixedBurdens: [
          { label: "化妝治裝", hours: 2, period: "morning" },
          { label: "逛百貨公司", hours: 1.5, period: "afternoon" },
          { label: "約會", hours: 1.5, period: "evening" }
        ],
        startingDeductionHours: 5,
        signatureCardId: "signature-sun"
      },
      {
        id: "baby",
        name: "金被被",
        identity: "神秘天才兒童，2 歲即入幼兒園並直升大學，成為商業神話；但因為是嬰兒所以只能喝奶。",
        fixedBurdens: [
          { label: "上課", hours: 5, period: "morning" },
          { label: "公園玩溜滑梯", hours: 2, period: "evening" },
          { label: "喝奶", hours: 1, period: "evening" }
        ],
        startingDeductionHours: 8,
        signatureCardId: "signature-baby"
      }
    ]);
  });

  it("defines six basic indicators for every protagonist and team", () => {
    for (const protagonist of protagonists) {
      expect(Object.keys(protagonist.baseIndicators).sort()).toEqual([...indicatorKeys].sort());
      expect(
        indicatorKeys.every(
          (indicatorKey) =>
            Number.isInteger(protagonist.baseIndicators[indicatorKey]) &&
            protagonist.baseIndicators[indicatorKey] >= 1 &&
            protagonist.baseIndicators[indicatorKey] <= 5
        )
      ).toBe(true);
    }

    for (const team of teams) {
      const protagonist = protagonists.find((item) => item.id === team.protagonistId)!;
      expect(team.indicators).toEqual(protagonist.baseIndicators);
    }
  });

  it("gives opportunity and fate cards at least one option that grows key indicators", () => {
    const opportunityAndFateCards = cards.filter(
      (card) => card.type === "opportunity" || card.type === "fate"
    );

    expect(opportunityAndFateCards.length).toBeGreaterThan(0);

    for (const card of opportunityAndFateCards) {
      expect(
        card.options.some((option) =>
          Object.values(option.indicatorDeltas ?? {}).some((delta) => delta > 0)
        )
      ).toBe(true);
    }
  });

  it("gives every opportunity and fate option a good and bad random result", () => {
    const opportunityAndFateCards = cards.filter(
      (card) => card.type === "opportunity" || card.type === "fate"
    );

    expect(opportunityAndFateCards.length).toBeGreaterThan(0);

    for (const card of opportunityAndFateCards) {
      for (const option of card.options) {
        expect(option.outcomes?.map((outcome) => outcome.tone).sort()).toEqual(["bad", "good"]);
      }
    }
  });

  it("keeps random outcome titles free of behind-the-scenes tone labels", () => {
    const randomOutcomeTitles = cards.flatMap((card) =>
      card.options.flatMap((option) => option.outcomes?.map((outcome) => outcome.title) ?? [])
    );

    expect(randomOutcomeTitles.filter((title) => title.includes("無厘頭"))).toEqual([]);
  });

  it("lets opportunity and fate cards use either two or three choices", () => {
    const opportunityAndFateCards = cards.filter(
      (card) => card.type === "opportunity" || card.type === "fate"
    );
    const optionCounts = opportunityAndFateCards.map((card) => card.options.length);

    expect(optionCounts.every((count) => count === 2 || count === 3)).toBe(true);
    expect(optionCounts).toContain(2);
    expect(optionCounts).toContain(3);
  });

  it("keeps team starting hours aligned with Chad's approved burdens", () => {
    expect(
      teams.map(({ protagonistId, startingHours, remainingHours }) => ({
        protagonistId,
        startingHours,
        remainingHours
      }))
    ).toEqual([
      { protagonistId: "ali", startingHours: 18.5, remainingHours: 18.5 },
      { protagonistId: "atu", startingHours: 20, remainingHours: 20 },
      { protagonistId: "sun", startingHours: 19, remainingHours: 19 },
      { protagonistId: "baby", startingHours: 16, remainingHours: 16 }
    ]);
  });

  it("defines Chad's approved signature cards and options", () => {
    const signatureCardsById = Object.fromEntries(
      cards
        .filter((card) => card.id.startsWith("signature-"))
        .map(({ id, period, title, text, options }) => [
          id,
          {
            id,
            period,
            title,
            text,
            options: options.map(({ indicatorDeltas: _indicatorDeltas, outcomes: _outcomes, ...option }) => option)
          }
        ])
    );

    expect(signatureCardsById).toEqual({
      "signature-ali": {
        id: "signature-ali",
        period: "evening",
        title: "阿里爸爸：夜間洗碗與哄睡",
        text: "最小的小孩還需要照顧，碗也還沒洗，晚上的有效時間被家庭責任拉住。",
        options: [
          { id: "A", label: "自己全扛，把家裡收好", timeDeltaHours: -2, effectiveMarks: 3 },
          { id: "B", label: "跟家人協調分工", timeDeltaHours: -1, effectiveMarks: 3 },
          { id: "C", label: "先放著明天再說", timeDeltaHours: -0.5, effectiveMarks: 0 }
        ]
      },
      "signature-atu": {
        id: "signature-atu",
        period: "afternoon",
        title: "阿吐伯：田埂、拿藥與八點檔宇宙",
        text: "早上耕田、下午拿藥，晚上八點檔準時召喚淚水，人生比連續劇還會轉台。",
        options: [
          { id: "A", label: "用工具提早收工，八點檔前把藥拿好", timeDeltaHours: -2, effectiveMarks: 3 },
          { id: "B", label: "在醫院聊到片頭曲響起，回家只剩主題曲", timeDeltaHours: -3, effectiveMarks: 1 }
        ]
      },
      "signature-baby": {
        id: "signature-baby",
        period: "evening",
        title: "金被被：五小時上課與奶瓶董事會",
        text: "神童早上上課 5 小時，下午還要用奶瓶主持商業決策，人生履歷比身高長。",
        options: [
          { id: "A", label: "乖乖上課，拿蠟筆畫出年度策略", timeDeltaHours: -5, effectiveMarks: 3 },
          { id: "B", label: "在教室宣布併購溜滑梯，老師請家長來", timeDeltaHours: -6, effectiveMarks: 1 }
        ]
      },
      "signature-sun": {
        id: "signature-sun",
        period: "afternoon",
        title: "孫小梅：完美出門與百貨誘惑",
        text: "完美的治裝與妝容需要時間，附近百貨公司的誘惑也正在招手。",
        options: [
          { id: "A", label: "完整化妝治裝 2 小時", timeDeltaHours: -2, effectiveMarks: 1 },
          { id: "B", label: "快速整理，準時進入正事", timeDeltaHours: -0.5, effectiveMarks: 2 },
          { id: "C", label: "下午百貨逛好逛滿", timeDeltaHours: -1.5, effectiveMarks: 1 }
        ]
      }
    });
  });

  it("references existing cards from every board space", () => {
    const cardIds = new Set(cards.map((card) => card.id));
    const missingReferences = boardSpaces.flatMap((space) =>
      space.cardIds
        .filter((cardId) => !cardIds.has(cardId))
        .map((cardId) => ({ spaceId: space.id, cardId }))
    );

    expect(missingReferences).toEqual([]);
  });

  it("keeps referenced cards coherent with their board space period and type", () => {
    const cardsById = new Map(cards.map((card) => [card.id, card]));
    const mismatches = boardSpaces.flatMap((space) =>
      space.cardIds.flatMap((cardId) => {
        const card = cardsById.get(cardId);

        if (!card || (card.period === space.period && card.type === space.type)) {
          return [];
        }

        return [
          {
            spaceId: space.id,
            spacePeriod: space.period,
            spaceType: space.type,
            cardId,
            cardPeriod: card.period,
            cardType: card.type
          }
        ];
      })
    );

    expect(mismatches).toEqual([]);
  });

  it("references existing protagonists from every team", () => {
    const protagonistIds = new Set(protagonists.map((protagonist) => protagonist.id));

    expect(teams.filter((team) => !protagonistIds.has(team.protagonistId))).toEqual([]);
  });

  it("derives team remaining and starting hours from each protagonist", () => {
    const startingHoursByProtagonistId = new Map(
      protagonists.map((protagonist) => [
        protagonist.id,
        24 - protagonist.startingDeductionHours
      ])
    );

    for (const team of teams) {
      expect(team.remainingHours).toBe(team.startingHours);
      expect(team.startingHours).toBe(startingHoursByProtagonistId.get(team.protagonistId));
    }
  });

  it("keeps ids unique across static collections", () => {
    expectUniqueValues(teams.map((team) => team.id));
    expectUniqueValues(protagonists.map((protagonist) => protagonist.id));
    expectUniqueValues(cards.map((card) => card.id));
    expectUniqueValues(boardSpaces.map((space) => space.id));
  });

  it("defines board space ids and hour labels from 00:00 through 23:00", () => {
    const expectedIds = Array.from({ length: 24 }, (_, id) => id);
    const expectedHours = expectedIds.map((hour) => `${hour.toString().padStart(2, "0")}:00`);

    expect(boardSpaces.map((space) => space.id)).toEqual(expectedIds);
    expect(boardSpaces.map((space) => space.hour)).toEqual(expectedHours);
  });
});
