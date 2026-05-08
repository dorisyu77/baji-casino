# web/slots.html — back-to-top
- ref: 無（baji.live/slots 為 404）
- selector: local `.back-to-top`
- viewport: 1440x900x2

## diff before
- 重用 casino 後共用 css 與 main.js 邏輯

## actions
- 無

## verify after
- 預設 hidden（opacity 0 / pointer-events none）✓
- scroll>600 → is-visible ✓
- click → smooth scroll top ✓
- 通過 ✓
