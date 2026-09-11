export const locales = ['en', 'id'] as const;
export type Locale = (typeof locales)[number];

export interface UiCopy {
  nav: { experience: string; work: string; skills: string; contact: string };
  status: string;
  hero: {
    positioning: string;
    downloadCv: string;
    contact: string;
    photoAlt: string;
    sketchHintHover: string;
    sketchHintTap: string;
    sketchHintReset: string;
  };
  facts: { years: string; led: string; shipped: string; based: string };
  experience: { label: string; heading: string };
  work: {
    label: string;
    heading: string;
    intro: string;
    caseStudy: string;
    visit: string;
    source: string;
    npm: string;
    clientTag: string;
    moreLabel: string;
  };
  skills: { label: string; heading: string };
  education: { label: string; heading: string; languages: string };
  contact: { label: string; heading: string; body: string; emailCta: string };
  footer: { note: string; backToTop: string };
  a11y: { home: string; toggleMenu: string; mobileNav: string; language: string; sectionNav: string };
  caseStudy: {
    back: string;
    problem: string;
    role: string;
    decisions: string;
    results: string;
    stack: string;
    visit: string;
    source: string;
  };
}

export const uiCopy: Record<Locale, UiCopy> = {
  en: {
    nav: { experience: 'Experience', work: 'Work', skills: 'Skills', contact: 'Contact' },
    status: 'Open to work',
    hero: {
      positioning:
        'I build and ship production web, mobile, and tooling systems — and lead the engineers who keep them running. 4+ years across enterprise, government, and my own shipped products.',
      downloadCv: 'Download CV',
      contact: 'Email me',
      photoAlt: 'Ryan Prayoga',
      sketchHintHover: 'hover to erase ✎',
      sketchHintTap: 'tap to erase ✎',
      sketchHintReset: 'tap to re-sketch ↺',
    },
    facts: { years: 'Years experience', led: 'Engineers led', shipped: 'Systems shipped', based: 'Based in' },
    experience: { label: 'Experience', heading: 'Where I have worked' },
    work: {
      label: 'Selected work',
      heading: 'Featured projects, in depth',
      intro: 'Every claim below is backed by code, tests, or a live deployment — not slideware.',
      caseStudy: 'Read case study',
      visit: 'Visit live',
      source: 'Source',
      npm: 'View on npm',
      clientTag: 'Client work',
      moreLabel: 'More projects',
    },
    skills: { label: 'Skills', heading: 'What I work with' },
    education: { label: 'Education', heading: 'Education & languages', languages: 'Languages' },
    contact: {
      label: 'Contact',
      heading: 'Let’s talk.',
      body: 'Open for fullstack, backend, and team lead roles.',
      emailCta: 'Send email',
    },
    footer: { note: '', backToTop: 'Back to top' },
    a11y: {
      home: 'Ryan Prayoga, home',
      toggleMenu: 'Toggle menu',
      mobileNav: 'Mobile navigation',
      language: 'Language',
      sectionNav: 'Section navigation',
    },
    caseStudy: {
      back: 'All work',
      problem: 'Problem',
      role: 'My role',
      decisions: 'Technical decisions',
      results: 'Results',
      stack: 'Stack',
      visit: 'Visit live',
      source: 'Source',
    },
  },
  id: {
    nav: { experience: 'Pengalaman', work: 'Karya', skills: 'Skill', contact: 'Kontak' },
    status: 'Terbuka untuk peluang',
    hero: {
      positioning:
        'Saya membangun dan merilis sistem web, mobile, dan tooling production — sekaligus memimpin engineer yang menjaganya tetap jalan. 4+ tahun di enterprise, government, dan produk rilisan sendiri.',
      downloadCv: 'Unduh CV',
      contact: 'Kirim email',
      photoAlt: 'Ryan Prayoga',
      sketchHintHover: 'sorot untuk hapus ✎',
      sketchHintTap: 'ketuk untuk hapus ✎',
      sketchHintReset: 'ketuk untuk sketsa ulang ↺',
    },
    facts: { years: 'Tahun pengalaman', led: 'Engineer dipimpin', shipped: 'Sistem dirilis', based: 'Berbasis di' },
    experience: { label: 'Pengalaman', heading: 'Tempat saya bekerja' },
    work: {
      label: 'Karya pilihan',
      heading: 'Proyek unggulan, mendalam',
      intro: 'Semua klaim di bawah didukung kode, test, atau deployment live — bukan sekadar slide.',
      caseStudy: 'Baca case study',
      visit: 'Lihat live',
      source: 'Source',
      npm: 'Lihat di npm',
      clientTag: 'Kerja klien',
      moreLabel: 'Proyek lainnya',
    },
    skills: { label: 'Skill', heading: 'Yang saya pakai bekerja' },
    education: { label: 'Pendidikan', heading: 'Pendidikan & bahasa', languages: 'Bahasa' },
    contact: {
      label: 'Kontak',
      heading: 'Ngobrol, yuk.',
      body: 'Terbuka untuk peran fullstack, backend, dan team lead.',
      emailCta: 'Kirim email',
    },
    footer: { note: '', backToTop: 'Ke atas' },
    a11y: {
      home: 'Ryan Prayoga, beranda',
      toggleMenu: 'Buka/tutup menu',
      mobileNav: 'Navigasi mobile',
      language: 'Bahasa',
      sectionNav: 'Navigasi bagian',
    },
    caseStudy: {
      back: 'Semua karya',
      problem: 'Masalah',
      role: 'Peran saya',
      decisions: 'Keputusan teknis',
      results: 'Hasil',
      stack: 'Stack',
      visit: 'Lihat live',
      source: 'Source',
    },
  },
};
