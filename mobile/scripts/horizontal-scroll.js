// 通用水平捲動：providers / events / featured 共用
// data-scroll-track="<name>" 對 data-scroll-prev="<name>" / data-scroll-next="<name>"
window.initHorizontalScroll = function initHorizontalScroll(root = document) {
  const tracks = Array.from(root.querySelectorAll('[data-scroll-track]'));
  tracks.forEach(track => {
    const name = track.dataset.scrollTrack;
    const prev = root.querySelector(`[data-scroll-prev="${name}"]`);
    const next = root.querySelector(`[data-scroll-next="${name}"]`);
    if (!prev || !next) return;

    const stepOf = () => {
      const first = track.querySelector('*');
      if (!first) return track.clientWidth * 0.8;
      const style = getComputedStyle(track);
      const gap = parseInt(style.columnGap || style.gap || '8', 10) || 8;
      return first.getBoundingClientRect().width + gap;
    };

    prev.addEventListener('click', () => {
      track.scrollBy({ left: -stepOf(), behavior: 'smooth' });
    });
    next.addEventListener('click', () => {
      track.scrollBy({ left: stepOf(), behavior: 'smooth' });
    });

    // 依 scroll 位置 disable 箭頭（hint）
    const updateArrows = () => {
      const atStart = track.scrollLeft <= 1;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
      prev.style.opacity = atStart ? '0.35' : '1';
      next.style.opacity = atEnd ? '0.35' : '1';
    };
    track.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    updateArrows();
  });
};
