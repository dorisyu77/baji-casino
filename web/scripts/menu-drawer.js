/* menu-drawer — hamburger 點擊 toggle drawer
   點 .header__hamburger / 點遮罩 / 按 ESC 都會關閉 */
(function () {
  'use strict';

  const ham = document.querySelector('.header__hamburger');
  const drawer = document.querySelector('.menu-drawer');
  const overlay = document.querySelector('.menu-drawer-overlay');
  const closeBtn = document.querySelector('.menu-drawer__close');
  if (!ham || !drawer) return;

  const open = () => {
    document.body.classList.add('is-menu-open');
    ham.setAttribute('aria-expanded', 'true');
  };
  const close = () => {
    document.body.classList.remove('is-menu-open');
    ham.setAttribute('aria-expanded', 'false');
  };
  const toggle = () => {
    document.body.classList.contains('is-menu-open') ? close() : open();
  };

  ham.addEventListener('click', (e) => {
    e.stopPropagation();
    toggle();
  });
  overlay?.addEventListener('click', close);
  closeBtn?.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('is-menu-open')) close();
  });

  // 點 drawer 內 link 後關閉
  drawer.querySelectorAll('a, .menu-drawer__item').forEach(el => {
    el.addEventListener('click', () => {
      if (!el.hasAttribute('data-no-close')) setTimeout(close, 100);
    });
  });
})();
