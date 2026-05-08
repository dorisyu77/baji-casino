# web/slots.html — top-header
- ref: https://baji.live/bd/en/slots（404，無 ref；沿用 casino 規格）
- selector: local `.layout__top-header`
- viewport: 1440x900x2

## diff before
- 與 web-casino__top-header 同元件，僅差別：quick-link 中 Slots 標 `header__nav-btn--active`（casino 不標）

## actions
- web/slots.html line 36-43: Slots 連結加 `header__nav-btn--active`
- 不新增 css

## verify after
- 結構 / 樣式與 web-casino 完全一致 ✓
- 互動: 同 home / casino ✓
- 通過 ✓（結構驗證；無 ref 像素 diff 不適用）
