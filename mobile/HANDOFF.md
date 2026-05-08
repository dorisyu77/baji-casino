# BAJI Mobile 復刻 — Handoff(給下一個對話)

## 專案位置與規範
- 工作目錄:`/Users/dorisyu/Desktop/baji/mobile/`
- **規範**(`mobile/CLAUDE.md`):純靜態 HTML + 原生 JS,無框架/bundler/npm/SSR;tokens 用 `var(--xxx)`;圖片走本地 `assets/images/`,**禁熱連 baji.live CDN**
- 三斷點:**375 / 390 / 430**(iPhone UA, DPR=3)
- 本地 server 已開啟 `python3 -m http.server 8080`(背景),URL `http://localhost:8080/mobile/<page>.html`
- LAN 訪問:`http://192.168.50.2:8080/mobile/<page>.html`(Mac firewall 可能擋,用瀏覽器自連 OK)

## 11 個頁面(全部結構完整、可點過、有資料、0 console error)

| 頁 | 用途 | 重點 |
|---|---|---|
| `index.html` | 首頁 | hero carousel(9)/marquee/4 category tabs/24 game-card/providers(10)/events(5)/featured(7)/完整 footer/auth-modal |
| `login.html` | 登入/註冊 | 雙 form/ currency+country dropdown / refer collapsible / FAB / Terms→terms.html。**不放 footer**(對齊原站 SPA) |
| `slots.html` | Slots 列表 | toolbar(Slots icon)/40 slot-card/providers(10)/events/featured/footer。tab-bar Slots is-active |
| `casino.html` | Casino 列表 | toolbar(Casino icon)/40 卡(Live 賭桌名)/Casino vendors(Evo 起)/Featured Live Casino |
| `terms.html` | T&C / RG | 5 段 h2 含 anchor `#regulations / #gamcare / #age-limit`。RG icon 從各頁 footer 連此 |
| `sports.html` ★ | Sports | 40 卡 / 11 sportsbooks vendor / 158 total |
| `crash.html` ★ | Crash | 40 卡 / 168 total |
| `table.html` ★ | Table | 40 卡 / 245 total |
| `fishing.html` ★ | Fishing | 40 卡 / 112 total |
| `arcade.html` ★ | Arcade | 40 卡 / 326 total |
| `lottery.html` ★ | Lottery | 40 卡 / 56 total |

★ 由 `/tmp/gen-category-pages.py` 從 slots.html 模板生成。

## 已實作的全站元件(JS 動態注入,4 + 6 = 10 頁共用)

| 元件 | CSS | JS | 觸發 |
|---|---|---|---|
| Menu drawer | `menu-drawer.css` | `menu-drawer.js` | tab-bar Menu 鍵 |
| Promotions panel | `promotions-panel.css` | `promotions-panel.js` | tab-bar Promotions / drawer Promotions / about 內 promotions |
| Toolbar popover | `toolbar-popover.css` | `game-toolbar.js` | slots/casino + 6 新頁的 toolbar 4 個 action |
| About links | — | `about-links.js` | about 內 inline `data-about-noop` / `data-about-action` |

### Menu drawer 重點(2025-05 重做兩次)
- **全螢幕 overlay**(原本左側 82vw slide 已重寫 — 對齊 user「全螢幕」描述)
- DOM:`header(logo+close)` + `body(CTA + Categories + More)`
- **9 大分類**:Popular = 純 link → index.html;**其他 8 個 = accordion**(Sports/Casino/Slots/Crash/Table/Fishing/Arcade/Lottery)
- 每個 accordion 展開後顯示對應 vendor list(All + 8–12 vendors,從 baji.live home a11y 抓真實名)
- 點 vendor 跳對應 `{cat}.html`(本地不做 vendor 過濾)
- 多選並存(可同時展開多個)
- chevron rotate 45° → -135°,max-height transition 280ms

## Footer 同步機制
- `index.html` 行 211-385 是 7 區塊 footer,以 `<!-- @sync-footer-start -->` 與 `<!-- @sync-footer-end -->` 框起
- 同步腳本:`bash tools/sync-footer.sh`(寫入)/ `bash tools/sync-footer.sh --check`(CI 檢查)
- TARGETS:slots/casino/sports/crash/table/fishing/arcade/lottery(8 頁,login 不在內)

## 連結映射(全部對齊 baji.live 真實 href,記錄於 `capture/_links.md`)
- About 15 個 inline:Baji→index.html / 5 外連 / real casino→casino.html / slots→slots.html / promotions→打開 panel / 其他 6 個 # noop
- RG 3 icon:都連 `terms.html#anchor`(對齊原站連 /bd/en/terms)
- Copyright Baji.com (×3) → index.html
- legal@northernlightsltd.com → mailto

## Design tokens(對齊 baji.live,記錄於 `capture/_tokens-audit.md`)
**16 個關鍵 token 已 99% 對齊** baji.live 行動版實測值:
- bg #111111 / text-primary #e2e6e9 / muted #8d9aa5 / secondary #657381
- accent green #14805e / link green #27b488 / surface-card #222424
- card radius 3px / btn h 34px / toolbar 60px / slot-card 108×143
- font Noto Sans Digits + Poppins
- slot-grid:`display:grid; grid-template-columns: repeat(3, 1fr); gap:8px; padding:0 16px 16px`
- game-grid panel 已從 flex 改 grid(修右側空白 bug,@430 原本餘 58px)

## 像素差現況(`mobile/tools/diff.sh`)
- ref 已重抓 12 張 fullPage(home/slots/casino/login × 3 斷點),用「解除 baji.live body overflow:hidden + scroll lazy-load」技巧抓出
- mine 與 ref diff% 仍 ~84-86%(尺寸對齊但視覺風格差)
- **diff 高的真因不是 tokens**,而是:
  - slot-card 圖片(本地 8 張循環 vs baji.live 40 張各遊戲 artwork)
  - header sponsor 走馬燈時序
  - events / featured 的圖內容
- 要 < 2% 需替換 200+ 張 game artwork(規範禁熱連,需本地化)

## 未完成 / 等待輸入

### 1. Menu drawer 登入態內容(等 user 帳號)
User 之前說「baji.live menu drawer 登入後才看得到的部分,我再創帳號給你」。Angular CDK overlay 的內容需要登入後才完整 render。
- 等 user 提供帳號後:在 chrome-devtools MCP 登入 baji.live → 真 click bottom-bar Menu → take_snapshot 抓真實 drawer DOM
- 預期含:餘額、頭像、Withdraw / Deposit / Bet History / Transactions / Account 設定 / Logout 等(本地用 placeholder)

### 2. 像素 < 2% 對齊(若繼續做)
1. 替換 slot-card 圖片為各遊戲真實 artwork(本地化,~80 張)
2. event / featured 圖補齊
3. 量 baji.live 字型 sub-pixel rendering 細節

## 關鍵檔案速查

```
mobile/
├── CLAUDE.md                         ← 規範(必讀)
├── HANDOFF.md                        ← 本檔
├── index.html / login.html / slots.html / casino.html / terms.html
├── sports.html / crash.html / table.html / fishing.html / arcade.html / lottery.html
├── styles/
│   ├── tokens.css                    ← 對齊 baji.live tokens
│   ├── components/
│   │   ├── menu-drawer.css           ← 全螢幕 overlay + accordion
│   │   ├── promotions-panel.css      ← bottom sheet
│   │   ├── toolbar-popover.css       ← Category/Search/Filter/Sort
│   │   └── … 18 個既有 component
├── scripts/
│   ├── main.js                       ← init 調度器
│   ├── menu-drawer.js                ← accordion + vendor data
│   ├── promotions-panel.js           ← bottom sheet 5 cards
│   ├── game-toolbar.js               ← 4 popover modes
│   ├── about-links.js                ← noop + promotions trigger
│   └── … 既有 hero/marquee/auth/scroll-reveal 等
├── tools/
│   ├── sync-footer.sh                ← footer 同步(8 頁)
│   └── diff.sh                       ← AE pixel diff
├── assets/images/                    ← 90+ 本地圖
└── capture/
    ├── ref-home-full-{375,390,430}.png      ← baji.live 真實 ref
    ├── ref-slots/casino/login-full-*.png    ← 同上
    ├── ref-menu-drawer-*.png                ← (空,Angular CDK 抓不到)
    ├── mine-*-full-*.png                    ← 本地版
    ├── _diff/*.png                          ← diff 視覺化
    ├── _links.md                            ← 連結映射表
    └── _tokens-audit.md                     ← tokens 對齊報告
```

## 下個 session 起手建議

1. 載入規範:讀 `mobile/CLAUDE.md` 與本 `HANDOFF.md`
2. 確認 server 是否還在跑:`lsof -i :8080`,沒跑就 `python3 -m http.server 8080 &`
3. 全站快速驗證:用 chrome-devtools MCP iPhone UA 375 載 5 頁 + 6 新頁,確認 0 console error
4. 收 user 的帳號後,實作 menu drawer 登入態
