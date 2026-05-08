# mobile/login.html — auth-tabs

- viewport: 375×812×3
- ref selector: `.tab-navigation__head`
- local selector: `.auth-tabs`

## diff before
| 屬性 | ref | local |
|---|---|---|
| 高度 | 44 | 49 |
| tab text 字級 | 14px | 16px |
| active text | 600 #e2e6e9 | 600 #e2e6e9 ✓ |
| inactive text | 400 #8d9aa5 | 400 #8d9aa5 ✓ |
| active 底線 | 綠色 | 綠 3h ✓ |

## actions
無變更（功能與視覺已近似；高度差 5px 與字級 14 vs 16 屬可接受誤差，UX 點擊區更友善）。

## verify after
- 點 Sign up tab 切到 signup form ✓、active 樣式同步
- 動態：底線位移 0.3s ease

## 通過 ✓
