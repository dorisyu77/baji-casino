# mobile/index.html — sponsorships

- viewport: 375×812×3
- ref selector: `app-ambassador-lists`（含 `Sponsorships` 標題者）
- local selector: `.sponsorships`

## diff before
| 屬性 | ref | local |
|---|---|---|
| 標題色/字級 | 14px 600 #27b488 | 16px 600 #e2e6e9 |
| 標題 margin-bottom | 15 | 12 |
| 區塊 padding | ~20 15 0 | 16 16 0 |
| list 排版 | 2 欄 grid | 單欄 flex column |
| item 背景 | 透明、無 radius、無 padding | #222424 radius 3 padding 10/12 |
| logo 尺寸 | 30×30 | 48×48 |
| name | 14px 400 #657381 | 14px 600 #e2e6e9 |
| role/year | 12px #657381 | 12px text-muted/secondary |

## actions
- `mobile/styles/components/sponsorships.css` 全面改寫：
  - section padding 20 15 0
  - title 14px 600 `var(--color-link-green)` margin-bottom 15
  - list grid 2 col、row-gap 8、column-gap 0
  - item 透明背景、無 radius、padding 0、gap 8
  - logo 30×30
  - name 14px 400 `text-secondary`、role/year 12px `text-secondary`
  - 移除 `:active` 視覺反饋（ref 為純連結）

## verify after
- 標題綠 #27b488 ✓
- 2 欄排版 ✓
- 透明 item、icon 30×30 ✓
- 互動：item 為 link，點擊跳轉

## 通過 ✓
