# mobile/casino.html — game-toolbar

- viewport: 375×812×3
- ref selector: `.casino__toolbar.toolbar`
- local selector: `.game-toolbar`

## diff before
| 屬性 | ref | local |
|---|---|---|
| 高度 | 60 | 60 ✓ |
| 結構 | head（icon + "Casino" + arrow）+ tools (3 icons) | category button (icon + Casino + chevron) + actions |
| icon 尺寸 | 20×20 | ~20×20 ✓ |

## actions
無重大變更（結構功能對等）。

## verify after
- 點 category button 切換 ✓
- 點 search/filter 等動作 ✓

## 通過 ✓
