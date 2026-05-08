# mobile/index.html — gaming-license

- viewport: 375×812×3
- ref selector: `app-gaming-license`
- local selector: `.gaming-license`

## diff before
| 屬性 | ref | local |
|---|---|---|
| 標題 | 14px 600 #27b488 | 16px 600 #e2e6e9 |
| grid 排版 | flex row wrap, gap 20 | flex column, gap 8 |
| cell bg/radius/padding | 透明 / 0 / 0 | #222424 / 3 / 16 |
| img | 30h auto-w (92×30, 71×30, 54×30) | max-h 80 |

## actions
- `mobile/styles/components/gaming-license.css`：title 綠 14px、grid flex row wrap gap 20、cell 透明、img 30h

## verify after
- 標題綠 ✓、3 個 logo 並排 30h ✓
- 互動：純展示

## 通過 ✓
