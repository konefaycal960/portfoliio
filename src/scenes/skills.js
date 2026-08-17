import * as THREE from 'three';
import { store } from '../core/store';
import { damp } from '../core/utils';
import { COLORS, makePoints, makeLabel, makeGlow, makeWire } from './_shared';

/**
 * SKILLS — Digital Prism Core.
 * Un prisme triangulaire central (arêtes lumineuses, cœur en rotation) et les
 * compétences en orbite autour, sur un anneau incliné. Hover = mise en
 * évidence ; click = sélection (le prisme pivote vers la compétence, change de
 * couleur) et met à jour le panneau. Les chips du panneau restent synchronisés.
 */
export default function createSkillsScene(data) {
  const group = new THREE.Group();
  const isMobile = store.features.isMobile;
  const pf = store.features.particleFactor;
  const s = isMobile ? 0.78 : 1;

  const layerHex = ['#22d3ee', '#6c5ce7', '#f5c067', '#ff7a5c'];
  const layerColors = layerHex.map((h) => new THREE.Color(h));
  const prismR = 1.05 * s;
  const prismH = 2.0 * s;
  const orbitR = (isMobile ? 2.05 : 2.5) * s;

  const cluster = new THREE.Group();
  cluster.position.set(0, isMobile ? 0.4 : 0.6, 0);

  /* ------------------------------ PRISME CORE ------------------------------ */
  const prismGeo = new THREE.CylinderGeometry(prismR, prismR, prismH, 3);
  prismGeo.translate(0, 0, 0);
  const prismMat = new THREE.MeshBasicMaterial({
    color: COLORS.cyan,
    transparent: true,
    opacity: 0.3,
    depthWrite: false,
    flatShading: true,
  });
  const prism = new THREE.Mesh(prismGeo, prismMat);

  const edgeGeo = new THREE.EdgesGeometry(prismGeo);
  const edges = new THREE.LineSegments(
    edgeGeo,
    new THREE.LineBasicMaterial({
      color: 0x8f88ff,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );

  const inner = makeWire(
    new THREE.CylinderGeometry(prismR * 0.55, prismR * 0.55, prismH * 0.72, 3),
    COLORS.gold,
    0.55
  );
  inner.rotation.z = Math.PI / 2;

  const coreGlow = makeGlow(prismR * 2.1, '#6c5ce7');
  coreGlow.position.z = -0.2;

  const core = new THREE.Group();
  core.add(prism, edges, inner, coreGlow);
  core.rotation.y = Math.PI / 6;
  cluster.add(core);

  /* ------------------------------ ORBITE ------------------------------ */
  const orbit = new THREE.Group();
  orbit.rotation.x = isMobile ? 0.28 : 0.32;
  cluster.add(orbit);

  const nodes = []; // { mesh, label, glow, skill, layer, baseColor, flatIndex, baseAngle }
  const layers = data.skills.map((c) => c.items.length);
  let flatIndex = 0;

  data.skills.forEach((cat, li) => {
    cat.items.forEach((skill, j) => {
      const baseAngle = (flatIndex / (layers.reduce((a, b) => a + b, 0))) * Math.PI * 2;
      const pos = new THREE.Vector3(
        orbitR * Math.cos(baseAngle),
        0,
        orbitR * Math.sin(baseAngle)
      );

      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.13 * s, 16, 16),
        new THREE.MeshBasicMaterial({ color: layerColors[li] })
      );
      mesh.position.copy(pos);
      mesh.userData = { flatIndex };
      orbit.add(mesh);

      const glow = makeGlow(0.55 * s, layerHex[li]);
      glow.position.copy(pos);
      orbit.add(glow);

      const label = makeLabel(skill.name, {
        height: (isMobile ? 0.3 : 0.38) * s,
        font: '600 42px "IBM Plex Mono", monospace',
        color: '#F4F1FF',
        bg: 'rgba(0,0,0,0)',
        border: 'rgba(0,0,0,0)',
        accent: layerHex[li],
      });
      label.position.copy(pos);
      label.position.y += (isMobile ? 0.42 : 0.5) * s;
      orbit.add(label);

      nodes.push({
        mesh,
        glow,
        label,
        skill,
        layer: li,
        baseColor: layerColors[li],
        flatIndex,
        baseAngle,
        glowBase: 0.55 * s,
      });
      flatIndex++;
    });
  });

  // Étiquettes de catégorie (en bas, hors anneau)
  if (!isMobile) {
    data.skills.forEach((cat, li) => {
      const label = makeLabel(cat.category, {
        height: 0.28,
        font: '600 30px "IBM Plex Mono", monospace',
        color: '#8F88FF',
        bg: 'rgba(0,0,0,0)',
        border: 'rgba(0,0,0,0)',
      });
      label.position.set((li - (layers.length - 1) / 2) * 2.2, -3.1, 0);
      cluster.add(label);
    });
  }

  // Poussière ambiante
  const dust = makePoints({
    count: Math.round(130 * pf),
    radius: 6.5,
    size: 0.015,
    color: 0x8f88ff,
    opacity: 0.25,
  });
  group.add(cluster, dust);

  let hovered = null;
  let selectedIndex = -1;
  const targetColor = new THREE.Color(COLORS.cyan);

  function setHover(n) {
    if (n === hovered) return;
    hovered = n;
    if (!store.features.isTouch) document.body.style.cursor = hovered ? 'pointer' : '';
  }

  function select(index) {
    selectedIndex = index;
    const node = nodes[index];
    if (!node) return;
    targetColor.copy(node.baseColor);
    store.emit('skill:select', { index, skill: node.skill, category: node.skill.category });
  }

  const offSelectUi = store.on('skill:select-ui', (i) => {
    if (i >= 0 && i < nodes.length) select(i);
  });

  return {
    name: 'skills',
    group,
    pointerMove(ndc, raycaster, camera) {
      raycaster.setFromCamera(ndc, camera);
      const hits = raycaster.intersectObjects(nodes.map((n) => n.mesh));
      setHover(hits.length ? nodes.find((n) => n.mesh === hits[0].object) : null);
      if (store.features.isTouch && hits.length) select(hits[0].object.userData.flatIndex);
    },
    pointerDown(ndc, raycaster, camera) {
      raycaster.setFromCamera(ndc, camera);
      const hits = raycaster.intersectObjects(nodes.map((n) => n.mesh));
      if (hits.length) select(hits[0].object.userData.flatIndex);
    },
    pointerUp() {},
    update(state) {
      const t = state.t;
      const dt = state.dt;
      const sc = state.scrollLocal;

      // Rotation de l'anneau d'orbite
      orbit.rotation.y += dt * 0.14;
      orbit.rotation.x = (isMobile ? 0.28 : 0.32) + Math.sin(t * 0.3) * 0.02;

      // Le prisme pivote vers la compétence sélectionnée
      if (selectedIndex >= 0) {
        const node = nodes[selectedIndex];
        const ang = node.baseAngle + orbit.rotation.y + Math.PI / 2;
        let diff = ang - core.rotation.y;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        core.rotation.y += diff * damp(dt, 2.6);
      }
      inner.rotation.y -= dt * 0.5;
      inner.rotation.z = Math.PI / 2 + Math.sin(t * 0.4) * 0.08;
      prismMat.color.lerp(targetColor, damp(dt, 4));

      // Survol / sélection des nœuds
      for (const node of nodes) {
        const isHover = node.mesh === hovered;
        const isSel = node.flatIndex === selectedIndex;
        const f = damp(dt, 9);

        const mk = isHover ? 1.6 : isSel ? 1.4 : 1;
        const ms = node.mesh.scale.x;
        node.mesh.scale.setScalar(ms + (mk - ms) * f);
        node.mesh.material.color.set(isHover || isSel ? COLORS.ink : node.baseColor);

        const gk = isHover || isSel ? node.glowBase * 1.6 : node.glowBase;
        const gs = node.glow.scale.x;
        node.glow.scale.setScalar(gs + (gk - gs) * f);

        const lk = isHover || isSel ? 1.18 : 1;
        const ls = node.label.scale.x;
        node.label.scale.setScalar(ls + (lk - ls) * f);
      }

      cluster.position.y = (isMobile ? 0.4 : 0.6) - sc * 1.2;
      cluster.scale.setScalar(1 - sc * 0.1);
      dust.rotation.y = t * 0.012;
      coreGlow.material.opacity = 0.55 + Math.sin(t * 1.2) * 0.2;
    },
    cameraPose(state) {
      const sc = state.scrollLocal;
      return {
        pos: [0, (isMobile ? 0.4 : 0.6) * 0.8 - sc * 0.7, (isMobile ? 7.0 : 7.6) + sc * 2],
        target: [0, isMobile ? 0.4 : 0.6, 0],
      };
    },
    dispose() {
      offSelectUi();
      group.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          const mats = Array.isArray(o.material) ? o.material : [o.material];
          for (const m of mats) {
            if (m.map) m.map.dispose();
            m.dispose();
          }
        }
      });
    },
  };
}
