/* ============================================================================
   PANNEAU DE CONFIGURATION
   C'est ICI que tu ajoutes tes compétences, réalisations, projets, liens…
   Ajoute simplement une ligne dans le tableau qui t'intéresse : le site se
   met à jour automatiquement. Les champs `blurb`, `role`, `github`, `demo`,
   `accent` sont OPTIONNELS — si tu ne les remplis pas, le site s'adapte.
   ============================================================================ */

export const SITE_DATA = {
  // ---------- PROFIL ----------
  profile: {
    firstName: 'Fayçal',
    lastName: 'Koné',
    brand: 'Fayçal.dev',
    role: 'FULL-STACK DEVELOPER',
    location: 'Bobo-Dioulasso, Burkina Faso',
    tagline:
      'Je conçois et développe des sites web et des applications mobiles complètes, dans plusieurs langages, du backend jusqu’à l’interface — pour des marchés locaux comme internationaux.',
    eyebrow: 'DÉVELOPPEUR FULL-STACK · WEB & MOBILE · BOBO-DIOULASSO, BURKINA FASO',
    // ← Remplace par le chemin de ta vraie photo (ex: "/faycal.jpg" placé dans /public)
    photo: '/faycal.jpg',
    // ← Remplace par tes vraies coordonnées
    email: 'faycalkone960@icloud.com',
    phone: '+226 54 15 97 87',
    linkedin: '',
    github: 'https://github.com/konefaycal960',
  },

  // Chips affichées juste sous le rôle, en haut de page
  capacities: [
    'Développement de sites web',
    'Développement d’applications mobiles',
    'APIs & Backend (Django · NestJS · Supabase)',
    'Flutter · React Native',
    'Base de données (PostgreSQL · Oracle · SQLite)',
    'UML · Architecture logicielle · Gestion de projet',
  ],

  // Groupes de compétences avec niveau de 0 à 100.
  // `blurb` est optionnel : une phrase courte affichée dans le panneau Skills.
  skills: [
    {
      category: 'Mobile & Frontend',
      items: [
        { name: 'Flutter / Dart', level: 86, blurb: 'Apps iOS & Android : BurkiArena, Glow Up, SmartFarm BF.' },
        { name: 'React Native / Expo', level: 78, blurb: 'Apps mobiles multiplateformes depuis un code partagé.' },
        { name: 'JavaScript / TypeScript', level: 84, blurb: 'Logique métier, APIs et interfaces web interactives.' },
        { name: 'React', level: 76, blurb: 'Interfaces web dynamiques et écosystème moderne.' },
        { name: 'HTML / CSS', level: 88, blurb: 'Mise en page responsive, fidèle aux maquettes.' },
      ],
    },
    {
      category: 'Backend & APIs',
      items: [
        { name: 'Django / Python', level: 90, blurb: 'APIs REST, modèles métier, auth, admin — RDV Medical.' },
        { name: 'NestJS', level: 78, blurb: 'Backends Node.js structurés, prêts pour la production.' },
        { name: 'APIs REST', level: 88, blurb: 'Conception, développement et consommation d’APIs.' },
        { name: 'Firebase', level: 80, blurb: 'Auth, notifications push, Firestore, stockage.' },
        { name: 'Supabase', level: 82, blurb: 'Backend as a service : Postgres, auth, temps réel.' },
      ],
    },
    {
      category: 'Bases de données',
      items: [
        { name: 'PostgreSQL', level: 82, blurb: 'Schémas relationnels, requêtes complexes, migrations.' },
        { name: 'SQLite', level: 86, blurb: 'Bases embarquées et prototypage rapide avec Django.' },
        { name: 'Oracle / SQL', level: 76, blurb: 'Modélisation et requêtes SQL — gestion de stock.' },
      ],
    },
    {
      category: 'Conception & Gestion de projet',
      items: [
        { name: 'UML / Visual Paradigm', level: 86, blurb: 'Classes, cas d’utilisation, acteurs, cardinalités, include, héritage.' },
        { name: 'Architecture logicielle', level: 82, blurb: 'Cahier des charges, relations, conception de la base de données.' },
        { name: 'GanttProject', level: 76, blurb: 'Planification, ordonnancement et suivi de projet.' },
      ],
    },
  ],

  // ---------- TÉMOIGNAGES ----------
  // `name`, `role`, `location` et `for` sont affichés sous la citation.
  // `rating` (1 à 5) remplit le nombre d'étoiles.
  // Chaque témoignage parle d'un site/app livré POUR LE CLIENT (usage personnel),
  // pas des projets personnels listés plus bas.
  testimonials: [
    {
      name: 'Aïcha Ouattara',
      role: 'Fondatrice · Salon de beauté Éclat d’Or',
      location: 'Bobo-Dioulasso',
      for: 'Application de réservation de mon salon',
      rating: 5,
      quote:
        'J’avais besoin d’une application où mes clientes réservent elles-mêmes leurs créneaux. Depuis, mon agenda est plein et organisé, et je perds beaucoup moins de rendez-vous. C’est devenu un outil indispensable au quotidien pour mon salon.',
    },
    {
      name: 'Dr Ibrahim Kaboré',
      role: 'Médecin généraliste · Clinique La Colombe',
      location: 'Bobo-Dioulasso',
      for: 'Système de rendez-vous en ligne pour ma clinique',
      rating: 5,
      quote:
        'Mes patients prennent rendez-vous depuis leur téléphone, sans appeler. Mon secrétariat gagne des heures chaque semaine et tout est notifié automatiquement. Un travail sérieux, propre et bien expliqué.',
    },
    {
      name: 'Salimata Traoré',
      role: 'Responsable logistique · Pharmacie',
      location: 'Bobo-Dioulasso',
      for: 'Digitalisation du stock de notre pharmacie',
      rating: 5,
      quote:
        'Nous suivions notre stock dans des cahiers. Aujourd’hui tout est numérisé, clair et fiable. Les rapports sont précis, faciles à lire pour toute l’équipe, et la mise à jour se fait en quelques minutes.',
    },
    {
      name: 'Yacouba Sanou',
      role: 'Président · Association sportive des jeunes',
      location: 'Ouagadougou',
      for: 'Site web de notre association',
      rating: 5,
      quote:
        'Notre association avait besoin d’un site pour se faire connaître et permettre aux membres de s’inscrire. Il est beau, rapide et simple à administrer. Une belle vitrine pour notre projet.',
    },
    {
      name: 'Mariam Sawadogo',
      role: 'Directrice · ONG Actions & Espoir',
      location: 'Bobo-Dioulasso',
      for: 'Site web de notre ONG',
      rating: 5,
      quote:
        'Notre site présente enfin nos actions proprement, avec les photos des projets. Les donateurs nous contactent plus facilement et nous gagnons en crédibilité. Merci pour la qualité et la disponibilité.',
    },
    {
      name: 'Adama Coulibaly',
      role: 'Gérant · Écomarket du Sud',
      location: 'Banfora',
      for: 'Ma boutique en ligne avec paiement Mobile Money',
      rating: 5,
      quote:
        'Mes clients commandent en ligne et paient par Mobile Money. Les ventes ont augmenté et je gère mes commandes depuis mon téléphone. Exactement ce dont j’avais besoin.',
    },
  ],

  // Réalisations clés — chaque entrée devient une ligne numérotée
  achievements: [
    { title: 'BurkiArena — réseau social sportif', text: 'Application mobile Flutter (anciennement Faso Sports) : comptes, profils sportifs, feed, amis & messagerie, entraînements, matchs, notifications.' },
    { title: 'Glow Up — réservation beauté + IA', text: 'Comptes Client/Professionnel, carte interactive, géolocalisation, réservation de créneaux, avis et analyse de peau par IA, avec conception UML complète.' },
    { title: 'RDV Medical — app Django', text: 'Gestion de rendez-vous médicaux : modèles, utilisateurs, authentification (AUTH_USER_MODEL), migrations SQLite, vues.' },
    { title: 'Conception & architecture de systèmes', text: 'Cahier des charges, diagrammes UML, modélisation de données et planification Gantt pour des projets concrets.' },
  ],

  // Cartes projets.
  // badgeClass : "live", "build" ou "design".
  // role / github / demo sont optionnels (null = masqué).
  projects: [
    {
      name: 'BurkiArena',
      status: 'EN DÉVELOPPEMENT',
      badgeClass: 'build',
      accent: '#22D3EE',
      date: '2025 — en cours',
      // ← Place ta capture dans /public/screenshots/ et renseigne le chemin
      image: '/screenshots/burkiarena.png',
      role: 'Créateur & développeur full-stack',
      github: null,
      demo: null,
      desc: 'Réseau social sportif (anciennement Faso Sports) pour le Burkina Faso : comptes et authentification, profils sportifs, publications et feed, amis et messagerie, programmes d’entraînement, suivi des performances, terrains, matchs, motivation quotidienne, notifications, messages vocaux, photos, stickers et groupes.',
      result: 'Version alpha livrée : comptes, profils sportifs, feed, messagerie, notifications et programmes d’entraînement (Flutter + Supabase).',
      stack: 'Flutter · Supabase · PostgreSQL · Android Studio',
    },
    {
      name: 'Glow Up',
      status: 'CONCEPTION AVANCÉE',
      badgeClass: 'design',
      accent: '#F5C067',
      date: '2024 — 2025',
      image: '/screenshots/glowup.png',
      role: 'Concepteur produit & développeur',
      github: null,
      demo: null,
      desc: 'Application de découverte et réservation de professionnels de la beauté : comptes Client et Professionnel, boutiques, services, publications, avis et notes, favoris, recherche intelligente, carte interactive et géolocalisation, réservation de créneaux, reçus et analyse de peau par IA.',
      result: 'Concept validé de bout en bout : cahier des charges, UML complet (classes, cas d’usage) et maquette d’analyse de peau par IA.',
      stack: 'Cahier des charges · UML (classes, cas d’utilisation) · IA · Géolocalisation · Flutter',
    },
    {
      name: 'RDV Medical',
      status: 'APPLICATION WEB',
      badgeClass: 'build',
      accent: '#FF7A5C',
      date: '2024',
      image: '/screenshots/rdvmedical.png',
      role: 'Développeur backend',
      github: null,
      demo: null,
      desc: 'Gestion de rendez-vous médicaux en Django/Python : modèles, utilisateurs, authentification via AUTH_USER_MODEL, migrations SQLite, vues — et résolution des problèmes de relations entre utilisateurs et profils.',
      result: 'Application livrée : modèles, authentification AUTH_USER_MODEL, migrations SQLite et vues — prise de rendez-vous en ligne.',
      stack: 'Django · Python · SQLite · Migrations',
    },
    {
      name: 'SmartFarm BF',
      status: 'AGRITECH — CONCEPTION',
      badgeClass: 'design',
      accent: '#6C5CE7',
      date: '2025 — conception',
      image: '/screenshots/smartfarm.png',
      role: 'Concepteur produit',
      github: null,
      demo: null,
      desc: 'Projet AgriTech pour le Burkina Faso, pensé pour Bobo-Dioulasso et la province du Houet : digitalisation et aide aux activités agricoles locales.',
      result: 'Projet cadré pour Bobo-Dioulasso et le Houet : cible, périmètre et proposition produit web + mobile.',
      stack: 'Conception produit · Flutter · Supabase · API',
    },
    {
      name: 'Stock Pharmacie — Centre Muraz',
      status: 'ÉTUDE & DIGITALISATION',
      badgeClass: 'design',
      accent: '#6EE7DE',
      date: '2025',
      image: '/screenshots/stockpharmacie.png',
      role: 'Analyste & rédacteur de rapport',
      github: null,
      demo: null,
      desc: 'Digitalisation de la gestion du stock de la pharmacie du Centre Muraz à Bobo-Dioulasso : présentation de la structure, revue de littérature, problématique et organisation du rapport.',
      result: 'Étude livrée au Centre Muraz : état des lieux, cahier des charges et plan de digitalisation.',
      stack: 'Analyse de système · Oracle / SQL · Modélisation de données',
    },
  ],
};
