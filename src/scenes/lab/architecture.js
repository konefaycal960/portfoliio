import * as THREE from 'three';
import { store } from '../../core/store';
import { rand, pick, textTexture } from '../../core/utils';
import { COLORS, makeLabel } from '../_shared';

/**
 * EXPÉRIENCE D — SOFTWARE ARCHITECTURE
 * Diagramme d'architecture 3D : FRONTEND → API → BACKEND / AI → DATABASE.
 * Blocs 3D, connexions animées, particules qui circulent.
 * Hover = bloc lumineux. Click = focus + description.
 */
export default function createArchitecture() {
  const group = new THREE.Group();
  const isMobile = store.features.isMobile;
  const s = isMobile ? 0.72 : 1;

  const nodes = [
    { id: 'FRONTEND', x: 0, y: 2.8 * s, color: COLORS.cyan, desc: 'Interfaces web & mobile côté utilisateur.', tech: 'React · Flutter · React Native' },
    { id: 'API', x: 0, y: 1.15 * s, color: COLORS.violet, desc: 'Couche de contrat entre les clients et le système.', tech: 'REST · GraphQL · Django/DRF' },
    { id: 'BACKEND', x: -1.7 * s, y: -0.6 * s, color: COLORS.gold, desc: 'Logique métier, authentification, paiements, files.', tech: 'NestJS · Django · Redis/Celery' },
    { id: 'AI', x: 1.7 * s, y: -0.6 * s, color: COLORS.coral, desc: 'Modules intelligents : analyse, prédiction, génération.', tech: 'Python · Services Cloud' },
    { id: 'DATABASE', x: 0, y: -2.3 * s, color: COLORS.muted, desc: 'Persistance et cohérence des données applicatives.', tech: 'PostgreSQL · Supabase' },
  ];

  const edges = [
    [0, 1],
    [1, 2],
    [1, 3],
    [2, 4],
    [3, 4],
  ];

  const blocks = [];
  const labels = [];

  nodes.forEach((n, i) => {
    const w = 2.3 * s;
    const h = 0.78 * s;
    const d = 0.7 * s;
    const mat = new THREE.MeshBasicMaterial({ color: n.color, transparent: true, opacity: 0.9 });
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(n.x, n.y, 0);
    mesh.userData = { node: n, baseColor: n.color };
    group.add(mesh);
    blocks.push(mesh);

    const edgesGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d));
    const edgesMesh = new THREE.LineSegments(
      edgesGeo,
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.18 })
    );
    mesh.add(edgesMesh);

    const label = makeLabel(n.id, {
      height: 0.5 * s,
      font: '600 44px "IBM Plex Mono", monospace',
      color: n.id === 'DATABASE' ? '#A79FD0' : '#FFFFFF',
      bg: 'rgba(10,9,22,0.72)',
      border: 'rgba(255,255,255,0.16)',
    });
    label.position.set(n.x, n.y - h / 2 - 0.42 * s, 0.1);
    group.add(label);
    labels.push(label);
  });

  // Connexions + impulsions
  const edgeList = edges.map(([a, b]) => ({
    a: new THREE.Vector3(nodes[a].x, nodes[a].y, 0),
    b: new THREE.Vector3(nodes[b].x, nodes[b].y, 0),
  }));
  const linePos = [];
  edgeList.forEach((e) => linePos.push(e.a.x, e.a.y, 0, e.b.x, e.b.y, 0));
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
  const lines = new THREE.LineSegments(
    lineGeo,
    new THREE.LineBasicMaterial({ color: 0x8f88ff, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  group.add(lines);

  const impCount = isMobile ? 12 : 22;
  const impMeshes = [];
  const impGeo = new THREE.SphereGeometry(0.055, 8, 8);
  for (let i = 0; i < impCount; i++) {
    const mesh = new THREE.Mesh(impGeo, new THREE.MeshBasicMaterial({ color: COLORS.gold }));
    mesh.visible = false;
    group.add(mesh);
    impMeshes.push({ mesh, edge: null, t: 0, speed: 0 });
  }

  let hovered = null;
  let selected = null;
  let selectPulse = 0;
  const basePos = blocks.map((b) => b.position.clone());

  function setHover(b) {
    if (b === hovered) return;
    hovered = b;
    if (!store.features.isTouch) document.body.style.cursor = hovered ? 'pointer' : '';
    if (hovered) {
      const n = hovered.userData.node;
      store.emit('lab:info', { kind: 'hover', title: n.id, body: n.desc });
    } else if (!selected) {
      store.emit('lab:info', { kind: 'clear' });
    }
  }

  function select(b) {
    selected = b === selected ? null : b;
    selectPulse = 1;
    const n = b.userData.node;
    store.emit('lab:info', {
      kind: 'select',
      title: n.id,
      body: `${n.desc} — ${n.tech}`,
      hint: selected ? 'Clique un autre bloc pour changer de focus.' : '',
    });
  }

  return {
    name: 'lab-arch',
    group,
    mount() {},
    pointerMove(ndc, raycaster, camera) {
      raycaster.setFromCamera(ndc, camera);
      const hits = raycaster.intersectObjects(blocks, false);
      setHover(hits.length ? hits[0].object : null);
      if (store.features.isTouch && hits.length) select(hits[0].object);
    },
    pointerDown(ndc, raycaster, camera) {
      raycaster.setFromCamera(ndc, camera);
      const hits = raycaster.intersectObjects(blocks, false);
      if (hits.length) select(hits[0].object);
    },
    pointerUp() {},
    update(state) {
      const t = state.t;
      selectPulse = Math.max(0, selectPulse - state.dt * 1.6);

      for (let i = 0; i < blocks.length; i++) {
        const b = blocks[i];
        const isH = b === hovered;
        const isS = b === selected;
        const target = isS ? 1.25 : isH ? 1.08 : 1;
        const k = 1 - Math.exp(-state.dt * 7);
        b.scale.x += (target - b.scale.x) * k;
        b.scale.y += (target - b.scale.y) * k;
        b.material.opacity += ((isS || isH ? 1 : 0.88) - b.material.opacity) * k;
        b.position.z += ((isS ? 0.9 : isH ? 0.25 : 0) + Math.sin(t * 1.6) * (isS ? 0.12 : 0) - b.position.z) * k;
        // luminescence
        const hl = isH || isS ? 0.45 : 0;
        b.userData._hl = b.userData._hl || 0;
        b.userData._hl += (hl - b.userData._hl) * k;
        if (isH || isS) b.material.color.setRGB(1, 1, 1);
        else b.material.color.setHex(b.userData.baseColor);
      }

      for (const imp of impMeshes) {
        if (!imp.edge) {
          imp.edge = pick(edgeList);
          imp.t = 0;
          imp.speed = rand(0.3, 0.6);
        }
        imp.t += state.dt * imp.speed;
        if (imp.t >= 1) {
          imp.t = 0;
          imp.edge = pick(edgeList);
        }
        imp.mesh.visible = true;
        imp.mesh.position.lerpVectors(imp.edge.a, imp.edge.b, imp.t);
      }

      group.rotation.z = Math.sin(t * 0.15) * 0.02;
    },
    reset() {
      hovered = null;
      selected = null;
      for (let i = 0; i < blocks.length; i++) {
        blocks[i].scale.set(1, 1, 1);
        blocks[i].position.copy(basePos[i]);
        blocks[i].material.opacity = 0.9;
        blocks[i].material.color.setHex(blocks[i].userData.baseColor);
      }
      store.emit('lab:info', { kind: 'clear' });
    },
  };
}
