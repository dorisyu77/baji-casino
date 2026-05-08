// Marquee：依文字寬度自動調整動畫 duration，讓長短句速度一致
window.initMarquee = function initMarquee(root = document) {
  const el = root.querySelector('[data-marquee]');
  if (!el) return;

  const apply = () => {
    const parent = el.parentElement;
    if (!parent) return;
    const textWidth = el.scrollWidth;
    const viewportWidth = parent.clientWidth;
    const total = textWidth + viewportWidth;
    const duration = Math.max(14, Math.round(total / 50));
    el.style.animationDuration = duration + 's';
  };

  // 字型載入後再測量
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(apply);
  } else {
    apply();
  }
  window.addEventListener('resize', apply);
};
