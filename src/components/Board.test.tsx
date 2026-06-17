import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { boardSpaces, teams } from "../game/data";
import { Board } from "./Board";

describe("Board", () => {
  it("keeps unrevealed spaces as mystery card backs without period or type labels", () => {
    render(
      <Board
        spaces={boardSpaces}
        teams={teams}
        currentTeamId="team-ali"
        revealedSpaceIds={new Set()}
      />
    );

    const board = screen.getByRole("region", { name: "有效人生大富翁棋盤" });

    expect(within(board).queryAllByText("深夜")).toHaveLength(0);
    expect(within(board).queryAllByText("早上")).toHaveLength(0);
    expect(within(board).queryAllByText("下午")).toHaveLength(0);
    expect(within(board).queryAllByText("晚上")).toHaveLength(0);
    expect(within(board).queryAllByText("機會")).toHaveLength(0);
    expect(within(board).queryAllByText("命運")).toHaveLength(0);
    expect(within(board).queryByText("訊息震動")).not.toBeInTheDocument();
  });

  it("reveals the space type and title only after a team lands there", () => {
    render(
      <Board
        spaces={boardSpaces}
        teams={teams}
        currentTeamId="team-ali"
        revealedSpaceIds={new Set([1])}
      />
    );

    const revealedSpace = screen.getByRole("article", { name: "訊息震動" });

    expect(within(revealedSpace).getByText("命運")).toBeInTheDocument();
    expect(within(revealedSpace).getByRole("heading", { name: "訊息震動" })).toBeInTheDocument();
    expect(within(revealedSpace).queryByText("深夜")).not.toBeInTheDocument();
  });
});
