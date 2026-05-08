// Menu drawer:由 tab-bar Menu 鍵觸發,全螢幕 overlay,全站共用
// DOM 由 JS 動態注入,避免 4 個 .html 重複貼
window.initMenuDrawer = function initMenuDrawer() {
  if (document.querySelector('[data-menu-drawer]')) return;

  const currentPage = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  // 各分類下的 vendor list(從 baji.live home main-nav a11y 抓)
  // 點 vendor 跳對應分類頁(本地不做 vendor 過濾)
  const VENDORS = {
    sports:  ['Cricket', 'FB Sports', 'I-Sports', 'SBO Sports', 'Horsebook', 'BTi Sports', 'UG Sports', 'CMD Sports', 'E-Sports', 'Pinnacle', 'INSPORTS'],
    casino:  ['Evolution', 'Sexy', 'Pragmatic Play', 'Playtech', 'HotRoad', 'Big Gaming', 'Microgaming', 'Dream Gaming', 'Winfinity', 'Viacasino'],
    slots:   ['JILI', 'PG Soft', 'Pragmatic Play', 'Fa Chai', 'JDB', 'Yellow Bat', 'Lucky365', 'Spadegaming', 'FastSpin', 'NextSpin', 'Playtech', 'Red Tiger'],
    crash:   ['Spribe', 'Pragmatic Play', 'JILI', 'SmartSoft', 'Fa Chai', 'KingMidas', 'You Lian', 'Rich88', 'Hacksaw', 'Crash88', 'JDB'],
    table:   ['JILI', 'KingMidas', 'Rich88', 'Spribe', 'WorldMatch', 'JDB', 'PG Soft', 'CoolGame', 'Yggdrasil', 'Playtech', 'Hacksaw', 'PokerWin'],
    fishing: ['JILI', 'JDB', 'Fa Chai', 'AceWin', 'Spadegaming', 'Yellow Bat', 'FastSpin', 'Lucky365', 'You Lian'],
    arcade:  ['JDB', 'Fa Chai', 'Pragmatic Play', 'Rich88', 'You Lian', 'Hacksaw', 'Lucky365', 'KingMidas', 'SmartSoft', 'Microgaming', 'PG Soft', 'NextSpin'],
    lottery: ['JILI', 'Number', 'Yellow Bat', 'KingMidas', 'Rich88', 'UG'],
  };

  // 主導航:9 個分類
  // - Popular:純 link(無 accordion,baji.live home Popular 直接顯示 Exclusive Games)
  // - 其他 8 個:accordion + vendor 子選單
  const sections = [
    {
      title: 'Categories',
      items: [
        { label: 'Popular', icon: 'side-exclusive', href: 'index.html',   page: 'index.html' },
        { label: 'Sports',  icon: 'side-sport',    cat: 'sports',  page: 'sports.html' },
        { label: 'Casino',  icon: 'side-casino',   cat: 'casino',  page: 'casino.html' },
        { label: 'Slots',   icon: 'side-slot',     cat: 'slots',   page: 'slots.html' },
        { label: 'Crash',   icon: 'side-crash',    cat: 'crash',   page: 'crash.html' },
        { label: 'Table',   icon: 'side-table',    cat: 'table',   page: 'table.html' },
        { label: 'Fishing', icon: 'side-fish',     cat: 'fishing', page: 'fishing.html' },
        { label: 'Arcade',  icon: 'side-arcade',   cat: 'arcade',  page: 'arcade.html' },
        { label: 'Lottery', icon: 'side-lottery',  cat: 'lottery', page: 'lottery.html' },
      ],
    },
    {
      title: 'More',
      items: [
        { label: 'Promotions',         action: 'open-promotions' },
        { label: 'Affiliate',          href: '#' },
        { label: 'Help',               href: '#' },
        { label: 'Terms & Conditions', href: 'terms.html', page: 'terms.html' },
      ],
    },
  ];

  const ctaRowHtml = `
    <div class="menu-drawer__cta-row">
      <a class="menu-drawer__cta menu-drawer__cta--login" href="login.html">Log in</a>
      <a class="menu-drawer__cta menu-drawer__cta--signup" href="login.html?tab=signup">Sign up</a>
    </div>
  `;

  function renderItem(it) {
    const isActive = it.page && it.page.toLowerCase() === currentPage ? ' is-active' : '';
    const iconHtml = it.icon
      ? `<span class="menu-drawer__item-icon" style="background-image:url('assets/images/${it.icon}.png')" aria-hidden="true"></span>`
      : '';

    // Promotions(Panel 觸發器)
    if (it.action === 'open-promotions') {
      return `<li><button type="button" class="menu-drawer__item${isActive}" data-drawer-action="open-promotions">
        ${iconHtml}
        <span class="menu-drawer__item-text">${it.label}</span>
      </button></li>`;
    }

    // 有 vendor 列表 → accordion(Sports / Casino / Slots / 等 8 個)
    if (it.cat && VENDORS[it.cat]) {
      const targetPage = it.page;  // 對應分類頁
      const vendorsHtml = ['All', ...VENDORS[it.cat]].map(v =>
        `<li><a class="menu-drawer__cat-vendor" href="${targetPage}">${v}</a></li>`
      ).join('');
      return `<li class="menu-drawer__cat" data-cat="${it.cat}">
        <button class="menu-drawer__item menu-drawer__cat-header${isActive}" type="button" aria-expanded="false">
          ${iconHtml}
          <span class="menu-drawer__item-text">${it.label}</span>
          <span class="menu-drawer__cat-chevron" aria-hidden="true"></span>
        </button>
        <ul class="menu-drawer__cat-children" hidden>${vendorsHtml}</ul>
      </li>`;
    }

    // 純 link(Popular / Terms / Affiliate / Help)
    const hasPage = !!it.page;
    const href = hasPage ? it.href : '#';
    const noopAttr = hasPage ? '' : ' data-drawer-noop="1"';
    return `<li><a class="menu-drawer__item${isActive}" href="${href}"${noopAttr}>
      ${iconHtml}
      <span class="menu-drawer__item-text">${it.label}</span>
      <span class="menu-drawer__item-arrow" aria-hidden="true"></span>
    </a></li>`;
  }

  const sectionsHtml = sections.map(s => `
    <div class="menu-drawer__section">
      <div class="menu-drawer__section-title">${s.title}</div>
      <ul class="menu-drawer__list">
        ${s.items.map(renderItem).join('')}
      </ul>
    </div>
  `).join('');

  const drawer = document.createElement('div');
  drawer.className = 'menu-drawer';
  drawer.setAttribute('data-menu-drawer', '');
  drawer.setAttribute('aria-hidden', 'true');
  drawer.innerHTML = `
    <header class="menu-drawer__header">
      <a class="menu-drawer__logo" href="index.html" aria-label="Home"></a>
      <button class="menu-drawer__close" type="button" data-drawer-close aria-label="Close menu"></button>
    </header>
    <div class="menu-drawer__body" role="dialog" aria-modal="true" aria-label="Main menu">
      ${ctaRowHtml}
      ${sectionsHtml}
    </div>
  `;
  document.body.appendChild(drawer);

  function open() {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-drawer-open');
  }
  function close() {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-drawer-open');
  }

  drawer.addEventListener('click', (e) => {
    const target = e.target;

    // 關閉鈕 / backdrop
    if (target.closest('[data-drawer-close]')) {
      e.preventDefault();
      close();
      return;
    }

    // Accordion header:toggle 展開
    const header = target.closest('.menu-drawer__cat-header');
    if (header) {
      const cat = header.closest('.menu-drawer__cat');
      const children = cat.querySelector('.menu-drawer__cat-children');
      const expanded = cat.classList.toggle('is-expanded');
      header.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      if (expanded) children.removeAttribute('hidden');
      else children.setAttribute('hidden', '');
      return;
    }

    // # placeholder
    if (target.closest('[data-drawer-noop]')) {
      e.preventDefault();
      return;
    }

    // Promotions panel
    if (target.closest('[data-drawer-action="open-promotions"]')) {
      e.preventDefault();
      close();
      window.openPromotionsPanel && window.openPromotionsPanel();
      return;
    }

    // 任何 active link(包括 vendor 子項)點擊後關閉 drawer
    const link = target.closest('a[href]:not([data-drawer-noop])');
    if (link) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) close();
  });

  const menuBtn = document.querySelector('.tab-bar__btn--menu');
  if (menuBtn) {
    menuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      open();
    });
  }

  window.openMenuDrawer = open;
  window.closeMenuDrawer = close;
};
