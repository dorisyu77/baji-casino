// Slots/Casino 頁的 toolbar 互動:
// - Category 下拉:切換子分類(All / 各 provider)
// - Search:展開搜尋 input
// - Filter:展開 provider checkbox
// - Sort:展開 sort options
// 共用一個 .toolbar-popover 區塊,內容隨點擊源切換
window.initGameToolbar = function initGameToolbar(root = document) {
  const toolbar = root.querySelector('.game-toolbar');
  if (!toolbar) return;

  const isCasino = toolbar.classList.contains('game-toolbar--casino');
  const titleEl = toolbar.querySelector('.game-toolbar__title');
  const baseTitle = isCasino ? 'Casino' : 'Slots';

  // 各 popover 內容(slots / casino 略不同)
  const categories = isCasino
    ? ['All', 'Evolution', 'Sexy', 'Pragmatic Play', 'Playtech', 'HotRoad', 'Big Gaming', 'Microgaming', 'Dream Gaming']
    : ['All', 'JILI', 'PG Soft', 'Pragmatic Play', 'Fa Chai', 'JDB', 'Yellow Bat', 'Lucky365', 'Spadegaming'];

  const filters = ['All', 'Popular', 'New', 'Hot', 'Top win', 'Hi RTP', 'Megaways', 'Jackpot'];
  const sortOptions = ['Recommended', 'Newest', 'A-Z', 'Z-A', 'Popular'];

  // 建立 popover 容器並插到 toolbar 之後
  const popover = document.createElement('div');
  popover.className = 'toolbar-popover';
  popover.setAttribute('data-toolbar-popover', '');
  toolbar.parentNode.insertBefore(popover, toolbar.nextSibling);

  let currentMode = null;

  function renderCategory() {
    return `
      <div class="toolbar-popover__heading">Category</div>
      <ul class="toolbar-list">
        ${categories.map((c, i) => `
          <li>
            <button class="toolbar-list__item${i === 0 ? ' is-active' : ''}" type="button" data-tl-pick data-value="${c}">
              <span class="toolbar-list__item-dot"></span>
              <span>${c}</span>
            </button>
          </li>
        `).join('')}
      </ul>
    `;
  }
  function renderSearch() {
    return `
      <div class="toolbar-search">
        <input class="toolbar-search__input" type="search" placeholder="Search games..." autofocus />
      </div>
    `;
  }
  function renderFilter() {
    return `
      <div class="toolbar-popover__heading">Filter</div>
      <ul class="toolbar-list">
        ${filters.map((f, i) => `
          <li>
            <button class="toolbar-list__item${i === 0 ? ' is-active' : ''}" type="button" data-tl-toggle data-value="${f}">
              <span class="toolbar-list__item-dot"></span>
              <span>${f}</span>
            </button>
          </li>
        `).join('')}
      </ul>
    `;
  }
  function renderSort() {
    return `
      <div class="toolbar-popover__heading">Sort by</div>
      <ul class="toolbar-sort">
        ${sortOptions.map((s, i) => `
          <li class="toolbar-sort__item${i === 0 ? ' is-active' : ''}" data-tl-sort data-value="${s}">${s}</li>
        `).join('')}
      </ul>
    `;
  }

  function open(mode) {
    if (currentMode === mode) {
      close();
      return;
    }
    currentMode = mode;
    let html = '';
    if (mode === 'category') html = renderCategory();
    else if (mode === 'search') html = renderSearch();
    else if (mode === 'filter') html = renderFilter();
    else if (mode === 'sort') html = renderSort();
    popover.innerHTML = `<div class="toolbar-popover__inner">${html}</div>`;
    popover.classList.add('is-open');
    if (mode === 'search') {
      const input = popover.querySelector('.toolbar-search__input');
      input && input.focus();
    }
  }
  function close() {
    currentMode = null;
    popover.classList.remove('is-open');
    popover.innerHTML = '';
  }

  // Category 觸發
  const categoryBtn = toolbar.querySelector('.game-toolbar__category');
  categoryBtn && categoryBtn.addEventListener('click', (e) => {
    e.preventDefault();
    open('category');
  });

  // Search / Filter / Sort 觸發
  toolbar.querySelectorAll('.game-toolbar__action').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (btn.classList.contains('game-toolbar__action--search')) open('search');
      else if (btn.classList.contains('game-toolbar__action--filter')) open('filter');
      else if (btn.classList.contains('game-toolbar__action--sort')) open('sort');
    });
  });

  // Popover 內互動
  popover.addEventListener('click', (e) => {
    const pick = e.target.closest('[data-tl-pick]');
    if (pick) {
      popover.querySelectorAll('[data-tl-pick]').forEach(b => b.classList.toggle('is-active', b === pick));
      const val = pick.getAttribute('data-value');
      titleEl.textContent = val === 'All' ? baseTitle : val;
      close();
      return;
    }
    const sort = e.target.closest('[data-tl-sort]');
    if (sort) {
      popover.querySelectorAll('[data-tl-sort]').forEach(b => b.classList.toggle('is-active', b === sort));
      close();
      return;
    }
    const toggle = e.target.closest('[data-tl-toggle]');
    if (toggle) {
      toggle.classList.toggle('is-active');
    }
  });

  // 點外面關閉
  document.addEventListener('click', (e) => {
    if (!currentMode) return;
    if (popover.contains(e.target) || toolbar.contains(e.target)) return;
    close();
  });
};
