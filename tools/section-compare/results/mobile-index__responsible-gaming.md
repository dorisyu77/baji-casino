# mobile/index.html — responsible-gaming

- viewport: 375×812×3
- ref selector: `app-icon-lists`（`Responsible Gaming`）
- local selector: `.responsible-gaming`

## diff before
| 屬性 | ref | local |
|---|---|---|
| 標題 | 14px 600 #27b488 | 16px 600 #e2e6e9 |
| row | flex gap 20 | flex gap 8（cell 等分） |
| cell | 30×30 透明 | 等分 #222424 padding 14 |
| img filter | 無 | brightness(0) invert(0.65) |

## actions
- `mobile/styles/components/responsible-gaming.css`：title 綠 14px、row gap 20、cell 透明 30×30、移除 filter

## verify after
- 標題綠 ✓、3 個 30×30 icon 並排 ✓
- 互動：點擊跳轉

## 通過 ✓
