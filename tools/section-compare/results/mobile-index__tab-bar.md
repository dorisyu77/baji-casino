# mobile/index.html — tab-bar

- viewport: 375×812×3
- ref selector: `app-bottom-bar .bottom-bar`
- local selector: `.tab-bar`

## diff before
| 屬性 | ref | local |
|---|---|---|
| 高度 | 50 | 50 ✓ |
| 背景 | #222424 | #222424 ✓ |
| 4 個按鈕 | Menu/Casino/Slots/Promotions | Menu/Casino/Slots/Promotions ✓ |
| 每按鈕寬 | 94 | 94 (flex 1) ✓ |
| icon | 20×20 | 20×20 ✓ |
| text | 12px #8d9aa5 | 12px #8d9aa5 ✓ |
| flex | column | column ✓ |

## actions
無需修改，已對齊。

## verify after
- 互動：點擊 Casino/Slots/Promotions 跳對應頁、is-active 狀態同步
- 動態：active 漸層 0.6s ease

## 通過 ✓
