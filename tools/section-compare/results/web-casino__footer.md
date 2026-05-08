# web/casino.html — footer
- ref: https://baji.live/bd/en/casino
- selector: ref `.layout-fullview__footer`, local `.layout__footer`
- viewport: 1440x900x2

## diff before
- 重用 web/index.html 已驗證的 footer 結構與 components/footer.css
- 內容（Sponsorships / Brand Ambassadors / Brand Partner / Gaming License / Responsible Gaming / Social Media / About / Brand / License）與 home 完全相同
- ref baji casino 頁 footer y=1349 起，本地 mine y=1279（差距因 above-the-fold 內容高度不同）

## actions
- 不修改：直接複製 web/index.html footer HTML 到 web/casino.html
- 不新增 css

## verify after
- rect: local (64,1279,1376,655) — content area 對齊 layout 規範 ✓
- 互動: About BAJI Show More toggle（scripts/main.js:79-87 已實作）✓
- 動態: scroll-reveal fade-in 12px / 400ms ease（main.js:104-124）✓
- 內容: 與 home 一致（依 web/CLAUDE.md 規定不重複）
- 通過 ✓
