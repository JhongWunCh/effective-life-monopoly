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

function playCurrentTurn(roll: number) {
  fireEvent.click(screen.getByRole("button", { name: "擲骰" }));
  finishAnimatedRoll(roll);
  fireEvent.click(screen.getByRole("button", { name: /A/ }));
}

describe("App", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("starts on a plain-language activity introduction and can continue to character cards", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "有效人生大富翁" })).toBeInTheDocument();
    expect(screen.getByText("24 小時挑戰")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "活動介紹" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { name: "用一局大富翁，聊聊時間花在哪裡" })).toBeInTheDocument();
    expect(screen.getByText("這不是考核，也不是效率工具。")).toBeInTheDocument();
    expect(screen.getByText("沒有標準答案，也不比較誰比較有效率。")).toBeInTheDocument();
    expect(screen.getByText("選一個角色")).toBeInTheDocument();
    expect(screen.getByText("遇到生活事件")).toBeInTheDocument();
    expect(screen.getByText("做選擇，看結果")).toBeInTheDocument();
    expect(screen.getByText("還剩多少自己的時間。")).toBeInTheDocument();
    expect(screen.getByText("這次選擇值不值得花時間。")).toBeInTheDocument();
    expect(screen.getByText("如果今天只剩 2 小時，你會把它花在哪裡？")).toBeInTheDocument();
    expect(screen.getByText("人際關係")).toBeInTheDocument();
    expect(screen.queryByText("Opening")).not.toBeInTheDocument();
    expect(screen.queryByText("Card Logic")).not.toBeInTheDocument();
    expect(screen.queryByText("核心計分")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "擲骰" })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "看角色" }));

    expect(screen.getByRole("button", { name: "角色介紹" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { name: "角色介紹" })).toBeInTheDocument();
  });

  it("shows protagonist cards without unused indicator stats", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "角色介紹" }));

    expect(screen.getByRole("button", { name: "角色介紹" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { name: "角色介紹" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "擲骰" })).not.toBeInTheDocument();

    for (const protagonistName of ["阿里爸爸", "阿吐伯", "孫小梅", "金被被"]) {
      expect(screen.getByRole("article", { name: `${protagonistName} 角色卡` })).toBeInTheDocument();
    }

    const characterRegion = screen.getByRole("region", { name: "角色介紹" });

    for (const removedLabel of [
      "可支配時間",
      "身心能量",
      "深度專注",
      "身心健康",
      "人際關係",
      "有效產出"
    ]) {
      expect(within(characterRegion).queryAllByText(removedLabel)).toEqual([]);
    }
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
    expect(screen.getByText("第 1 / 3 輪")).toBeInTheDocument();
    expect(screen.getByText("本輪 0 / 4 隊")).toBeInTheDocument();
    expect(screen.getAllByText("阿里爸爸組").length).toBeGreaterThan(0);
    expect(screen.queryByText("00:00")).not.toBeInTheDocument();
    expect(screen.queryByText("24H")).not.toBeInTheDocument();
    expect(screen.getAllByText("剩餘時間").length).toBeGreaterThan(0);
    expect(screen.getAllByText("人生有效點").length).toBeGreaterThan(0);
  });

  it("presents the game board as a classic tabletop board without changing controls", () => {
    renderGameBoard();

    const board = screen.getByRole("region", { name: "有效人生大富翁棋盤" });

    expect(board).toHaveClass("board-panel-tabletop");
    expect(board.querySelector(".board-frame")).not.toBeNull();
    expect(board.querySelector(".board-center-emblem")).not.toBeNull();
    expect(board.querySelector(".board-space-card-back")).not.toBeNull();
    expect(screen.getByLabelText("桌遊主持區")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "擲骰" })).toBeInTheDocument();
    expect(screen.getAllByText("機會").length).toBeGreaterThan(0);
    expect(screen.getAllByText("命運").length).toBeGreaterThan(0);
  });

  it("lets the host set the number of rounds before starting", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "遊戲設定" }));

    expect(screen.getByRole("button", { name: "遊戲設定" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { name: "遊戲設定" })).toBeInTheDocument();
    expect(screen.getByText("四隊各完成一次選擇，算 1 輪。")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "1 輪" }));
    fireEvent.click(screen.getByRole("button", { name: "遊戲棋盤" }));

    expect(screen.getByText("第 1 / 1 輪")).toBeInTheDocument();
    expect(screen.getByText("本輪 0 / 4 隊")).toBeInTheDocument();
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
      within(screen.getByRole("article", { name: "補眠決策" })).getByText("補眠決策")
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
    const babyCard = screen.getByRole("article", { name: "金被被 角色卡" });

    expect(within(aliCard).getByText("開局扣時 5.5h")).toBeInTheDocument();
    expect(within(aliCard).getByText("起始可支配 18.5h")).toBeInTheDocument();
    expect(
      within(babyCard).getByText((_, element) => element?.textContent === "上課 -5h")
    ).toBeInTheDocument();
    expect(within(babyCard).getByText("開局扣時 8h")).toBeInTheDocument();
    expect(within(babyCard).getByText("起始可支配 16h")).toBeInTheDocument();
  });

  it("shows key indicator gains on opportunity card options", () => {
    vi.useFakeTimers();
    mockDieRoll(3);

    renderGameBoard();

    fireEvent.click(screen.getByRole("button", { name: "擲骰" }));
    finishAnimatedRoll(3);

    expect(screen.getByText("可支配時間 +1、深度專注 +1")).toBeInTheDocument();
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
    expect(within(outcomeRegion).getAllByText(/人生有效點/).length).toBeGreaterThan(0);
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

  it("finishes the game after every team completes the configured rounds", async () => {
    vi.useFakeTimers();
    mockDieRoll(2);

    Object.defineProperty(window, "scrollTo", {
      configurable: true,
      value: vi.fn()
    });

    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "遊戲設定" }));
    fireEvent.click(screen.getByRole("button", { name: "1 輪" }));
    fireEvent.click(screen.getByRole("button", { name: "遊戲棋盤" }));

    expect(screen.getByRole("button", { name: "提前結算" })).toBeInTheDocument();

    playCurrentTurn(2);
    playCurrentTurn(2);
    playCurrentTurn(2);
    playCurrentTurn(2);

    expect(screen.getByText("已完成 1 / 1 輪")).toBeInTheDocument();
    expect(screen.getByText("本輪 4 / 4 隊")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "擲骰" })).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: "完成結算" }));

    expect(screen.getByRole("heading", { name: "完賽結算" })).toBeInTheDocument();
    expect(screen.getByText("完成 1 / 1 輪，共 4 次選擇")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "回棋盤檢查" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "再玩一次" })).toBeInTheDocument();
  });

  it("shows settlement results when the host requests early results", async () => {
    const scrollTo = vi.fn();
    const confirm = vi.spyOn(window, "confirm").mockReturnValue(true);

    Object.defineProperty(window, "scrollTo", {
      configurable: true,
      value: scrollTo
    });

    renderGameBoard();

    fireEvent.click(screen.getByRole("button", { name: "提前結算" }));

    expect(confirm).toHaveBeenCalledWith("還沒完成設定輪數，要提前結算嗎？");
    expect(screen.getByRole("heading", { name: "完賽結算" })).toBeInTheDocument();
    expect(screen.getByText("時間管理獎")).toBeInTheDocument();
    expect(screen.getByText("人生有效點獎")).toBeInTheDocument();
    expect(screen.getByText("有效人生獎")).toBeInTheDocument();

    const resultsRegion = screen.getByRole("region", { name: "完賽結算" });
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

    confirm.mockRestore();
  });
});
