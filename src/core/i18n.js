/* ============================================================================
   I18N — internationalisation du site.
   Langues : fr (défaut, données dans data.js), en, de, zh, ru.
   - `ui` : chaînes statiques affichées dans le HTML (attributs data-i18n).
   - Données dynamiques : `capacities`, `about`, `facts`, `skillsCat`,
     `skillsItem`, `achievements`, `projects`, `testimonials`, `lab`.
   Le niveau / les couleurs / la structure viennent de data.js (source de vérité).
   ============================================================================ */

export const LANGS = [
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'de', label: 'DE', name: 'Deutsch' },
  { code: 'zh', label: '中文', name: '中文' },
  { code: 'ru', label: 'RU', name: 'Русский' },
];

const STORAGE_KEY = 'pf-lang';

export function getLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return LANGS.some((l) => l.code === saved) ? saved : 'fr';
  } catch {
    return 'fr';
  }
}

export function setLang(code) {
  if (!LANGS.some((l) => l.code === code)) return;
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    /* stockage indisponible : on ignore */
  }
}

/* Fr = données data.js (null) ; sinon objet de traductions. */
export function langData(code) {
  return code === 'fr' ? null : TRANSLATIONS[code];
}

const fr = {
  ui: {
    loaderLabel: 'INITIALIZING EXPERIENCE…',
    nav_about: 'À propos',
    nav_skills: 'Compétences',
    nav_lab: '3D Lab',
    nav_projects: 'Projets',
    nav_contact: 'Contact',
    nav_cta: 'DISPONIBLE →',
    hero_eyebrow: 'DÉVELOPPEUR FULL-STACK · WEB & MOBILE · BOBO-DIOULASSO, BURKINA FASO',
    hero_splitWeb: 'SITES WEB',
    hero_splitMobile: 'APPS MOBILES',
    hero_status: 'DISPONIBLE · FREELANCE · STAGE',
    hero_role:
      'Je développe des sites web et des applications mobiles complètes, dans plusieurs langages, du backend jusqu’à l’interface — pour des marchés locaux comme internationaux.',
    cta_projects: 'Voir mes réalisations',
    cta_contact: 'Me contacter',
    cv_download: 'TÉLÉCHARGER LE CV',
    scroll: 'SCROLL',
    sec_about: '01 — À PROPOS',
    sec_skills: '02 — COMPÉTENCES',
    sec_lab: '03 — 3D LAB',
    sec_ach: '04 — RÉALISATIONS',
    sec_projects: '05 — PROJETS',
    sec_testi: '06 — TÉMOIGNAGES',
    sec_contact: '07 — CONTACT',
    title_about: 'Un développeur qui construit pour de vrais usages.',
    title_skills: 'Plusieurs langages, une seule logique : livrer.',
    title_lab: 'Des expériences que tu peux manipuler.',
    title_ach: 'Ce que j’ai déjà livré.',
    title_projects: 'Des sites web et des applications mobiles, de bout en bout.',
    title_testi: 'Des clients satisfaits, des sites qui tournent.',
    title_contact: 'On construit quelque chose <span>ensemble</span> ?',
    about_p1:
      'Étudiant en 3<sup>e</sup> année d’<strong>Informatique de Gestion</strong> à l’Université de l’Unité Africaine (Bobo-Dioulasso), je développe seul des applications complètes — web et mobile — en travaillant sur plusieurs langages et environnements techniques : Python, JavaScript/TypeScript, Dart.',
    about_p2:
      'J’ai conçu et livré des plateformes de bout en bout : alertes communautaires de coupures d’électricité et d’eau, génération de QR codes dynamiques, intégration de paiement Mobile Money, gestion de rendez-vous médicaux. Je prépare actuellement ma soutenance de mémoire et j’explore des opportunités entrepreneuriales dans le logiciel et l’e-commerce.',
    about_p3:
      'Je cherche aujourd’hui à porter ce travail au-delà du marché local — en mission freelance, en poste salarié ou en stage à l’international.',
    facts: [
      ['FORMATION', 'Informatique de Gestion — 3ᵉ année'],
      ['BASE', 'Bobo-Dioulasso, Burkina Faso'],
      ['DOMAINES', 'Sites web · Apps mobiles · Backend/API'],
      ['DISPONIBILITÉ', 'Freelance · CDI · Stage'],
      ['LANGUE', 'Français (natif) · Anglais technique'],
    ],
    skillHint: 'SURVOLE LES TECHNOLOGIES DANS L’ESPACE OU CLIQUE UN CHIP.',
    labHint: 'Survole les éléments 3D pour interagir.',
    tab_particle: 'PARTICLE SPHERE',
    tab_neural: 'NEURAL NET',
    tab_code: 'CODE SPACE',
    tab_arch: 'ARCHITECTURE',
    projMore: 'EXPLORER LE PROJET',
    modal_index: 'PROJET',
    modal_role: 'Rôle',
    modal_stack: 'STACK',
    modal_github: 'GitHub ↗',
    modal_demo: 'Démo live ↗',
    modal_nolinks: 'Liens GitHub / démo à venir.',
    modal_close: 'Fermer',
    modal_result: 'RÉSULTAT',
    contact_intro:
      'Disponible pour une mission freelance, un poste salarié ou un stage. Écris-moi directement — je réponds en général sous 24&nbsp;h.',
    form_name: 'NOM',
    form_email: 'EMAIL',
    form_message: 'MESSAGE',
    ph_name: 'Ton nom',
    ph_email: 'ton@email.com',
    ph_message: 'Décris ton projet…',
    submit: 'ENVOYER LE MESSAGE →',
    form_sending: 'ENVOI EN COURS…',
    form_success: 'Message envoyé. Je te réponds sous 24 h.',
    form_error: 'Envoi impossible. Écris-moi directement par e-mail.',
    note: 'Ouvre ton client mail préféré.',
    foot_l: '© 2026 Fayçal Koné — Bobo-Dioulasso, Burkina Faso',
    foot_r: 'DERNIÈRE MISE À JOUR: AOÛT 2026',
    metaTitle: 'Fayçal Koné — Développeur Full-Stack Web & Mobile',
    metaDesc:
      'Fayçal Koné, développeur full-stack web & mobile (Python, JavaScript/TypeScript, Dart) basé à Bobo-Dioulasso, Burkina Faso. Sites web, applications mobiles, APIs, paiement Mobile Money.',
  },
  lab: {
    'Couche INPUT · connexions pondérées': 'Couche INPUT · connexions pondérées',
    'Couche HIDDEN · connexions pondérées': 'Couche HIDDEN · connexions pondérées',
    'Couche OUTPUT · connexions pondérées': 'Couche OUTPUT · connexions pondérées',
    'Neurone de sortie : active la réponse du réseau.': 'Neurone de sortie : active la réponse du réseau.',
    'Neurone d’entrée : reçoit les données brutes.': 'Neurone d’entrée : reçoit les données brutes.',
    'Neurone caché : propage et transforme le signal.': 'Neurone caché : propage et transforme le signal.',
    'Fragment de code en orbite.': 'Fragment de code en orbite.',
    'Mot-clé flottant de l’espace code — purement esthétique.': 'Mot-clé flottant de l’espace code — purement esthétique.',
    'Interfaces web & mobile côté utilisateur.': 'Interfaces web & mobile côté utilisateur.',
    'Couche de contrat entre les clients et le système.': 'Couche de contrat entre les clients et le système.',
    'Logique métier, authentification, paiements, files.': 'Logique métier, authentification, paiements, files.',
    'Modules intelligents : analyse, prédiction, génération.': 'Modules intelligents : analyse, prédiction, génération.',
    'Persistance et cohérence des données applicatives.': 'Persistance et cohérence des données applicatives.',
    'Clique un autre bloc pour changer de focus.': 'Clique un autre bloc pour changer de focus.',
    'Survole les éléments 3D pour interagir.': 'Survole les éléments 3D pour interagir.',
  },
};

const en = {
  ui: {
    loaderLabel: 'INITIALIZING EXPERIENCE…',
    nav_about: 'About',
    nav_skills: 'Skills',
    nav_lab: '3D Lab',
    nav_projects: 'Projects',
    nav_contact: 'Contact',
    nav_cta: 'AVAILABLE →',
    hero_eyebrow: 'FULL-STACK DEVELOPER · WEB & MOBILE · BOBO-DIOULASSO, BURKINA FASO',
    hero_splitWeb: 'WEBSITES',
    hero_splitMobile: 'MOBILE APPS',
    hero_status: 'AVAILABLE · FREELANCE · INTERNSHIP',
    hero_role:
      'I design and build complete websites and mobile applications, in several languages, from backend to interface — for local and international markets.',
    cta_projects: 'See my work',
    cta_contact: 'Contact me',
    cv_download: 'DOWNLOAD CV',
    scroll: 'SCROLL',
    sec_about: '01 — ABOUT',
    sec_skills: '02 — SKILLS',
    sec_lab: '03 — 3D LAB',
    sec_ach: '04 — ACHIEVEMENTS',
    sec_projects: '05 — PROJECTS',
    sec_testi: '06 — TESTIMONIALS',
    sec_contact: '07 — CONTACT',
    title_about: 'A developer who builds for real-world use.',
    title_skills: 'Many languages, one logic: deliver.',
    title_lab: 'Experiences you can interact with.',
    title_ach: 'What I have already shipped.',
    title_projects: 'Websites and mobile apps, end to end.',
    title_testi: 'Happy clients, websites that work.',
    title_contact: 'Let’s build something <span>together</span>?',
    about_p1:
      'A third-year student in <strong>Management IT</strong> at the African Unity University (Bobo-Dioulasso), I develop complete applications on my own — web and mobile — across several languages and technical environments: Python, JavaScript/TypeScript, Dart.',
    about_p2:
      'I have designed and shipped end-to-end platforms: community alerts for power and water outages, dynamic QR code generation, Mobile Money payment integration, and medical appointment management. I am currently preparing my thesis defense and exploring entrepreneurial opportunities in software and e-commerce.',
    about_p3:
      'I now want to bring this work beyond the local market — as a freelance contractor, a salaried employee, or an international internship.',
    facts: [
      ['STUDIES', 'Management IT — 3rd year'],
      ['BASED IN', 'Bobo-Dioulasso, Burkina Faso'],
      ['FIELDS', 'Websites · Mobile apps · Backend/API'],
      ['AVAILABILITY', 'Freelance · Full-time · Internship'],
      ['LANGUAGE', 'French (native) · Technical English'],
    ],
    skillHint: 'HOVER THE TECHNOLOGIES IN SPACE OR CLICK A CHIP.',
    labHint: 'Hover the 3D elements to interact.',
    tab_particle: 'PARTICLE SPHERE',
    tab_neural: 'NEURAL NET',
    tab_code: 'CODE SPACE',
    tab_arch: 'ARCHITECTURE',
    projMore: 'EXPLORE PROJECT',
    modal_index: 'PROJECT',
    modal_role: 'Role',
    modal_stack: 'STACK',
    modal_github: 'GitHub ↗',
    modal_demo: 'Live demo ↗',
    modal_nolinks: 'GitHub / demo links coming soon.',
    modal_close: 'Close',
    modal_result: 'RESULT',
    contact_intro:
      'Available for a freelance mission, a salaried position or an internship. Write to me directly — I usually reply within 24 hours.',
    form_name: 'NAME',
    form_email: 'EMAIL',
    form_message: 'MESSAGE',
    ph_name: 'Your name',
    ph_email: 'you@email.com',
    ph_message: 'Describe your project…',
    submit: 'SEND THE MESSAGE →',
    form_sending: 'SENDING…',
    form_success: 'Message sent. I reply within 24 hours.',
    form_error: 'Could not send. Write to me directly by email.',
    note: 'Opens your favorite email client.',
    foot_l: '© 2026 Fayçal Koné — Bobo-Dioulasso, Burkina Faso',
    foot_r: 'LAST UPDATED: AUGUST 2026',
    metaTitle: 'Fayçal Koné — Full-Stack Web & Mobile Developer',
    metaDesc:
      'Fayçal Koné, full-stack web & mobile developer (Python, JavaScript/TypeScript, Dart) based in Bobo-Dioulasso, Burkina Faso. Websites, mobile apps, APIs, Mobile Money payment.',
  },
  capacities: [
    'Website development',
    'Mobile app development',
    'APIs & Backend (Django · NestJS · Supabase)',
    'Flutter · React Native',
    'Databases (PostgreSQL · Oracle · SQLite)',
    'UML · Software architecture · Project management',
  ],
  about: [
    'A third-year student in Management IT at the African Unity University (Bobo-Dioulasso), I develop complete applications on my own — web and mobile — across several languages and technical environments: Python, JavaScript/TypeScript, Dart.',
    'I have designed and shipped end-to-end platforms: community alerts for power and water outages, dynamic QR code generation, Mobile Money payment integration, and medical appointment management. I am currently preparing my thesis defense and exploring entrepreneurial opportunities in software and e-commerce.',
    'I now want to bring this work beyond the local market — as a freelance contractor, a salaried employee, or an international internship.',
  ],
  skillsCat: ['Mobile & Frontend', 'Backend & APIs', 'Databases', 'Design & Project management'],
  skillsItem: [
    [
      { name: 'Flutter / Dart', blurb: 'iOS & Android apps: BurkiArena, Glow Up, SmartFarm BF.' },
      { name: 'React Native / Expo', blurb: 'Cross-platform mobile apps from a single shared codebase.' },
      { name: 'JavaScript / TypeScript', blurb: 'Business logic, APIs and interactive web interfaces.' },
      { name: 'React', blurb: 'Dynamic web interfaces and modern ecosystem.' },
      { name: 'HTML / CSS', blurb: 'Responsive layouts, faithful to the mockups.' },
    ],
    [
      { name: 'Django / Python', blurb: 'REST APIs, business models, auth, admin — RDV Medical.' },
      { name: 'NestJS', blurb: 'Structured Node.js backends, ready for production.' },
      { name: 'REST APIs', blurb: 'Design, development and consumption of APIs.' },
      { name: 'Firebase', blurb: 'Auth, push notifications, Firestore, storage.' },
      { name: 'Supabase', blurb: 'Backend as a service: Postgres, auth, realtime.' },
    ],
    [
      { name: 'PostgreSQL', blurb: 'Relational schemas, complex queries, migrations.' },
      { name: 'SQLite', blurb: 'Embedded databases and fast prototyping with Django.' },
      { name: 'Oracle / SQL', blurb: 'Data modeling and SQL queries — stock management.' },
    ],
    [
      { name: 'UML / Visual Paradigm', blurb: 'Classes, use cases, actors, cardinalities, include, inheritance.' },
      { name: 'Software architecture', blurb: 'Specifications, relationships, database design.' },
      { name: 'GanttProject', blurb: 'Planning, scheduling and project tracking.' },
    ],
  ],
  achievements: [
    {
      title: 'BurkiArena — sports social network',
      text: 'Flutter mobile app (formerly Faso Sports): accounts, sports profiles, feed, friends & messaging, workouts, matches, notifications.',
    },
    {
      title: 'Glow Up — beauty booking + AI',
      text: 'Client/Professional accounts, interactive map, geolocation, slot booking, reviews and AI skin analysis, with complete UML design.',
    },
    {
      title: 'RDV Medical — Django app',
      text: 'Medical appointment management: models, users, authentication (AUTH_USER_MODEL), SQLite migrations, views.',
    },
    {
      title: 'Systems design & architecture',
      text: 'Specifications, UML diagrams, data modeling and Gantt planning for real projects.',
    },
  ],
  projects: [
    {
      name: 'BurkiArena',
      status: 'IN DEVELOPMENT',
      date: '2025 — ongoing',
      role: 'Creator & full-stack developer',
      desc: 'Sports social network (formerly Faso Sports) for Burkina Faso: accounts and authentication, sports profiles, posts and feed, friends and messaging, workout programs, performance tracking, fields, matches, daily motivation, notifications, voice messages, photos, stickers and groups.',
      result: 'Alpha version shipped: accounts, sports profiles, feed, messaging, notifications and workout programs (Flutter + Supabase).',
      stack: 'Flutter · Supabase · PostgreSQL · Android Studio',
    },
    {
      name: 'Glow Up',
      status: 'ADVANCED DESIGN',
      date: '2024 — 2025',
      role: 'Product designer & developer',
      desc: 'App for discovering and booking beauty professionals: Client and Professional accounts, shops, services, posts, reviews and ratings, favorites, smart search, interactive map and geolocation, slot booking, receipts and AI skin analysis.',
      result: 'End-to-end validated concept: full specifications, complete UML (classes, use cases) and AI skin-analysis mockup.',
      stack: 'Specifications · UML (classes, use cases) · AI · Geolocation · Flutter',
    },
    {
      name: 'RDV Medical',
      status: 'WEB APPLICATION',
      date: '2024',
      role: 'Backend developer',
      desc: 'Medical appointment management in Django/Python: models, users, authentication via AUTH_USER_MODEL, SQLite migrations, views — and resolving user/profile relationship issues.',
      result: 'Shipped appointment management app: models, AUTH_USER_MODEL authentication, SQLite migrations and views — online booking.',
      stack: 'Django · Python · SQLite · Migrations',
    },
    {
      name: 'SmartFarm BF',
      status: 'AGRITECH — DESIGN',
      date: '2025 — design',
      role: 'Product designer',
      desc: 'AgriTech project for Burkina Faso, designed for Bobo-Dioulasso and the Houet province: digitalization and support for local farming activities.',
      result: 'Scoped AgriTech project for Bobo-Dioulasso and Houet: target, scope and web + mobile product proposal.',
      stack: 'Product design · Flutter · Supabase · API',
    },
    {
      name: 'Stock Pharmacie — Centre Muraz',
      status: 'STUDY & DIGITALIZATION',
      date: '2025',
      role: 'Analyst & report writer',
      desc: 'Digitalization of the pharmacy stock management at the Centre Muraz in Bobo-Dioulasso: structure presentation, literature review, problem statement and report organization.',
      result: 'Digitalization study delivered to Centre Muraz: inventory audit, specifications and implementation roadmap.',
      stack: 'System analysis · Oracle / SQL · Data modeling',
    },
  ],
  testimonials: [
    {
      role: 'Founder · Éclat d’Or beauty salon',
      location: 'Bobo-Dioulasso',
      for: 'Booking app for my salon',
      quote:
        'I needed an app where my clients book their own slots. Since then, my schedule is full and organized, and I lose far fewer appointments. It has become an essential tool for my salon.',
    },
    {
      role: 'General practitioner · La Colombe Clinic',
      location: 'Bobo-Dioulasso',
      for: 'Online appointment system for my clinic',
      quote:
        'My patients book from their phone, without calling. My front desk saves hours every week and everything is notified automatically. Serious, clean and well-explained work.',
    },
    {
      role: 'Logistics manager · Pharmacy',
      location: 'Bobo-Dioulasso',
      for: 'Digitalization of our pharmacy stock',
      quote:
        'We used to track our stock in notebooks. Now everything is digitalized, clear and reliable. The reports are precise, easy to read for the whole team, and updates take minutes.',
    },
    {
      role: 'President · Youth sports association',
      location: 'Ouagadougou',
      for: 'Website for our association',
      quote:
        'Our association needed a website to get known and let members register. It is beautiful, fast and easy to manage. A great showcase for our project.',
    },
    {
      role: 'Director · Actions & Hope NGO',
      location: 'Bobo-Dioulasso',
      for: 'Website for our NGO',
      quote:
        'Our website finally presents our actions properly, with project photos. Donors contact us more easily and we have gained credibility. Thank you for the quality and availability.',
    },
    {
      role: 'Manager · Écomarket du Sud',
      location: 'Banfora',
      for: 'My online shop with Mobile Money payment',
      quote:
        'My customers order online and pay with Mobile Money. Sales have increased and I manage my orders from my phone. Exactly what I needed.',
    },
  ],
  lab: {
    'Couche INPUT · connexions pondérées': 'Input layer · weighted connections',
    'Couche HIDDEN · connexions pondérées': 'Hidden layer · weighted connections',
    'Couche OUTPUT · connexions pondérées': 'Output layer · weighted connections',
    'Neurone de sortie : active la réponse du réseau.': 'Output neuron: activates the network’s response.',
    'Neurone d’entrée : reçoit les données brutes.': 'Input neuron: receives raw data.',
    'Neurone caché : propage et transforme le signal.': 'Hidden neuron: propagates and transforms the signal.',
    'Fragment de code en orbite.': 'Code fragment in orbit.',
    'Mot-clé flottant de l’espace code — purement esthétique.': 'Floating keyword in code space — purely decorative.',
    'Interfaces web & mobile côté utilisateur.': 'User-facing web & mobile interfaces.',
    'Couche de contrat entre les clients et le système.': 'Contract layer between clients and the system.',
    'Logique métier, authentification, paiements, files.': 'Business logic, authentication, payments, queues.',
    'Modules intelligents : analyse, prédiction, génération.': 'Intelligent modules: analysis, prediction, generation.',
    'Persistance et cohérence des données applicatives.': 'Persistence and consistency of application data.',
    'Clique un autre bloc pour changer de focus.': 'Click another block to change focus.',
    'Survole les éléments 3D pour interagir.': 'Hover the 3D elements to interact.',
  },
};

const de = {
  ui: {
    loaderLabel: 'INITIALIZING EXPERIENCE…',
    nav_about: 'Über mich',
    nav_skills: 'Fähigkeiten',
    nav_lab: '3D Labor',
    nav_projects: 'Projekte',
    nav_contact: 'Kontakt',
    nav_cta: 'VERFÜGBAR →',
    hero_eyebrow: 'FULL-STACK-ENTWICKLER · WEB & MOBILE · BOBO-DIOULASSO, BURKINA FASO',
    hero_splitWeb: 'WEBSITES',
    hero_splitMobile: 'MOBILE APPS',
    hero_status: 'VERFÜGBAR · FREELANCE · PRAKTIKUM',
    hero_role:
      'Ich entwickle komplette Websites und mobile Apps, in mehreren Sprachen, vom Backend bis zur Oberfläche — für lokale und internationale Märkte.',
    cta_projects: 'Meine Arbeiten ansehen',
    cta_contact: 'Kontakt aufnehmen',
    cv_download: 'CV HERUNTERLADEN',
    scroll: 'SCROLL',
    sec_about: '01 — ÜBER MICH',
    sec_skills: '02 — FÄHIGKEITEN',
    sec_lab: '03 — 3D LABOR',
    sec_ach: '04 — ERFOLGE',
    sec_projects: '05 — PROJEKTE',
    sec_testi: '06 — TESTIMONIALS',
    sec_contact: '07 — KONTAKT',
    title_about: 'Ein Entwickler, der für echten Nutzen baut.',
    title_skills: 'Mehrere Sprachen, eine Logik: liefern.',
    title_lab: 'Erlebnisse, die man anfassen kann.',
    title_ach: 'Was ich bereits geliefert habe.',
    title_projects: 'Websites und mobile Apps, von A bis Z.',
    title_testi: 'Zufriedene Kunden, funktionierende Websites.',
    title_contact: 'Bauen wir etwas <span>gemeinsam</span>?',
    about_p1:
      'Student im 3. Jahr <strong>Wirtschaftsinformatik</strong> an der African Unity University (Bobo-Dioulasso). Ich entwickle eigenständig komplette Anwendungen — Web und Mobile — in mehreren Sprachen und Umgebungen: Python, JavaScript/TypeScript, Dart.',
    about_p2:
      'Ich habe durchgängige Plattformen konzipiert und ausgeliefert: Community-Warnungen bei Strom- und Wasserausfällen, dynamische QR-Code-Generierung, Mobile-Money-Zahlungsintegration und Terminverwaltung für Praxen. Aktuell bereite ich meine Abschlussverteidigung vor und erkunde unternehmerische Chancen in Software und E-Commerce.',
    about_p3:
      'Heute möchte ich diese Arbeit über den lokalen Markt hinausbringen — als Freelancer, Festangestellter oder internationales Praktikum.',
    facts: [
      ['STUDIUM', 'Wirtschaftsinformatik — 3. Jahr'],
      ['STANDORT', 'Bobo-Dioulasso, Burkina Faso'],
      ['BEREICHE', 'Websites · Mobile Apps · Backend/API'],
      ['VERFÜGBARKEIT', 'Freelance · Festanstellung · Praktikum'],
      ['SPRACHE', 'Französisch (Muttersprache) · Technisches Englisch'],
    ],
    skillHint: 'FÄHIGKEITEN IM RAUM ÜBERFAHREN ODER CHIP ANKLICKEN.',
    labHint: 'Fahre über die 3D-Elemente, um zu interagieren.',
    tab_particle: 'PARTIKEL-SPHÄRE',
    tab_neural: 'NEURONALES NETZ',
    tab_code: 'CODE-RAUM',
    tab_arch: 'ARCHITEKTUR',
    projMore: 'PROJEKT ERKUNDEN',
    modal_index: 'PROJEKT',
    modal_role: 'Rolle',
    modal_stack: 'STACK',
    modal_github: 'GitHub ↗',
    modal_demo: 'Live-Demo ↗',
    modal_nolinks: 'GitHub-/Demo-Links folgen in Kürze.',
    modal_close: 'Schließen',
    modal_result: 'ERGEBNIS',
    contact_intro:
      'Verfügbar für Freelance-Missionen, eine Festanstellung oder ein Praktikum. Schreib mir direkt — ich antworte normalerweise innerhalb von 24 Stunden.',
    form_name: 'NAME',
    form_email: 'E-MAIL',
    form_message: 'NACHRICHT',
    ph_name: 'Dein Name',
    ph_email: 'du@email.de',
    ph_message: 'Beschreibe dein Projekt…',
    submit: 'NACHRICHT SENDEN →',
    form_sending: 'WIRD GESENDET…',
    form_success: 'Nachricht gesendet. Ich antworte innerhalb von 24 Stunden.',
    form_error: 'Senden fehlgeschlagen. Schreib mir direkt per E-Mail.',
    note: 'Öffnet deinen bevorzugten E-Mail-Client.',
    foot_l: '© 2026 Fayçal Koné — Bobo-Dioulasso, Burkina Faso',
    foot_r: 'LETZTES UPDATE: AUGUST 2026',
    metaTitle: 'Fayçal Koné — Full-Stack Web & Mobile Entwickler',
    metaDesc:
      'Fayçal Koné, Full-Stack-Web- und Mobile-Entwickler (Python, JavaScript/TypeScript, Dart), basiert in Bobo-Dioulasso, Burkina Faso. Websites, mobile Apps, APIs, Mobile-Money-Zahlung.',
  },
  capacities: [
    'Entwicklung von Websites',
    'Entwicklung mobiler Apps',
    'APIs & Backend (Django · NestJS · Supabase)',
    'Flutter · React Native',
    'Datenbanken (PostgreSQL · Oracle · SQLite)',
    'UML · Softwarearchitektur · Projektmanagement',
  ],
  about: [
    'Student im 3. Jahr Wirtschaftsinformatik an der African Unity University (Bobo-Dioulasso). Ich entwickle eigenständig komplette Anwendungen — Web und Mobile — in mehreren Sprachen und Umgebungen: Python, JavaScript/TypeScript, Dart.',
    'Ich habe durchgängige Plattformen konzipiert und ausgeliefert: Community-Warnungen bei Strom- und Wasserausfällen, dynamische QR-Code-Generierung, Mobile-Money-Zahlungsintegration und Terminverwaltung für Praxen. Aktuell bereite ich meine Abschlussverteidigung vor und erkunde unternehmerische Chancen in Software und E-Commerce.',
    'Heute möchte ich diese Arbeit über den lokalen Markt hinausbringen — als Freelancer, Festangestellter oder internationales Praktikum.',
  ],
  skillsCat: ['Mobile & Frontend', 'Backend & APIs', 'Datenbanken', 'Design & Projektmanagement'],
  skillsItem: [
    [
      { name: 'Flutter / Dart', blurb: 'iOS- & Android-Apps: BurkiArena, Glow Up, SmartFarm BF.' },
      { name: 'React Native / Expo', blurb: 'Plattformübergreifende Apps aus einer gemeinsamen Codebasis.' },
      { name: 'JavaScript / TypeScript', blurb: 'Business-Logik, APIs und interaktive Weboberflächen.' },
      { name: 'React', blurb: 'Dynamische Weboberflächen und modernes Ökosystem.' },
      { name: 'HTML / CSS', blurb: 'Responsive Layouts, getreu den Entwürfen.' },
    ],
    [
      { name: 'Django / Python', blurb: 'REST-APIs, Fachmodelle, Auth, Admin — RDV Medical.' },
      { name: 'NestJS', blurb: 'Strukturierte Node.js-Backends, produktionsreif.' },
      { name: 'REST APIs', blurb: 'Design, Entwicklung und Nutzung von APIs.' },
      { name: 'Firebase', blurb: 'Auth, Push-Notifications, Firestore, Storage.' },
      { name: 'Supabase', blurb: 'Backend as a Service: Postgres, Auth, Echtzeit.' },
    ],
    [
      { name: 'PostgreSQL', blurb: 'Relationale Schemata, komplexe Abfragen, Migrationen.' },
      { name: 'SQLite', blurb: 'Eingebettete Datenbanken und schnelles Prototyping mit Django.' },
      { name: 'Oracle / SQL', blurb: 'Datenmodellierung und SQL-Abfragen — Lagerverwaltung.' },
    ],
    [
      { name: 'UML / Visual Paradigm', blurb: 'Klassen, Anwendungsfälle, Akteure, Kardinalitäten, Vererbung.' },
      { name: 'Softwarearchitektur', blurb: 'Lastenheft, Beziehungen, Datenbankdesign.' },
      { name: 'GanttProject', blurb: 'Planung, Terminierung und Projektverfolgung.' },
    ],
  ],
  achievements: [
    {
      title: 'BurkiArena — soziales Sportnetzwerk',
      text: 'Flutter-App (vormals Faso Sports): Konten, Sportprofile, Feed, Freunde & Nachrichten, Trainingseinheiten, Spiele, Benachrichtigungen.',
    },
    {
      title: 'Glow Up — Beauty-Buchung + KI',
      text: 'Kunden-/Fachkraft-Konten, interaktive Karte, Geolokalisierung, Terminbuchung, Bewertungen und KI-Hautanalyse, mit vollständigem UML-Design.',
    },
    {
      title: 'RDV Medical — Django-App',
      text: 'Terminverwaltung für Praxen: Modelle, Benutzer, Authentifizierung (AUTH_USER_MODEL), SQLite-Migrationen, Views.',
    },
    {
      title: 'Systemdesign & Architektur',
      text: 'Lastenhefte, UML-Diagramme, Datenmodellierung und Gantt-Planung für reale Projekte.',
    },
  ],
  projects: [
    {
      name: 'BurkiArena',
      status: 'IN ENTWICKLUNG',
      date: '2025 — laufend',
      role: 'Gründer & Full-Stack-Entwickler',
      desc: 'Soziales Sportnetzwerk (vormals Faso Sports) für Burkina Faso: Konten und Authentifizierung, Sportprofile, Beiträge und Feed, Freunde und Nachrichten, Trainingsprogramme, Leistungsverfolgung, Felder, Spiele, tägliche Motivation, Benachrichtigungen, Sprachnachrichten, Fotos, Sticker und Gruppen.',
      result: 'Alpha-Version ausgeliefert: Konten, Sportprofile, Feed, Nachrichten, Benachrichtigungen und Trainingsprogramme (Flutter + Supabase).',
      stack: 'Flutter · Supabase · PostgreSQL · Android Studio',
    },
    {
      name: 'Glow Up',
      status: 'FORTGESCHRITTENES DESIGN',
      date: '2024 — 2025',
      role: 'Produktdesigner & Entwickler',
      desc: 'App zum Entdecken und Buchen von Beauty-Profis: Kunden- und Fachkraft-Konten, Shops, Services, Beiträge, Bewertungen, Favoriten, intelligente Suche, interaktive Karte und Geolokalisierung, Terminbuchung, Belege und KI-Hautanalyse.',
      result: 'End-to-end validiertes Konzept: Lastenheft, vollständiges UML (Klassen, Anwendungsfälle) und KI-Hautanalyse-Mockup.',
      stack: 'Lastenheft · UML (Klassen, Anwendungsfälle) · KI · Geolokalisierung · Flutter',
    },
    {
      name: 'RDV Medical',
      status: 'WEBANWENDUNG',
      date: '2024',
      role: 'Backend-Entwickler',
      desc: 'Terminverwaltung für Praxen in Django/Python: Modelle, Benutzer, Authentifizierung via AUTH_USER_MODEL, SQLite-Migrationen, Views — und Lösung von Beziehungsproblemen zwischen Benutzern und Profilen.',
      result: 'Terminverwaltungs-App ausgeliefert: Modelle, AUTH_USER_MODEL-Authentifizierung, SQLite-Migrationen und Views — Online-Buchung.',
      stack: 'Django · Python · SQLite · Migrationen',
    },
    {
      name: 'SmartFarm BF',
      status: 'AGRITECH — DESIGN',
      date: '2025 — Konzept',
      role: 'Produktdesigner',
      desc: 'AgriTech-Projekt für Burkina Faso, konzipiert für Bobo-Dioulasso und die Provinz Houet: Digitalisierung und Unterstützung lokaler Landwirtschaft.',
      result: 'AgriTech-Projekt für Bobo-Dioulasso und Houet abgesteckt: Zielgruppe, Umfang und Web- + Mobile-Produktvorschlag.',
      stack: 'Produktdesign · Flutter · Supabase · API',
    },
    {
      name: 'Stock Pharmacie — Centre Muraz',
      status: 'STUDIE & DIGITALISIERUNG',
      date: '2025',
      role: 'Analyst & Berichtsverfasser',
      desc: 'Digitalisierung der Apothekenlagerverwaltung im Centre Muraz in Bobo-Dioulasso: Vorstellung der Struktur, Literaturübersicht, Problemstellung und Berichtsorganisation.',
      result: 'Digitalisierungsstudie für das Centre Muraz geliefert: Bestandsaufnahme, Lastenheft und Umsetzungsplan.',
      stack: 'Systemanalyse · Oracle / SQL · Datenmodellierung',
    },
  ],
  testimonials: [
    {
      role: 'Inhaberin · Beauty-Salon Éclat d’Or',
      location: 'Bobo-Dioulasso',
      for: 'Buchungs-App für meinen Salon',
      quote:
        'Ich brauchte eine App, in der meine Kundinnen ihre Termine selbst buchen. Seitdem ist mein Kalender voll und organisiert, und ich verliere deutlich weniger Termine. Ein unverzichtbares Werkzeug für meinen Salon.',
    },
    {
      role: 'Arzt · Klinik La Colombe',
      location: 'Bobo-Dioulasso',
      for: 'Online-Terminsystem für meine Praxis',
      quote:
        'Meine Patienten buchen vom Handy aus, ohne anzurufen. Mein Sekretariat spart jede Woche Stunden, und alles wird automatisch benachrichtigt. Seriöse, saubere und gut erklärte Arbeit.',
    },
    {
      role: 'Logistikleiterin · Apotheke',
      location: 'Bobo-Dioulasso',
      for: 'Digitalisierung unseres Apothekenlagers',
      quote:
        'Wir haben unseren Bestand früher in Heften geführt. Jetzt ist alles digitalisiert, klar und zuverlässig. Die Berichte sind präzise, für das ganze Team gut lesbar, und Updates dauern nur Minuten.',
    },
    {
      role: 'Präsident · Jugend-Sportverein',
      location: 'Ouagadougou',
      for: 'Website unseres Vereins',
      quote:
        'Unser Verein brauchte eine Website, um bekannt zu werden und Mitglieder zu registrieren. Sie ist schön, schnell und einfach zu pflegen. Eine tolle Visitenkarte für unser Projekt.',
    },
    {
      role: 'Direktorin · NGO Actions & Espoir',
      location: 'Bobo-Dioulasso',
      for: 'Website unserer NGO',
      quote:
        'Unsere Website zeigt unsere Arbeit endlich ordentlich, mit Projektfotos. Spender kontaktieren uns leichter, und wir haben an Glaubwürdigkeit gewonnen. Danke für Qualität und Verfügbarkeit.',
    },
    {
      role: 'Geschäftsführer · Écomarket du Sud',
      location: 'Banfora',
      for: 'Mein Onlineshop mit Mobile-Money-Zahlung',
      quote:
        'Meine Kunden bestellen online und zahlen mit Mobile Money. Die Verkäufe sind gestiegen, und ich verwalte meine Bestellungen vom Handy aus. Genau das, was ich brauchte.',
    },
  ],
  lab: {
    'Couche INPUT · connexions pondérées': 'Eingabeschicht · gewichtete Verbindungen',
    'Couche HIDDEN · connexions pondérées': 'Verborgene Schicht · gewichtete Verbindungen',
    'Couche OUTPUT · connexions pondérées': 'Ausgabeschicht · gewichtete Verbindungen',
    'Neurone de sortie : active la réponse du réseau.': 'Ausgabeneuron: aktiviert die Antwort des Netzes.',
    'Neurone d’entrée : reçoit les données brutes.': 'Eingabeneuron: empfängt die Rohdaten.',
    'Neurone caché : propage et transforme le signal.': 'Verborgene Neuron: verbreitet und transformiert das Signal.',
    'Fragment de code en orbite.': 'Code-Fragment im Orbit.',
    'Mot-clé flottant de l’espace code — purement esthétique.': 'Schwebendes Schlüsselwort im Code-Raum — rein dekorativ.',
    'Interfaces web & mobile côté utilisateur.': 'Web- & Mobile-Oberflächen für den Nutzer.',
    'Couche de contrat entre les clients et le système.': 'Vertragsschicht zwischen Clients und System.',
    'Logique métier, authentification, paiements, files.': 'Fachlogik, Authentifizierung, Zahlungen, Warteschlangen.',
    'Modules intelligents : analyse, prédiction, génération.': 'Intelligente Module: Analyse, Vorhersage, Generierung.',
    'Persistance et cohérence des données applicatives.': 'Persistenz und Konsistenz der Anwendungsdaten.',
    'Clique un autre bloc pour changer de focus.': 'Klicke einen anderen Block, um den Fokus zu ändern.',
    'Survole les éléments 3D pour interagir.': 'Fahre über die 3D-Elemente, um zu interagieren.',
  },
};

const zh = {
  ui: {
    loaderLabel: 'INITIALIZING EXPERIENCE…',
    nav_about: '关于',
    nav_skills: '技能',
    nav_lab: '3D 实验室',
    nav_projects: '项目',
    nav_contact: '联系',
    nav_cta: '可接单 →',
    hero_eyebrow: '全栈开发者 · 网站与移动应用 · 布基纳法索 博博迪乌拉索',
    hero_splitWeb: '网站',
    hero_splitMobile: '移动应用',
    hero_status: '可接单 · 自由职业 · 实习',
    hero_role: '我用多种语言开发完整的网站和移动应用，从后端到界面——面向本地和国际市场。',
    cta_projects: '查看我的作品',
    cta_contact: '联系我',
    cv_download: '下载简历',
    scroll: 'SCROLL',
    sec_about: '01 — 关于',
    sec_skills: '02 — 技能',
    sec_lab: '03 — 3D 实验室',
    sec_ach: '04 — 成果',
    sec_projects: '05 — 项目',
    sec_testi: '06 — 客户评价',
    sec_contact: '07 — 联系',
    title_about: '一名为真实需求而开发的开发者。',
    title_skills: '多种语言，一个逻辑：交付。',
    title_lab: '可以亲手操作的体验。',
    title_ach: '我已完成的项目。',
    title_projects: '从零到一的网站和移动应用。',
    title_testi: '满意的客户，运转良好的网站。',
    title_contact: '我们一起做点什么<span>合作</span>？',
    about_p1:
      '我目前是非洲统一大学（博博迪乌拉索）<strong>管理信息学</strong>专业大三学生，独自开发完整的应用程序——网站和移动应用，使用多种语言和技术环境：Python、JavaScript/TypeScript、Dart。',
    about_p2:
      '我设计并交付了端到端的平台：停电停水的社区警报、动态二维码生成、Mobile Money 支付集成、医疗预约管理。目前正在准备毕业论文答辩，并探索软件和电子商务领域的创业机会。',
    about_p3:
      '我希望能将这份工作带到本地市场之外——自由职业、全职工作或国际实习。',
    facts: [
      ['学历', '管理信息学 — 大三'],
      ['所在地', '布基纳法索 博博迪乌拉索'],
      ['领域', '网站 · 移动应用 · 后端/API'],
      ['可用性', '自由职业 · 全职 · 实习'],
      ['语言', '法语（母语）· 技术英语'],
    ],
    skillHint: '在空间中悬停技能，或点击标签。',
    labHint: '悬停在 3D 元素上即可交互。',
    tab_particle: '粒子球',
    tab_neural: '神经网络',
    tab_code: '代码空间',
    tab_arch: '架构',
    projMore: '探索项目',
    modal_index: '项目',
    modal_role: '角色',
    modal_stack: '技术栈',
    modal_github: 'GitHub ↗',
    modal_demo: '在线演示 ↗',
    modal_nolinks: 'GitHub / 演示链接即将上线。',
    modal_close: '关闭',
    modal_result: '成果',
    contact_intro: '可接受自由职业任务、全职工作或实习。直接给我写信——我通常在 24 小时内回复。',
    form_name: '姓名',
    form_email: '邮箱',
    form_message: '留言',
    ph_name: '你的名字',
    ph_email: '你@邮箱.com',
    ph_message: '描述你的项目……',
    submit: '发送消息 →',
    form_sending: '正在发送…',
    form_success: '消息已发送。我将在 24 小时内回复。',
    form_error: '发送失败。请直接给我发邮件。',
    note: '将打开你常用的邮件客户端。',
    foot_l: '© 2026 Fayçal Koné — 布基纳法索 博博迪乌拉索',
    foot_r: '最后更新：2026年8月',
    metaTitle: 'Fayçal Koné — 全栈 Web 与移动开发工程师',
    metaDesc:
      'Fayçal Koné，全栈 Web 与移动开发工程师（Python、JavaScript/TypeScript、Dart），常驻布基纳法索博博迪乌拉索。网站、移动应用、API、Mobile Money 支付。',
  },
  capacities: [
    '网站开发',
    '移动应用开发',
    'API 与后端（Django · NestJS · Supabase）',
    'Flutter · React Native',
    '数据库（PostgreSQL · Oracle · SQLite）',
    'UML · 软件架构 · 项目管理',
  ],
  about: [
    '我目前是非洲统一大学（博博迪乌拉索）管理信息学专业大三学生，独自开发完整的应用程序——网站和移动应用，使用多种语言和技术环境：Python、JavaScript/TypeScript、Dart。',
    '我设计并交付了端到端的平台：停电停水的社区警报、动态二维码生成、Mobile Money 支付集成、医疗预约管理。目前正在准备毕业论文答辩，并探索软件和电子商务领域的创业机会。',
    '我希望能将这份工作带到本地市场之外——自由职业、全职工作或国际实习。',
  ],
  skillsCat: ['移动与前端', '后端与 API', '数据库', '设计与项目管理'],
  skillsItem: [
    [
      { name: 'Flutter / Dart', blurb: 'iOS 与 Android 应用：BurkiArena、Glow Up、SmartFarm BF。' },
      { name: 'React Native / Expo', blurb: '从单一共享代码库开发跨平台移动应用。' },
      { name: 'JavaScript / TypeScript', blurb: '业务逻辑、API 和交互式网页界面。' },
      { name: 'React', blurb: '动态网页界面和现代技术生态。' },
      { name: 'HTML / CSS', blurb: '响应式布局，忠实于设计稿。' },
    ],
    [
      { name: 'Django / Python', blurb: 'REST API、业务模型、认证、后台 — RDV Medical。' },
      { name: 'NestJS', blurb: '结构化的 Node.js 后端，可投入生产。' },
      { name: 'REST APIs', blurb: 'API 的设计、开发和调用。' },
      { name: 'Firebase', blurb: '认证、推送通知、Firestore、存储。' },
      { name: 'Supabase', blurb: '后端即服务：Postgres、认证、实时。' },
    ],
    [
      { name: 'PostgreSQL', blurb: '关系型模式、复杂查询、迁移。' },
      { name: 'SQLite', blurb: '嵌入式数据库，配合 Django 快速原型开发。' },
      { name: 'Oracle / SQL', blurb: '数据建模和 SQL 查询——库存管理。' },
    ],
    [
      { name: 'UML / Visual Paradigm', blurb: '类、用例、参与者、基数、include、继承。' },
      { name: '软件架构', blurb: '需求说明、关系、数据库设计。' },
      { name: 'GanttProject', blurb: '规划、排期和项目跟踪。' },
    ],
  ],
  achievements: [
    {
      title: 'BurkiArena — 体育社交网络',
      text: 'Flutter 移动应用（前身为 Faso Sports）：账号、体育档案、信息流、好友与消息、训练、比赛、通知。',
    },
    {
      title: 'Glow Up — 美容预约 + AI',
      text: '客户/商家账号、交互式地图、定位、时段预约、评价和 AI 皮肤分析，并配有完整 UML 设计。',
    },
    {
      title: 'RDV Medical — Django 应用',
      text: '医疗预约管理：模型、用户、认证（AUTH_USER_MODEL）、SQLite 迁移、视图。',
    },
    {
      title: '系统设计与架构',
      text: '为实际项目编写需求说明、UML 图、数据建模和甘特图规划。',
    },
  ],
  projects: [
    {
      name: 'BurkiArena',
      status: '开发中',
      date: '2025 — 进行中',
      role: '创始人 & 全栈开发者',
      desc: '面向布基纳法索的体育社交网络（前身为 Faso Sports）：账号与认证、体育档案、动态与信息流、好友与消息、训练计划、表现追踪、场地、比赛、每日激励、通知、语音消息、照片、贴纸和群组。',
      result: '已交付 Alpha 版本：账号、体育档案、信息流、消息、通知和训练计划（Flutter + Supabase）。',
      stack: 'Flutter · Supabase · PostgreSQL · Android Studio',
    },
    {
      name: 'Glow Up',
      status: '高级设计',
      date: '2024 — 2025',
      role: '产品设计师 & 开发者',
      desc: '发现和预约美容专业人士的应用：客户和商家账号、店铺、服务、动态、评价和评分、收藏、智能搜索、交互式地图和定位、时段预约、小票和 AI 皮肤分析。',
      result: '端到端验证的概念：完整需求文档、完整 UML（类、用例）和 AI 皮肤分析原型。',
      stack: '需求说明 · UML（类、用例）· AI · 定位 · Flutter',
    },
    {
      name: 'RDV Medical',
      status: 'Web 应用',
      date: '2024',
      role: '后端开发者',
      desc: 'Django/Python 医疗预约管理：模型、用户、通过 AUTH_USER_MODEL 认证、SQLite 迁移、视图——并解决用户与档案之间的关系问题。',
      result: '已交付预约管理应用：模型、AUTH_USER_MODEL 认证、SQLite 迁移和视图——在线预约。',
      stack: 'Django · Python · SQLite · 迁移',
    },
    {
      name: 'SmartFarm BF',
      status: '农业科技 — 设计',
      date: '2025 — 设计',
      role: '产品设计师',
      desc: '面向布基纳法索的农业科技项目，为博博迪乌拉索和韦省设计：农业活动的数字化与支持。',
      result: '已为博博迪乌拉索和韦省划定 AgriTech 项目：目标、范围和 Web + 移动端产品提案。',
      stack: '产品设计 · Flutter · Supabase · API',
    },
    {
      name: 'Stock Pharmacie — Centre Muraz',
      status: '研究与数字化',
      date: '2025',
      role: '分析师 & 报告撰写人',
      desc: '博博迪乌拉索 Centre Muraz 药房库存管理数字化：结构介绍、文献综述、问题陈述和报告组织。',
      result: '已向 Centre Muraz 交付数字化研究：现状盘点、需求说明和实施路线图。',
      stack: '系统分析 · Oracle / SQL · 数据建模',
    },
  ],
  testimonials: [
    {
      role: '创始人 · Éclat d’Or 美容沙龙',
      location: '博博迪乌拉索',
      for: '我沙龙用的预约应用',
      quote:
        '我需要一个客户可以自行预约时段的应用程序。如今我的日程满满当当、井井有条，也不再错过那么多预约。它已经成为我沙龙日常不可或缺的工具。',
    },
    {
      role: '全科医生 · La Colombe 诊所',
      location: '博博迪乌拉索',
      for: '我诊所的在线预约系统',
      quote:
        '患者可以直接在手机上预约，不用打电话。前台每周省下大量时间，一切都会自动通知。工作认真、干净，讲解也很清楚。',
    },
    {
      role: '物流主管 · 药房',
      location: '博博迪乌拉索',
      for: '我们药房库存的数字化',
      quote:
        '过去我们用本子记录库存。现在一切都数字化了，清晰可靠。报告准确，整个团队都能轻松阅读，更新只需几分钟。',
    },
    {
      role: '主席 · 青年体育协会',
      location: '瓦加杜古',
      for: '我们协会的网站',
      quote:
        '我们协会需要一个网站来扩大知名度并接受会员注册。网站美观、快速、易于管理，是展示我们项目的绝佳窗口。',
    },
    {
      role: '主任 · Actions & Espoir 非政府组织',
      location: '博博迪乌拉索',
      for: '我们 NGO 的网站',
      quote:
        '我们的网站终于能清晰展示我们的工作，包括项目照片。捐赠者更容易联系我们，我们也赢得了信誉。感谢他的质量和耐心。',
    },
    {
      role: '经理 · Écomarket du Sud',
      location: '邦福拉',
      for: '我的在线商店（支持 Mobile Money 支付）',
      quote:
        '客户在线下单并用 Mobile Money 支付。销量增加了，我可以在手机上管理订单。这正是我需要的。',
    },
  ],
  lab: {
    'Couche INPUT · connexions pondérées': '输入层 · 加权连接',
    'Couche HIDDEN · connexions pondérées': '隐藏层 · 加权连接',
    'Couche OUTPUT · connexions pondérées': '输出层 · 加权连接',
    'Neurone de sortie : active la réponse du réseau.': '输出神经元：激活网络的响应。',
    'Neurone d’entrée : reçoit les données brutes.': '输入神经元：接收原始数据。',
    'Neurone caché : propage et transforme le signal.': '隐藏神经元：传播并转换信号。',
    'Fragment de code en orbite.': '轨道上的代码片段。',
    'Mot-clé flottant de l’espace code — purement esthétique.': '代码空间中漂浮的关键词——纯装饰。',
    'Interfaces web & mobile côté utilisateur.': '面向用户的网页和移动界面。',
    'Couche de contrat entre les clients et le système.': '客户端与系统之间的契约层。',
    'Logique métier, authentification, paiements, files.': '业务逻辑、认证、支付、队列。',
    'Modules intelligents : analyse, prédiction, génération.': '智能模块：分析、预测、生成。',
    'Persistance et cohérence des données applicatives.': '应用数据的持久化与一致性。',
    'Clique un autre bloc pour changer de focus.': '点击另一个模块以切换焦点。',
    'Survole les éléments 3D pour interagir.': '悬停在 3D 元素上即可交互。',
  },
};

const ru = {
  ui: {
    loaderLabel: 'INITIALIZING EXPERIENCE…',
    nav_about: 'Обо мне',
    nav_skills: 'Навыки',
    nav_lab: '3D Лаборатория',
    nav_projects: 'Проекты',
    nav_contact: 'Контакты',
    nav_cta: 'ДОСТУПЕН →',
    hero_eyebrow: 'FULL-STACK РАЗРАБОТЧИК · ВЕБ-САЙТЫ И МОБИЛЬНЫЕ ПРИЛОЖЕНИЯ · БОБО-ДИУЛАСО, БУРКИНА-ФАСО',
    hero_splitWeb: 'ВЕБ-САЙТЫ',
    hero_splitMobile: 'МОБИЛЬНЫЕ ПРИЛОЖЕНИЯ',
    hero_status: 'ДОСТУПЕН · ФРИЛАНС · СТАЖИРОВКА',
    hero_role:
      'Я разрабатываю полные веб-сайты и мобильные приложения на нескольких языках — от бэкенда до интерфейса — для локальных и международных рынков.',
    cta_projects: 'Мои работы',
    cta_contact: 'Связаться со мной',
    cv_download: 'СКАЧАТЬ CV',
    scroll: 'SCROLL',
    sec_about: '01 — ОБО МНЕ',
    sec_skills: '02 — НАВЫКИ',
    sec_lab: '03 — 3D ЛАБОРАТОРИЯ',
    sec_ach: '04 — ДОСТИЖЕНИЯ',
    sec_projects: '05 — ПРОЕКТЫ',
    sec_testi: '06 — ОТЗЫВЫ',
    sec_contact: '07 — КОНТАКТЫ',
    title_about: 'Разработчик, который создаёт для реальных задач.',
    title_skills: 'Несколько языков, одна логика: результат.',
    title_lab: 'Эксперименты, которые можно потрогать.',
    title_ach: 'Что я уже реализовал.',
    title_projects: 'Веб-сайты и мобильные приложения — целиком.',
    title_testi: 'Довольные клиенты, работающие сайты.',
    title_contact: 'Построим что-нибудь <span>вместе</span>?',
    about_p1:
      'Студент 3-го курса <strong>управленческой информатики</strong> Африканского университета единства (Бобо-Диуласо). Я самостоятельно разрабатываю полные приложения — веб и мобильные — на нескольких языках и в разных средах: Python, JavaScript/TypeScript, Dart.',
    about_p2:
      'Я спроектировал и выпустил сквозные платформы: общинные оповещения об отключениях электричества и воды, генерация динамических QR-кодов, интеграция оплаты Mobile Money, управление медицинскими приёмами. Сейчас готовлю защиту диплома и изучаю предпринимательские возможности в софте и e-commerce.',
    about_p3:
      'Я хочу вывести эту работу за пределы локального рынка — фриланс, постоянная работа или международная стажировка.',
    facts: [
      ['ОБРАЗОВАНИЕ', 'Управленческая информатика — 3 курс'],
      ['БАЗА', 'Бобо-Диуласо, Буркина-Фасо'],
      ['НАПРАВЛЕНИЯ', 'Веб-сайты · Мобильные приложения · Бэкенд/API'],
      ['ДОСТУПНОСТЬ', 'Фриланс · Работа · Стажировка'],
      ['ЯЗЫК', 'Французский (родной) · Технический английский'],
    ],
    skillHint: 'НАВЕДИ НА НАВЫКИ В ПРОСТРАНСТВЕ ИЛИ НАЖМИ НА КАРТОЧКУ.',
    labHint: 'Наведите на 3D-элементы, чтобы взаимодействовать.',
    tab_particle: 'СФЕРА ЧАСТИЦ',
    tab_neural: 'НЕЙРОСЕТЬ',
    tab_code: 'КОДОВОЕ ПРОСТРАНСТВО',
    tab_arch: 'АРХИТЕКТУРА',
    projMore: 'ИЗУЧИТЬ ПРОЕКТ',
    modal_index: 'ПРОЕКТ',
    modal_role: 'Роль',
    modal_stack: 'СТЕК',
    modal_github: 'GitHub ↗',
    modal_demo: 'Живое демо ↗',
    modal_nolinks: 'Ссылки GitHub / демо скоро появятся.',
    modal_close: 'Закрыть',
    modal_result: 'РЕЗУЛЬТАТ',
    contact_intro:
      'Доступен для фриланс-задач, постоянной работы или стажировки. Напишите мне напрямую — я обычно отвечаю в течение 24 часов.',
    form_name: 'ИМЯ',
    form_email: 'EMAIL',
    form_message: 'СООБЩЕНИЕ',
    ph_name: 'Ваше имя',
    ph_email: 'вы@email.ru',
    ph_message: 'Опишите ваш проект…',
    submit: 'ОТПРАВИТЬ СООБЩЕНИЕ →',
    form_sending: 'ОТПРАВКА…',
    form_success: 'Сообщение отправлено. Я отвечаю в течение 24 часов.',
    form_error: 'Отправить не удалось. Напишите мне напрямую по email.',
    note: 'Откроет ваш почтовый клиент.',
    foot_l: '© 2026 Fayçal Koné — Бобо-Диуласо, Буркина-Фасо',
    foot_r: 'ПОСЛЕДНЕЕ ОБНОВЛЕНИЕ: АВГУСТ 2026',
    metaTitle: 'Fayçal Koné — Full-Stack Web & Mobile разработчик',
    metaDesc:
      'Fayçal Koné, full-stack веб- и мобильный разработчик (Python, JavaScript/TypeScript, Dart), Бобо-Диуласо, Буркина-Фасо. Веб-сайты, мобильные приложения, API, оплата Mobile Money.',
  },
  capacities: [
    'Разработка веб-сайтов',
    'Разработка мобильных приложений',
    'API и бэкенд (Django · NestJS · Supabase)',
    'Flutter · React Native',
    'Базы данных (PostgreSQL · Oracle · SQLite)',
    'UML · Архитектура ПО · Управление проектами',
  ],
  about: [
    'Студент 3-го курса управленческой информатики Африканского университета единства (Бобо-Диуласо). Я самостоятельно разрабатываю полные приложения — веб и мобильные — на нескольких языках и в разных средах: Python, JavaScript/TypeScript, Dart.',
    'Я спроектировал и выпустил сквозные платформы: общинные оповещения об отключениях электричества и воды, генерация динамических QR-кодов, интеграция оплаты Mobile Money, управление медицинскими приёмами. Сейчас готовлю защиту диплома и изучаю предпринимательские возможности в софте и e-commerce.',
    'Я хочу вывести эту работу за пределы локального рынка — фриланс, постоянная работа или международная стажировка.',
  ],
  skillsCat: ['Мобильное и фронтенд', 'Бэкенд и API', 'Базы данных', 'Проектирование и управление проектами'],
  skillsItem: [
    [
      { name: 'Flutter / Dart', blurb: 'iOS и Android приложения: BurkiArena, Glow Up, SmartFarm BF.' },
      { name: 'React Native / Expo', blurb: 'Кроссплатформенные мобильные приложения из общей кодовой базы.' },
      { name: 'JavaScript / TypeScript', blurb: 'Бизнес-логика, API и интерактивные веб-интерфейсы.' },
      { name: 'React', blurb: 'Динамические веб-интерфейсы и современная экосистема.' },
      { name: 'HTML / CSS', blurb: 'Адаптивные макеты, верные дизайн-прототипам.' },
    ],
    [
      { name: 'Django / Python', blurb: 'REST API, бизнес-модели, аутентификация, админка — RDV Medical.' },
      { name: 'NestJS', blurb: 'Структурированные бэкенды на Node.js, готовые к продакшену.' },
      { name: 'REST APIs', blurb: 'Проектирование, разработка и использование API.' },
      { name: 'Firebase', blurb: 'Аутентификация, push-уведомления, Firestore, хранилище.' },
      { name: 'Supabase', blurb: 'Backend as a service: Postgres, аутентификация, реальное время.' },
    ],
    [
      { name: 'PostgreSQL', blurb: 'Реляционные схемы, сложные запросы, миграции.' },
      { name: 'SQLite', blurb: 'Встроенные базы данных и быстрое прототипирование с Django.' },
      { name: 'Oracle / SQL', blurb: 'Моделирование данных и SQL-запросы — управление складом.' },
    ],
    [
      { name: 'UML / Visual Paradigm', blurb: 'Классы, варианты использования, актёры, кардинальности, наследование.' },
      { name: 'Архитектура ПО', blurb: 'Техническое задание, связи, проектирование базы данных.' },
      { name: 'GanttProject', blurb: 'Планирование, составление графика и контроль проекта.' },
    ],
  ],
  achievements: [
    {
      title: 'BurkiArena — спортивная соцсеть',
      text: 'Мобильное приложение на Flutter (ранее Faso Sports): аккаунты, спортивные профили, лента, друзья и переписка, тренировки, матчи, уведомления.',
    },
    {
      title: 'Glow Up — бронь красоты + ИИ',
      text: 'Аккаунты клиента/специалиста, интерактивная карта, геолокация, бронирование слотов, отзывы и ИИ-анализ кожи, с полным UML-проектом.',
    },
    {
      title: 'RDV Medical — приложение на Django',
      text: 'Управление медицинскими приёмами: модели, пользователи, аутентификация (AUTH_USER_MODEL), миграции SQLite, представления.',
    },
    {
      title: 'Проектирование и архитектура систем',
      text: 'Технические задания, UML-диаграммы, моделирование данных и планирование в Gantt для реальных проектов.',
    },
  ],
  projects: [
    {
      name: 'BurkiArena',
      status: 'В РАЗРАБОТКЕ',
      date: '2025 — в разработке',
      role: 'Создатель и full-stack разработчик',
      desc: 'Спортивная социальная сеть для Буркина-Фасо (ранее Faso Sports): аккаунты и аутентификация, спортивные профили, публикации и лента, друзья и переписка, программы тренировок, отслеживание результатов, площадки, матчи, ежедневная мотивация, уведомления, голосовые сообщения, фото, стикеры и группы.',
      result: 'Выпущена альфа-версия: аккаунты, спортивные профили, лента, переписка, уведомления и программы тренировок (Flutter + Supabase).',
      stack: 'Flutter · Supabase · PostgreSQL · Android Studio',
    },
    {
      name: 'Glow Up',
      status: 'ПРОДВИНУТЫЙ ДИЗАЙН',
      date: '2024 — 2025',
      role: 'Продуктовый дизайнер и разработчик',
      desc: 'Приложение для поиска и бронирования специалистов красоты: аккаунты клиента и специалиста, салоны, услуги, публикации, отзывы и рейтинги, избранное, умный поиск, интерактивная карта и геолокация, бронирование слотов, чеки и ИИ-анализ кожи.',
      result: 'Сквозной подтверждённый концепт: полное ТЗ, полный UML (классы, варианты использования) и макет ИИ-анализа кожи.',
      stack: 'ТЗ · UML (классы, варианты использования) · ИИ · Геолокация · Flutter',
    },
    {
      name: 'RDV Medical',
      status: 'ВЕБ-ПРИЛОЖЕНИЕ',
      date: '2024',
      role: 'Бэкенд-разработчик',
      desc: 'Управление медицинскими приёмами на Django/Python: модели, пользователи, аутентификация через AUTH_USER_MODEL, миграции SQLite, представления — и решение проблем связей пользователей и профилей.',
      result: 'Выпущено приложение управления приёмами: модели, аутентификация AUTH_USER_MODEL, миграции SQLite и представления — онлайн-запись.',
      stack: 'Django · Python · SQLite · Миграции',
    },
    {
      name: 'SmartFarm BF',
      status: 'АГРОТЕХ — ДИЗАЙН',
      date: '2025 — концепция',
      role: 'Продуктовый дизайнер',
      desc: 'Агротех-проект для Буркина-Фасо, ориентированный на Бобо-Диуласо и провинцию Уэ: цифровизация и поддержка местного сельского хозяйства.',
      result: 'Определён проект AgriTech для Бобо-Диуласо и Уэ: аудитория, рамки и предложение продукта web + mobile.',
      stack: 'Продуктовый дизайн · Flutter · Supabase · API',
    },
    {
      name: 'Stock Pharmacie — Centre Muraz',
      status: 'ИССЛЕДОВАНИЕ И ЦИФРОВИЗАЦИЯ',
      date: '2025',
      role: 'Аналитик и автор отчёта',
      desc: 'Цифровизация управления складом аптеки Центра Мура в Бобо-Диуласо: представление структуры, обзор литературы, постановка проблемы и организация отчёта.',
      result: 'Передано исследование цифровизации для Центра Мура: инвентаризация, ТЗ и план внедрения.',
      stack: 'Системный анализ · Oracle / SQL · Моделирование данных',
    },
  ],
  testimonials: [
    {
      role: 'Основательница · салон красоты Éclat d’Or',
      location: 'Бобо-Диуласо',
      for: 'Приложение для бронирования в моём салоне',
      quote:
        'Мне нужно было приложение, где клиентки сами бронируют слоты. С тех пор мой график заполнен и организован, а срывов записей стало намного меньше. Это незаменимый инструмент для моего салона.',
    },
    {
      role: 'Врач · клиника La Colombe',
      location: 'Бобо-Диуласо',
      for: 'Онлайн-система записи для моей клиники',
      quote:
        'Пациенты записываются с телефона, без звонков. Секретариат экономит часы каждую неделю, а уведомления приходят автоматически. Серьёзная, аккуратная и хорошо объяснённая работа.',
    },
    {
      role: 'Руководитель логистики · аптека',
      location: 'Бобо-Диуласо',
      for: 'Цифровизация склада нашей аптеки',
      quote:
        'Раньше мы вели склад в тетрадях. Теперь всё оцифровано, ясно и надёжно. Отчёты точные, их легко читает вся команда, а обновление занимает минуты.',
    },
    {
      role: 'Президент · молодёжная спортивная ассоциация',
      location: 'Уагадугу',
      for: 'Сайт нашей ассоциации',
      quote:
        'Нашей ассоциации нужен был сайт, чтобы заявить о себе и принимать заявки от участников. Он красивый, быстрый и простой в управлении. Отличная витрина для нашего проекта.',
    },
    {
      role: 'Директор · НПО Actions & Espoir',
      location: 'Бобо-Диуласо',
      for: 'Сайт нашей НПО',
      quote:
        'Наш сайт наконец-то достойно представляет наши проекты, с фотографиями. Донорам стало проще с нами связаться, а мы выросли в доверии. Спасибо за качество и доступность.',
    },
    {
      role: 'Управляющий · Écomarket du Sud',
      location: 'Банфора',
      for: 'Мой интернет-магазин с оплатой Mobile Money',
      quote:
        'Клиенты заказывают онлайн и платят через Mobile Money. Продажи выросли, и я управляю заказами с телефона. Именно то, что мне было нужно.',
    },
  ],
  lab: {
    'Couche INPUT · connexions pondérées': 'Входной слой · взвешенные связи',
    'Couche HIDDEN · connexions pondérées': 'Скрытый слой · взвешенные связи',
    'Couche OUTPUT · connexions pondérées': 'Выходной слой · взвешенные связи',
    'Neurone de sortie : active la réponse du réseau.': 'Выходной нейрон: активирует ответ сети.',
    'Neurone d’entrée : reçoit les données brutes.': 'Входной нейрон: получает исходные данные.',
    'Neurone caché : propage et transforme le signal.': 'Скрытый нейрон: распространяет и преобразует сигнал.',
    'Fragment de code en orbite.': 'Фрагмент кода на орбите.',
    'Mot-clé flottant de l’espace code — purement esthétique.': 'Плавающее ключевое слово в кодовом пространстве — чисто декоративное.',
    'Interfaces web & mobile côté utilisateur.': 'Пользовательские веб- и мобильные интерфейсы.',
    'Couche de contrat entre les clients et le système.': 'Контрактный слой между клиентами и системой.',
    'Logique métier, authentification, paiements, files.': 'Бизнес-логика, аутентификация, платежи, очереди.',
    'Modules intelligents : analyse, prédiction, génération.': 'Интеллектуальные модули: анализ, прогноз, генерация.',
    'Persistance et cohérence des données applicatives.': 'Хранение и согласованность данных приложения.',
    'Clique un autre bloc pour changer de focus.': 'Нажми на другой блок, чтобы сменить фокус.',
    'Survole les éléments 3D pour interagir.': 'Наведите на 3D-элементы, чтобы взаимодействовать.',
  },
};

export const TRANSLATIONS = { en, de, zh, ru };

/* Dictionnaires UI par langue (fr inclus pour l’initialisation). */
const UI = { fr, en, de, zh, ru };

export function getUi(code) {
  return (UI[code] || fr).ui;
}

export function getLangName(code) {
  const l = LANGS.find((x) => x.code === code);
  return l ? l.name : code;
}

/* Traduction best-effort des textes du lab 3D (remplacement de sous-chaînes). */
export function translateLab(code, text) {
  if (!text) return text;
  if (code === 'fr') return text;
  const map = (TRANSLATIONS[code] || {}).lab || {};
  let out = String(text);
  for (const key of Object.keys(map)) {
    if (out.includes(key)) out = out.replace(key, map[key]);
  }
  return out;
}
