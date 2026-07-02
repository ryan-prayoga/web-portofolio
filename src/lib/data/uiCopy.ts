import { profile } from './profile';

export type Locale = 'en' | 'id';

export interface UiCopy {
  nav: { work: string; about: string; stack: string; contact: string };
  available: string;
  heroRole: string;
  heroBody: string;
  viewWork: string;
  downloadCv: string;
  contact: string;
  proof: string[];
  ticker: string;
  badge: { role: string; loc: string };
  aboutKicker: string;
  aboutHeading: string;
  aboutStatement: string;
  aboutRows: { kicker: string; body: string }[];
  workKicker: string;
  workHeading: string;
  workIntro: string;
  open: string;
  stackKicker: string;
  stackHeading: string;
  stackNotes: { backend: string; frontend: string; mobile: string; workflow: string };
  method: string;
  contactKicker: string;
  contactHeading: string;
  contactBody: string;
  sendEmail: string;
  viewGithub: string;
  footerNote: string;
  backToTop: string;
}

export const uiCopy: Record<Locale, UiCopy> = {
  en: {
    nav: { work: 'Work', about: 'About', stack: 'Stack', contact: 'Contact' },
    available: 'Open to work',
    heroRole: 'Full-Stack Engineer & Team Lead',
    heroBody:
      'Building enterprise systems, civic-tech products, developer tooling, and deployment workflows with calm technical ownership.',
    viewWork: 'View Work',
    downloadCv: 'Download CV',
    contact: 'Contact',
    proof: ['Years experience', 'Engineers led', 'Systems shipped'],
    ticker: '11 SYSTEMS ONLINE · 5 ENGINEERS LED · 4+ YRS IN PRODUCTION',
    badge: { role: 'FULL-STACK · LEAD', loc: 'TANGERANG, ID' },
    aboutKicker: 'Operator File',
    aboutHeading: 'From software craft to delivery leadership.',
    aboutStatement:
      'I build systems that stay online — and lead the engineers who keep them that way. From planning and review to production decisions, I hold the technical line with calm ownership.',
    aboutRows: [
      {
        kicker: 'Current role',
        body: `Hands-on delivery leadership at ${profile.company} — from planning and review to production decisions.`,
      },
      {
        kicker: 'Academic',
        body: 'Formal computer science foundation supporting product, architecture, and engineering execution.',
      },
      {
        kicker: 'Operating range',
        body: 'Comfortable across product surfaces and production workflow when the system needs ownership.',
      },
    ],
    workKicker: 'Systems Index',
    workHeading: 'Selected work with production weight.',
    workIntro:
      'Civic-tech, developer tooling, automation, and deployment systems built for real constraints.',
    open: 'Open',
    stackKicker: 'Instruments',
    stackHeading: 'How I build systems that keep moving.',
    stackNotes: {
      backend: 'API, auth, business workflow, integrations, and data processing.',
      frontend: 'Public portals, internal dashboards, PWA, and operational interfaces.',
      mobile: 'Field apps, webview flows, media upload, and cross-device workflows.',
      workflow: 'Deployment, process management, review cadence, and AI-assisted iteration.',
    },
    method: 'Method',
    contactKicker: 'Open Channel',
    contactHeading: "Let's build the next useful thing.",
    contactBody: 'Open for full-stack, backend, and team lead roles.',
    sendEmail: 'Send Email',
    viewGithub: 'View GitHub',
    footerNote: 'Built with SvelteKit',
    backToTop: 'Back to top',
  },
  id: {
    nav: { work: 'Karya', about: 'Tentang', stack: 'Stack', contact: 'Kontak' },
    available: 'Lagi cari peluang baru',
    heroRole: 'Full-Stack Engineer & Team Lead',
    heroBody:
      'Bikin sistem enterprise, produk civic-tech, developer tooling, sampai workflow deployment — dan tetap pegang sisi teknisnya dengan tenang, dari perencanaan sampai jalan di production.',
    viewWork: 'Lihat Karya',
    downloadCv: 'Unduh CV',
    contact: 'Kontak',
    proof: ['Tahun pengalaman', 'Engineer dipimpin', 'Sistem rilis'],
    ticker: '11 SISTEM ONLINE · 5 ENGINEER DIPIMPIN · 4+ THN DI PRODUCTION',
    badge: { role: 'FULL-STACK · LEAD', loc: 'TANGERANG, ID' },
    aboutKicker: 'Berkas Operator',
    aboutHeading: 'Dari ngoding langsung ke mimpin tim delivery.',
    aboutStatement:
      'Saya bangun sistem yang terus online — dan mimpin engineer yang jaga sistem itu tetap hidup. Dari rencana, review, sampai keputusan production, sisi teknisnya saya pegang dengan tenang.',
    aboutRows: [
      {
        kicker: 'Peran sekarang',
        body: `Mimpin delivery tapi tetap turun tangan di teknis di ${profile.company} — dari rencana, review, sampai ambil keputusan pas di production.`,
      },
      {
        kicker: 'Pendidikan',
        body: 'Dasar ilmu komputer yang kuat, jadi pegangan buat ngambil keputusan produk, arsitektur, dan engineering.',
      },
      {
        kicker: 'Jangkauan kerja',
        body: 'Biasa pindah-pindah antar bagian produk dan urusan production pas sistem butuh orang yang beneran pegang.',
      },
    ],
    workKicker: 'Indeks Sistem',
    workHeading: 'Proyek pilihan yang beneran jalan di production.',
    workIntro:
      'Civic-tech, developer tooling, automation, sampai sistem deployment — dibangun buat kebutuhan nyata, bukan sekadar demo.',
    open: 'Buka',
    stackKicker: 'Instrumen',
    stackHeading: 'Cara saya bangun sistem yang terus jalan.',
    stackNotes: {
      backend: 'API, auth, alur bisnis, integrasi, dan pengolahan data.',
      frontend: 'Portal publik, dashboard internal, PWA, dan antarmuka operasional.',
      mobile: 'Aplikasi lapangan, alur webview, upload media, dan workflow lintas perangkat.',
      workflow: 'Deployment, manajemen proses, ritme review, dan iterasi dibantu AI.',
    },
    method: 'Metode',
    contactKicker: 'Kanal Terbuka',
    contactHeading: 'Yuk, bikin sesuatu yang berguna bareng.',
    contactBody: 'Lagi terbuka buat peran full-stack, backend, dan team lead.',
    sendEmail: 'Kirim Email',
    viewGithub: 'Lihat GitHub',
    footerNote: 'Dibuat pakai SvelteKit',
    backToTop: 'Ke atas',
  },
};
