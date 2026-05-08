// 區塊資料採集 helper
// 用法（在 chrome-devtools__evaluate_script 內呼叫）：
//   const fn = await fetch('/tools/section-compare/snippet.js').then(r => r.text());
//   eval(fn); // 注入到全域
//   __captureSection('.category-tabs', { sampleAnimation: false })
//
// 或直接複製整個 __captureSection 函式到 evaluate_script 的 function body。

(function () {
  // 已存在則覆蓋（方便迭代）
  window.__captureSection = function captureSection(selector, opts = {}) {
    const el = document.querySelector(selector);
    if (!el) return { ok: false, error: 'not found: ' + selector };

    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();

    const keys = [
      'width', 'height', 'padding', 'margin',
      'background', 'backgroundColor', 'backgroundImage', 'backgroundSize', 'backgroundPosition',
      'color', 'fontSize', 'fontWeight', 'lineHeight', 'fontFamily', 'letterSpacing',
      'border', 'borderRadius', 'boxShadow',
      'display', 'flexDirection', 'gap', 'justifyContent', 'alignItems',
      'gridTemplateColumns', 'gridTemplateRows',
      'position', 'top', 'left', 'right', 'bottom', 'zIndex',
      'opacity', 'transform', 'transition', 'animation', 'animationName',
      'overflow', 'overflowX', 'overflowY',
    ];
    const styles = {};
    for (const k of keys) styles[k] = cs[k];

    // 子元素摘要（深度 2）
    function digest(node, depth) {
      if (!node || depth > 2) return null;
      const ds = getComputedStyle(node);
      const children = depth < 2 ? Array.from(node.children).slice(0, 30).map(c => digest(c, depth + 1)) : [];
      return {
        tag: node.tagName,
        cls: (node.className?.toString?.() || '').slice(0, 100),
        text: depth >= 2 ? (node.textContent || '').trim().slice(0, 40) : '',
        size: { w: Math.round(node.getBoundingClientRect().width), h: Math.round(node.getBoundingClientRect().height) },
        bg: ds.backgroundImage !== 'none' ? ds.backgroundImage.slice(0, 80) : '',
        children,
      };
    }

    return {
      ok: true,
      selector,
      rect: { x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.width), h: Math.round(rect.height) },
      styles,
      structure: digest(el, 0),
      url: location.href,
    };
  };

  // 動態軌跡採樣：對 selector 的某屬性，在指定毫秒內以固定間隔抓 N 筆
  window.__sampleAnim = async function sampleAnim(selector, prop, durationMs = 600, samples = 8) {
    const el = document.querySelector(selector);
    if (!el) return { ok: false, error: 'not found' };
    const interval = Math.floor(durationMs / samples);
    const out = [];
    for (let i = 0; i < samples; i++) {
      out.push({ t: i * interval, v: getComputedStyle(el)[prop] });
      await new Promise(r => setTimeout(r, interval));
    }
    return { ok: true, prop, samples: out };
  };
})();
