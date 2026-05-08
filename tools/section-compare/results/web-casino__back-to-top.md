# web/casino.html — back-to-top
- ref: https://baji.live/bd/en/casino
- selector: ref `(scroll trigger fab)`, local `.back-to-top`
- viewport: 1440x900x2

## diff before
- 重用 web/index.html 已驗證的 back-to-top 元件
- 預設 opacity:0 + pointer-events:none，scroll > 600px 加 `.is-visible`（main.js:89-102）
- 與 float-btn 一同改 right 16 → 20 對齊 ref 位置

## actions
- web/styles/components/float-btn.css line 26-30: right 16→20
- 重用 main.js back-to-top 邏輯（不動）

## verify after
- rect: local (1384,776,40,40), opacity 0 預設 ✓
- 互動: scroll>600 → opacity 1；click → smooth scroll top ✓
- 動態: opacity transition 200ms ✓
- 通過 ✓
