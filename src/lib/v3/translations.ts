export type Locale = 'id' | 'en' | 'fr';

export interface Translations {
  hero: {
    greeting: string;
    name: string;
    role: string;
    openToWork: string;
    cta: string;
  };
  about: {
    heading: string;
    paragraphs: string[];
    currently: {
      label: string;
      status: string;
      thesis: string;
      schedule: string;
    };
  };
  projects: {
    heading: string;
    subtitle: string;
    live: string;
    source: string;
    descriptions: Record<string, { summary: string; focus: string }>;
  };
  skills: {
    heading: string;
    subtitle: string;
    categories: Record<string, string>;
  };
  contact: {
    heading: string;
    subtitle: string;
    cta: string;
    email: string;
    github: string;
    linkedin: string;
    or: string;
  };
  nav: {
    about: string;
    projects: string;
    skills: string;
    contact: string;
  };
  langLabel: string;
}

export const translations: Record<Locale, Translations> = {
  id: {
    hero: {
      greeting: 'Halo, saya',
      name: 'Ryan Prayoga',
      role: 'Full-Stack Engineer',
      openToWork: 'Terbuka untuk peluang baru',
      cta: 'Lihat karya saya',
    },
    about: {
      heading: 'Tentang Saya',
      paragraphs: [
        'Full-stack engineer dengan pengalaman 4+ tahun membangun sistem enterprise, civic-tech, developer tooling, dan deployment workflow. Pernah memimpin tim 4 engineer di PT Traspac Makmur Sejahtera.',
        'Dari developer menjadi Team Leader — saya mengatur prioritas, menjaga delivery, melakukan code review, dan tetap hands-on menyelesaikan problem teknis.',
        'Project personal seperti developer tooling, civic reporting platform, media sync Android-web, dan deployment CLI jadi ruang latihan untuk product thinking, architecture, dan production workflow.',
      ],
      currently: {
        label: 'Saat Ini',
        status: 'Terbuka untuk peluang kerja baru — full-time, contract, atau freelance.',
        thesis: 'Semester akhir S1 Teknik Informatika — sedang menyusun skripsi tentang algoritma K-Means Clustering untuk analisis pola pengadaan pemerintah.',
        schedule: 'Jadwal fleksibel — tidak mengganggu waktu kerja.',
      },
    },
    projects: {
      heading: 'Proyek',
      subtitle: 'Pilihan karya yang sudah live dan digunakan.',
      live: 'Live',
      source: 'Source',
      descriptions: {
        pantauanggaran: {
          summary: 'Platform transparansi pengadaan publik Indonesia. Dashboard real-time dengan deteksi anomali berbasis AI.',
          focus: 'Scraping data SiRUP, normalisasi, mapping wilayah, scoring anomali, dan visualisasi dashboard interaktif.',
        },
        jedug: {
          summary: 'Platform pelaporan jalan rusak berbasis peta, upload bukti, moderasi admin, dan statistik publik.',
          focus: 'Flow submit laporan, smart merge issue terdekat, storage hardening, map clustering, heatmap, dan admin moderation.',
        },
        korbanmbg: {
          summary: 'Pemantau korban Makan Bergizi Gratis — tracking laporan dan analisis dampak program pemerintah.',
          focus: 'Data pipeline, visualisasi korban, dashboard analitik, dan workflow moderasi konten.',
        },
        billiard: {
          summary: 'Assistant aim billiard berbasis kamera — analisis posisi bola, hitungan sudut, dan rekomendasi tembakan.',
          focus: 'Computer vision, deteksi bola, kalkulasi angle, dan rendering canvas interaktif.',
        },
        brunogen: {
          summary: 'Developer tool yang membaca Laravel, Express, dan Go API lalu menghasilkan OpenAPI dan Bruno collection siap pakai.',
          focus: 'Route scanning, request/response inference, regression fixtures, publish workflow, dan package hygiene untuk npm.',
        },
        gascli: {
          summary: 'CLI Bash untuk build dan deploy project Go dan Node ecosystem via PM2 dengan mode interactive.',
          focus: 'Stack detection otomatis, ecosystem config, wizard deploy, metadata SQLite, dan PM2 integration.',
        },
      },
    },
    skills: {
      heading: 'Stack Teknis',
      subtitle: 'Teknologi yang saya gunakan sehari-hari.',
      categories: {
        backend: 'Backend',
        frontend: 'Frontend',
        mobile: 'Mobile',
        workflow: 'Workflow',
      },
    },
    contact: {
      heading: 'Mari Terhubung',
      subtitle: 'Saya sedang terbuka untuk peluang baru. Mari bicara.',
      cta: 'Kirim Email',
      email: 'Email',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      or: 'atau',
    },
    nav: {
      about: 'Tentang',
      projects: 'Proyek',
      skills: 'Stack',
      contact: 'Kontak',
    },
    langLabel: 'Bahasa',
  },
  en: {
    hero: {
      greeting: "Hi, I'm",
      name: 'Ryan Prayoga',
      role: 'Full-Stack Engineer',
      openToWork: 'Open to new opportunities',
      cta: 'See my work',
    },
    about: {
      heading: 'About Me',
      paragraphs: [
        'Full-stack engineer with 4+ years of experience building enterprise systems, civic-tech platforms, developer tooling, and deployment workflows. Led a team of 4 engineers at PT Traspac Makmur Sejahtera.',
        'From developer to Team Leader — I manage priorities, ensure delivery, conduct code reviews, and stay hands-on solving technical problems when precision matters.',
        'Personal projects like developer tooling, civic reporting platforms, mobile-web media sync, and deployment CLIs serve as practice grounds for product thinking, architecture, and production workflows.',
      ],
      currently: {
        label: 'Currently',
        status: 'Open to new job opportunities — full-time, contract, or freelance.',
        thesis: 'Final semester in Computer Science — writing thesis on K-Means Clustering with Spatial Features for government procurement pattern analysis.',
        schedule: 'Flexible schedule — no conflict with full-time work.',
      },
    },
    projects: {
      heading: 'Projects',
      subtitle: 'Selected work that is live and in use.',
      live: 'Live',
      source: 'Source',
      descriptions: {
        pantauanggaran: {
          summary: 'Indonesian public procurement transparency platform. Real-time dashboard with AI-based anomaly detection.',
          focus: 'SiRUP data scraping, normalization, region mapping, anomaly scoring, and interactive dashboard visualization.',
        },
        jedug: {
          summary: 'Map-based damaged road reporting platform with photo upload, admin moderation, and public statistics.',
          focus: 'Report submission flow, smart nearest-issue merge, storage hardening, map clustering, heatmap, and admin moderation.',
        },
        korbanmbg: {
          summary: 'Monitoring casualties from the Free Nutritious Meal program — tracking reports and analyzing government program impact.',
          focus: 'Data pipeline, casualty visualization, analytics dashboard, and content moderation workflow.',
        },
        billiard: {
          summary: 'Camera-based billiard aim assistant — ball position analysis, angle calculation, and shot recommendations.',
          focus: 'Computer vision, ball detection, angle calculation, and interactive canvas rendering.',
        },
        brunogen: {
          summary: 'Developer tool that reads Laravel, Express, and Go APIs then generates OpenAPI specs and ready-to-use Bruno collections.',
          focus: 'Route scanning, request/response inference, regression fixtures, publish workflow, and npm package hygiene.',
        },
        gascli: {
          summary: 'Bash CLI for building and deploying Go and Node ecosystem projects via PM2 with interactive mode.',
          focus: 'Auto stack detection, ecosystem config, deploy wizard, SQLite metadata, and PM2 integration.',
        },
      },
    },
    skills: {
      heading: 'Tech Stack',
      subtitle: 'Technologies I work with daily.',
      categories: {
        backend: 'Backend',
        frontend: 'Frontend',
        mobile: 'Mobile',
        workflow: 'Workflow',
      },
    },
    contact: {
      heading: "Let's Connect",
      subtitle: "I'm open to new opportunities. Let's talk.",
      cta: 'Send Email',
      email: 'Email',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      or: 'or',
    },
    nav: {
      about: 'About',
      projects: 'Projects',
      skills: 'Stack',
      contact: 'Contact',
    },
    langLabel: 'Language',
  },
  fr: {
    hero: {
      greeting: 'Bonjour, je suis',
      name: 'Ryan Prayoga',
      role: 'Ingénieur Full-Stack',
      openToWork: 'Ouvert à de nouvelles opportunités',
      cta: 'Voir mes projets',
    },
    about: {
      heading: 'À Propos',
      paragraphs: [
        "Ingénieur full-stack avec plus de 4 ans d'expérience dans la construction de systèmes enterprise, de plateformes civic-tech, d'outils de développement et de workflows de déploiement. J'ai dirigé une équipe de 4 ingénieurs chez PT Traspac Makmur Sejahtera.",
        "De développeur à Team Leader — je gère les priorités, assure la livraison, fais les revues de code et reste opérationnel pour résoudre les problèmes techniques quand la précision compte.",
        "Mes projets personnels comme les outils de développement, les plateformes de signalement civique, la synchronisation mobile-web et les CLI de déploiement servent de terrain d'entraînement pour la réflexion produit, l'architecture et les workflows de production.",
      ],
      currently: {
        label: 'Actuellement',
        status: "Ouvert aux opportunités d'emploi — CDI, CDD ou freelance.",
        thesis: 'Dernier semestre en Informatique — rédaction du mémoire sur le K-Means Clustering avec caractéristiques spatiales pour l\'analyse des schémas d\'approvisionnement gouvernemental.',
        schedule: 'Horaire flexible — compatible avec un travail à temps plein.',
      },
    },
    projects: {
      heading: 'Projets',
      subtitle: 'Sélection de projets en ligne et en utilisation.',
      live: 'En ligne',
      source: 'Code',
      descriptions: {
        pantauanggaran: {
          summary: "Plateforme de transparence des marchés publics indonésiens. Tableau de bord en temps réel avec détection d'anomalies par IA.",
          focus: "Scraping des données SiRUP, normalisation, cartographie régionale, scoring d'anomalies et visualisation interactive.",
        },
        jedug: {
          summary: 'Plateforme de signalement de routes endommagées basée sur carte, avec upload de preuves, modération admin et statistiques publiques.',
          focus: 'Flux de soumission, fusion intelligente des incidents proches, durcissement du stockage, clustering carte, heatmap et modération.',
        },
        korbanmbg: {
          summary: "Surveillance des victimes du programme de Repas Gratuit — suivi des rapports et analyse de l'impact du programme gouvernemental.",
          focus: 'Pipeline de données, visualisation des victimes, tableau de bord analytique et workflow de modération.',
        },
        billiard: {
          summary: "Assistant de visée au billard basé sur caméra — analyse de position des billes, calcul d'angles et recommandations de tirs.",
          focus: 'Vision par ordinateur, détection de billes, calcul d\'angles et rendu canvas interactif.',
        },
        brunogen: {
          summary: 'Outil développeur qui lit les API Laravel, Express et Go puis génère des spécifications OpenAPI et collections Bruno prêtes à l\'emploi.',
          focus: 'Scan de routes, inférence requête/régression, fixtures de régression, workflow de publication et hygiène npm.',
        },
        gascli: {
          summary: 'CLI Bash pour construire et déployer des projets Go et Node via PM2 avec mode interactif.',
          focus: 'Détection automatique du stack, configuration écosystème, assistant de déploiement, métadonnées SQLite et intégration PM2.',
        },
      },
    },
    skills: {
      heading: 'Stack Technique',
      subtitle: 'Technologies que j\'utilise au quotidien.',
      categories: {
        backend: 'Backend',
        frontend: 'Frontend',
        mobile: 'Mobile',
        workflow: 'Workflow',
      },
    },
    contact: {
      heading: 'Contactons-nous',
      subtitle: 'Je suis ouvert aux nouvelles opportunités. Parlons-en.',
      cta: 'Envoyer un Email',
      email: 'Email',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      or: 'ou',
    },
    nav: {
      about: 'À Propos',
      projects: 'Projets',
      skills: 'Stack',
      contact: 'Contact',
    },
    langLabel: 'Langue',
  },
};
