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

    expect(teams.map((team) => team.startingHours)).toEqual([20.5, 21, 20.5, 21]);
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
          { label: "幫老婆洗碗", hours: 0.5, period: "evening" }
        ],
        startingDeductionHours: 3.5,
        signatureCardId: "signature-ali"
      },
      {
        id: "atu",
        name: "阿吐伯",
        identity: "台灣台南的神秘地主。",
        fixedBurdens: [
          { label: "早上耕田", hours: 2, period: "morning" },
          { label: "去醫院看護理師拿藥", hours: 1, period: "afternoon" }
        ],
        startingDeductionHours: 3,
        signatureCardId: "signature-atu"
      },
      {
        id: "sun",
        name: "孫小梅",
        identity: "台北信義區富家千金，出入都搭 taxi，很愛逛百貨公司也很會花錢。",
        fixedBurdens: [
          { label: "化妝治裝", hours: 2, period: "morning" },
          { label: "逛百貨公司", hours: 1.5, period: "afternoon" }
        ],
        startingDeductionHours: 3.5,
        signatureCardId: "signature-sun"
      },
      {
        id: "baby",
        name: "金被被",
        identity: "神秘天才兒童，2 歲即入幼兒園並直升大學，成為商業神話；但因為是嬰兒所以只能喝奶。",
        fixedBurdens: [
          { label: "公園玩溜滑梯", hours: 2, period: "evening" },
          { label: "喝奶", hours: 1, period: "evening" }
        ],
        startingDeductionHours: 3,
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

  it("keeps team starting hours aligned with Chad's approved burdens", () => {
    expect(
      teams.map(({ protagonistId, startingHours, remainingHours }) => ({
        protagonistId,
        startingHours,
        remainingHours
      }))
    ).toEqual([
      { protagonistId: "ali", startingHours: 20.5, remainingHours: 20.5 },
      { protagonistId: "atu", startingHours: 21, remainingHours: 21 },
      { protagonistId: "sun", startingHours: 20.5, remainingHours: 20.5 },
      { protagonistId: "baby", startingHours: 21, remainingHours: 21 }
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
            options: options.map(({ indicatorDeltas: _indicatorDeltas, ...option }) => option)
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
        title: "阿吐伯：清晨耕田與午後拿藥",
        text: "早上耕田耗掉體力，午後去醫院拿藥又比預期更久。",
        options: [
          { id: "A", label: "照常耕滿 2 小時", timeDeltaHours: -2, effectiveMarks: 2 },
          { id: "B", label: "用工具與排程提早收工", timeDeltaHours: -1, effectiveMarks: 2 },
          { id: "C", label: "去醫院順便閒聊太久", timeDeltaHours: -2, effectiveMarks: 1 }
        ]
      },
      "signature-baby": {
        id: "signature-baby",
        period: "evening",
        title: "金被被：天才兒童的奶與滑梯",
        text: "商業神話仍然需要喝奶，也需要把公園溜滑梯玩夠才肯收心。",
        options: [
          { id: "A", label: "滑梯玩滿 2 小時", timeDeltaHours: -2, effectiveMarks: 2 },
          { id: "B", label: "喝奶後整理明天任務", timeDeltaHours: -1, effectiveMarks: 2 },
          { id: "C", label: "硬撐商業神話不休息", timeDeltaHours: -0.5, effectiveMarks: 1 }
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
