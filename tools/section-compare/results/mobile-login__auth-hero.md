# mobile/login.html — auth-hero

- viewport: 375×812×3
- ref selector: `.account-landing__splash`
- local selector: `.auth-hero`

## diff before
| 屬性 | ref | local |
|---|---|---|
| 高度 | 180 | 180 ✓ |
| 內容 | autoplay 影片（welcome-bn.mp4，poster=welcome-bn.png）內含 "Hello / Welcome to BJ" + bj logo | HTML 文字 "Hello"+"Welcome to BJ" + auth-bj-hero.png logo + 綠色 radial-gradient |
| 背景 | 影片直接覆蓋 | radial-gradient + 文字 + logo |

## actions
- 從 baji.live 截圖 splash 區域 cropped 1125×540 存為 `mobile/assets/images/auth-welcome-bn.png`（合規於 CLAUDE.md「禁止熱連 CDN」，asset 已落地）
- `mobile/styles/components/auth-page.css`：
  - hero padding 32 16 0 → 0
  - 背景改 `url(auth-welcome-bn.png) cover` 取代 radial-gradient
  - `auth-hero__text/greeting/title/logo` 全部 `display: none`（影像已含相同文字）

## verify after
- hero 180h ✓、bg-img cover ✓
- 視覺：直接顯示與 ref 同樣的影像 (Hello / Welcome to BJ + bj logo)
- 動態：本地用靜態圖（影片需另存 mp4 增加成本，且 CLAUDE.md 偏好靜態）

## 注意
- ref 為 autoplay 影片，本地用首幀影像替代——細微動態無法重現，視覺幾乎一致

## 通過 ✓
