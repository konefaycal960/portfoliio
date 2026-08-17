import { store } from './core/store';
import { clamp } from './core/utils';

/**
 * SCROLL — double mode.
 * Desktop : scroll virtuel fluide (transform sur #smooth), lecture du wheel
 *           avec interpolation → sensation premium.
 * Tactile / reduced-motion : scroll natif.
 */
export function initSmoothScroll({ onUpdate }) {
  const f = store.features;
  const viewport = document.getElementById('viewport');
  const smooth = document.getElementById('smooth');
  const progressBar = document.getElementById('progressBar');

  const custom = !f.isTouch && !f.reducedMotion && smooth && viewport;
  document.body.classList.add(custom ? 'custom-scroll' : 'no-smooth');

  let max = 0;
  let target = 0;
  let y = 0;
  let velocity = 0;
  let raf = null;
  let last = performance.now();

  function measureMax() {
    max = custom
      ? Math.max(0, smooth.scrollHeight - viewport.clientHeight)
      : Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    store.scroll.max = max;
    measureSections();
  }

  function measureSections() {
    const els = document.querySelectorAll('[data-scene]');
    store.sections = [];
    els.forEach((el) => {
      const top = custom ? el.offsetTop : el.getBoundingClientRect().top + window.scrollY;
      const height = el.offsetHeight;
      store.sections.push({ name: el.id, top, height, center: top + height / 2 });
    });
  }

  window.addEventListener('resize', () => {
    measureMax();
    if (!custom) {
      target = y = window.scrollY;
    }
    target = clamp(target, 0, max);
    y = clamp(y, 0, max);
    apply();
  });

  function apply() {
    if (custom) {
      smooth.style.transform = `translate3d(0, ${-y.toFixed(2)}px, 0)`;
    }
    if (progressBar) progressBar.style.transform = `scaleX(${max ? y / max : 0})`;
    document.documentElement.style.setProperty('--scroll', max ? (y / max).toFixed(4) : '0');
  }

  function updateStore() {
    store.scroll.y = y;
    store.scroll.target = target;
    store.scroll.velocity = velocity;
    store.scroll.progress = max ? y / max : 0;
    store.scroll.centerY = y + store.viewport.h / 2;
    store.scroll.raw = custom ? y : window.scrollY;
    if (onUpdate) onUpdate(y);
  }

  function tick(now) {
    const dt = clamp((now - last) / 1000, 0, 0.05);
    last = now;

    if (custom) {
      const k = 1 - Math.exp(-dt * 7);
      const prev = y;
      y += (target - y) * k;
      velocity = y - prev;
      apply();
    } else {
      y = window.scrollY || window.scrollY;
    }
    updateStore();

    raf = requestAnimationFrame(tick);
  }

  if (custom) {
    // Wheel
    window.addEventListener(
      'wheel',
      (e) => {
        if (document.body.classList.contains('modal-active')) return;
        e.preventDefault();
        const delta = e.deltaMode === 1 ? e.deltaY * 32 : e.deltaY;
        target = clamp(target + delta, 0, max);
      },
      { passive: false }
    );

    // Clavier
    const keyMap = {
      ArrowDown: 90,
      ArrowUp: -90,
      PageDown: 600,
      PageUp: -600,
      ' ': 600,
    };
    document.addEventListener('keydown', (e) => {
      if (e.target.matches('input, textarea, select')) return;
      if (document.body.classList.contains('modal-active')) return;
      if (e.key in keyMap) {
        e.preventDefault();
        target = clamp(target + keyMap[e.key], 0, max);
      } else if (e.key === 'Home') {
        e.preventDefault();
        target = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        target = max;
      }
    });
  } else {
    window.addEventListener(
      'scroll',
      () => {
        y = window.scrollY;
      },
      { passive: true }
    );
  }

  /** Défilement doux vers un élément (ancres, hero, menu). */
  function scrollTo(el, offset = 0) {
    const top = el.offsetTop;
    target = clamp(top - offset, 0, max);
    if (!custom) {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  }

  // Accessibilité : faire défiler quand un élément hors écran reçoit le focus
  if (custom) {
    document.addEventListener('focusin', (e) => {
      const el = e.target;
      if (!el || el === document.body || !el.offsetTop) return;
      if (document.body.classList.contains('menu-open') || document.body.classList.contains('modal-active')) return;
      const rect = el.getBoundingClientRect();
      const vh = store.viewport.h;
      if (rect.top < 0 || rect.bottom > vh) {
        const top = el.offsetTop - vh * 0.18;
        target = clamp(top, 0, max);
      }
    });
  }

  function setTarget(t) {
    target = clamp(t, 0, max);
    if (!custom) window.scrollTo({ top: target, behavior: 'smooth' });
  }

  measureMax();
  target = y = custom ? window.scrollY : window.scrollY;
  apply();
  updateStore();
  raf = requestAnimationFrame(tick);

  return { scrollTo, setTarget, remeasure: measureMax, get y() { return y; } };
}
