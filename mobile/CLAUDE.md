# BAJI Casino 手持版復刻 — 工作規範

## 專案目標
以純靜態 HTML + CSS + 原生 JS 復刻 `https://baji.live/bd/en` 的手機版首頁。
AWD 流式支援 360–430px，1× 基準 375px；像素差嚴格 <2%。
涵蓋範圍：完整頁面（含 footer 向下滾動所有區塊）、動態效果、UX 流程。

## 每次開工前必讀（順序不可跳）
1. `.claude/skills/design-system/SKILL.md` — 設計系統 tokens 與規則
2. `capture/ref-home-full-{375,390,430}.png` — 參考基準截圖
3. 本檔案

## 硬性規則
- 禁止引入任何 JS 框架（React/Vue/jQuery 等）、CSS 預處理器、bundler。
- 禁止引入 npm 套件。保持 `index.html` 直接用瀏覽器開啟就能跑。
- 允許原生 JS（vanilla JS，ES6+）實作動態效果與 UX 流程；JS 以 `<script type="module">` 方式引入，檔案放 `scripts/`。
- 動態效果優先走 CSS（transition / animation / scroll-snap）；僅在 CSS 無法達成時才用 JS。
- Tokens 數值以 baji.live 實測 computed styles 為準；SKILL.md 的「規則」照用但「數值」需驗證。
- CSS 一律使用 tokens（`var(--...)`），禁止散落原始 hex / px。
- 圖片走本地 `assets/images/`，禁止熱連 baji.live CDN。
- Footer 內容（Sponsorships/Brand Ambassadors/Licenses/Responsible Gaming/About）須以 baji.live 實際可見文字為準，不得自行編造。

## 檔案分工
```
CLAUDE.md                      ← 本檔
index.html                     ← 首頁單檔
styles/
├── tokens.css                 ← 所有 design tokens（色、字、間距、radius）
├── base.css                   ← reset、@font-face、body
├── layout.css                 ← AWD 容器、grid
└── components/
    ├── header.css
    ├── hero-banner.css
    ├── marquee.css
    ├── category-tabs.css
    ├── game-grid.css
    ├── more-button.css
    ├── providers.css
    ├── events.css
    ├── featured-games.css
    ├── sponsorships.css
    ├── brand-ambassadors.css
    ├── brand-partner.css
    ├── gaming-license.css
    ├── responsible-gaming.css
    ├── about-footer.css
    ├── modal.css
    ├── back-to-top.css
    └── tab-bar.css
scripts/
├── main.js                    ← 進入點
├── hero-carousel.js           ← 自動輪播
├── marquee.js                 ← 跑馬燈
├── category-tabs.js           ← tab 切換
├── providers-scroll.js        ← providers 水平捲動
├── about-toggle.js            ← Show More 展開收合
├── scroll-reveal.js           ← 進入畫面 fade-in
├── auth-modal.js              ← Login/Sign up modal
└── back-to-top.js             ← 回頂部
assets/{fonts,images}/
capture/
├── ref-home-full-{375,390,430}.png   ← 基準
├── mine-home-full-{375,390,430}.png  ← 復刻
└── diff-*.png
```

## AWD 流式原則
- 外層容器寬度：`clamp(360px, 100vw, 430px)`
- 間距、字級以 `clamp()` 為主，避免寫死 px
- 1× 設計基準：375px；其他斷點藉流式自然縮放

## 驗證流程（每次宣稱完成前必跑）
1. 本地用 chrome-devtools MCP emulate 375 / 390 / 430（iPhone UA, DPR=3, mobile+touch）載入本地 `index.html`
2. 每個斷點抓 fullPage 截圖存 `capture/mine-home-full-{w}.png`
3. 對照 `capture/ref-home-full-{w}.png` 跑像素差異比對
4. 三個斷點皆 <2% 才算完成；任何一個不達標就回頭修

## 禁止事項
- 不要為了「看起來差不多」而放過 pixel diff。
- 不要猜測 tokens 數值——不確定就去站點用 `getComputedStyle` 實測。
- 不要為炫技引入 JS 框架；原生 JS 以最小實作達成動態即可。
- 不要動 `.claude/skills/design-system/SKILL.md`（由 typeui 管理）。

## 涵蓋範圍
- 首頁完整捲動（含 Events / Featured Games / Sponsorships / Brand Ambassadors / Official Brand Partner / Gaming License / Responsible Gaming / About / 版權 footer）
- 動態效果：Hero 輪播、Marquee 滾動、Category tabs 切換、Providers 水平滑動、Show More 展開、Scroll reveal
- UX 流程：Login/Sign up modal、底部 tab-bar 切換 active、Category 切換刷新遊戲清單、回頂部按鈕

## 不在此階段做的事
- 真實 Auth 邏輯、OAuth、會員狀態、API 串接、i18n 切換
- RWD 桌機版、平板版
- SEO、a11y 進階（只做 SKILL.md 最低要求：focus-visible、對比度）
- 效能優化、bundler、壓縮
