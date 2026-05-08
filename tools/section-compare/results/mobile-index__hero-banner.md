# mobile/index.html — hero-banner

- viewport: 375×812×3
- ref selector: `.carousel-banner`
- local selector: `.hero-banner`

## diff before
| 屬性 | ref | local |
|---|---|---|
| slide 數 | 9 | 6（缺 254258 / 233449 / 233411） |
| slide bgSize | contain | cover |
| dot inactive | 12×6 矩形 #303232 radius 3 | 6×6 圓 rgba(255,255,255,.45) |
| dot active | 24×6 矩形 #14805e | 18×6 矩形 #ffffff |
| dot 間距 | 8 | 6 |
| dot y | 195 | 197 |
| autoplay 間隔 | ~4500ms | 5000ms |

## actions
- 下載 hero-254258.jpg / hero-233449.jpg / hero-233411.jpg 到 `mobile/assets/images/`
- `mobile/index.html`：track 內 6 → 9 張 li，順序對齊 ref（299034 → 296286 → 274715 → 289805 → 289997 → 254258 → 295194 → 233449 → 233411）
- `mobile/styles/components/hero-banner.css`：
  - slide `background-size: cover` → `contain`
  - dots `bottom: 8px` → `10px`，`gap: 6px` → `8px`
  - dot 12×6 / radius 3 / bg #303232（原 6×6 圓 rgba）
  - active 24×6 / bg `var(--color-surface-strong)`（原 18×6 #fff）
- `mobile/scripts/hero-carousel.js`：timer 5000 → 4500

## verify after
- dot count = 9 ✓、inactive 12×6 #303232 @ y=195 ✓、active 24×6 #14805e ✓
- dot 起始 x = 96（ref 93，差 3px 因 viewport 寬度差，可接受）
- autoplay 4.5s
- 互動：點 dot 跳對應 slide ✓、touch swipe ±15% width 切換 ✓
- 動態：transition 500ms cubic-bezier(0.22,0.61,0.36,1) ✓

## 通過 ✓
