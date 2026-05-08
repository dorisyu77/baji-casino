# mobile/index.html — about

- viewport: 375×812×3
- ref selector: `.footer__description`（含 `.showmore`）
- local selector: `.about`

## diff before
| 屬性 | ref | local |
|---|---|---|
| 區塊 padding | 20 15 0 | 16 16 0 |
| title | 14px 600 #657381 | 16px 600 #e2e6e9 |
| body | 14px 400 #657381 line-height 21 | 12px 400 #8d9aa5 line-height 19.2 |
| collapsed max-h | 150 | 96 |
| 漸層 mask | 70h linear-gradient bottom→top black 20% → transparent | 48h linear-gradient #111 |
| Show more 按鈕 | 全寬 36h、bg #303232、字 14px #e2e6e9 | 圓角 pill、bg #222424 |
| 連結色 | #27b488 | #6fb3ff |

## actions
- `mobile/styles/components/about-footer.css`：
  - title 14px 600 #657381
  - body 14px 400 #657381 line-height 21、max-h 150
  - mask 70h linear-gradient(to top, black 20%, transparent)
  - toggle 全寬 36h #303232 14px #e2e6e9 radius 3
  - 連結色 → `--color-link-green`

## verify after
- title/body 14px #657381 ✓
- max-h 150 ✓、mask 70h ✓
- Show more 全寬按鈕 ✓
- 互動：點 Show more 切 `is-expanded`、文字 "Show more"/"Show less"（既有 about-toggle.js）✓

## 通過 ✓
