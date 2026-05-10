# 區塊比對 SOP（單區塊六步驟）

> 對齊 baji.live UI/UX/動態 100% 的標準作業流程。
> 工具：`sections.json`（selector 對照）、`snippet.js`（採集 helper）

> **Note**: `results/` 是動態產出,本 repo 不版控。第一次跑 SOP 前需 `mkdir results`。
> 上一輪比對紀錄(2026-04-29 ~ 04-30)已封存於 git commit `bbb0154`,需要時可 `git show bbb0154 -- tools/section-compare/results/` 取出。

## 前置
- 本地 server 在 `http://localhost:8000` 跑著
- 瀏覽器 / chrome-devtools MCP 已連線

## 六步驟（每塊跑一次）

### 1. 抓 ref 基準
- 切到 baji.live 對應頁面（`refUrl`）
- emulate 對應 viewport（從 sections.json 取）
- 用 chrome-devtools `evaluate_script` 注入 `snippet.js`，呼叫 `__captureSection('<ref-selector>')`
  - 若 ref selector 未填，先用 `document.querySelectorAll` + textContent 啟發式定位（找含特定關鍵字的最小元素），定位後把 selector 寫回 `sections.json` 的 `ref` 欄位
- 用 `take_screenshot` 抓區塊截圖（先 take_snapshot 取 uid 再帶 uid 截圖，或截整頁後手動裁切到 rect 範圍）
- 紀錄：rect、styles、structure、screenshot path

### 2. 抓本地對應
- 切到 `localUrl`
- 同 viewport / UA
- 同樣呼叫 `__captureSection('<local-selector>')`
- 抓截圖

### 3. diff
- 並排截圖（左 ref，右本地）
- 列出 styles 差異（重點：backgroundColor、fontSize/Weight、padding、gap、borderRadius、boxShadow、background、transition、animation）
- 列出 rect 差異（width/height）
- 列出 structure 差異（子元素數量、tag、text）

### 4. 修
- 改順序：CSS（tokens → component css）→ HTML（必要時）→ JS（互動／動態必要時）
- tokens 數值必須以 ref 實測值為準（CLAUDE.md 規定，不可猜）
- 一次只改一個區塊，避免影響其他區塊回歸

### 5. 互動驗證
列舉該區塊所有互動，逐一觸發比對：
- click（active 切換、modal 開合、navigation）
- hover（顏色、陰影、scale）
- focus（鍵盤導覽、a11y）
- scroll / wheel / swipe
- long-press / touchstart

每個互動的「觸發點 → 視覺反饋 → 結果」都要與 ref 一致。

### 6. 動態軌跡採樣
動畫類區塊（hero/category-tabs/marquee/carousel/modal）：
- 用 `__sampleAnim(selector, prop, duration, samples)` 在動畫中採樣 8 點
- 對 ref 站做相同採樣
- 比對 timing function、duration、起終值

通過標準：採樣值序列誤差 < 10%（位置 ±5px、opacity ±0.1）。

## 通過標準（單塊驗收）
- [ ] pixel diff < 2%（mobile）/ < 2%（web，mask icon 後 < 5%）
- [ ] computed style 關鍵屬性（顏色、字級、間距）與 ref 一致
- [ ] 互動行為清單全部對齊
- [ ] 動態軌跡採樣誤差 < 10%

## 紀錄格式
每塊完成後，把比對結果寫到 `tools/section-compare/results/<page>__<section>.md`：

```md
# mobile/index.html — header
- ref: https://baji.live/bd/en
- selector: ref `.main-header`, local `.header`
- viewport: 375x812x3

## diff before
- backgroundColor: ref #131617 / local #1a1d20 → 改本地
- height: ref 56 / local 60 → 改本地

## actions
- styles/components/header.css line 12: background → var(--color-surface-deep)
- tokens.css line 8: --color-surface-deep #131617

## verify after
- pixel diff: 1.4%
- 互動: logo 點擊 → 跳首頁（一致）
- 動態: 無動畫
- 通過 ✓
```
