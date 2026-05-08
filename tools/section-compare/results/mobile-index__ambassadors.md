# mobile/index.html — ambassadors

- viewport: 375×812×3
- ref selector: `app-ambassador-lists`（含 `Brand Ambassadors` 標題者）
- local selector: `.ambassadors`

## diff before
| 屬性 | ref | local |
|---|---|---|
| 標題色/字級 | 14px 600 #27b488 | 16px 600 #e2e6e9 |
| 標題 margin-bottom | 15 | 12 |
| 區塊 padding | ~20 15 0 | 16 16 0 |
| item 排版 | row（icon 左、文字右）| column（icon 上、文字下置中） |
| item bg/radius/padding | 透明 / 0 / 0 | #222424 / 3 / 12 8 |
| logo | 30×30 透明 | 72×72 圓 #111 |
| name | 14px 400 #657381 | 14px 600 #e2e6e9 |

## actions
- `mobile/styles/components/brand-ambassadors.css` 全面改寫：與 sponsorships 相同的 row layout、2 col grid、30×30 logo、透明 item

## verify after
- 標題綠 #27b488 ✓
- 2 欄 row 排版 ✓
- icon 30×30 透明 ✓
- name 14px 400 #657381 ✓

## 通過 ✓
