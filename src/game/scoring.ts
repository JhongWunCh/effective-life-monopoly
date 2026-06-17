import type { Team } from "./types";

export type TeamScore = {
  teamId: string;
  teamName: string;
  spentHours: number;
  remainingHours: number;
  effectiveMarks: number;
  effectiveLifeScore: number;
};

export type AwardSummary = {
  timeManagement: string;
  effectiveChoice: string;
  effectiveLife: string;
};

export function calculateTeamScore(team: Team): TeamScore {
  const spentHours = Math.max(0, team.startingHours - team.remainingHours);

  return {
    teamId: team.id,
    teamName: team.name,
    spentHours,
    remainingHours: team.remainingHours,
    effectiveMarks: team.effectiveMarks,
    effectiveLifeScore: team.remainingHours + team.effectiveMarks
  };
}

export function calculateAwards(teams: Team[]): AwardSummary {
  if (teams.length === 0) {
    throw new Error("Cannot calculate awards without teams.");
  }

  const timeManagement = maxBy(teams, (team) => team.remainingHours);
  const effectiveChoice = maxBy(teams, (team) => team.effectiveMarks);
  const effectiveLife = maxBy(
    teams,
    (team) => team.remainingHours + team.effectiveMarks
  );

  return {
    timeManagement: timeManagement.name,
    effectiveChoice: effectiveChoice.name,
    effectiveLife: effectiveLife.name
  };
}

function maxBy(teams: Team[], score: (team: Team) => number): Team {
  return teams.reduce((winner, team) => (score(team) > score(winner) ? team : winner));
}
