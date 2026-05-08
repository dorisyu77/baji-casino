# BAJI Casino 桌面版復刻 — 工作規範

## 專案目標
以純靜態 HTML + CSS + 原生 JS 復刻 `https://baji.live/bd/en` 的桌面版首頁。
桌面流式支援 1280–1920px，1× 基準 1440px；像素差嚴格 < 2%（mask icon 後 < 5%）。

## AWD 切換規則
- 原站基於 user-agent 切版：iPhone UA → mobile（`html.is-mobile`），其他 → desktop（`html.is-desktop`）
- web 包驗證：用 desktop UA + viewport 1280 / 1440 / 1920
- 與 mobile 包獨立，不做 redirect 切版

## 每次開工前必讀（順序不可跳）
1. `.claude/skills/design-system/SKILL.md` — 設計系統 tokens 與規則（typeui 託管，不可改）
2. `capture/<page>/ref-<page>-{1280,1440,1920}.png` — 對應頁的參考基準截圖
3. 本檔案

## 硬性規則
- 禁止引入任何 JS 框架（React/Vue/jQuery 等）、CSS 預處理器、bundler。
- 禁止引入 npm 套件。保持 `index.html` 直接用瀏覽器開啟就能跑。
- 允許原生 JS（vanilla JS，ES6+）。JS 用普通 `<script src="..." defer>`（**非 module**）— file:// 開啟時 ES module 會被 CORS 擋。
- 動態效果優先走 CSS（transition / animation / scroll-snap）；僅在 CSS 無法達成時才用 JS。
- Tokens 數值以 baji.live desktop 實測 computed styles 為準；SKILL.md 的「規則」照用但「數值」需驗證。
- CSS 一律使用 tokens（`var(--...)`），禁止散落原始 hex / px。
- 圖片走本地 `assets/images/`，禁止熱連 baji.live CDN。
- Footer 內容（Sponsorships/Brand Ambassadors/Licenses/Responsible Gaming/About）須以 baji.live 實際可見文字為準，不得自行編造。

## 檔案分工
```
CLAUDE.md                      ← 本檔
index.html                     ← 首頁
login.html                     ← Login + Sign up 雙 form 共 1 頁
slots.html                     ← Slots 列表
casino.html                    ← Casino 列表
styles/
├── tokens.css                 ← 所有 design tokens（色、字、間距、radius）
├── base.css                   ← reset、@font-face、body
├── layout.css                 ← 桌面容器、grid、side-nav、top-header
└── components/                ← 各區塊 css
scripts/
├── main.js                    ← 進入點
└── ...                        ← 各模組
assets/{fonts,images}/
capture/{home,login,slots,casino}/
├── ref-<page>-{1280,1440,1920}.png   ← 基準
├── mine-<page>-{1280,1440,1920}.png  ← 復刻
└── _diff/...
```

## 桌面斷點與容器
- 三斷點：1280 / 1440 / 1920（1× 基準 1440）
- side-nav 寬 65px（從 y=65 開始）
- top-header 高 65px
- main content 在 side-nav 之右、top-header 之下
- 內容容器流式（依 baji.live 實測：cell 寬隨 viewport 變化，類似 mobile 流式但桌面範圍更大）

## 結構要點（從原站實測）
1. **Top header (h=65px)**：
   - 左：hamburger menu / baji logo / KINGS sponsor / 上方主導航 (Slots / Casino quick links)
   - 右：Log in / Sign up / BD flag
2. **Side nav (w=65px, y=65 起)**：
   - 14 個垂直 icon (Exclusive / Sports / Casino / Slots / Crash / Table / Fishing / Arcade / Lottery / Brand / Promotions / Account / Affiliate / Ribbon / Network / Home)
3. **首頁主內容**：
   - Hero banner（含輪播）
   - Marquee（跑馬燈）
   - Category tabs (9 個全顯示，桌面寬度足夠)
   - Game grid (8 cards 一行)
   - More button (居中)
   - Providers / Events / Featured
   - Footer (Sponsorships / Ambassadors / Brand Partner / License / RG / About / Copyright)
   - 右下浮動 baji 客服 icon
4. **沒有 bottom tab bar**（桌面用 side nav 替代）

## 驗證流程（每次宣稱完成前必跑）
1. 本地用 chrome-devtools MCP emulate 1280 / 1440 / 1920（desktop UA, DPR=2）載入本地 `<page>.html`
2. 每個斷點抓 viewport 截圖存 `capture/<page>/mine-<page>-{w}.png`
3. 對照 `capture/<page>/ref-<page>-{w}.png` 跑像素差異比對（用 `web/tools/diff.sh`，仿 mobile 工具）
4. 三個斷點皆 < 2% 才算完成；mask icon 後 < 5% 也算「布局對齊」階段達標

## 禁止事項
- 不要為了「看起來差不多」而放過 pixel diff。
- 不要猜測 tokens 數值——不確定就去站點用 `getComputedStyle` 實測。
- 不要為炫技引入 JS 框架；原生 JS 以最小實作達成動態即可。
- 不要動 `.claude/skills/design-system/SKILL.md`（由 typeui 管理）。
- 不要與 mobile 包共用 token 數值（design-system 兩支 SKILL 數值不同；桌面 base font 與間距會更大）。

## 涵蓋範圍
- 4 頁：首頁 / Login+Register / Slots / Casino
- 動態效果：Hero 輪播、Marquee 滾動、Category tabs 切換、Providers 水平捲動、Show More 展開、Scroll reveal
- UX 流程：Login/Sign up 切換、side nav active 切換

## 不在此階段做的事
- 真實 Auth 邏輯、OAuth、會員狀態、API 串接、i18n 切換
- mobile 版（在 mobile/ 包獨立做，不重複）
- 平板版（768~1023 範圍）
- SEO、a11y 進階（只做 SKILL.md 最低要求：focus-visible、對比度）
- 效能優化、bundler、壓縮
