/* casino / slots — load-more demo + toolbar 互動
   每次點 Load more 把 counter +40 直到 379 上限，模擬 baji.live 的分頁行為。 */
(function () {
  'use strict';

  const grid = document.querySelector('[data-slot-grid]');
  const btn = document.querySelector('.pagination-btn__button');
  const counter = document.querySelector('[data-counter]');
  if (!grid || !btn || !counter) return;

  const total = 379;
  let shown = grid.children.length;

  const update = () => {
    counter.textContent = 'Shown ' + shown + ' of ' + total + ' games';
    if (shown >= total) {
      btn.disabled = true;
      btn.style.opacity = '0.5';
      btn.style.cursor = 'not-allowed';
      btn.querySelector('.pagination-btn__txt').textContent = 'No more games';
    }
  };

  btn.addEventListener('click', () => {
    if (shown >= total) return;
    const inc = Math.min(40, total - shown);
    const samples = Array.from(grid.children).slice(0, inc);
    samples.forEach((node, i) => {
      const clone = node.cloneNode(true);
      clone.dataset.game = (node.dataset.game || 'game') + '-' + (shown + i);
      grid.appendChild(clone);
    });
    shown += inc;
    update();
  });

  // toolbar dropdown (head) demo：點擊不導頁，顯示 active 樣式
  const head = document.querySelector('.game-toolbar-head');
  if (head) {
    head.addEventListener('click', () => {
      head.classList.toggle('is-active');
    });
  }

  // toolbar tools click feedback
  document.querySelectorAll('.game-toolbar-tool__toolicon').forEach(b => {
    b.addEventListener('click', () => {
      b.classList.toggle('is-active');
    });
  });

  update();
})();
