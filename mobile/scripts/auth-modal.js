// Login / Sign up modal：不實作真實 auth，僅 UI 流程 + 表單 alert
window.initAuthModal = function initAuthModal(root = document) {
  const modal = root.querySelector('[data-modal]');
  if (!modal) return;

  const forms = Array.from(modal.querySelectorAll('[data-modal-form]'));
  const tabs = Array.from(modal.querySelectorAll('[data-modal-tab]'));
  let lastFocused = null;

  function show(target = 'login') {
    lastFocused = document.activeElement;
    modal.hidden = false;
    setTab(target);
    document.body.style.overflow = 'hidden';
    const firstInput = modal.querySelector(`[data-modal-form="${target}"] input`);
    if (firstInput) firstInput.focus();
  }

  function hide() {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  function setTab(name) {
    tabs.forEach(t => t.classList.toggle('is-active', t.dataset.modalTab === name));
    forms.forEach(f => {
      f.hidden = f.dataset.modalForm !== name;
    });
  }

  // 開啟 triggers
  root.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      show(btn.dataset.openModal || 'login');
    });
  });

  // 關閉 (backdrop + 關閉按鈕)
  modal.querySelectorAll('[data-modal-close]').forEach(el => {
    el.addEventListener('click', hide);
  });

  // Esc 關閉
  document.addEventListener('keydown', (e) => {
    if (!modal.hidden && e.key === 'Escape') hide();
  });

  // Tab 切換
  tabs.forEach(tab => {
    tab.addEventListener('click', () => setTab(tab.dataset.modalTab));
  });

  // Submit（靜態模擬）
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const type = form.dataset.modalForm;
      // 簡單驗證
      const invalid = Array.from(form.querySelectorAll('input')).find(i => !i.checkValidity());
      if (invalid) {
        invalid.focus();
        invalid.style.borderColor = '#d8526c';
        return;
      }
      form.querySelector('.modal__submit').textContent =
        type === 'signup' ? 'Signed up ✓' : 'Logged in ✓';
      setTimeout(() => hide(), 700);
    });
  });
};
