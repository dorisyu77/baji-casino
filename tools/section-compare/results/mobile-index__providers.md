# mobile/index.html — providers

- viewport: 375×812×3
- ref selector: `.main-page__labeled-carousel--provider` (head `.labeled-carousel__head`, items `.provider-item`)
- local selector: `.providers`

## diff before
| 屬性 | ref | local |
|---|---|---|
| 區塊總高 | 124 (head 44 + track 80) | 108 (head 44 + track 64) |
| head padding | 0 14 | 0 |
| arrow 尺寸 | 34×34 | 28×28 |
| arrow gap | 8 | 4 |
| cell 尺寸 | 167×80 | 90×60 |
| cell padding | 12 | 8 |
| cell flex | row（img 左 + 文字右）| 純圖置中 |
| img | 56×56 | 由 max 推 (沒固定) |
| 文字 label | 14px 600 #8d9aa5 | 無 |
| track gap | 7 | 8 |

## actions
- `mobile/index.html`：每個 `.providers__cell` 加 `<span class="providers__label">NAME</span>`
- `mobile/styles/components/providers.css`：
  - head 加 `padding: 0 14px`
  - nav gap 4 → 8、arrow 28 → 34
  - cell 90×60 → 167×80、padding 8 → 12、flex row + space-between
  - img 改固定 56×56
  - 新增 `.providers__label` 14px 600 #8d9aa5、`text-align: right`、`margin-left: 8`
  - track gap 8 → 7、移除 padding-bottom 4

## verify after
- 區塊 375×124 ✓（ref 371×124，4px 差為外層無 0/15 padding 計入差異，內部 slider 寬一致）
- head padding 0 14 ✓、title 起點 x=29 ✓
- arrow 34×34 ✓、gap 8 ✓
- cell 167×80 #222424 ✓、padding 12 ✓、flex row ✓
- img 56×56 ✓、label 14px 600 #8d9aa5 ✓
- cell 間距 174px (167+7) ✓
- 互動：左右 arrow 觸發 `data-scroll-prev/next` smooth scroll（既有 `providers-scroll.js`）✓、track 觸控滑動 ✓
- 動態：純 scroll，無 CSS animation

## 通過 ✓
