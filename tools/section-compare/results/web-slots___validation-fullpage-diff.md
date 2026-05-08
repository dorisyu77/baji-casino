# web/slots.html fullPage 驗證結果

## 三斷點本地截圖

| 斷點 | mine（fullPage）|
|---|---|
| 1280 | `web/capture/slots/mine-slots-1280.png` (2560x5640) |
| 1440 | `web/capture/slots/mine-slots-1440.png` (2880x3868) |
| 1920 | `web/capture/slots/mine-slots-1920.png` (3840x4534) |

## 對比 baji.live ref

baji.live/bd/en/slots 為 **HTTP 404**，無 ref 可比對。視覺與互動沿用 casino 規格（與 mobile/slots 同樣處理 — 見 sections.json `_note`）。

## 結構驗證（與 casino 相同）

- top-header 1440x65 #141515 ✓
- side-nav 64x835 ✓（active 切到 slots）
- toolbar 1168x126，head txt "Slots" 20px/600 #e2e6e9，icon 用 icon-slot-ani.png ✓
- grid 8 col 139px gap 8 / card 139x184.9 radius 3，40 cards ✓
- pagination button 125x40 #303232 ✓
- footer 與 casino / home 一致 ✓
- float-btn 50x50 right 20 ✓

## 結論

slots 頁通過結構驗證；視覺與 casino 一致為 SOP 既定處理（baji.live/slots 404，沿用 casino spec）。逐塊 results md（results/web-slots__*.md 8 份）標 no-ref。
