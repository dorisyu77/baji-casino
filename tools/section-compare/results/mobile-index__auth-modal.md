# mobile/index.html — auth-modal

- viewport: 375×812×3
- ref: baji.live 沒有 modal，`Log in` / `Sign up` 直接導航到 `/login`（無 modal 行為）
- local: 既有 `[data-modal]` 為 dormant（header 按鈕已 `href="login.html"`，不再觸發 modal）

## diff before
無對應 ref。本地 modal HTML（`.modal[data-modal]`）目前沒有 trigger，header 兩個按鈕已直接 `href="login.html"`/`?tab=signup`，與 baji 行為一致。

## actions
不修改：保留 modal markup 與 `auth-modal.js` 作為備援（無實際載入路徑），但對齊狀態為「不觸發」。實際 auth 流程由 mobile/login.html 處理（Task #2）。

## verify after
- 點 header `Log in` → 導航 `mobile/login.html` ✓
- 點 header `Sign up` → 導航 `mobile/login.html?tab=signup` ✓
- 不會跳出 modal ✓

## 通過 ✓（行為對齊；UI 對比由 login.html 任務承接）
