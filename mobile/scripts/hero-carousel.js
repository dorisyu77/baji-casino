// Hero 自動輪播：每 5s 切換，支援左右滑動 + 點擊 dot
window.initHeroCarousel = function initHeroCarousel(root = document) {
  const track = root.querySelector('[data-hero-track]');
  if (!track) return;
  const slides = Array.from(track.children);
  const dotsWrap = root.querySelector('[data-hero-dots]');
  if (slides.length <= 1) return;

  let index = 0;
  let timerId = null;

  // 建 dots
  const dots = slides.map((_, i) => {
    const d = document.createElement('span');
    d.className = 'hero-banner__dot' + (i === 0 ? ' is-active' : '');
    return d;
  });
  if (dotsWrap) {
    dotsWrap.style.pointerEvents = 'auto';
    dots.forEach((d, i) => {
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    });
  }

  function render() {
    track.style.transform = `translateX(${-index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    render();
    restartTimer();
  }

  function next() { goTo(index + 1); }

  function startTimer() {
    timerId = setInterval(next, 4500);
  }

  function restartTimer() {
    if (timerId) clearInterval(timerId);
    startTimer();
  }

  // 手勢滑動（touch）
  let startX = 0, deltaX = 0, dragging = false;
  const viewport = track.parentElement;
  viewport.addEventListener('touchstart', (e) => {
    dragging = true;
    startX = e.touches[0].clientX;
    deltaX = 0;
    if (timerId) clearInterval(timerId);
  }, { passive: true });
  viewport.addEventListener('touchmove', (e) => {
    if (!dragging) return;
    deltaX = e.touches[0].clientX - startX;
  }, { passive: true });
  viewport.addEventListener('touchend', () => {
    if (!dragging) return;
    dragging = false;
    const threshold = viewport.clientWidth * 0.15;
    if (deltaX > threshold) goTo(index - 1);
    else if (deltaX < -threshold) goTo(index + 1);
    else restartTimer();
  });

  // 頁面 hidden 時暫停
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (timerId) clearInterval(timerId);
    } else {
      startTimer();
    }
  });

  render();
  startTimer();
};
