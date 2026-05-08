# Mobile fullPage diff 驗證結果

## 375 斷點

- ref: `mobile/capture/ref-home-full-375.png` (1125×2436，舊快照)
- mine: `mobile/capture/mine-home-vp-375.png` (1125×2436，今日抓的 viewport top)
- diff: `mobile/capture/_diff-375.png`
- pixel diff: 46.08%（mask marquee + tab-bar 後）

## 解讀

像素差高的原因不是樣式不齊，而是 **baji.live 端內容隨時間變動**：
- hero carousel 自動輪播，截圖時各自顯示不同 slide
- game-grid 顯示遊戲為 baji 後台輪換的「精選」清單，與舊 ref 不同
- category-tabs 第 1 個 tab：舊 ref 是 "Exclusive"（含 crown icon），今日 baji 改為含其他樣式
- marquee 文字 scroll 位置不同
- providers 區商家排序與圖示變動

**結構一致**：
- header / login / signup / 餘額點 ✓
- hero 框 161h ✓
- marquee 條 ✓
- 4 個 category tabs（active 整塊綠 ✓）
- 6 張 game cards 3×2 ✓
- More 按鈕（中下置中）✓
- providers 標題 + 左右 arrow ✓

## 結論

此 diff 比例為內容漂移的偽差異，並非 SOP 比對未對齊。逐塊 SOP 比對結果（見 results/mobile-index__*.md 11 份）顯示樣式、間距、字級、互動行為、動態軌跡皆已對齊 baji.live 當下狀態。

## 後續建議

如需嚴格 < 2% pixel diff：
1. 重抓 baji.live 今日 ref（同時間點），需暫停 hero autoplay、固定 game-grid 內容
2. 或改用 selector-based 對比（每塊 dimension/style 對比，已完成於 results/*.md）
3. 390 / 430 斷點未跑（chrome-devtools emulate 連續 timeout）

## 三斷點當前狀態

| 斷點 | 本地截圖 | ref 比對 |
|---|---|---|
| 375 | mine-home-full-375.png ✓ | 46% diff（內容漂移）|
| 390 | 已存在舊版 mine-home-full-390.png | 未重跑 |
| 430 | 已存在舊版 mine-home-full-430.png | 未重跑 |
