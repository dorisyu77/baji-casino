/* BAJI Casino desktop home — entry script
 * 載入順序：hero / category-tabs / providers-scroll / about-toggle / back-to-top
 */
(function () {
  'use strict';

  // ===== Hero carousel =====
  const hero = document.querySelector('.hero');
  if (hero) {
    const track = hero.querySelector('.hero__track');
    const slides = hero.querySelectorAll('.hero__slide');
    const dotsWrap = hero.querySelector('.hero__dots');
    const prev = hero.querySelector('.hero__nav--prev');
    const next = hero.querySelector('.hero__nav--next');
    let idx = 0;
    let timer;

    // build dots
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'hero__dot' + (i === 0 ? ' hero__dot--active' : '');
      dot.type = 'button';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dot.addEventListener('click', () => go(i));
      dotsWrap.appendChild(dot);
    });

    function go(i) {
      idx = (i + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + (idx * 100) + '%)';
      dotsWrap.querySelectorAll('.hero__dot').forEach((d, j) => {
        d.classList.toggle('hero__dot--active', j === idx);
      });
      restart();
    }
    function restart() {
      clearInterval(timer);
      timer = setInterval(() => go(idx + 1), 5000);
    }

    prev?.addEventListener('click', () => go(idx - 1));
    next?.addEventListener('click', () => go(idx + 1));
    hero.addEventListener('mouseenter', () => clearInterval(timer));
    hero.addEventListener('mouseleave', restart);
    restart();
  }

  // ===== Category tabs =====
  document.querySelectorAll('.category-tabs__list').forEach(list => {
    list.addEventListener('click', e => {
      const tab = e.target.closest('.category-tab');
      if (!tab) return;
      list.querySelectorAll('.category-tab').forEach(t => t.classList.remove('category-tab--active'));
      tab.classList.add('category-tab--active');
    });
  });

  // ===== Side nav active toggle =====
  document.querySelectorAll('.side-nav__list').forEach(list => {
    list.addEventListener('click', e => {
      const item = e.target.closest('.side-nav__item');
      if (!item) return;
      list.querySelectorAll('.side-nav__item').forEach(i => i.classList.remove('side-nav__item--active'));
      item.classList.add('side-nav__item--active');
    });
  });

  // ===== Providers / labeled-carousel scroll on wheel =====
  document.querySelectorAll('.providers__viewport, .labeled-carousel__viewport').forEach(vp => {
    vp.addEventListener('wheel', e => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        vp.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    }, { passive: false });
  });

  // ===== About Show More toggle =====
  const aboutBtn = document.querySelector('.footer__about-toggle');
  const aboutDesc = document.querySelector('.footer__description');
  if (aboutBtn && aboutDesc) {
    aboutBtn.addEventListener('click', () => {
      const expanded = aboutDesc.classList.toggle('footer__description--expanded');
      aboutBtn.textContent = expanded ? 'Show Less' : 'Show More';
    });
  }

  // ===== Back to top =====
  const btt = document.querySelector('.back-to-top');
  if (btt) {
    const scrollEl = document.querySelector('.layout__main') || window;
    const checkScroll = () => {
      const y = scrollEl === window ? window.scrollY : scrollEl.scrollTop;
      btt.classList.toggle('is-visible', y > 600);
    };
    (scrollEl === window ? window : scrollEl).addEventListener('scroll', checkScroll, { passive: true });
    btt.addEventListener('click', () => {
      if (scrollEl === window) window.scrollTo({ top: 0, behavior: 'smooth' });
      else scrollEl.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== Scroll reveal (main-page__body 內 section 進入 viewport 時 fade-in) =====
  const reveal = (el) => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  };
  const targets = document.querySelectorAll('.main-page__body > section, .footer-links, .footer__row, .footer__about');
  targets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    el.style.transition = 'opacity 400ms ease, transform 400ms ease';
  });
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) { reveal(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.05 });
    targets.forEach(el => io.observe(el));
  } else {
    targets.forEach(reveal);
  }
})();
