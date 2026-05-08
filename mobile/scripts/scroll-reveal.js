// 進入畫面時 fade-in：使用 IntersectionObserver
window.initScrollReveal = function initScrollReveal(root = document) {
  const targets = Array.from(root.querySelectorAll('.reveal'));
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach(t => t.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(t => io.observe(t));
};
