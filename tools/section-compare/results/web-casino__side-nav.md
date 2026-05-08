# web/casino.html — side-nav
- ref: https://baji.live/bd/en/casino
- selector: ref `.layout-fullview__side-nav`, local `.layout__side-nav`
- viewport: 1440x900x2

## diff before
- ref baji 桌面 casino 頁 side-nav 包含遊戲類別 9 個 + sub-menu 區塊（VIP Club / Referral program / Affiliate / Brand Ambassadors / APP Download / New Member Guide / BJ Forum）
- 本地僅遊戲類別 9 個（與 web/index.html 同），active 切到 casino
- ref item 高度 52px，width 64px（已讀 ref computed style）
- side-nav 整體 width 64, x=0, y=65 起，height=calc(100vh-65px) ✓

## actions
- web/casino.html line 67-77: side-nav__list 共 9 個 item，casino 標 `side-nav__item--active`
- 不新增 css（重用 styles/components/side-nav.css）
- sub-menu 區塊不在此階段做（依 plan 範圍與決策）

## verify after
- rect: local `(0,65,64,835)` ↔ ref outer `(0,65,65,835)` ✓
- item rect: local 64x52 ↔ ref 64x52 ✓
- bg: local `rgb(20,21,21)` (token --color-surface-raised) ↔ ref outer 透明背景上 layout #141515 ✓
- 互動: 點 item 切 active，scripts/main.js:60-67 已實作 ✓
- 動態: 無動畫
- 通過 ✓ （sub-menu 區塊不在此階段範圍）
