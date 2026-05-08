// 滾超過半個 viewport 時顯示 back-to-top
window.initBackToTop = function initBackToTop(root = document) {
  const btn = root.querySelector('[data-back-to-top]');
  if (!btn) return;

  btn.hidden = false; // 脫離 SSR hidden；靠 class 控制顯示
  btn.classList.remove('is-visible');

  const update = () => {
    const shouldShow = window.scrollY > window.innerHeight * 0.6;
    btn.classList.toggle('is-visible', shouldShow);
  };

  window.addEventListener('scroll', update, { passive: true });
  update();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};
