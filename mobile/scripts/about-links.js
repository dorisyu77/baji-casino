// About 內 inline 連結:
// - data-about-noop:preventDefault(本地未實作對應頁,留為文字流)
// - data-about-action="open-promotions":點擊觸發 Promotions panel
window.initAboutLinks = function initAboutLinks(root = document) {
  const about = root.querySelector('.about');
  if (!about) return;

  about.addEventListener('click', (e) => {
    const noop = e.target.closest('[data-about-noop]');
    if (noop) {
      e.preventDefault();
      return;
    }
    const promo = e.target.closest('[data-about-action="open-promotions"]');
    if (promo) {
      e.preventDefault();
      window.openPromotionsPanel && window.openPromotionsPanel();
    }
  });
};
