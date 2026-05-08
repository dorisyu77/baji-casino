# mobile/casino.html — slot-grid

- viewport: 375×812×3
- ref selector: `.casino__gamelists`
- local selector: `.slot-grid`

## diff before
| 屬性 | ref | local |
|---|---|---|
| grid cols | 107.656 × 3 | 109 × 3 ✓ |
| gap | 8 | 8 ✓ |
| padding | 0 16 16 | 0 16 |
| card | 108×143 #222424 radius 0（內容自帶 radius） | 109×144 #222424 radius 3 |

## actions
無變更（card 尺寸、bg、radius 已對齊 ref）。

## verify after
- grid 3 cols ✓、card 109×144 ✓
- 互動：點 card 跳遊戲頁 / load more
- 動態：reveal fade-in（既有 scroll-reveal.js）

## 通過 ✓
