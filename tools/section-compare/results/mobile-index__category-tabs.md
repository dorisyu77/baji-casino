# mobile/index.html — category-tabs

- ref selector: `.main-nav` 內 `.main-nav-btn` 4 visible（Popular, Sports, Casino, Slots）
- local selector: `.category-tabs` 內 4 個 `.category-tab`

## 本次修正
- HTML：第 1 個 tab 文字 `Exclusive` → `Popular`（CLAUDE.md 規定文字以 ref 實際為準）

## 已完成（前次）
- sprite step animation：`background-size: 750px 50px`、`transition: 0.5s steps(14)`、active `-700px 0`
- active 整塊綠卡 `--color-surface-strong`、inactive 透明背景

## 規格驗證
| 屬性 | ref | local |
|---|---|---|
| tab 80×80 | ✓ | ✓ |
| tab 間隔 | 8px | 8px ✓ |
| 第一 tab x | 16 | 16 ✓ |
| icon sprite 動畫 | 0.5s steps(14) | ✓ |
| active 樣式 | 整塊綠 #14805e | ✓ |

## 待議
- ref 共 9 個 tab（Crash/Table/Fishing/Arcade/Lottery 在 mobile 超出 viewport，使用者不見）；本地只 4 個。CLAUDE.md 涵蓋範圍寫「Category 切換刷新遊戲清單」，未指定 9 個。先保留 4 個。

## 通過 ✓
