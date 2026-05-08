/* Auth interactions：
   - Tab 切換 (Login ↔ Sign up) + underline transform
   - Form validation：監聽 [data-required] input，全填才移除 submit 的 .is-disabled
   - Sign up step 切換：點 Continue 推進 stepper，更新 heading、stepper class、form 顯示
   原站量測值：
     underline transition: transform 0.3s ease
     submit transition:    background 0.3s
     stepper transition:   background-color 0.5s（circle/connector）+ color 0.5s（item/label）
*/
(function () {
  'use strict';

  // ===== Tab switch =====
  var root = document.querySelector('[data-auth-tabs]');
  if (root) {
    var btns = root.querySelectorAll('.auth-tabs__btn');
    var line = root.querySelector('[data-auth-line]');
    var panels = root.querySelectorAll('[data-auth-panel]');

    function setTab(name) {
      btns.forEach(function (b) {
        var active = b.getAttribute('data-tab') === name;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      panels.forEach(function (p) {
        var match = p.getAttribute('data-auth-panel') === name;
        p.hidden = !match;
      });
      if (line) line.classList.toggle('is-signup', name === 'signup');
    }

    btns.forEach(function (b) {
      b.addEventListener('click', function () { setTab(b.getAttribute('data-tab')); });
    });

    var params = new URLSearchParams(location.search);
    if (params.get('tab') === 'signup') setTab('signup');
  }

  // ===== Form validation：每個 form 內所有 [data-required] 全填才啟用 submit =====
  function bindFormValidation(form) {
    if (!form) return;
    var required = form.querySelectorAll('[data-required]');
    var submit = form.querySelector('.auth-submit');
    if (!submit || required.length === 0) return;

    function check() {
      var allFilled = Array.prototype.every.call(required, function (i) {
        return (i.value || '').trim().length > 0;
      });
      submit.classList.toggle('is-disabled', !allFilled);
    }
    required.forEach(function (i) {
      i.addEventListener('input', check);
      i.addEventListener('change', check);
    });
    check();
  }
  document.querySelectorAll('form.auth-form').forEach(bindFormValidation);

  // ===== Sign up step 切換 =====
  var signupPanel = document.querySelector('[data-auth-panel="signup"]');
  if (signupPanel) {
    var STEP_HEADINGS = { 1: 'Contact', 2: 'Personal', 3: 'Password' };
    var heading = signupPanel.querySelector('[data-step-heading]');
    var stepperItems = signupPanel.querySelectorAll('[data-step]');
    var stepperLinks = signupPanel.querySelectorAll('[data-step-link]');
    var forms = signupPanel.querySelectorAll('[data-step-form]');
    var current = 1;

    function setStep(n) {
      current = Math.max(1, Math.min(3, n));
      // heading text
      if (heading) heading.textContent = STEP_HEADINGS[current];
      // stepper item state：< current is-done, == current is-active, > current 無 class
      stepperItems.forEach(function (item) {
        var s = parseInt(item.getAttribute('data-step'), 10);
        item.classList.toggle('is-done', s < current);
        item.classList.toggle('is-active', s === current);
      });
      // connector：1-2 在 step >= 2 時 done；2-3 在 step >= 3 時 done
      stepperLinks.forEach(function (link) {
        var key = link.getAttribute('data-step-link');
        var threshold = parseInt(key.split('-')[1], 10);
        link.classList.toggle('is-done', current >= threshold);
      });
      // form 顯示：只顯示 current step
      forms.forEach(function (f) {
        f.hidden = parseInt(f.getAttribute('data-step-form'), 10) !== current;
      });
    }

    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var btn = form.querySelector('.auth-submit');
        if (btn && btn.classList.contains('is-disabled')) return;
        var step = parseInt(form.getAttribute('data-step-form'), 10);
        if (step < 3) setStep(step + 1);
      });
    });
  }

  // ===== Login form：阻止 submit 預設行為（避免 file:// 跳到 ?username=...）=====
  var loginForm = document.querySelector('[data-auth-form="login"]');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = loginForm.querySelector('.auth-submit');
      if (btn && btn.classList.contains('is-disabled')) return;
      // 真實 auth 邏輯不在本階段範圍
    });
  }
})();
