# web/slots.html — slots-grid
- ref: 無（baji.live/slots 為 404）
- selector: local `.slot-grid` (HTML 同時掛 `casino__gamelists`)
- viewport: 1440x900x2

## diff before
- 與 casino-grid 同元件，40 個 slot-card

## actions
- web/slots.html line 120-159: 40 cards 圖片沿用 casino（baji.live/slots 無 ref，視覺與 casino 對等）
- 不新增 css

## verify after
- grid 8 col 139px gap 8, card 139x184.9 radius 3, 同 casino ✓
- hover lift / shadow 與 casino 一致 ✓
- 通過 ✓
