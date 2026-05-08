# web/slots.html — slots-toolbar
- ref: 無（baji.live/slots 為 404）
- selector: local `.casino__toolbar > .game-toolbar`
- viewport: 1440x900x2

## diff before
- 與 casino-toolbar 同元件，僅 head icon 換 `icon-slot-ani.png`、txt 改 "Slots"

## actions
- web/slots.html line 89-94: head icon img src 改 `category/icon-slot-ani.png`，txt "Casino"→"Slots"
- 不新增 css

## verify after
- 結構與 casino-toolbar 完全一致 ✓
- head txt local 20px / 600 / #e2e6e9 ✓
- 互動: head/filter/sort click toggle is-active ✓
- 通過 ✓
