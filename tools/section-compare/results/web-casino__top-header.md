# web/casino.html — top-header
- ref: https://baji.live/bd/en/casino
- selector: ref `.layout-fullview__header`, local `.layout__top-header`
- viewport: 1440x900x2 (desktop UA)

## diff before
- 共用 `web/index.html` 已驗證的 header 元件，casino 頁僅多加 quick-link Casino 的 `header__nav-btn--active` 樣式

## actions
- web/casino.html line 35-44: nav 內 Casino 連結加 `header__nav-btn--active` class
- 不新增 css（重用 styles/components/header.css）

## verify after
- rect: local `(0,0,1440,65)` ↔ ref `(0,0,1440,65)` ✓
- bg: local `rgb(20,21,21)` ↔ ref `#141515` ✓ (已讀 ref computed style 2025-04-30)
- height: local `65px` ↔ ref outer `65px`（inner head 63px）✓
- border-bottom: local `1px solid rgb(30,31,31)` 對齊 token `--color-border` ✓
- 互動: hamburger / logo / quick-links / Login / Sign up / 國旗（與 home 同）✓
- 動態: 無動畫
- 通過 ✓
