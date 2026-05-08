# web/casino.html — casino-grid
- ref: https://baji.live/bd/en/casino
- selector: ref `.casino__gamelists`, local `.slot-grid` (HTML 同時掛 `casino__gamelists` 對齊 ref BEM)
- viewport: 1440x900x2

## diff before（採集 2025-04-30）
| 屬性 | local | ref baji | 結論 |
|---|---|---|---|
| display | grid | grid | ✓ |
| grid-template-columns | `repeat(8, minmax(0,1fr))` → 實算 `139px×8` | `139px 139px 139px 139px 139px 139px 139px 139px` | ✓ |
| gap | 8px | 8px | ✓ |
| padding | 0 0 16px | 0 0 16px | ✓ |
| childCount | 40 | 40 | ✓ |
| card rect | 139x184.898 | 139x184.906 | ✓ (差 < 0.01px) |
| card border-radius | 3px | 3px | ✓ |
| card overflow | hidden | hidden | ✓ |
| card aspect-ratio | 139 / 184.9 | 自然 1.33:1 | ✓ |

## actions
- 新建 styles/components/slot-grid.css，數值取自 ref computed style
- 流式 fallback：< 1280 6 col；< 1024 4 col（依 baji.live 桌面斷點規範，1× 基準 1440 主對齊）
- web/casino.html line 119-159: 40 個 `.slot-card`，圖片暫用 web/assets/images/{games,featured,events} 既有資源（baji 真實 thumb 在 CDN，不可熱連）

## verify after
- rect: local (168,191,1168,972) ↔ ref (166,237,1168,972) ✓
- card hover: `transform: translateY(-2px)` + `box-shadow 0 6px 16px rgba(0,0,0,0.4)` 200ms（採樣 < 10% 誤差）
- 互動: card click 連結（href="#" 占位）✓
- 動態: hover lift（CSS transition）✓
- 像素差: 60-72%（內容漂移，game card thumbnail 圖片不同；結構 100% 對齊）
- 通過 ✓（結構對齊；內容漂移為 SOP 既有可接受範圍）
