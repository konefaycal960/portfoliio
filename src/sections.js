import { SITE_DATA } from './data';
import { store } from './core/store';
import { getLang, langData, getUi, translateLab } from './core/i18n';
import { observeReveals } from './ui/reveals';

/* ============================================================================
   RENDU des données dynamiques (capacités, skills, réalisations, projets)
   + i18n. `dataForLang` résout le jeu de données actif : SITE_DATA pour le
   français, sinon SITE_DATA fusionné avec les traductions (niveaux, couleurs,
   liens, badges… conservés depuis data.js).
   ============================================================================ */

let LANG = getLang();

export function dataForLang(code) {
  if (code === 'fr') return SITE_DATA;
  const T = langData(code);
  if (!T) return SITE_DATA;

  const skills = SITE_DATA.skills.map((cat, ci) => ({
    ...cat,
    category: (T.skillsCat && T.skillsCat[ci]) || cat.category,
    items: cat.items.map((it, ii) => {
      const tr = T.skillsItem && T.skillsItem[ci] && T.skillsItem[ci][ii];
      return { ...it, name: (tr && tr.name) || it.name, blurb: (tr && tr.blurb) || it.blurb };
    }),
  }));

  return {
    ...SITE_DATA,
    capacities: T.capacities || SITE_DATA.capacities,
    skills,
    achievements: T.achievements || SITE_DATA.achievements,
    projects: SITE_DATA.projects.map((p, i) => ({ ...p, ...((T.projects || [])[i] || {}) })),
    testimonials: SITE_DATA.testimonials.map((t, i) => ({ ...t, ...((T.testimonials || [])[i] || {}) })),
  };
}

const currentData = () => dataForLang(LANG);

/* Clics / écouteurs rendus dynamiques (re-liés après chaque render). */
let bindChips = null;
let bindCards = null;

export function initSections() {
  renderAll();
  initSkillsUI();
  initProjectModal();
  initProjectRail();
  initLabUI();
  applyLang(LANG);
  bindDynamic();
}

/* Re-rend tout + applique la langue. Utilisé par le sélecteur de langue. */
export function renderLang(code) {
  LANG = code;
  renderAll();
  applyLang(code);
  bindDynamic();
  document.documentElement.lang = code;
  observeReveals();
  store.emit('lang:change', code);
}

function bindDynamic() {
  if (bindChips) bindChips();
  if (bindCards) bindCards();
}

function renderAll() {
  renderCapacities();
  renderSkills();
  renderAchievements();
  renderProjects();
  renderTestimonials();
  renderContact();
  renderPhoto();
}

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

function renderTestimonials() {
  const el = document.getElementById('testimonialsGrid');
  if (!el) return;
  el.innerHTML = currentData().testimonials
    .map(
      (t) => `
    <article class="t-card glass" data-reveal>
      <div class="t-stars" aria-label="Note : ${t.rating} sur 5">
        ${'★'.repeat(t.rating)}<span class="t-stars-empty">${'★'.repeat(5 - t.rating)}</span>
      </div>
      <p class="t-quote">${t.quote}</p>
      <span class="t-project">${t.for}</span>
      <div class="t-author">
        <span class="t-avatar" aria-hidden="true">${initials(t.name)}</span>
        <div>
          <b>${t.name}</b>
          <span class="t-meta">${t.role}${t.location ? ` · ${t.location}` : ''}</span>
        </div>
      </div>
    </article>`
    )
    .join('');
}

function renderPhoto() {
  const img = document.getElementById('avPhoto');
  const core = document.querySelector('.av-core');
  if (!img) return;
  const photo = SITE_DATA.profile.photo;
  if (photo) {
    img.src = photo;
    img.alt = `${SITE_DATA.profile.firstName} ${SITE_DATA.profile.lastName}`;
    if (core) core.classList.add('has-photo');
  }
}

function renderCapacities() {
  const el = document.getElementById('capacities');
  if (!el) return;
  el.innerHTML = currentData().capacities.map((c) => `<span class="cap-chip" data-hover>${c}</span>`).join('');
}

/* ------------------------------- SKILLS ------------------------------- */
function flattenSkills() {
  const flat = [];
  currentData().skills.forEach((cat) => cat.items.forEach((it, i) => flat.push({ ...it, category: cat.category, key: `${cat.category}-${i}` })));
  return flat;
}

function renderSkills() {
  const chips = document.getElementById('skillChips');
  if (!chips) return;
  chips.innerHTML = flattenSkills()
    .map(
      (s, i) => `
    <button type="button" class="skill-chip" data-skill-index="${i}" data-hover>
      ${s.name}
    </button>`
    )
    .join('');
}

function initSkillsUI() {
  const name = document.getElementById('skillName');
  const cat = document.getElementById('skillCat');
  const level = document.getElementById('skillLevel');
  const bar = document.getElementById('skillBar');
  const blurb = document.getElementById('skillBlurb');

  let currentIndex = 0;

  function display(index) {
    const s = flattenSkills()[index];
    if (!s) return;
    currentIndex = index;
    name.textContent = s.name;
    cat.textContent = s.category.toUpperCase();
    level.textContent = `${s.level}%`;
    bar.style.width = `${s.level}%`;
    blurb.textContent = s.blurb || `${s.name} — ${s.category}.`;
  }

  // Clic tuile 3D → panneau
  store.on('skill:select', (payload) => {
    display(payload.index);
    document.querySelectorAll('.skill-chip').forEach((c) =>
      c.classList.toggle('active', parseInt(c.dataset.skillIndex, 10) === payload.index)
    );
  });

  // Clic chips → scène 3D (re-lié après chaque render)
  bindChips = () => {
    const chips = document.querySelectorAll('.skill-chip');
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const i = parseInt(chip.dataset.skillIndex, 10);
        display(i);
        store.emit('skill:select-ui', i);
        chips.forEach((c) => c.classList.toggle('active', c === chip));
      });
    });
    display(currentIndex);
    chips.forEach((c) => c.classList.toggle('active', parseInt(c.dataset.skillIndex, 10) === currentIndex));
  };

  display(0);
}

/* ---------------------------- RÉALISATIONS ---------------------------- */
function renderAchievements() {
  const el = document.getElementById('achList');
  if (!el) return;
  el.innerHTML = currentData().achievements
    .map(
      (a, i) => `
    <div class="ach-item glass" data-reveal>
      <div class="ach-num">${String(i + 1).padStart(2, '0')}</div>
      <div class="ach-body">
        <h4>${a.title}</h4>
        <p>${a.text}</p>
      </div>
    </div>`
    )
    .join('');
}

/* ------------------------------- PROJETS ------------------------------ */
function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  const ui = getUi(LANG);
  grid.innerHTML = currentData().projects
    .map((p, i) => {
      const cover = p.image
        ? `<img class="rail-img" src="${p.image}" alt="${p.name}" loading="lazy">`
        : '<span class="rail-mono"></span>';
      return `
    <article class="card rail-card glass" data-project="${i}" data-rail tabindex="0" role="button"
      aria-label="${ui.modal_index} ${p.name}">
      <div class="rail-icon">${cover}<div class="card-spot"></div></div>
      <span class="rail-id">${String(i + 1).padStart(2, '0')}</span>
      <h3>${p.name}</h3>
      <div class="rail-stack">${p.stack.split('·').slice(0, 3).join(' · ')}</div>
      <span class="rail-hint">${ui.projMore} →</span>
    </article>`;
    })
    .join('');
}

/* Rail horizontal : défilement par glisser (souris), flèches, swipe natif mobile. */
function initProjectRail() {
  const track = document.getElementById('projectsGrid');
  if (!track) return;
  const rail = track.closest('.projects-rail');
  const prev = rail && rail.querySelector('.rail-prev');
  const next = rail && rail.querySelector('.rail-next');

  let startX = 0;
  let startScroll = 0;
  let dragging = false;

  function onMove(e) {
    const dx = e.clientX - startX;
    if (!dragging && Math.abs(dx) > 5) dragging = true;
    if (dragging) track.scrollLeft = startScroll - dx;
  }

  function onUp() {
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointercancel', onUp);
    track.classList.remove('is-dragging');
    if (dragging) {
      // Un glisser ne doit pas déclencher le clic qui ouvre le modal
      const kill = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        document.removeEventListener('click', kill, true);
      };
      document.addEventListener('click', kill, true);
    }
  }

  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return;
    startX = e.clientX;
    startScroll = track.scrollLeft;
    dragging = false;
    track.classList.add('is-dragging');
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  });

  const step = () => Math.max(track.clientWidth * 0.8, 240);
  if (prev) prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  if (next) next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
}

function initProjectModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;
  const close = modal.querySelector('.modal-close');
  const ui = () => getUi(LANG);

  function open(i) {
    const p = currentData().projects[i];
    if (!p) return;
    const u = ui();
    modal.querySelector('.modal-index').textContent = `${u.modal_index} ${String(i + 1).padStart(2, '0')}`;
    modal.querySelector('.badge').className = `badge ${p.badgeClass}`;
    modal.querySelector('.badge').textContent = p.status;
    modal.querySelector('.modal-title').textContent = p.name;
    modal.querySelector('.modal-desc').textContent = p.desc;
    modal.querySelector('.modal-role').textContent = p.role || u.modal_role;
    modal.querySelector('.modal-stack').textContent = p.stack;

    const img = modal.querySelector('.modal-img');
    if (img) {
      if (p.image) {
        img.src = p.image;
        img.alt = p.name;
        img.style.display = 'block';
      } else {
        img.removeAttribute('src');
        img.style.display = 'none';
      }
    }

    const result = modal.querySelector('.modal-result');
    if (result) {
      if (p.result) {
        result.style.display = '';
        result.innerHTML = `<span class="modal-result-label mono">${u.modal_result}</span><span>${p.result}</span>`;
      } else {
        result.style.display = 'none';
      }
    }

    const links = modal.querySelector('.modal-links');
    links.innerHTML = '';
    if (p.github) {
      const a = document.createElement('a');
      a.href = p.github;
      a.target = '_blank';
      a.rel = 'noopener';
      a.className = 'btn btn-ghost magnet';
      a.textContent = u.modal_github;
      links.appendChild(a);
    }
    if (p.demo) {
      const a = document.createElement('a');
      a.href = p.demo;
      a.target = '_blank';
      a.rel = 'noopener';
      a.className = 'btn btn-primary magnet';
      a.textContent = u.modal_demo;
      links.appendChild(a);
    }
    if (!p.github && !p.demo) {
      const span = document.createElement('span');
      span.className = 'modal-nolinks';
      span.textContent = u.modal_nolinks;
      links.appendChild(span);
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-active');
    close.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    document.body.classList.remove('modal-active');
  }

  // Cartes re-liées après chaque render
  bindCards = () => {
    document.querySelectorAll('.card[data-project]').forEach((card) => {
      card.addEventListener('click', () => open(parseInt(card.dataset.project, 10)));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open(parseInt(card.dataset.project, 10));
        }
      });
    });
  };

  close.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}

/* ------------------------------- LAB -------------------------------- */
function initLabUI() {
  const infoTitle = document.getElementById('labInfoTitle');
  const infoBody = document.getElementById('labInfoBody');
  const hint = document.getElementById('labHint');

  store.on('lab:info', (p) => {
    if (!p || p.kind === 'clear') {
      if (infoTitle) infoTitle.textContent = '';
      if (infoBody) infoBody.textContent = '';
      if (hint) hint.textContent = translateLab(LANG, 'Survole les éléments 3D pour interagir.');
      return;
    }
    if (infoTitle) infoTitle.textContent = translateLab(LANG, p.title);
    if (infoBody) infoBody.textContent = translateLab(LANG, p.body);
    if (hint) hint.textContent = translateLab(LANG, p.hint || '');
  });

  document.querySelectorAll('.lab-tab').forEach((tab, i) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.lab-tab').forEach((t) => t.classList.toggle('active', t === tab));
      store.labTab = i;
      store.emit('lab:tab', i);
    });
  });
}

/* ------------------------------ CONTACT ------------------------------ */
function renderContact() {
  const p = currentData().profile;
  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el && el.textContent) el.textContent = val;
  };
  set('contactEmail', p.email);
  set('contactPhone', p.phone);

  const mail = document.getElementById('linkEmail');
  const linkedin = document.getElementById('linkLinkedin');
  const github = document.getElementById('linkGithub');
  const phone = document.getElementById('linkPhone');
  if (mail) mail.href = `mailto:${p.email}`;
  if (github) github.href = p.github;
  if (phone) phone.href = `tel:${p.phone.replace(/\s/g, '')}`;

  // Pas encore de profil LinkedIn → on masque le lien au lieu d'afficher un lien mort
  if (linkedin) linkedin.style.display = p.linkedin ? '' : 'none';
  if (p.linkedin) linkedin.href = p.linkedin;

  const brand = document.getElementById('brandName');
  if (brand) brand.textContent = p.brand;
  const nameHero = document.getElementById('heroName');
  if (nameHero) nameHero.innerHTML = `${p.firstName} <span>${p.lastName}</span>`;
}

/* ------------------------------- I18N -------------------------------- */
function resolve(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

/* Applique les chaînes statiques (data-i18n) + placeholders + meta. */
function applyLang(code) {
  const ui = getUi(code);

  document.documentElement.lang = code;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const val = resolve(ui, el.dataset.i18n);
    if (val === undefined) return;
    if (el.dataset.i18nHtml !== undefined) el.innerHTML = val;
    else el.textContent = val;
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const val = ui[el.dataset.i18nPlaceholder];
    if (val !== undefined) el.placeholder = val;
  });

  if (ui.metaTitle) document.title = ui.metaTitle;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && ui.metaDesc) metaDesc.setAttribute('content', ui.metaDesc);
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle && ui.metaTitle) ogTitle.setAttribute('content', ui.metaTitle);
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc && ui.metaDesc) ogDesc.setAttribute('content', ui.metaDesc);
}
