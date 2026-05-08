# web/slots.html — load-more
- ref: 無（baji.live/slots 為 404）
- selector: local `.casino__pagination`
- viewport: 1440x900x2

## diff before
- 與 casino load-more 同元件，counter 文案沿用 "Shown 40 of 379 games"

## actions
- 完全重用 web/casino.html 結構與 css
- scripts/casino-page.js 同樣處理 click → +40 / 達 379 disable

## verify after
- btn 125x40 #303232 14px/500 radius 3 ✓
- 互動: click 增加 40 cards + counter 更新 ✓
- 通過 ✓
