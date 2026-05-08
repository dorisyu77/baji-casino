(function boot() {
  function run() {
    window.initHeroCarousel && window.initHeroCarousel();
    window.initMarquee && window.initMarquee();
    window.initCategoryTabs && window.initCategoryTabs();
    window.initHorizontalScroll && window.initHorizontalScroll();
    window.initAboutToggle && window.initAboutToggle();
    window.initScrollReveal && window.initScrollReveal();
    window.initAuthModal && window.initAuthModal();
    window.initBackToTop && window.initBackToTop();
    window.initTabBar && window.initTabBar();
    window.initMenuDrawer && window.initMenuDrawer();
    window.initPromotionsPanel && window.initPromotionsPanel();
    window.initGameToolbar && window.initGameToolbar();
    window.initAboutLinks && window.initAboutLinks();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
