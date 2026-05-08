# mobile/index.html — featured (Exclusive Games)

- viewport: 375×812×3
- ref selector: `.main-page__labeled-carousel--feature-games`
- local selector: `.featured`

## diff before
| 屬性 | ref | local |
|---|---|---|
| 標題文字 | "Exclusive Games" | "Featured Games" |
| 區塊高 | 188 | 192 |
| head padding | 0 14 | 0 |
| arrow | 34×34 gap 8 | 28×28 gap 4 |
| cell | 108×144 radius 3 | 108×144 radius 3 ✓ |
| track padding-bottom | 0 | 4 |

## actions
- `mobile/index.html`：標題與 aria-label `Featured Games` → `Exclusive Games`
- `mobile/styles/components/featured-games.css`：head padding 0 14、nav gap 8、arrow 34、移 padding-bottom

## verify after
- title "Exclusive Games" ✓
- arrow 34×34 ✓、gap 8 ✓
- cell 108×144 ✓
- 互動：arrow scroll、track 觸控滑動

## 通過 ✓
