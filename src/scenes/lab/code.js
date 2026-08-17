import * as THREE from 'three';
import { store } from '../../core/store';
import { rand, damp, textTexture } from '../../core/utils';
import { COLORS } from '../_shared';

/**
 * EXPÉRIENCE C — CODE SPACE
 * Fragments de code flottants dans l'espace. Chaque mot-clé dérive
 * lentement, tourne sur lui-même et réagit au curseur.
 */
export default function createCodeSpace() {
  const group = new THREE.Group();
  const isMobile = store.features.isMobile;

  const words = ['const', 'function', 'class', 'async', 'await', 'return', 'API', 'DATABASE', 'AI', 'deploy', 'sync', 'pipeline'];
  const colors = [COLORS.cyan, COLORS.gold, COLORS.coral, COLORS.violet];
  const spriteCount = isMobile ? 8 : words.length;

  const sprites = [];
  const depth = [];
  for (let i = 0; i < spriteCount; i++) {
    const word = words[i % words.length];
    const tex = textTexture(word, {
      font: '500 52px "IBM Plex Mono", monospace',
      accent: i % 2 ? '#FF7A5C' : '#22D3EE',
    });
    const mat = new THREE.SpriteMaterial({
      map: tex,
      transparent: true,
      depthWrite: false,
    });
    const sprite = new THREE.Sprite(mat);
    const aspect = tex.image.width / tex.image.height;
    const h = rand(0.8, 1.2);
    sprite.scale.set(h * aspect, h, 1);
    sprite.position.set(
      rand(-5.4, 5.4),
      rand(-2.4, 2.4),
      rand(-2.5, 0.5)
    );
    sprite.userData = {
      word,
      base: sprite.position.clone(),
      speed: rand(0.25, 0.6),
      phase: rand(0, Math.PI * 2),
      rot: rand(-1, 1),
      _sx: sprite.scale.x,
      _sy: sprite.scale.y,
    };
    depth.push(sprite.position.z);
    group.add(sprite);
    sprites.push(sprite);
  }

  const dust = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({ color: 0x6c5ce7, size: 0.02, transparent: true, opacity: 0.4, depthWrite: false })
  );
  dust.geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(
      Float32Array.from({ length: 200 * 3 }, () => rand(-8, 8)),
      3
    )
  );
  group.add(dust);

  let hovered = null;
  let selected = null;
  let pulse = 0;

  function setHover(s) {
    if (s === hovered) return;
    hovered = s;
    if (!store.features.isTouch) document.body.style.cursor = hovered ? 'pointer' : '';
    if (hovered) {
      store.emit('lab:info', {
        kind: 'hover',
        title: hovered.userData.word.toUpperCase(),
        body: 'Fragment de code en orbite.',
      });
    } else {
      store.emit('lab:info', { kind: 'clear' });
    }
  }

  return {
    name: 'lab-code',
    group,
    mount() {},
    pointerMove(ndc, raycaster, camera) {
      raycaster.setFromCamera(ndc, camera);
      const hits = raycaster.intersectObjects(sprites);
      setHover(hits.length ? hits[0].object : null);
      if (store.features.isTouch && hits.length) this.onSelect(hits[0].object);
    },
    onSelect(sprite) {
      selected = sprite;
      pulse = 1;
      store.emit('lab:info', {
        kind: 'select',
        title: sprite.userData.word.toUpperCase(),
        body: 'Mot-clé flottant de l’espace code — purement esthétique.',
      });
    },
    pointerDown(ndc, raycaster, camera) {
      raycaster.setFromCamera(ndc, camera);
      const hits = raycaster.intersectObjects(sprites);
      if (hits.length) this.onSelect(hits[0].object);
    },
    pointerUp() {},
    update(state) {
      const t = state.t;
      pulse = Math.max(0, pulse - state.dt * 2);
      const m = state.mouse;

      for (let i = 0; i < sprites.length; i++) {
        const s = sprites[i];
        const u = s.userData;
        s.position.x = u.base.x + Math.sin(t * u.speed * 0.4 + u.phase) * 0.5 + m.x * depth[i] * 0.55;
        s.position.y = u.base.y + Math.sin(t * u.speed + u.phase) * 0.35;
        s.material.rotation = Math.sin(t * 0.4 * u.rot + u.phase) * 0.12;

        const isH = s === hovered;
        const isS = s === selected;
        const k = 1 + (isH ? 0.4 : 0) + (isS ? pulse * 0.6 : 0);
        const f = damp(state.dt, 9);
        s.scale.x += (s.userData._sx * k - s.scale.x) * f;
        s.scale.y += (s.userData._sy * k - s.scale.y) * f;
        s.material.opacity = isH ? 1 : isS ? 0.92 : 0.78;
      }

      dust.rotation.y = t * 0.02;
    },
    reset() {
      hovered = null;
      selected = null;
      pulse = 0;
      store.emit('lab:info', { kind: 'clear' });
    },
  };
}
