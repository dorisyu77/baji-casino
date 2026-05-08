# mobile/index.html — events

- viewport: 375×812×3
- ref selector: `.main-page__labeled-carousel--event`
- local selector: `.events`

## diff before
| 屬性 | ref | local |
|---|---|---|
| 總高 | 207 (head 44 + body 163) | 211 (head 44 + track 167) |
| head padding | 0 14 | 0 |
| arrow | 34×34 gap 8 | 28×28 gap 4 |
| cell | 341×163 radius 3 | 341×163 radius 3 ✓ |
| track padding-bottom | 0 | 4 |

## actions
- `mobile/styles/components/events.css`：
  - head 加 `padding: 0 14px`
  - nav gap 4 → 8
  - arrow 28 → 34
  - track 移除 `padding-bottom: 4px`

## verify after
- head padding 0 14 ✓、arrow 34×34 gap 8 ✓
- track 163h ✓
- cell 341×163 ✓ bg-img cover ✓
- 互動：左右 arrow scroll、track 觸控滑動（既有 scroll handler）

## 通過 ✓
