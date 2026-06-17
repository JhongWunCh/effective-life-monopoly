# Board Game UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the game board page into a classic physical board-game surface while preserving all current rules and flows.

**Architecture:** Keep game state and engine untouched. Add a small amount of semantic JSX structure/classes in board-facing components, then implement the visual redesign primarily in `src/styles.css`. Tests assert the new board-game shell exists and that existing controls/events still work.

**Tech Stack:** React 19, TypeScript, CSS, Vitest, Testing Library, Vite, Playwright smoke scripts.

---

## File Structure

- Modify `src/App.test.tsx`: add one RED test for classic tabletop board presentation.
- Modify `src/components/Board.tsx`: add visual wrapper classes and non-logic decorative structure.
- Modify `src/components/HostControls.tsx`: add a nested visual wrapper while preserving the existing `aria-label="主持人控制台"`.
- Modify `src/components/CardPanel.tsx`: add deck/card state classes for styling only.
- Modify `src/components/Scoreboard.tsx`: add a player-state visual class and current-team marker class for styling only.
- Modify `src/styles.css`: implement the board-game visual system.
- Create temporary Playwright smoke scripts under `C:\tmp` during execution only; do not commit them.

## Task 1: RED Test For Classic Board Presentation

**Files:**
- Modify: `src/App.test.tsx`

- [ ] **Step 1: Add the failing test**

Insert this test after `it("renders the projected game surface after switching to the game board", ...)`:

```tsx
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
```

- [ ] **Step 2: Run the RED test**

Run:

```powershell
npm test -- src/App.test.tsx -t "presents the game board as a classic tabletop board"
```

Expected result: FAIL because `.board-panel-tabletop`, `.board-frame`, `.board-center-emblem`, `.board-space-card-back`, and `桌遊主持區` do not exist yet.

## Task 2: Add Visual Structure Without Changing Game Logic

**Files:**
- Modify: `src/components/Board.tsx`
- Modify: `src/components/HostControls.tsx`
- Modify: `src/components/CardPanel.tsx`
- Modify: `src/components/Scoreboard.tsx`

- [ ] **Step 1: Update `Board.tsx` structure**

Replace the returned board shell with this structure. Preserve imports, types, labels, token mapping, and props:

```tsx
  return (
    <section className="board-panel board-panel-tabletop" aria-label="有效人生大富翁棋盤">
      <div className="board-frame">
        <div className="board-grid">
          <div className="board-center">
            <div className="board-center-bg" aria-hidden="true">
              <div className="board-center-emblem">
                <span>有效人生</span>
                <strong>選擇</strong>
              </div>
              <div className="period-legend">
                {Object.entries(periodLabels).map(([period, label]) => (
                  <span className={`legend-item period-${period}`} key={period}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="board-center-content">{centerContent}</div>
          </div>
          {spaces.map((space) => {
            const teamsOnSpace = teams.filter((team) => team.position === space.id);
            const placement = getBoardCellPlacement(space.id);
            const isRevealed = revealedSpaceIds.has(space.id);
            const spaceTitle = isRevealed ? space.title : "未揭露任務";
            const typeClass = `type-${space.type}`;
            const revealClass = isRevealed ? "is-revealed" : "board-space-card-back";

            return (
              <article
                className={`board-space period-${space.period} ${typeClass} ${revealClass}`}
                key={space.id}
                aria-label={isRevealed ? spaceTitle : `未揭露任務 ${space.id + 1}`}
                data-board-space-id={space.id}
                style={{ gridColumn: placement.column, gridRow: placement.row }}
              >
                <div className="space-meta">
                  <span className="space-index">{String(space.id + 1).padStart(2, "0")}</span>
                  <span className="space-period">{periodLabels[space.period]}</span>
                </div>
                {space.type === "opportunity" || space.type === "fate" ? (
                  <span className={`space-type type-${space.type}`}>{typeLabels[space.type]}</span>
                ) : null}
                <h3 className={`space-title${isRevealed ? "" : " is-hidden"}`}>
                  {isRevealed ? space.title : "?"}
                </h3>
                <div className="token-row" aria-label={`${spaceTitle} 隊伍位置`}>
                  {teamsOnSpace.map((team) => (
                    <span
                      className={`team-token${team.id === currentTeamId ? " is-current" : ""}${
                        team.id === movingTeamId ? " is-moving" : ""
                      }`}
                      key={team.id}
                      title={team.name}
                      aria-label={team.name}
                    >
                      {getTeamTokenLabel(team)}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
```

- [ ] **Step 2: Update `HostControls.tsx` visual wrapper**

Wrap the current content inside a visual container. Keep the outer section unchanged for existing tests:

```tsx
  return (
    <section className="host-controls" aria-label="主持人控制台">
      <div className="host-controls-board" aria-label="桌遊主持區">
        <div className="host-current">
          <span>目前隊伍</span>
          <strong>{currentTeamName}</strong>
        </div>
        <div className={`round-progress${roundProgress.isReadyToFinish ? " is-ready" : ""}`}>
          <strong>{roundLabel}</strong>
          <span>
            本輪 {roundProgress.completedTeamsThisRound} / {teamCount} 隊
          </span>
        </div>
        <div className={`die-display is-${rollStatus}`} aria-live="polite">
          <span className="die-cube" aria-hidden="true">
            {dieFace}
          </span>
          <span className="die-copy">{dieLabel}</span>
          {rollStatus === "moving" ? <span className="move-copy">走格中</span> : null}
        </div>
        <div className="control-row">
          <button className="primary-control" type="button" onClick={onRoll} disabled={!canRoll}>
            擲骰
          </button>
          <button type="button" onClick={onUndo} disabled={!canUndo}>
            復原上一動
          </button>
          <button type="button" onClick={onShowResults} disabled={!canShowResults}>
            {resultsButtonLabel}
          </button>
          <button className="danger-control" type="button" onClick={onReset} disabled={!canReset}>
            重設遊戲
          </button>
        </div>
      </div>
    </section>
  );
```

- [ ] **Step 3: Update `CardPanel.tsx` classes**

Change the empty state section class:

```tsx
      <section className="card-panel card-panel-empty card-panel-deck" aria-label="事件卡">
```

Change the active card section class:

```tsx
    <section className={`card-panel card-panel-drawn period-${card.period} type-${card.type}`} aria-label="事件卡">
```

Do not change card text, option logic, or callbacks.

- [ ] **Step 4: Update `Scoreboard.tsx` classes**

Change the team card class calculation:

```tsx
              className={`score-card player-state-card${team.id === currentTeamId ? " is-current" : ""}`}
```

Do not change displayed stats or scoring logic.

- [ ] **Step 5: Run the RED test again**

Run:

```powershell
npm test -- src/App.test.tsx -t "presents the game board as a classic tabletop board"
```

Expected result: PASS or fail only on style-class selectors if a class name was mistyped.

## Task 3: Implement Classic Board-Game Styling

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: Replace board shell styles**

Update `.board-panel`, `.board-grid`, `.board-center`, `.board-center-bg`, `.board-center-kicker`, `.board-center-bg strong`, and `.board-center-content` so the board looks like a physical game board. Use these exact design rules:

```css
.board-panel {
  min-width: 0;
  padding: 14px;
  display: grid;
  align-content: start;
}

.board-panel-tabletop {
  position: relative;
  padding: 18px;
  border: 3px solid #17202a;
  background:
    linear-gradient(135deg, rgb(255 209 102 / 16%), transparent 34%),
    linear-gradient(180deg, #ffffff, #edf3f8);
  box-shadow:
    0 18px 34px rgb(23 32 42 / 16%),
    inset 0 0 0 6px rgb(23 32 42 / 5%);
}

.board-frame {
  min-width: 0;
  padding: 12px;
  border: 3px solid #263746;
  border-radius: 8px;
  background:
    linear-gradient(45deg, rgb(255 255 255 / 58%) 25%, transparent 25% 75%, rgb(255 255 255 / 58%) 75%),
    linear-gradient(45deg, transparent 25%, rgb(255 255 255 / 36%) 25% 75%, transparent 75%),
    #e8d19f;
  background-position: 0 0, 8px 8px;
  background-size: 16px 16px;
  box-shadow: inset 0 0 0 5px rgb(23 32 42 / 8%);
}

.board-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  grid-template-rows: repeat(7, minmax(0, 1fr));
  gap: 7px;
  width: min(100%, calc(100vh - 204px));
  min-width: 620px;
  max-width: 860px;
  aspect-ratio: 1;
  justify-self: center;
}

.board-center {
  position: relative;
  display: grid;
  grid-area: 2 / 2 / 7 / 7;
  place-items: center;
  min-width: 0;
  overflow: hidden;
  padding: 22px;
  border: 4px solid #17202a;
  border-radius: 8px;
  color: #17202a;
  background:
    linear-gradient(135deg, #fff8ed, #f8fbff 55%, #e4f4e8),
    #f8fbff;
  text-align: center;
  box-shadow:
    inset 0 0 0 7px rgb(255 209 102 / 34%),
    0 8px 18px rgb(23 32 42 / 12%);
}

.board-center-bg {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  align-content: start;
  gap: 14px;
  padding: 24px 20px;
  opacity: 0.2;
  pointer-events: none;
}

.board-center-emblem {
  display: grid;
  place-items: center;
  gap: 4px;
  min-width: min(100%, 260px);
  padding: 16px;
  border: 3px double #17202a;
  border-radius: 8px;
  background: rgb(255 255 255 / 58%);
}

.board-center-emblem span {
  color: #1f6fb2;
  font-size: 24px;
  font-weight: 900;
}

.board-center-emblem strong {
  display: block;
  font-size: 86px;
  line-height: 0.9;
  letter-spacing: 0;
}

.board-center-content {
  position: relative;
  z-index: 1;
  width: min(100%, 430px);
}
```

- [ ] **Step 2: Replace board-space tile styles**

Update `.board-space`, `.board-space::before`, `.space-meta`, `.space-index`, `.space-period`, `.space-type`, `.space-title`, `.space-title.is-hidden`, `.board-space:not(.is-revealed)`, `.token-row`, and `.team-token` styles. Preserve existing period background classes and add type-specific overrides:

```css
.board-space {
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 0;
  overflow: hidden;
  padding: 8px;
  border: 2px solid #263746;
  border-radius: 8px;
  color: #17202a;
  box-shadow:
    0 4px 0 rgb(23 32 42 / 14%),
    inset 0 0 0 1px rgb(255 255 255 / 76%);
  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    filter 160ms ease;
}

.board-space::before {
  position: absolute;
  inset: 0;
  border-top: 8px solid rgb(23 32 42 / 22%);
  content: "";
  pointer-events: none;
}

.board-space.type-opportunity {
  border-color: #2f7d55;
  box-shadow: 0 4px 0 rgb(47 125 85 / 26%), inset 0 0 0 1px rgb(255 255 255 / 76%);
}

.board-space.type-fate {
  border-color: #a83232;
  box-shadow: 0 4px 0 rgb(168 50 50 / 26%), inset 0 0 0 1px rgb(255 255 255 / 76%);
}

.space-meta {
  position: relative;
  z-index: 1;
  justify-content: space-between;
  gap: 6px;
}

.space-index {
  color: rgb(23 32 42 / 62%);
  font-size: 11px;
  font-weight: 900;
}

.space-period,
.space-type,
.card-meta span,
.score-badge {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 3px 7px;
  border-radius: 6px;
  color: #17202a;
  background: rgb(255 255 255 / 78%);
  font-size: 12px;
  font-weight: 900;
  white-space: nowrap;
}

.space-type {
  position: absolute;
  top: 31px;
  right: 7px;
  min-height: 22px;
  padding: 2px 7px;
  color: #ffffff;
  font-size: 12px;
  box-shadow: 0 2px 4px rgb(23 32 42 / 18%);
}

.space-title {
  position: relative;
  z-index: 1;
  align-self: center;
  min-width: 0;
  padding-top: 8px;
  font-size: 15px;
  line-height: 1.25;
  overflow-wrap: anywhere;
}

.space-title.is-hidden {
  display: grid;
  width: 38px;
  height: 38px;
  place-self: center;
  place-items: center;
  border: 2px solid rgb(23 32 42 / 34%);
  border-radius: 8px;
  color: rgb(23 32 42 / 54%);
  background:
    linear-gradient(135deg, rgb(255 255 255 / 82%), rgb(255 209 102 / 28%)),
    rgb(255 255 255 / 58%);
  font-size: 20px;
  box-shadow: 0 3px 0 rgb(23 32 42 / 12%);
}

.board-space-card-back {
  filter: saturate(0.76);
}

.board-space.is-revealed {
  filter: saturate(1.08);
}

.token-row {
  position: absolute;
  right: 7px;
  bottom: 7px;
  left: 7px;
  z-index: 2;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 3px;
  min-height: 0;
}

.team-token {
  display: inline-grid;
  width: 28px;
  height: 28px;
  place-items: center;
  border: 2px solid #ffffff;
  border-radius: 50%;
  color: #ffffff;
  background:
    radial-gradient(circle at 35% 28%, rgb(255 255 255 / 36%), transparent 34%),
    #3f566d;
  font-size: 12px;
  font-weight: 900;
  line-height: 1;
  box-shadow: 0 3px 5px rgb(23 32 42 / 26%);
}

.team-token.is-current {
  border-color: #17202a;
  background:
    radial-gradient(circle at 35% 28%, rgb(255 255 255 / 42%), transparent 34%),
    #d63c2f;
  box-shadow:
    0 0 0 4px #ffd166,
    0 4px 7px rgb(23 32 42 / 28%);
}
```

- [ ] **Step 3: Update host/card/scoreboard styling**

Update or add styles for `.host-controls`, `.host-controls-board`, `.round-progress`, `.die-display`, `.die-cube`, `.control-row button`, `.scoreboard`, `.player-state-card`, `.card-panel-deck`, and `.card-panel-drawn`:

```css
.host-controls {
  display: block;
  padding: 0;
  border: 0;
  background: transparent;
  box-shadow: none;
}

.host-controls-board {
  display: grid;
  gap: 12px;
  padding: 14px;
  border: 3px solid #17202a;
  border-radius: 8px;
  background:
    linear-gradient(180deg, #ffffff, #fff8ed),
    #ffffff;
  box-shadow: 0 8px 16px rgb(23 32 42 / 12%);
}

.round-progress {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 2px solid #d3dde8;
  border-radius: 8px;
  background: #f8fbff;
}

.die-display {
  min-height: 96px;
  display: grid;
  grid-template-columns: 80px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 3px solid #17202a;
  border-radius: 8px;
  color: #17202a;
  background:
    linear-gradient(135deg, #ffd166, #fff2c2),
    #ffd166;
  font-weight: 900;
}

.die-cube {
  display: grid;
  width: 70px;
  height: 70px;
  place-items: center;
  border: 3px solid #17202a;
  border-radius: 10px;
  color: #17202a;
  background:
    radial-gradient(circle at 30% 24%, rgb(255 255 255 / 72%), transparent 32%),
    #ffffff;
  font-size: 38px;
  line-height: 1;
  box-shadow: 6px 6px 0 rgb(23 32 42 / 18%);
}

.scoreboard {
  background:
    linear-gradient(180deg, rgb(255 209 102 / 12%), transparent 28%),
    #ffffff;
}

.player-state-card {
  box-shadow: 0 5px 0 rgb(23 32 42 / 8%);
}

.player-state-card.is-current {
  border-color: #d63c2f;
  background:
    linear-gradient(90deg, rgb(255 209 102 / 22%), transparent 44%),
    #fff8ed;
  box-shadow: 0 0 0 3px rgb(255 209 102 / 28%);
}

.card-panel-deck {
  min-height: 230px;
  place-items: center;
  border-style: dashed;
  background:
    linear-gradient(135deg, rgb(31 111 178 / 9%), transparent 42%),
    #ffffff;
}

.card-panel-drawn {
  border-width: 3px;
  box-shadow: 0 8px 16px rgb(23 32 42 / 10%);
}
```

- [ ] **Step 4: Update responsive rules**

Keep the existing mobile horizontal board scroll. Ensure these rules exist in the current media queries:

```css
@media (max-width: 1100px) {
  .board-grid {
    width: min(100%, 760px);
  }
}

@media (max-width: 760px) {
  .board-panel-tabletop {
    padding: 10px;
  }

  .board-frame {
    padding: 8px;
  }

  .board-grid {
    grid-template-columns: repeat(7, minmax(0, 1fr));
    grid-template-rows: repeat(7, minmax(0, 1fr));
    min-width: 660px;
  }
}
```

- [ ] **Step 5: Run full tests**

Run:

```powershell
npm test
```

Expected result: all existing tests pass.

## Task 4: Build And Browser Verification

**Files:**
- No committed source files expected unless verification finds a defect.
- Temporary: `C:\tmp\smoke_effective_life_board_game_ui.py`

- [ ] **Step 1: Run production build**

Run:

```powershell
npm run build
```

Expected result: TypeScript and Vite build succeed.

- [ ] **Step 2: Create local Playwright smoke script**

Create `C:\tmp\smoke_effective_life_board_game_ui.py` with:

```python
import socket
import subprocess
import sys
import time
from pathlib import Path

from playwright.sync_api import sync_playwright


REPO = Path(r"C:\tmp\effective-life-monopoly-random-outcomes-2")
PORT = 4177
URL = f"http://127.0.0.1:{PORT}/effective-life-monopoly/"


def wait_for_port(port: int, timeout_seconds: int = 30) -> None:
    deadline = time.time() + timeout_seconds
    while time.time() < deadline:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            sock.settimeout(0.5)
            if sock.connect_ex(("127.0.0.1", port)) == 0:
                return
        time.sleep(0.25)
    raise RuntimeError(f"server did not open port {port}")


def smoke_board(page, screenshot_name: str) -> None:
    page.goto(URL)
    page.wait_for_load_state("networkidle")
    page.get_by_role("button", name="遊戲棋盤").click()
    page.get_by_role("region", name="有效人生大富翁棋盤").wait_for()
    page.get_by_label("桌遊主持區").wait_for()
    page.get_by_role("button", name="擲骰").wait_for()
    assert page.locator(".board-panel-tabletop").count() == 1
    assert page.locator(".board-frame").count() == 1
    assert page.locator(".board-center-emblem").count() == 1
    overflow = page.evaluate(
        "() => document.documentElement.scrollWidth - document.documentElement.clientWidth"
    )
    assert overflow <= 1, f"page horizontal overflow: {overflow}px"
    page.screenshot(path=str(Path(r"C:\tmp") / screenshot_name), full_page=True)


def main() -> int:
    proc = subprocess.Popen(
        ["cmd", "/c", "npx", "vite", "preview", "--host", "127.0.0.1", "--port", str(PORT)],
        cwd=REPO,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )

    try:
        wait_for_port(PORT)
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page(viewport={"width": 1440, "height": 900})
            console_errors = []
            page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
            smoke_board(page, "effective-life-board-desktop.png")

            page.set_viewport_size({"width": 390, "height": 844})
            smoke_board(page, "effective-life-board-mobile.png")

            assert not console_errors, console_errors
            browser.close()

        print("board game UI smoke passed")
        return 0
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=5)
        except subprocess.TimeoutExpired:
            proc.kill()


if __name__ == "__main__":
    sys.exit(main())
```

- [ ] **Step 3: Run local smoke**

Run:

```powershell
py C:\tmp\smoke_effective_life_board_game_ui.py
```

Expected result: `board game UI smoke passed`, screenshots written to `C:\tmp\effective-life-board-desktop.png` and `C:\tmp\effective-life-board-mobile.png`.

- [ ] **Step 4: Inspect screenshots**

Open both screenshots with the local image viewer. Expected result:

- Desktop: board looks like a physical tabletop board, center controls are readable, side scoreboards do not overlap.
- Mobile: page is vertically usable, top-level page has no extra horizontal overflow, board remains scrollable inside its panel.

## Task 5: Commit, Push, Deploy, Production Smoke

**Files:**
- Commit source changes to `main`.
- Deploy generated `dist` to `gh-pages`.
- Temporary production smoke script under `C:\tmp`; do not commit it.

- [ ] **Step 1: Check final source diff**

Run:

```powershell
git status --short --branch
git diff --check
git diff --stat
```

Expected result: only intended source/test/style files changed; no whitespace errors.

- [ ] **Step 2: Commit source changes**

Run:

```powershell
git add -- src/App.test.tsx src/components/Board.tsx src/components/HostControls.tsx src/components/CardPanel.tsx src/components/Scoreboard.tsx src/styles.css
git commit -m "Redesign game board as tabletop UI" -m "Co-Authored-By: Codex <codex@openai.com>"
```

Expected result: source commit created on `main`.

- [ ] **Step 3: Push main**

Run:

```powershell
git push origin main
```

Expected result: `main` pushed to GitHub.

- [ ] **Step 4: Deploy GitHub Pages**

Use the existing worktree deployment pattern:

```powershell
git fetch origin gh-pages
git worktree add -B gh-pages C:\tmp\effective-life-monopoly-gh-pages-deploy-board-ui origin/gh-pages
```

Inside `C:\tmp\effective-life-monopoly-gh-pages-deploy-board-ui`:

```powershell
git rm -r --ignore-unmatch assets index.html
Copy-Item -Path C:\tmp\effective-life-monopoly-random-outcomes-2\dist\* -Destination C:\tmp\effective-life-monopoly-gh-pages-deploy-board-ui -Recurse -Force
git add --all
git diff --cached --check
git commit -m "deploy: publish board game UI redesign" -m "Source-Commit: <source-sha>" -m "Co-Authored-By: Codex <codex@openai.com>"
git push origin gh-pages
```

If `git diff --cached --check` reports trailing whitespace in `index.html`, rewrite only `index.html` with LF line endings, stage it, and re-run the check.

- [ ] **Step 5: Clean deployment worktree**

Run from the source repo:

```powershell
git worktree remove C:\tmp\effective-life-monopoly-gh-pages-deploy-board-ui
```

- [ ] **Step 6: Production smoke**

Create a temporary production smoke script that opens:

```text
https://jhongwunch.github.io/effective-life-monopoly/?v=<deploy-sha>
```

Expected checks:

- Click `遊戲棋盤`.
- `.board-panel-tabletop`, `.board-frame`, `.board-center-emblem` exist.
- `桌遊主持區` exists.
- `擲骰`, `機會`, and `命運` are visible.
- No console errors.

Expected result: production smoke passes.
