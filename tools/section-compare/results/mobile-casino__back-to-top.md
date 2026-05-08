# mobile/casino.html — back-to-top

- viewport: 375×812×3
- ref: 預設 hidden，scroll 一定距離後 fade-in（baji 也有對應浮動按鈕）
- local selector: `.back-to-top`（預設 hidden）

## diff before
無對應 ref 主要互動差異。本地按鈕只在 scroll 時顯示。

## actions
無變更（行為與 ref 一致）。

## verify after
- 滾動超過 viewport 後出現 → 點擊回頂 ✓（既有 back-to-top.js）

## 通過 ✓
