# mobile/index.html — brand-partner

- viewport: 375×812×3
- ref selector: `app-icon-lists`（`Official Brand Partner`）
- local selector: `.brand-partner`

## diff before
| 屬性 | ref | local |
|---|---|---|
| 標題 | 14px 600 #27b488 | 16px 600 #e2e6e9 |
| 標題 margin-bottom | 15 | 12 |
| cell bg/radius/padding | 透明 / 0 / 0 | #222424 / 3 / 14 16 |
| logo 尺寸 | 88×30 | 117×40 (max 40h) |

## actions
- `mobile/styles/components/brand-partner.css`：title 改綠 14px、cell 透明無 padding、img 88×30

## verify after
- 標題綠 ✓、logo 88×30 ✓
- 互動：點擊跳轉 cazvip.com ✓

## 通過 ✓
