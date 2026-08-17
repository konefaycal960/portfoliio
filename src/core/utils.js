import * as THREE from 'three';

/* Utilitaires génériques : math, easing, création de textures texte. */

export const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
export const lerp = (a, b, t) => a + (b - a) * t;
export const map = (v, a, b, c, d) => c + ((d - c) * (v - a)) / (b - a || 1);
export const smoothstep = (a, b, x) => {
  const t = clamp((x - a) / (b - a || 1), 0, 1);
  return t * t * (3 - 2 * t);
};

/** Facteur d'interpolation frame-rate independant (lissé). */
export const damp = (dt, lambda = 3.5) => 1 - Math.exp(-dt * lambda);

export const rand = (min = 0, max = 1) => min + Math.random() * (max - min);
export const randInt = (min, max) => Math.floor(rand(min, max + 1));
export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/** Détection de capacités de l'appareil. */
export function detectFeatures() {
  const ua = navigator.userAgent.toLowerCase();
  const isMobileUA = /android|iphone|ipad|ipod|mobile/i.test(ua);
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const isTouch = coarse || ('ontouchstart' in window && !window.matchMedia('(hover: hover)').matches);
  const cores = navigator.hardwareConcurrency || 4;
  const mem = navigator.deviceMemory || (isMobileUA ? 4 : 8);
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const lowTier = isTouch || cores <= 4 || mem <= 4;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return {
    isTouch,
    isMobile: isTouch || isMobileUA,
    reducedMotion,
    dpr,
    lowTier,
    particleFactor: lowTier ? 0.45 : 1,
    pixelRatio: lowTier ? Math.min(dpr, 1.5) : dpr,
  };
}

/** Crée une texture Canvas contenant un texte (utilisée pour les sprites 3D). */
export function textTexture(text, opts = {}) {
  const {
    font = '500 42px "IBM Plex Mono", monospace',
    color = '#F4F1FF',
    bg = 'rgba(16,14,38,0.92)',
    border = 'rgba(255,255,255,0.28)',
    accent = null,
    padX = 26,
    padY = 22,
    radius = 16,
    borderW = 2,
    scale = 2,
  } = opts;

  const c = document.createElement('canvas');
  const ctx = c.getContext('2d');
  ctx.font = font;
  const tw = Math.ceil(ctx.measureText(text).width);
  const th = 42;

  c.width = (tw + padX * 2 + borderW * 2) * scale;
  c.height = (th + padY * 2 + borderW * 2) * scale;
  ctx.scale(scale, scale);

  const w = c.width / scale;
  const h = c.height / scale;

  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(borderW, borderW, w - borderW * 2, h - borderW * 2, radius);
  else ctx.rect(borderW, borderW, w - borderW * 2, h - borderW * 2);
  ctx.fillStyle = bg;
  ctx.fill();

  ctx.lineWidth = borderW;
  ctx.strokeStyle = border;
  ctx.stroke();

  if (accent) {
    ctx.beginPath();
    ctx.roundRect(0, h / 2 - 2, 5, 4, 2);
    ctx.fillStyle = accent;
    ctx.fill();
  }

  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, w / 2, h / 2 + 1);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = 'srgb';
  tex.needsUpdate = true;
  return tex;
}

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Export par défaut silencieux pour faciliter l'import */
export default { clamp, lerp, map, smoothstep, damp, rand, randInt, pick, textTexture };
