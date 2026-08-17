import { getLang, getUi } from '../core/i18n';
import { dataForLang } from '../sections';

/* ============================================================================
   CV — génération d'un document A4 imprimable (print-to-PDF) dans une
   nouvelle fenêtre, localisé (fr/en), construit depuis les données du site.
   ============================================================================ */

const stripHtml = (s) => (s || '').replace(/<[^>]*>/g, '');

function cleanLabel(s) {
  return (s || '').replace(/^\d{2}\s*—\s*/, '');
}

function buildCvHtml(d, p, ui) {
  const name = p.name || [p.firstName, p.lastName].filter(Boolean).join(' ');
  const skills = d.skills
    .flatMap((cat) => cat.items.map((it) => ({ ...it, category: cat.category })))
    .map(
      (s) => `
    <div class="skill">
      <div class="skill-head"><span>${s.name} · ${s.category}</span><span class="pct">${s.level}%</span></div>
      <div class="bar"><div class="bar-fill" style="width:${s.level}%"></div></div>
    </div>`
    )
    .join('');

  const capacities = d.capacities.map((c) => `<li>${c}</li>`).join('');

  const achievements = d.achievements
    .map(
      (a) => `
    <div class="ach">
      <h3>${a.title}</h3>
      <p>${a.text}</p>
    </div>`
    )
    .join('');

  const projects = d.projects
    .map(
      (pr) => `
    <div class="proj">
      <div class="proj-head">
        <h3>${pr.name}</h3>
        <span class="meta">${pr.date ? pr.date + ' · ' : ''}${pr.role || ''}</span>
      </div>
      <p>${pr.desc}</p>
      <p class="stack">${pr.stack}</p>
      ${pr.result ? `<p class="result"><b>${cleanLabel(ui.sec_projects)}:</b> ${pr.result}</p>` : ''}
    </div>`
    )
    .join('');

  const about = [ui.about_p1, ui.about_p2, ui.about_p3].map(stripHtml).filter(Boolean).join(' ');

  return `<!doctype html>
<html lang="${getLang()}">
<head>
<meta charset="utf-8">
<title>CV — ${name}</title>
<style>
  @page { size: A4; margin: 15mm 14mm; }
  * { box-sizing: border-box; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: 'Segoe UI', Roboto, Arial, sans-serif; color: #181634; background: #fff; margin: 0; font-size: 11.5px; line-height: 1.5; }
  h1, h2, h3 { margin: 0; font-weight: 700; }
  h1 { font-size: 26px; letter-spacing: 0.5px; }
  h2 { font-size: 12px; letter-spacing: 2.5px; text-transform: uppercase; color: #6c5ce7; margin: 18px 0 8px; padding-bottom: 4px; border-bottom: 2px solid #eee7ff; }
  h3 { font-size: 12px; margin: 0 0 2px; }
  p { margin: 0 0 8px; }
  ul { margin: 0; padding-left: 16px; }
  a { color: #6c5ce7; text-decoration: none; }
  .head { display: flex; justify-content: space-between; align-items: flex-end; padding-bottom: 14px; border-bottom: 3px solid #6c5ce7; margin-bottom: 14px; }
  .head .role { font-size: 15px; color: #6c5ce7; font-weight: 600; margin-top: 4px; }
  .contact { text-align: right; font-size: 10.5px; color: #4b4870; line-height: 1.7; }
  .caps { margin: 6px 0 0; padding: 0; list-style: none; display: flex; flex-wrap: wrap; gap: 6px; }
  .caps li { background: #f1edff; border: 1px solid #ddd3ff; color: #4b2fd4; border-radius: 20px; padding: 2px 10px; font-size: 10px; font-weight: 600; }
  .skills { display: grid; grid-template-columns: 1fr 1fr; column-gap: 22px; row-gap: 8px; }
  .skill-head { display: flex; justify-content: space-between; font-size: 11px; font-weight: 600; margin-bottom: 3px; }
  .pct { color: #6c5ce7; }
  .bar { height: 6px; background: #eee9ff; border-radius: 4px; overflow: hidden; }
  .bar-fill { height: 100%; background: linear-gradient(90deg, #6c5ce7, #22d3ee); border-radius: 4px; }
  .ach { margin-bottom: 8px; }
  .ach p { margin: 0; color: #3a3760; }
  .proj { margin-bottom: 10px; page-break-inside: avoid; }
  .proj-head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
  .meta { font-size: 10px; color: #6c5ce7; font-weight: 600; white-space: nowrap; }
  .proj p { margin: 0; color: #3a3760; }
  .stack { font-size: 10px; color: #6b6890; margin-top: 3px !important; }
  .result { font-size: 10.5px; margin-top: 3px !important; }
  .foot { margin-top: 20px; padding-top: 10px; border-top: 1px solid #e8e5f8; font-size: 10px; color: #8a87a8; display: flex; justify-content: space-between; }
</style>
</head>
<body>
  <div class="head">
    <div>
      <h1>${name}</h1>
      <div class="role">${p.role}</div>
    </div>
    <div class="contact">
      <div>${p.location}</div>
      <div>${p.email} · ${p.phone}</div>
      <div>${p.github} · ${p.linkedin || ''}</div>
    </div>
  </div>

  <section>
    <h2>${cleanLabel(ui.sec_about)}</h2>
    <p>${about}</p>
    <ul class="caps">${capacities}</ul>
  </section>

  <section>
    <h2>${cleanLabel(ui.sec_skills)}</h2>
    <div class="skills">${skills}</div>
  </section>

  <section>
    <h2>${cleanLabel(ui.sec_ach)}</h2>
    ${achievements}
  </section>

  <section>
    <h2>${cleanLabel(ui.sec_projects)}</h2>
    ${projects}
  </section>

  <div class="foot">
    <span>${p.email}</span>
    <span>${p.github}</span>
  </div>
</body>
</html>`;
}

export function initCv() {
  document.querySelectorAll('[data-cv]').forEach((btn) => {
    btn.addEventListener('click', openCv);
  });
}

export function openCv() {
  const lang = getLang();
  const d = dataForLang(lang);
  const p = d.profile;
  const ui = getUi(lang);

  const win = window.open('', '_blank');
  if (!win) return;

  win.document.open();
  win.document.write(buildCvHtml(d, p, ui));
  win.document.close();

  const fonts = win.document.fonts && win.document.fonts.ready;
  (fonts || Promise.resolve()).then(() => {
    setTimeout(() => {
      win.focus();
      win.print();
    }, 80);
  });
}
