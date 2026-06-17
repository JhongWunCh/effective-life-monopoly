import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App";

const ROLL_ANIMATION_MS = 900;
const MOVE_STEP_MS = 220;

function mockDieRoll(roll: number) {
  return vi.spyOn(Math, "random").mockReturnValue((roll - 1) / 6);
}

function finishAnimatedRoll(roll: number) {
  act(() => {
    vi.advanceTimersByTime(ROLL_ANIMATION_MS);
  });

  act(() => {
    vi.advanceTimersByTime(roll * MOVE_STEP_MS + 50);
  });

  expect(screen.getByRole("button", { name: /A/ })).toBeInTheDocument();
}

function renderGameBoard() {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "遊戲棋盤" }));
}

describe("App", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("starts on the activity introduction page and explains the two-score model", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "有效人生大富翁" })).toBeInTheDocument();
    expect(screen.getByText("24 小時挑戰")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "活動介紹" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { name: "活動介紹" })).toBeInTheDocument();
    expect(screen.getByText("每個人一天都是 24 小時，但起點責任不同。")).toBeInTheDocument();
    expect(screen.getByText("有效人生不是把時間塞滿，而是知道哪些時間值得花。")).toBeInTheDocument();
    expect(
      screen.getByText("遊戲不把六個面向做成六種分數，現場只看兩個核心。")
    ).toBeInTheDocument();
    expect(screen.getByText("六個面向藏在卡牌設計裡，幫助大家討論什麼叫有效。")).toBeInTheDocument();
    expect(screen.getByText("還剩多少能主動安排的時間。")).toBeInTheDocument();
    expect(screen.getByText("這次選擇值不值得花時間。")).toBeInTheDocument();
    expect(screen.getByText("人際關係")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "擲骰" })).not.toBeInTheDocument();
  });

  it("shows the character introduction page with protagonist cards and basic indicators", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "角色介紹" }));

    expect(screen.getByRole("button", { name: "角色介紹" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { name: "角色介紹" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "擲骰" })).not.toBeInTheDocument();

    for (const protagonistName of ["阿里爸爸", "阿吐伯", "孫小梅", "金被被"]) {
      expect(screen.getByRole("article", { name: `${protagonistName} 角色卡` })).toBeInTheDocument();
    }

    expect(screen.getAllByText("可支配時間").length).toBeGreaterThan(0);
    expect(screen.getAllByText("身心能量").length).toBeGreaterThan(0);
    expect(screen.getAllByText("深度專注").length).toBeGreaterThan(0);
    expect(screen.getAllByText("身心健康").length).toBeGreaterThan(0);
    expect(screen.getAllByText("人際關係").length).toBeGreaterThan(0);
    expect(screen.getAllByText("有效產出").length).toBeGreaterThan(0);
  });

  it("uses exaggerated anime character cards for the four protagonists", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "角色介紹" }));

    expect(screen.getByRole("img", { name: "阿里爸爸 動漫造型" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "阿吐伯 動漫造型" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "孫小梅 動漫造型" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "金被被 動漫造型" })).toBeInTheDocument();

    expect(screen.getByText("沙巴上海島多孩帝王")).toBeInTheDocument();
    expect(screen.getByText("台南田埂神秘地主")).toBeInTheDocument();
    expect(screen.getByText("信義區百貨女王")).toBeInTheDocument();
    expect(screen.getByText("兩歲商業神話寶寶")).toBeInTheDocument();
  });

  it("renders the projected game surface after switching to the game board", () => {
    renderGameBoard();

    expect(screen.getByRole("button", { name: "擲骰" })).toBeInTheDocument();
    expect(screen.getAllByText("阿里爸爸組").length).toBeGreaterThan(0);
    expect(screen.getByText("00:00")).toBeInTheDocument();
    expect(screen.getAllByText("剩餘時間").length).toBeGreaterThan(0);
    expect(screen.getAllByText("人生有效點").length).toBeGreaterThan(0);
  });

  it("places scoreboards on both sides and keeps host controls in the board center", () => {
    renderGameBoard();

    const leftScoreboard = screen.getByRole("complementary", { name: "左側隊伍記分板" });
    const rightScoreboard = screen.getByRole("complementary", { name: "右側隊伍記分板" });

    expect(within(leftScoreboard).getByText("阿里爸爸組")).toBeInTheDocument();
    expect(within(leftScoreboard).getByText("阿吐伯組")).toBeInTheDocument();
    expect(within(leftScoreboard).queryByText("孫小梅組")).not.toBeInTheDocument();
    expect(within(rightScoreboard).getByText("孫小梅組")).toBeInTheDocument();
    expect(within(rightScoreboard).getByText("金被被組")).toBeInTheDocument();

    expect(screen.getByRole("region", { name: "主持人控制台" }).closest(".board-center")).not.toBeNull();
  });

  it("hides task titles until a team lands on that space", () => {
    vi.useFakeTimers();
    mockDieRoll(2);

    renderGameBoard();

    expect(screen.queryByText("補眠決策")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "擲骰" }));
    finishAnimatedRoll(2);

    expect(
      within(screen.getByRole("article", { name: "02:00 補眠決策" })).getByText("補眠決策")
    ).toBeInTheDocument();
  });

  it("shows opportunity and fate labels on hidden board spaces", () => {
    renderGameBoard();

    expect(screen.getAllByText("機會").length).toBeGreaterThan(0);
    expect(screen.getAllByText("命運").length).toBeGreaterThan(0);
    expect(screen.queryByText("補眠決策")).not.toBeInTheDocument();
  });

  it("shows starting hour deductions on protagonist cards", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "角色介紹" }));

    const aliCard = screen.getByRole("article", { name: "阿里爸爸 角色卡" });

    expect(within(aliCard).getByText("開局扣時 3.5h")).toBeInTheDocument();
    expect(within(aliCard).getByText("起始可支配 20.5h")).toBeInTheDocument();
  });

  it("shows key indicator gains on opportunity card options", () => {
    vi.useFakeTimers();
    mockDieRoll(3);

    renderGameBoard();

    fireEvent.click(screen.getByRole("button", { name: "擲骰" }));
    finishAnimatedRoll(3);

    expect(screen.getByText("可支配時間 +1")).toBeInTheDocument();
    expect(screen.getByText("深度專注 +1、有效產出 +1")).toBeInTheDocument();
  });

  it("reveals a random opportunity or fate result after the host applies an option", () => {
    vi.useFakeTimers();
    mockDieRoll(3);

    renderGameBoard();

    fireEvent.click(screen.getByRole("button", { name: "擲骰" }));
    finishAnimatedRoll(3);
    fireEvent.click(screen.getByRole("button", { name: /A/ }));

    expect(screen.getByRole("heading", { name: "結果揭曉" })).toBeInTheDocument();
    const outcomeRegion = screen.getByRole("region", { name: "事件結果" });
    expect(within(outcomeRegion).getAllByText(/好結果|壞結果/).length).toBeGreaterThan(0);
    expect(within(outcomeRegion).getByText(/人生有效點/)).toBeInTheDocument();
  });

  it("advances to the next team after the host rolls and applies the first option", async () => {
    vi.useFakeTimers();
    mockDieRoll(2);

    renderGameBoard();

    fireEvent.click(screen.getByRole("button", { name: "擲骰" }));
    finishAnimatedRoll(2);
    fireEvent.click(screen.getByRole("button", { name: /A/ }));

    expect(
      within(screen.getByRole("region", { name: "主持人控制台" })).getByText("阿吐伯組")
    ).toBeInTheDocument();
  });

  it("disables rolling while a card is unresolved and enables it after applying an option", async () => {
    vi.useFakeTimers();
    mockDieRoll(2);

    renderGameBoard();

    const rollButton = screen.getByRole("button", { name: "擲骰" });

    fireEvent.click(rollButton);

    expect(rollButton).toBeDisabled();

    finishAnimatedRoll(2);

    expect(rollButton).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: /A/ }));

    expect(rollButton).toBeEnabled();
    expect(
      within(screen.getByRole("region", { name: "主持人控制台" })).getByText("阿吐伯組")
    ).toBeInTheDocument();
  });

  it("animates the die and token movement before revealing the destination card", async () => {
    vi.useFakeTimers();
    mockDieRoll(3);

    renderGameBoard();

    const rollButton = screen.getByRole("button", { name: "擲骰" });

    fireEvent.click(rollButton);

    expect(screen.getByText("擲骰中")).toBeInTheDocument();
    expect(rollButton).toBeDisabled();
    expect(screen.queryByRole("button", { name: /A/ })).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(ROLL_ANIMATION_MS);
    });

    expect(screen.getByText("骰子：3")).toBeInTheDocument();
    expect(screen.getByText("走格中")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /A/ })).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3 * MOVE_STEP_MS + 50);
    });

    expect(screen.getByRole("button", { name: /A/ })).toBeInTheDocument();
    expect(screen.queryByText("走格中")).not.toBeInTheDocument();
  });

  it("requires confirmation before resetting the game", async () => {
    vi.useFakeTimers();
    mockDieRoll(2);
    const confirm = vi.spyOn(window, "confirm");

    renderGameBoard();

    fireEvent.click(screen.getByRole("button", { name: "擲骰" }));
    finishAnimatedRoll(2);
    fireEvent.click(screen.getByRole("button", { name: /A/ }));

    expect(
      within(screen.getByRole("region", { name: "主持人控制台" })).getByText("阿吐伯組")
    ).toBeInTheDocument();

    confirm.mockReturnValueOnce(false);
    fireEvent.click(screen.getByRole("button", { name: "重設遊戲" }));

    expect(
      within(screen.getByRole("region", { name: "主持人控制台" })).getByText("阿吐伯組")
    ).toBeInTheDocument();

    confirm.mockReturnValueOnce(true);
    fireEvent.click(screen.getByRole("button", { name: "重設遊戲" }));

    expect(
      within(screen.getByRole("region", { name: "主持人控制台" })).getByText("阿里爸爸組")
    ).toBeInTheDocument();

    confirm.mockRestore();
  });

  it("shows settlement results when the host requests results", async () => {
    const scrollTo = vi.fn();

    Object.defineProperty(window, "scrollTo", {
      configurable: true,
      value: scrollTo
    });

    renderGameBoard();

    fireEvent.click(screen.getByRole("button", { name: "顯示結果" }));

    expect(screen.getByRole("heading", { name: "結算結果" })).toBeInTheDocument();
    expect(screen.getByText("時間管理獎")).toBeInTheDocument();
    expect(screen.getByText("人生有效點獎")).toBeInTheDocument();
    expect(screen.getByText("有效人生獎")).toBeInTheDocument();

    const resultsRegion = screen.getByRole("region", { name: "結算結果" });
    expect(resultsRegion.closest(".game-layout")).not.toBeNull();
    expect(
      within(screen.getByRole("article", { name: "時間管理獎" })).getByText("阿吐伯組")
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole("article", { name: "人生有效點獎" })).getByText("阿里爸爸組")
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole("article", { name: "有效人生獎" })).getByText("阿吐伯組")
    ).toBeInTheDocument();
    await waitFor(() => expect(scrollTo).toHaveBeenCalledWith({ left: 0, top: 0 }));
  });
});
