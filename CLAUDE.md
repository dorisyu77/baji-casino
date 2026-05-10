# BAJI Casino 復刻專案 — Onboarding

> 此檔由 Claude Code 在新 session 自動載入。**任務開始前先讀此檔**。

## 是什麼
靜態純前端復刻 https://baji.live/bd/en,分兩個獨立 package:
- **`mobile/`** — 行動版(11 頁,375 / 390 / 430 斷點,iPhone UA)
- **`web/`** — 桌面版(4 頁,1280 / 1440 / 1920 斷點)
- **`tools/section-compare/`** — 區塊比對 SOP(可選工具,跑 `< 2%` pixel diff 對齊用)

## 開工前必讀(依任務類型)

### 任何任務都先讀
1. **`mobile/HANDOFF.md`** ← 上次製作的完整接手指南(11 頁清單、4 個全站元件、tokens 對齊、未完成項)
2. 本檔(整體地圖)

### 動 mobile/ 才讀
- **`mobile/CLAUDE.md`**(93 行,硬性規範:禁框架/bundler/npm,tokens 用 `var(--…)`,圖走本地,footer 文案以原站為準)

### 動 web/ 才讀
- **`web/CLAUDE.md`**(96 行,規範同 mobile,但 JS 用 `<script src="" defer>` 非 module — 因 file:// 開啟時 ES module 會被 CORS 擋)

### 跑區塊比對才讀
- **`tools/section-compare/SOP.md`**(六步驟 SOP;`results/` 為動態產出,git ignore,需先 `mkdir results`)

## 環境
- 工作目錄:`/Users/dorisyu/Desktop/baji/`
- 本地 server:`python3 -m http.server 8080`(背景)
  - 確認:`lsof -i :8080`,沒跑就重啟
  - URL:`http://localhost:8080/{mobile,web}/<page>.html`
- Repo:https://github.com/dorisyu77/baji-casino(public,branch `main`)

## 重要約束(摘自各 package CLAUDE.md)
- **禁熱連 baji.live CDN**,圖片走本地 `{mobile,web}/assets/images/`
- **禁框架 / bundler / npm**,純靜態 HTML + 原生 JS
- **零幻覺**:tokens 數值必須以 baji.live 實測 computed style 為準,不可猜
- **斷點**:mobile 375/390/430,web 1280/1440/1920(1× 基準分別 375、1440)
- **像素差**:嚴格 < 2%(web 在 mask icon 後可放寬到 < 5%)
- **零幻覺政策**(全域 `~/.claude/CLAUDE.md` §2):無實測依據時不寫死數值

## Sub agent 使用原則

判斷不在「任務多寡」,在「**是否需要看到 / 控制 / 即時迭代每一步**」。

### 用 subagent
- 開放式跨檔探索(`Explore`)— 跨多個目錄 grep/Glob,要結論不要 trace
- 獨立可平行的子任務(同時 backend + frontend + tests 等獨立領域)
- PR 級別深度 code review(`code-reviewer`)

### 不用 subagent
- 已知檔案的精確修改(直接 Edit)
- 需要逐步 user 看反饋的互動式工作
- 串接式依賴工作(每步依賴前步結果)
- 批量重複操作(寫 script 比 spawn N 個 agent 更省)

→ 本專案多數任務(逐區塊切版、tokens 對齊、加元件)屬「需 user 即時迭代」,
  inline 是預設;只在偵察階段、跨包搜尋等少數情境才開 subagent。

## 線上網站登入(baji.live 測試帳號)

- **帳密儲存於**:`.claude/baji-credentials.json`(本機,`.gitignore` 已排除,權限 600)
- **用途**:用 chrome-devtools MCP 開 https://baji.live → 登入 → 抓取登入態 UI
  (menu drawer 含 Withdraw / Deposit / Bet History / Account / Logout 等項目)
- **使用方式**:在 chrome-devtools MCP 內 `evaluate_script` 讀檔取值,或直接讀 JSON 檔
- **安全**:此 repo 為 PUBLIC,**不可** 把帳密 commit / push / 在 issue 留言貼出 / 寫進 git tracked 檔

## 結構速查
```
baji/
├── CLAUDE.md                 ← 本檔(onboarding)
├── .gitignore                ← 排除 capture/ / .claude/ / index.png / results/
├── mobile/
│   ├── CLAUDE.md             ← 手機版規範
│   ├── HANDOFF.md            ← 接手指南(必讀)
│   ├── 11 個 .html
│   ├── styles/components/    ← 27 個 component CSS
│   ├── scripts/              ← 17 個原生 JS
│   ├── tools/sync-footer.sh  ← footer 同步(8 頁)
│   └── tools/diff.sh         ← AE pixel diff
├── web/
│   ├── CLAUDE.md             ← 桌面版規範
│   ├── 4 個 .html
│   ├── styles/components/
│   └── scripts/
└── tools/section-compare/
    ├── SOP.md                ← 比對 SOP
    ├── sections.json         ← selector 對照
    ├── snippet.js            ← 採集 helper
    └── results/              ← 動態產出(.gitignore)
```

## 下一步建議起手(對接上次 session)
1. `lsof -i :8080` — server 還在?沒跑就 `python3 -m http.server 8080 &`
2. 讀 `mobile/HANDOFF.md` 第 75-86 行「未完成 / 等待輸入」
3. 預期未完成任務:
   - **Menu drawer 登入態內容**(等 user 提供 baji.live 測試帳號)
   - **Pixel diff < 2%**(需替換 200+ 張 game artwork 本地化,規範禁熱連)
