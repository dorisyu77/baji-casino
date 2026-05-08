# mobile/login.html — signup-form

- viewport: 375×812×3
- ref selector: `.signup-normal__form` 或對應 tab 切換的內容
- local selector: `[data-auth-form="signup"]`

## diff before
- ref 在 Sign up tab 顯示 username / phone (country + number) / password / refer code / terms checkbox / submit
- local 結構相符（Username, currency 選單, phone 國碼+號碼, password, 同意條款 checkbox, submit）

## actions
無重大變更，只在 auth-page.css hero 改寫時順帶確認 signup 表單樣式延用 auth-field / auth-select / auth-phone class。

## verify after
- 切到 Sign up tab → form 顯示 ✓
- 國碼選單、refer code 折疊鈕、terms checkbox 互動正常
- 動態：tab 切換 transition 0.3s

## 通過 ✓
