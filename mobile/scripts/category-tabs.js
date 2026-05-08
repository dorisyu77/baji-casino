// Category tabs 切換 + 切換 game-grid panel
window.initCategoryTabs = function initCategoryTabs(root = document) {
  const tabsWrap = root.querySelector('[data-category-tabs]');
  const grid = root.querySelector('[data-game-grid]');
  if (!tabsWrap || !grid) return;

  const tabs = Array.from(tabsWrap.querySelectorAll('.category-tab'));
  const panels = Array.from(grid.querySelectorAll('.game-grid__panel'));

  function activate(category) {
    tabs.forEach(t => {
      const on = t.dataset.category === category;
      t.classList.toggle('category-tab--active', on);
      t.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    panels.forEach(p => {
      p.classList.toggle('is-active', p.dataset.panel === category);
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const c = tab.dataset.category;
      if (!c) return;
      activate(c);
    });
  });
};
