import * as THREE from 'three';
import { store } from '../../core/store';
import { rand } from '../../core/utils';
import { COLORS, makeGlow } from '../_shared';

/**
 * EXPÉRIENCE A — PARTICLE SPHERE
 * Sphère de particules : rotation lente, répulsion au curseur,
 * retour progressif à l'état initial.
 */
export default function createParticleSphere() {
  const group = new THREE.Group();
  const isMobile = store.features.isMobile;
  const count = Math.round((isMobile ? 900 : 1600) * store.features.particleFactor);

  const radius = 2.5;
  const positions = new Float32Array(count * 3);
  const base = new Float32Array(count * 3);
  const home = new Float32Array(count * 3);
  const phases = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const r = radius * Math.cbrt(rand(0.4, 1));
    const theta = rand(0, Math.PI * 2);
    const phi = Math.acos(rand(-1, 1));
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    base[i * 3] = x;
    base[i * 3 + 1] = y;
    base[i * 3 + 2] = z;
    home[i * 3] = x;
    home[i * 3 + 1] = y;
    home[i * 3 + 2] = z;
    phases[i] = rand(0, Math.PI * 2);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    size: isMobile ? 0.035 : 0.04,
    color: 0x22d3ee,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(geo, mat);

  const core = new THREE.Mesh(
    new THREE.SphereGeometry(0.28, 24, 24),
    new THREE.MeshBasicMaterial({ color: COLORS.violet })
  );
  const glow = makeGlow(3.2, 'rgba(34,211,238,0.3)');
  glow.position.z = -0.4;

  const cursorGlow = makeGlow(1.8, 'rgba(245,192,103,0.6)');
  cursorGlow.visible = false;

  group.add(points, core, glow, cursorGlow);

  const mouseWorld = new THREE.Vector3(99, 99, 0);
  const rayPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

  return {
    name: 'lab-sphere',
    group,
    mount() {},
    pointerMove(ndc, raycaster, camera) {
      raycaster.setFromCamera(ndc, camera);
      raycaster.ray.intersectPlane(rayPlane, mouseWorld);
      cursorGlow.visible = true;
    },
    pointerUp() {},
    update(state) {
      const t = state.t;
      const dt = state.dt;
      const attr = geo.attributes.position;
      const arr = attr.array;
      const f = store.features.particleFactor;
      const influence = 2.4;

      for (let i = 0; i < count; i++) {
        const ix = i * 3;

        // rotation lente
        const a = t * 0.05 + phases[i] * 0.1;
        const bx = base[ix] * Math.cos(a) - base[ix + 1] * Math.sin(a) * 0.2;
        const by = base[ix] * Math.sin(a) * 0.2 + base[ix + 1] * Math.cos(a);
        const bz = base[ix + 2];

        let px = bx;
        let py = by;
        let pz = bz;

        // répulsion près du curseur
        const dx = bx - mouseWorld.x;
        const dy = by - mouseWorld.y;
        const dz = bz - mouseWorld.z;
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < influence * influence) {
          const d = Math.sqrt(d2) || 0.001;
          const power = (1 - d / influence) * 1.6 * f;
          px = bx + (dx / d) * power;
          py = by + (dy / d) * power;
          pz = bz + (dz / d) * power;
        }

        // retour progressif à la position d'origine
        const k = 1 - Math.exp(-dt * 2.2);
        arr[ix] += (px - arr[ix]) * k;
        arr[ix + 1] += (py - arr[ix + 1]) * k;
        arr[ix + 2] += (pz - arr[ix + 2]) * k;
      }
      attr.needsUpdate = true;

      points.rotation.y = t * 0.1;
      core.material.color.setHSL((t * 0.03) % 1, 0.7, 0.62);
      cursorGlow.position.copy(mouseWorld);
      cursorGlow.scale.setScalar(1 + Math.sin(t * 4) * 0.15);
    },
    reset() {
      mouseWorld.set(99, 99, 0);
      cursorGlow.visible = false;
      const attr = geo.attributes.position;
      const arr = attr.array;
      for (let i = 0; i < count * 3; i++) arr[i] = home[i];
      attr.needsUpdate = true;
    },
  };
}
