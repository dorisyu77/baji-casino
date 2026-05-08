# web/slots.html — side-nav
- ref: 無（baji.live/slots 為 404）
- selector: local `.layout__side-nav`
- viewport: 1440x900x2

## diff before
- 重用 casino 元件，active 移到 slots item

## actions
- web/slots.html line 71: `data-cat="slots"` item 改加 `side-nav__item--active`，casino item 移除 active

## verify after
- 結構與 casino 一致 ✓
- 互動: 切 active 會更新 ✓
- 通過 ✓
