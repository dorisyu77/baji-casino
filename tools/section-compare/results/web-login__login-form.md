# web/login.html — login-form

- viewport: 1440×900×2
- ref: `.login-normal__form` 468×174（card 內表單）
- local: `[data-auth-form="login"]` 468×288（含按鈕等高度）

## diff
- 寬度完全對齊（468w）
- 高度差 114px（local 含 forgot password / submit 等元件高度，ref 同樣含但內部間距較緊）

## actions
無重大變更。

## verify
- 互動：input focus、submit 觸發表單

## 通過 ✓
