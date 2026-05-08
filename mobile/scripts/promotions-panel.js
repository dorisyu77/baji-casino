// Promotions panel:bottom-sheet,全站共用,由 JS 動態注入
window.initPromotionsPanel = function initPromotionsPanel() {
  if (document.querySelector('[data-promotions-panel]')) return;

  // 5 個 promotion 卡片(用本地 event-* 圖片)
  const promos = [
    { img: 'assets/images/event-296753.jpg', title: 'Welcome Bonus 200%', desc: 'New players get 200% bonus on first deposit, up to BDT 20,000.' },
    { img: 'assets/images/event-297950.jpg', title: 'Daily Cashback 5%', desc: 'Lose less, play more. Get 5% cashback on net losses every 24h.' },
    { img: 'assets/images/event-299017.jpg', title: 'Refer a Friend', desc: 'Earn BDT 500 for each friend who signs up and plays.' },
    { img: 'assets/images/event-299784.jpg', title: 'Weekend Reload', desc: '50% reload bonus every Saturday and Sunday on slots.' },
    { img: 'assets/images/event-300074.png', title: 'Big Win Leaderboard', desc: 'Top 10 winners share a BDT 1,000,000 prize pool every month.' },
  ];

  const panel = document.createElement('div');
  panel.className = 'promotions-panel';
  panel.setAttribute('data-promotions-panel', '');
  panel.setAttribute('aria-hidden', 'true');
  panel.innerHTML = `
    <div class="promotions-panel__backdrop" data-panel-close></div>
    <section class="promotions-panel__sheet" role="dialog" aria-modal="true" aria-labelledby="promo-panel-title">
      <header class="promotions-panel__header">
        <h2 class="promotions-panel__title" id="promo-panel-title">Promotions</h2>
        <button class="promotions-panel__close" type="button" data-panel-close aria-label="Close promotions">&times;</button>
      </header>
      <div class="promotions-panel__body">
        ${promos.map(p => `
          <a class="promo-card" href="#" data-panel-noop="1">
            <img class="promo-card__image" src="${p.img}" alt="${p.title}" loading="lazy" />
            <div class="promo-card__body">
              <h3 class="promo-card__title">${p.title}</h3>
              <p class="promo-card__desc">${p.desc}</p>
              <span class="promo-card__cta">Claim</span>
            </div>
          </a>
        `).join('')}
      </div>
    </section>
  `;
  document.body.appendChild(panel);

  function open() {
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    document.body.classList.add('promotions-panel-open');
  }
  function close() {
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('promotions-panel-open');
  }

  panel.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('[data-panel-close]')) {
      e.preventDefault();
      close();
      return;
    }
    if (target.closest('[data-panel-noop]')) {
      e.preventDefault();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) close();
  });

  // tab-bar Promotions 鍵
  const promoBtn = document.querySelector('.tab-bar__btn--promotions');
  if (promoBtn) {
    promoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      open();
    });
  }

  window.openPromotionsPanel = open;
  window.closePromotionsPanel = close;
};
