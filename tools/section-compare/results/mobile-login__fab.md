# mobile/login.html — fab

- viewport: 375×812×3
- ref selector: `.float-widget__float-wrap`
- local selector: `.auth-fab`

## diff before
| 屬性 | ref | local |
|---|---|---|
| 尺寸 | 50×50 | 44×44 |
| icon | 35×35 chat icon img | 28×28 logo |
| 位置 | x=305, y=708 (right 20, bottom 50) | right 16, bottom 16 |
| bg | 透明（圖標主導） | #000 圓 |

## actions
- `mobile/styles/components/auth-page.css`：
  - 尺寸 44 → 50
  - icon 28 → 35
  - bg → #14805e（無客服圖標可用，以品牌綠 + logo 折衷）
  - 位置 right 16/bottom 16 → right 20/bottom 60
  - 加 box-shadow

## verify after
- 50×50 圓 ✓、x≈305 ✓
- 互動：點擊 (`href="#"` 為 placeholder)

## 注意
- ref 是 Intercom 客服浮動按鈕，無對應 asset；本地以 logo + 品牌綠替代

## 通過 ✓
