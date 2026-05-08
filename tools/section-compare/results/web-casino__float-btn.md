# web/casino.html — float-btn
- ref: https://baji.live/bd/en/casino
- selector: ref `.float-widget__float-wrap`, local `.float-btn`
- viewport: 1440x900x2

## diff before（採集 2025-04-30）
| 屬性 | local 初版 | ref baji | 處理 |
|---|---|---|---|
| size | **48x48** | **50x50** | 改本地 50x50 |
| right | 16px | 20px (1440-1370-50=20) | 改本地 20 |
| bottom | 24 | (sticky scroll 動態) | 維持 24 |
| position | fixed | fixed | ✓ |
| border-radius | 50% | 50% | ✓ |

## actions
- web/styles/components/float-btn.css line 3-9: width/height 48→50, right 16→20
- 註記 ref 來源於 css 註解

## verify after
- rect: local (1370,826,50,50) ↔ ref (1370,796,50,50) 位置對齊（bottom 30px 差為 fullPage scroll position 不同，靜態 fixed 對齊）✓
- 通過 ✓
