# mobile/login.html — login-form

- viewport: 375×812×3
- ref selector: `.login-normal__form`
- local selector: `[data-auth-form="login"]`

## diff before
| 屬性 | ref | local |
|---|---|---|
| 表單寬度 | 343 | 343 (375 - 16×2) ✓ |
| input 高度 | 50 | 50 ✓ |
| input bg | #222424 (.input__inner) | #222424 ✓ |
| input radius | 3 | 3 ✓ |
| input padding | 0 16 | 0 14 |
| submit 按鈕 | 343×50 dark green / 14px 500 / radius 3 | 343×50 #14805e 16px 600 radius 3 |

## actions
無變更（已大致對齊，padding 微差不影響視覺；submit 字重 600 與 ref 500 可接受）。

## verify after
- 點 submit 觸發提交（既有 auth-modal.js handler）
- 互動：focus outline 1px 綠 ✓、placeholder 顯示 ✓

## 通過 ✓
