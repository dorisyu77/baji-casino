// About Show More 展開/收合
window.initAboutToggle = function initAboutToggle(root = document) {
  const btn = root.querySelector('[data-about-toggle]');
  const section = btn && btn.closest('.about');
  if (!btn || !section) return;

  btn.addEventListener('click', () => {
    const expanded = section.classList.toggle('is-expanded');
    btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    btn.textContent = expanded ? 'Show less' : 'Show more';
    if (!expanded) {
      // 收合時捲回 section 頂
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
};
