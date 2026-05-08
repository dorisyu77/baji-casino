// Login / Sign up tab 切換 — 切 .is-active 與顯示對應 form
// 支援 URL query ?tab=signup 預設切到 signup
const tabsEl = document.querySelector('[data-auth-tabs]');

const switchTab = (target) => {
  if (!tabsEl) return;
  tabsEl.querySelectorAll('.auth-tab').forEach((b) => {
    b.classList.toggle('is-active', b.dataset.tab === target);
  });
  const line = tabsEl.querySelector('.auth-tabs__line');
  if (line) line.style.transform = target === 'signup' ? 'translateX(100%)' : 'translateX(0)';
  document.querySelectorAll('[data-auth-form]').forEach((f) => {
    f.hidden = f.dataset.authForm !== target;
  });
};

if (tabsEl) {
  tabsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.auth-tab');
    if (!btn) return;
    switchTab(btn.dataset.tab);
  });

  const initial = new URLSearchParams(location.search).get('tab');
  if (initial === 'signup') switchTab('signup');
}
