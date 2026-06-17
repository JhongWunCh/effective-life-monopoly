import { describe, expect, it } from "vitest";
import { calculateAwards, calculateTeamScore, getEffectiveLifeWinners } from "./scoring";
import type { Team } from "./types";

const makeTeam = (
  overrides: Partial<Team> & Pick<Team, "id" | "name" | "startingHours" | "remainingHours" | "effectiveMarks">
): Team => ({
  protagonistId: `${overrides.id}-protagonist`,
  position: 0,
  indicators: {
    time: 1,
    energy: 1,
    focus: 1,
    health: 1,
    relationship: 1,
    achievement: 1
  },
  ...overrides
});

describe("scoring", () => {
  it("calculates a team score from hours spent and effective marks", () => {
    const team = makeTeam({
      id: "team-a",
      name: "Team A",
      startingHours: 21,
      remainingHours: 14.5,
      effectiveMarks: 8
    });

    expect(calculateTeamScore(team)).toEqual({
      teamId: "team-a",
      teamName: "Team A",
      spentHours: 6.5,
      remainingHours: 14.5,
      effectiveMarks: 8,
      effectiveLifeScore: 22.5
    });
  });

  it("does not report negative spent hours when a result restores time", () => {
    const team = makeTeam({
      id: "recovered",
      name: "Recovered Team",
      startingHours: 20,
      remainingHours: 21,
      effectiveMarks: 3
    });

    expect(calculateTeamScore(team)).toMatchObject({
      spentHours: 0,
      remainingHours: 21,
      effectiveLifeScore: 24
    });
  });

  it("selects award winners by remaining hours, effective marks, and effective life score", () => {
    const teams = [
      makeTeam({
        id: "time",
        name: "Time Team",
        startingHours: 20,
        remainingHours: 17,
        effectiveMarks: 2
      }),
      makeTeam({
        id: "choice",
        name: "Choice Team",
        startingHours: 20,
        remainingHours: 8,
        effectiveMarks: 12
      }),
      makeTeam({
        id: "life",
        name: "Life Team",
        startingHours: 20,
        remainingHours: 14,
        effectiveMarks: 7
      })
    ];

    expect(calculateAwards(teams)).toEqual({
      timeManagement: "Time Team",
      effectiveChoice: "Choice Team",
      effectiveLife: "Life Team"
    });
  });

  it("keeps the first team in input order when award scores tie", () => {
    const teams = [
      makeTeam({
        id: "first",
        name: "First Team",
        startingHours: 20,
        remainingHours: 10,
        effectiveMarks: 5
      }),
      makeTeam({
        id: "second",
        name: "Second Team",
        startingHours: 20,
        remainingHours: 10,
        effectiveMarks: 5
      })
    ];

    expect(calculateAwards(teams)).toEqual({
      timeManagement: "First Team",
      effectiveChoice: "First Team",
      effectiveLife: "First Team"
    });
  });

  it("reports every tied effective life winner instead of choosing by input order", () => {
    const teams = [
      makeTeam({
        id: "ali",
        name: "阿里爸爸組",
        startingHours: 18.5,
        remainingHours: 15.5,
        effectiveMarks: 5
      }),
      makeTeam({
        id: "sun",
        name: "孫小梅組",
        startingHours: 19,
        remainingHours: 17.5,
        effectiveMarks: 3
      }),
      makeTeam({
        id: "baby",
        name: "金被被組",
        startingHours: 16,
        remainingHours: 13,
        effectiveMarks: 5
      })
    ];

    expect(getEffectiveLifeWinners(teams)).toEqual([
      {
        teamId: "ali",
        teamName: "阿里爸爸組",
        spentHours: 3,
        remainingHours: 15.5,
        effectiveMarks: 5,
        effectiveLifeScore: 20.5
      },
      {
        teamId: "sun",
        teamName: "孫小梅組",
        spentHours: 1.5,
        remainingHours: 17.5,
        effectiveMarks: 3,
        effectiveLifeScore: 20.5
      }
    ]);
  });

  it("throws a clear error when calculating awards for no teams", () => {
    expect(() => calculateAwards([])).toThrow("Cannot calculate awards without teams.");
  });

  it("does not mutate teams while calculating awards", () => {
    const teams = [
      makeTeam({
        id: "stable",
        name: "Stable Team",
        startingHours: 20,
        remainingHours: 9,
        effectiveMarks: 4
      })
    ];
    const before = structuredClone(teams);

    calculateAwards(teams);

    expect(teams).toEqual(before);
  });
});
