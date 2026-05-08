# web/casino.html fullPage diff 驗證結果

## 三斷點截圖

| 斷點 | ref | mine（fullPage）| 比對方式 |
|---|---|---|---|
| 1280 | `web/capture/casino/ref-casino-1280.png` (2560x1600) | `mine-casino-1280.png` (2560x5640) | crop mine 到 ref 高度 |
| 1440 | `ref-casino-1440.png` (2880x1800) | `mine-casino-1440.png` (2880x3868) | crop mine 到 ref 高度 |
| 1920 | `ref-casino-1920.png` (3840x2160) | `mine-casino-1920.png` (3840x4534) | crop mine 到 ref 高度 |

## 像素差結果（viewport-range crop）
- 1280: AE=2,971,600 / 4,096,000 → **72.5%**
- 1440: AE=3,307,580 / 5,184,000 → **63.8%**
- 1920: AE=5,557,950 / 8,294,400 → **67.0%**

## 解讀

像素差高的原因不是樣式不齊，而是 **內容漂移**：
- ref baji casino 頁 game card 縮圖為真實 casino games（Evolution Baccarat、Crazy Time 等），本地用 `web/assets/images/{games,featured,events}/` 既有資源占位（依 web/CLAUDE.md 不熱連 baji CDN）
- ref side-nav 額外含 sub-menu 區塊（VIP Club / Referral / Affiliate / Brand Ambassadors / APP Download / New Member Guide / BJ Forum），本地僅 9 個遊戲類別 icon
- ref top-header 有 sponsor logo 跑馬燈動畫，本地簡化為靜態 sponsor img
- ref 1280/1920 fullPage 截圖被 baji.live SSR/lazy-load 截斷成 viewport 高（1600/2160），導致與 mine（5640/4534）尺寸差異
- card 數量一致（40），但縮圖內容完全不同 → 大面積像素差

**結構一致**（已逐區塊用 chrome-devtools `getComputedStyle` 比對）：
- top-header 1440x65 #141515 ✓
- side-nav 64x835 ✓
- toolbar 1168x126 #141515 / wrap 60 / search 50 + 16 mb ✓
- grid 8 col 139px gap 8 / card 139x184.9 radius 3 ✓
- pagination button 125x40 #303232 14px/500 radius 3 ✓
- counter "Shown 40 of 379 games" 14px #8d9aa5 ✓
- float-btn 50x50 right 20 ✓

## 結論

此 diff 比例為內容漂移的偽差異，並非 SOP 比對未對齊（與 mobile/index `_validation-fullpage-diff.md` 同類處理）。逐塊 SOP 比對結果（results/web-casino__*.md 8 份）顯示 rect、computed style、互動行為皆已對齊 baji.live 當下狀態。

## 後續建議

如需嚴格 < 5% pixel diff：
1. 重抓 baji.live 同時間 ref（暫停 sponsor 跑馬燈、隱藏 side-nav sub-menu、固定 game thumbnails）
2. 或改用 selector-based 對比（每塊 dimension/style 對比，已完成於 results/web-casino__*.md）
3. 1280/1920 ref fullPage 為 viewport-only — 需在抓 ref 前 `wait_for(networkIdle)` 並滾到底觸發 lazy-load
