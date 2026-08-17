import * as THREE from 'three';
import { store } from '../../core/store';
import { rand, pick } from '../../core/utils';
import { COLORS, makeLabel } from '../_shared';

/**
 * EXPÉRIENCE B — NEURAL NETWORK
 * Réseau de neurones 3D : couches INPUT → HIDDEN → HIDDEN → OUTPUT.
 * Des impulsions lumineuses circulent le long des connexions.
 * Hover = neurone mis en évidence. Click = info.
 */
export default function createNeuralNet() {
  const group = new THREE.Group();
  const isMobile = store.features.isMobile;

  const layers = isMobile ? [4, 4, 3, 2] : [5, 5, 4, 2];
  const layerColors = [COLORS.cyan, COLORS.violet, COLORS.violet, COLORS.gold];
  const layerNames = ['INPUT', 'HIDDEN', 'HIDDEN', 'OUTPUT'];

  const nodes = []; // { mesh, layer, index, pos }
  const nodeGroup = new THREE.Group();
  const xSpacing = isMobile ? 2.6 : 2.2;

  layers.forEach((n, li) => {
    const x = (li - (layers.length - 1) / 2) * xSpacing;
    for (let j = 0; j < n; j++) {
      const y = (j - (n - 1) / 2) * (isMobile ? 0.85 : 0.8);
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.16, 18, 18),
        new THREE.MeshBasicMaterial({ color: layerColors[li] })
      );
      mesh.position.set(x, y, 0);
      mesh.userData = { layer: li, index: j, baseColor: layerColors[li] };
      nodeGroup.add(mesh);
      nodes.push(mesh);
    }
  });
  group.add(nodeGroup);

  // Connexions : chaque neurone → 2 plus proches voisins de la couche suivante
  const edges = [];
  const linePos = [];
  const addEdge = (a, b) => {
    edges.push({ a: a.clone(), b: b.clone() });
    linePos.push(a.x, a.y, a.z, b.x, b.y, b.z);
  };
  for (let li = 0; li < layers.length - 1; li++) {
    const from = nodes.filter((n) => n.userData.layer === li);
    const to = nodes.filter((n) => n.userData.layer === li + 1);
    for (const f of from) {
      const sorted = [...to].sort((x, y) => Math.abs(x.position.y - f.position.y) - Math.abs(y.position.y - f.position.y));
      addEdge(f.position, sorted[0].position);
      if (sorted[1]) addEdge(f.position, sorted[1].position);
    }
  }

  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x6c5ce7,
    transparent: true,
    opacity: 0.45,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  group.add(lines);

  // Impulsions lumineuses
  const impulseCount = isMobile ? 16 : 30;
  const impulses = [];
  const impGeo = new THREE.SphereGeometry(0.05, 10, 10);
  for (let i = 0; i < impulseCount; i++) {
    const mesh = new THREE.Mesh(impGeo, new THREE.MeshBasicMaterial({ color: 0x22d3ee }));
    mesh.visible = false;
    group.add(mesh);
    impulses.push({ mesh, edge: null, t: 0, speed: 0 });
  }

  // Étiquettes de couche
  layers.forEach((n, li) => {
    const x = (li - (layers.length - 1) / 2) * xSpacing;
    const label = makeLabel(layerNames[li], {
      height: 0.4,
      font: '600 40px "IBM Plex Mono", monospace',
      color: '#8F88FF',
      bg: 'rgba(0,0,0,0)',
      border: 'rgba(0,0,0,0)',
    });
    label.position.set(x, -2.5, 0);
    group.add(label);
  });

  let hovered = null;
  let selected = null;

  const pickables = nodes;

  function setHover(n) {
    if (n === hovered) return;
    hovered = n;
    for (const node of nodes) {
      const is = node === hovered;
      node.scale.setScalar(is ? 1.6 : 1);
      node.material.color.set(is ? COLORS.ink : node.userData.baseColor);
      if (is && !store.features.isTouch) document.body.style.cursor = 'pointer';
    }
    if (!hovered && !store.features.isTouch) document.body.style.cursor = '';
    if (hovered) {
      store.emit('lab:info', {
        kind: 'hover',
        title: `NEURONE ${hovered.userData.index + 1}`,
        body: `Couche ${layerNames[hovered.userData.layer]} · connexions pondérées`,
      });
    } else {
      store.emit('lab:info', { kind: 'clear' });
    }
  }

  function select(n) {
    selected = n;
    store.emit('lab:info', {
      kind: 'select',
      title: `NEURONE ${n.userData.index + 1} — ${layerNames[n.userData.layer]}`,
      body: n.userData.layer === layers.length - 1
        ? 'Neurone de sortie : active la réponse du réseau.'
        : n.userData.layer === 0
          ? 'Neurone d’entrée : reçoit les données brutes.'
          : 'Neurone caché : propage et transforme le signal.',
    });
  }

  return {
    name: 'lab-neural',
    group,
    mount() {},
    pointerMove(ndc, raycaster, camera) {
      raycaster.setFromCamera(ndc, camera);
      const hits = raycaster.intersectObjects(pickables);
      setHover(hits.length ? hits[0].object : null);
      if (store.features.isTouch && hits.length) select(hits[0].object);
    },
    pointerDown(ndc, raycaster, camera) {
      raycaster.setFromCamera(ndc, camera);
      const hits = raycaster.intersectObjects(pickables);
      if (hits.length) select(hits[0].object);
    },
    pointerUp() {},
    update(state) {
      const t = state.t;
      nodeGroup.rotation.y = Math.sin(t * 0.3) * 0.12;
      nodeGroup.rotation.x = Math.cos(t * 0.24) * 0.06;

      // impulsions
      for (const imp of impulses) {
        if (!imp.edge) {
          imp.edge = pick(edges);
          imp.t = rand(0, 1);
          imp.speed = rand(0.35, 0.7);
        }
        imp.t += state.dt * imp.speed;
        if (imp.t >= 1) {
          imp.t = 0;
          imp.edge = pick(edges);
        }
        const { a, b } = imp.edge;
        imp.mesh.visible = true;
        imp.mesh.position.lerpVectors(a, b, imp.t);
      }
    },
    reset() {
      hovered = null;
      selected = null;
      for (const node of nodes) {
        node.scale.setScalar(1);
        node.material.color.set(node.userData.baseColor);
      }
      store.emit('lab:info', { kind: 'clear' });
    },
  };
}
