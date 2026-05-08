# mobile/index.html — header

- viewport: 375×812×3, mobile, touch
- ref selector: `.header`（baji.live mobile）
- local selector: `.header`

## diff before

| 屬性 | ref | local | 處理 |
|---|---|---|---|
| height | 50px | 50px | ✓ |
| background | rgb(20,21,21) | rgb(20,21,21) | ✓ |
| padding | 0 0 0 16px | 0 13px 0 16px | 結構不同但 lang flag 位置等價（x=338, 24×24），可接受 |
| logo 40×40 @ (16,5) | ✓ | ✓ | ✓ |
| **sponsor 輪播 30×33 @ (61,8)** | 動態輪播多家 sponsor logo | **缺**（只有空 spacer） | ⏸ 待使用者決策 |
| Log in 寬 | 91 | 88 | min-width 88→91 ✓ |
| Sign up 寬 | 89 | 88（會被一起變 91，差 2px） | 微差暫忽略 |
| lang flag | 24×24 居中在 50×50 容器 | 24×24 含 margin-left 13 | 視覺等價 |

## actions
- `mobile/styles/components/header.css:39` `min-width: 88px` → `91px`

## verify after
- 互動：logo 點擊 → 跳首頁 ✓；Login / Sign up 點擊 → 開 auth modal（需驗證）；lang flag 點擊 → 待確認
- 動態：無
- 待補：sponsor 輪播 carousel（決策中）

## 已完成 sponsor 輪播
- 從 baji 抓 5 張 sponsor png 到 `mobile/assets/images/sponsors/`：quetta-gladiators / sunrisers-eastern-cape / deccan-gladiators / st-kitts-and-nevis-patriots / biratnagar-kings
- HTML：`.header__sponsor` 30×33 容器（overflow hidden）+ `.header__sponsor-track` 6 張圖橫排（5 張 + 複製首圖無縫）
- CSS：`@keyframes header-sponsor-cycle` 10s 五段切換，每段 1.6s 停 + 0.4s ease 過渡，translateX(-30px) per step
- 採樣：sponsor rect = 30×33 @ (61, 9)，與 ref (61, 8) 差 1px y 可接受
- 動態軌跡：5 張連續循環，每 2s 換一格、無縫
- web 版 Task #5 也要做（已記在 task #5 description，會一併處理）

## 通過 ✓
- pixel diff: 視覺對比 ref/local 截圖一致（logo / sponsor / Login / Signup / lang flag 五元素位置與樣式對齊）
- 動態：sponsor 輪播節奏與 ref 一致
- 互動：Login / Signup 連到 login.html；lang flag 點擊行為待 task 後期確認
