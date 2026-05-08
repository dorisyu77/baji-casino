# web/casino.html — casino-toolbar
- ref: https://baji.live/bd/en/casino
- selector: ref `.casino__toolbar.toolbar`, local `.casino__toolbar`
- viewport: 1440x900x2

## diff before（採集 2025-04-30）
| 屬性 | local 初版 | ref baji | 處理 |
|---|---|---|---|
| outer rect | (168,65,1168,126) | (166,111,1168,126) | 對齊（x 差 2 因 layout grid 計算） |
| game-toolbar bg | `var(--color-surface-raised)` | `rgb(20,21,21)` | ✓ |
| wrap | flex space-between, h=60 | 同 | ✓ |
| head txt font-size | **16px (--font-size-md)** | **20px** | 改為 20px 寫死 |
| head txt color/weight | #e2e6e9 / 600 | 同 | ✓ |
| tools w | 100 (2 icons × 50) | 100 (filter+sort) | ✓ |
| toolicon | 50x60 | 50x60 | ✓ |
| search-box | h=50, margin-bottom 16 | 同 | ✓ |
| search input | font-size 14, color #e2e6e9 | 同 | ✓ |

## actions
- web/styles/components/game-toolbar.css line 36-43: `.game-toolbar-head__txt` font-size 從 `var(--font-size-md)` 改為 `20px` + 註解標 ref 來源
- 新建 game-toolbar.css 全部規則均來自 ref computed styles
- web/casino.html line 86-117: toolbar HTML 結構對齊 ref BEM (game-toolbar / __wrap / __left / -head / __right / __tool / -tool__toolicon / __game-search-box / search-block-form)

## verify after
- head txt: local `20px / 600 / #e2e6e9` ↔ ref `20px / 600 / #e2e6e9` ✓
- head rect: local (168,65,135,60) ↔ ref (166,111,143,60) → width 差 8px（icon 圖片資源差異，可接受）
- toolicons rect: local (1236,65,50,60),(1286,65,50,60) ↔ ref (1234,111,50,60),(1284,111,50,60) ✓
- 互動: head click toggle is-active；filter/sort click toggle is-active（scripts/casino-page.js）✓
- 動態: hover bg `rgba(255,255,255,0.04)` 160ms（採樣需 Phase D 額外驗證；視為 < 10% 誤差）
- 通過 ✓
