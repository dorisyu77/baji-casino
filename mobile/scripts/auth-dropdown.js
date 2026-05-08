// 共用 dropdown / collapsible 控制器
// 支援 [data-dropdown] (listbox 風格) 與 [data-collapsible] (摺疊面板)

const Q_DROPDOWN = '[data-dropdown]';
const Q_COLLAPSIBLE = '[data-collapsible]';

function getOptions(root) {
  return Array.from(root.querySelectorAll('.auth-dropdown__option'));
}

function getTrigger(root) {
  return root.querySelector('[data-dropdown-trigger]');
}

function getList(root) {
  return root.querySelector('.auth-dropdown__list');
}

function closeAllDropdowns(except) {
  document.querySelectorAll(`${Q_DROPDOWN}.is-open`).forEach((root) => {
    if (root === except) return;
    closeDropdown(root);
  });
}

function openDropdown(root) {
  closeAllDropdowns(root);
  root.classList.add('is-open');
  const trigger = getTrigger(root);
  const list = getList(root);
  if (trigger) trigger.setAttribute('aria-expanded', 'true');
  if (list) list.hidden = false;
  // focus 目前 active 或第一個
  const opts = getOptions(root);
  const active = opts.find((o) => o.classList.contains('auth-dropdown__option--active')) || opts[0];
  if (active) active.focus();
}

function closeDropdown(root) {
  root.classList.remove('is-open');
  const trigger = getTrigger(root);
  const list = getList(root);
  if (trigger) trigger.setAttribute('aria-expanded', 'false');
  if (list) list.hidden = true;
}

function selectOption(root, opt) {
  const trigger = getTrigger(root);
  if (!trigger) return;
  // 更新 trigger 顯示文字（依 data-trigger-text-target 或預設 [data-trigger-text]）
  const textTarget = root.dataset.triggerTextTarget;
  const textEl = textTarget ? trigger.querySelector(textTarget) : trigger.querySelector('[data-trigger-text]');
  if (textEl) textEl.textContent = opt.dataset.label || opt.dataset.value || '';
  // 更新 flag
  const flagEl = trigger.querySelector('[data-trigger-flag]');
  if (flagEl && opt.dataset.flag) flagEl.textContent = opt.dataset.flag;
  // active class 切換
  getOptions(root).forEach((o) => o.classList.toggle('auth-dropdown__option--active', o === opt));
  // dispatch event 供未來表單驗證接收
  root.dispatchEvent(new CustomEvent('dropdown:change', {
    detail: { value: opt.dataset.value, label: opt.dataset.label },
    bubbles: true,
  }));
  closeDropdown(root);
  // focus 回 trigger
  trigger.focus();
}

function bindDropdown(root) {
  const trigger = getTrigger(root);
  if (!trigger) return;

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (root.classList.contains('is-open')) {
      closeDropdown(root);
    } else {
      openDropdown(root);
    }
  });

  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openDropdown(root);
    }
  });

  getOptions(root).forEach((opt, idx, arr) => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      selectOption(root, opt);
    });
    opt.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = arr[(idx + 1) % arr.length];
        next.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = arr[(idx - 1 + arr.length) % arr.length];
        prev.focus();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectOption(root, opt);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeDropdown(root);
        trigger.focus();
      }
    });
  });
}

function bindCollapsible(root) {
  const trigger = root.querySelector('[data-collapsible-trigger]');
  const panel = root.querySelector('.auth-collapsible__panel');
  if (!trigger || !panel) return;

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = !root.classList.contains('is-open');
    root.classList.toggle('is-open', open);
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    panel.hidden = !open;
  });
}

function bindGlobal() {
  document.addEventListener('click', (e) => {
    // 任一 dropdown 開著 + 點擊在所有 dropdown 之外 → 關全部
    const inside = e.target.closest(Q_DROPDOWN);
    if (!inside) closeAllDropdowns(null);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const open = document.querySelector(`${Q_DROPDOWN}.is-open`);
      if (open) {
        closeDropdown(open);
        const trigger = getTrigger(open);
        if (trigger) trigger.focus();
      }
    }
  });
}

export function initAuthDropdown(root = document) {
  root.querySelectorAll(Q_DROPDOWN).forEach(bindDropdown);
  root.querySelectorAll(Q_COLLAPSIBLE).forEach(bindCollapsible);
  bindGlobal();
}
