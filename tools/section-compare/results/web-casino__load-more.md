# web/casino.html — load-more
- ref: https://baji.live/bd/en/casino
- selector: ref `.casino__pagination > .pagination-btn__btn`, local `.casino__pagination`
- viewport: 1440x900x2

## diff before（採集 2025-04-30）
| 屬性 | local | ref baji | 結論 |
|---|---|---|---|
| btn rect | 125x40 | 125x40 | ✓ |
| btn bg | `rgb(48,50,50)` (token --color-icon-bg) | `rgb(48,50,50)` | ✓ |
| btn color | `#e2e6e9` | `rgb(226,230,233)` | ✓ |
| btn font | 14px / 500 | 14px / 500 | ✓ |
| btn radius | 3px | 3px | ✓ |
| counter txt | "Shown 40 of 379 games" | 同 | ✓ |
| counter color | `#8d9aa5` (--color-text-muted) | inherited; 視覺顯示同 | ✓ |
| counter font-size | 14px | 14px (line-height 30 屬繼承異常) | ✓ |

## actions
- 新建 styles/components/load-more.css
- ref BEM: `.casino__pagination > .pagination-btn__btn > .pagination-btn__button > .pagination-btn__txt`
- counter 額外 class `.casino__pagination-counter`（ref 用內聯結構但功能對等）
- scripts/casino-page.js: click → counter +40 直到 379 上限；達上限 disable + 文字改 "No more games"

## verify after
- 互動: click 增加 40 張 card + counter 更新 ✓
- hover: bg `#3a3c3c` 160ms ✓
- active: bg `#2a2c2c` ✓
- disabled: opacity 0.5 + cursor not-allowed ✓
- 通過 ✓
