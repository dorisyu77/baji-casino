// 底部 tab-bar:
// - Menu / Promotions:由 menu-drawer.js / promotions-panel.js 各自綁定,不在此處理
// - Casino / Slots:跳對應 .html(active 樣式由各頁 HTML 預先標 is-active)
window.initTabBar = function initTabBar(root = document) {
  const bar = root.querySelector('[data-tab-bar]');
  if (!bar) return;

  const navMap = {
    casino: 'casino.html',
    slots: 'slots.html',
  };

  bar.querySelectorAll('.tab-bar__btn').forEach(btn => {
    const tab = btn.getAttribute('data-tab');
    const target = navMap[tab];
    if (!target) return;
    btn.addEventListener('click', () => {
      if (!btn.classList.contains('is-active')) {
        location.assign(target);
      }
    });
  });
};
