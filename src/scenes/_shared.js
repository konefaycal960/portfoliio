import * as THREE from 'three';
import { rand, pick, textTexture } from '../core/utils';

export const COLORS = {
  violet: 0x6c5ce7,
  cyan: 0x22d3ee,
  gold: 0xf5c067,
  coral: 0xff7a5c,
  ink: 0xf4f1ff,
  muted: 0xa79fd0,
};

export function glowTexture(color = '#22D3EE') {
  // normalize color to a valid CSS color string
  function normalizeColor(c) {
    if (!c && c !== 0) return c;
    // numeric hex (0xRRGGBB or decimal)
    if (typeof c === 'number') {
      const s = c.toString(16).padStart(6, '0');
      return `#${s}`;
    }
    // THREE.Color instance
    if (c && typeof c === 'object' && (c.isColor || c instanceof THREE.Color)) {
      try {
        return `#${c.getHexString()}`;
      } catch (e) {
        // fallback to rgb style
        return `rgb(${Math.round((c.r || 0) * 255)}, ${Math.round((c.g || 0) * 255)}, ${Math.round((c.b || 0) * 255)})`;
      }
    }
    // otherwise assume string (e.g. '#rrggbb' or 'rgba(...)')
    return String(c);
  }

  color = normalizeColor(color);
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, color);
  g.addColorStop(0.35, color);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = 'srgb';
  return tex;
}

export function makeGlow(size, color) {
  const mat = new THREE.SpriteMaterial({
    map: glowTexture(color),
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(size, size, 1);
  return sprite;
}

export function makePoints(opts = {}) {
  const {
    count = 600,
    radius = 6,
    size = 0.025,
    color = 0x8f88ff,
    opacity = 0.65,
    box = false,
    spread = 2.4,
  } = opts;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    if (box) {
      positions[i * 3] = rand(-spread, spread);
      positions[i * 3 + 1] = rand(-spread, spread);
      positions[i * 3 + 2] = rand(-spread * 0.6, spread * 0.6);
    } else {
      const r = radius * Math.cbrt(rand(0.15, 1));
      const theta = rand(0, Math.PI * 2);
      const phi = Math.acos(rand(-1, 1));
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    size,
    color,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });
  return new THREE.Points(geo, mat);
}

export function makeWire(geo, color = COLORS.gold, opacity = 0.5) {
  const mat = new THREE.MeshBasicMaterial({
    color,
    wireframe: true,
    transparent: true,
    opacity,
    depthWrite: false,
  });
  return new THREE.Mesh(geo, mat);
}

export function makeRing(radius, color = COLORS.cyan, opts = {}) {
  const { tube = 0.008, tilt = { x: 0, y: 0, z: 0 }, opacity = 0.6 } = opts;
  const mat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 8, 96), mat);
  ring.rotation.set(tilt.x, tilt.y, tilt.z);
  return ring;
}

/** Étiquette texte (sprite) pour les scènes 3D. */
export function makeLabel(text, opts = {}) {
  const {
    height = 0.85,
    font = '500 42px "IBM Plex Mono", monospace',
    color = '#F4F1FF',
    bg = 'rgba(16,14,38,0.9)',
    border = 'rgba(255,255,255,0.3)',
    accent = null,
  } = opts;

  const tex = textTexture(text, { font, color, bg, border, accent });
  const mat = new THREE.SpriteMaterial({
    map: tex,
    transparent: true,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(mat);
  const aspect = tex.image.width / tex.image.height;
  sprite.scale.set(height * aspect, height, 1);
  return sprite;
}

export { pick };
