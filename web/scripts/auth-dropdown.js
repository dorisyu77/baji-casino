// 共用 dropdown 控制器（IIFE，與 mobile/scripts/auth-dropdown.js 邏輯同步）
// 支援 [data-dropdown] (listbox 風格)
// 注意：CLAUDE.md 規定 web 包用普通 <script defer> 非 module，故手抄一份不共用模組
(function () {
  const Q_DROPDOWN = '[data-dropdown]';

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
    document.querySelectorAll(Q_DROPDOWN + '.is-open').forEach(function (root) {
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
    const opts = getOptions(root);
    const active = opts.find(function (o) { return o.classList.contains('auth-dropdown__option--active'); }) || opts[0];
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
    const textTarget = root.dataset.triggerTextTarget;
    const textEl = textTarget ? trigger.querySelector(textTarget) : trigger.querySelector('[data-trigger-text]');
    if (textEl) textEl.textContent = opt.dataset.label || opt.dataset.value || '';
    const flagEl = trigger.querySelector('[data-trigger-flag]');
    if (flagEl && opt.dataset.flag) flagEl.textContent = opt.dataset.flag;
    getOptions(root).forEach(function (o) {
      o.classList.toggle('auth-dropdown__option--active', o === opt);
    });
    root.dispatchEvent(new CustomEvent('dropdown:change', {
      detail: { value: opt.dataset.value, label: opt.dataset.label },
      bubbles: true,
    }));
    closeDropdown(root);
    trigger.focus();
  }

  function bindDropdown(root) {
    const trigger = getTrigger(root);
    if (!trigger) return;

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (root.classList.contains('is-open')) {
        closeDropdown(root);
      } else {
        openDropdown(root);
      }
    });

    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDropdown(root);
      }
    });

    const opts = getOptions(root);
    opts.forEach(function (opt, idx) {
      opt.addEventListener('click', function (e) {
        e.stopPropagation();
        selectOption(root, opt);
      });
      opt.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          opts[(idx + 1) % opts.length].focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          opts[(idx - 1 + opts.length) % opts.length].focus();
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

  function bindGlobal() {
    document.addEventListener('click', function (e) {
      const inside = e.target.closest(Q_DROPDOWN);
      if (!inside) closeAllDropdowns(null);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        const open = document.querySelector(Q_DROPDOWN + '.is-open');
        if (open) {
          closeDropdown(open);
          const trigger = getTrigger(open);
          if (trigger) trigger.focus();
        }
      }
    });
  }

  function init() {
    document.querySelectorAll(Q_DROPDOWN).forEach(bindDropdown);
    bindGlobal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
