import type { Locale } from '$lib/data/uiCopy';

export interface FreelanceCopy {
  readonly nav: {
    readonly services: string;
    readonly whyUs: string;
    readonly packages: string;
    readonly process: string;
    readonly showcase: string;
    readonly faq: string;
    readonly contact: string;
    readonly personalPortfolio: string;
    readonly ctaConsultation: string;
  };
  readonly hero: {
    readonly status: string;
    readonly title: string;
    readonly titleHighlight: string;
    readonly subtitle: string;
    readonly ctaWhatsapp: string;
    readonly ctaPackages: string;
    readonly metrics: readonly {
      readonly value: string;
      readonly label: string;
      readonly note: string;
    }[];
  };
  readonly comparison: {
    readonly badge: string;
    readonly heading: string;
    readonly subheading: string;
    readonly genericTitle: string;
    readonly genericPoints: readonly string[];
    readonly customTitle: string;
    readonly customPoints: readonly string[];
  };
  readonly services: {
    readonly badge: string;
    readonly heading: string;
    readonly subheading: string;
    readonly items: readonly {
      readonly icon: string;
      readonly title: string;
      readonly description: string;
    }[];
  };
  readonly packages: {
    readonly badge: string;
    readonly heading: string;
    readonly subheading: string;
    readonly popularBadge: string;
    readonly oneTimePayment: string;
    readonly deliveryLabel: string;
    readonly featuresLabel: string;
    readonly ctaButton: string;
    readonly customInquiryNote: string;
  };
  readonly process: {
    readonly badge: string;
    readonly heading: string;
    readonly subheading: string;
    readonly steps: readonly {
      readonly step: string;
      readonly title: string;
      readonly description: string;
      readonly output: string;
    }[];
  };
  readonly showcase: {
    readonly badge: string;
    readonly heading: string;
    readonly subheading: string;
    readonly liveDemo: string;
    readonly sourceCode: string;
    readonly exploreNote: string;
  };
  readonly faq: {
    readonly badge: string;
    readonly heading: string;
    readonly subheading: string;
    readonly helpText: string;
  };
  readonly cta: {
    readonly badge: string;
    readonly heading: string;
    readonly subheading: string;
    readonly whatsappButton: string;
    readonly emailButton: string;
    readonly mainSiteLink: string;
  };
  readonly footer: {
    readonly tag: string;
    readonly description: string;
    readonly linksHeading: string;
    readonly backToTop: string;
    readonly rights: string;
  };
}

export const freelanceCopy: Record<Locale, FreelanceCopy> = {
  id: {
    nav: {
      services: 'Layanan',
      whyUs: 'Kenapa Kustom',
      packages: 'Paket & Biaya',
      process: 'Alur Kerja',
      showcase: 'Contoh Portofolio',
      faq: 'FAQ',
      contact: 'Kontak',
      personalPortfolio: 'Portofolio Pribadi ↗',
      ctaConsultation: 'Konsultasi WA',
    },
    hero: {
      status: 'Menerima Proyek Portofolio Baru',
      title: 'Jasa Pembuatan Web Portofolio Profesional yang ',
      titleHighlight: 'Standout & Cepat',
      subtitle:
        'Tingkatkan personal branding, pikat recruiter perusahaan idaman, atau dapatkan klien internasional dengan web portofolio kustom berkinerja tinggi. Tanpa template pasaran, tanpa biaya hosting bulanan.',
      ctaWhatsapp: 'Konsultasi Gratis via WhatsApp',
      ctaPackages: 'Lihat Paket & Harga',
      metrics: [
        { value: '100', label: 'Skor Lighthouse', note: 'Performa sub-second kilat' },
        { value: 'Rp 0', label: 'Biaya Server Bulanan', note: 'Hosting gratis selamanya' },
        { value: '100%', label: 'Kepemilikan Kode', note: 'Private GitHub repository' },
        { value: '4+ Thn', label: 'Pengalaman Lead Dev', note: 'Standar kualitas enterprise' },
      ],
    },
    comparison: {
      badge: 'Solusi Unggul',
      heading: 'Kenapa Portofolio Kustom, Bukan Template Pasaran?',
      subheading:
        'Banyak profesional memakai Wix, Squarespace, atau template gratisan yang lambat dan klise. Inilah alasan kenapa website kustom buatan tangan jauh lebih menguntungkan:',
      genericTitle: 'Template Builder Pasaran (Wix / WP)',
      genericPoints: [
        'Loading lambat (2-5 detik) karena tumpukan skrip bawaan yang tidak terpakai',
        'Desain template klise yang mirip dengan ribuan pelamar atau kandidat lainnya',
        'Biaya langganan platform membengkak setiap bulan (Rp 150rb - Rp 350rb/bln)',
        'Sulit dikustomisasi secara leluasa dan minim optimasi SEO teknis',
        'Terkunci pada platform (vendor lock-in), tidak memiliki kode sumber utuh',
      ],
      customTitle: 'Handcrafted Bersama Ryan Prayoga',
      customPoints: [
        'Kecepatan kilat <0.5 detik (Skor 95-100 Google Lighthouse & Core Web Vitals hijau)',
        'Desain berkarakter "Engineering Sketchbook" yang autentik dan berkesan profesional',
        'Biaya hosting Rp 0 selamanya via Cloudflare Pages / Vercel modern static deployment',
        'Full SEO metadata, kartu media sosial (Open Graph), dan Google Rich Snippets',
        '100% kode sumber menjadi milik Anda sepenuhnya di akun GitHub pribadi',
      ],
    },
    services: {
      badge: 'Fitur Lengkap',
      heading: 'Semua yang Dibutuhkan Portofolio Standout',
      subheading:
        'Setiap website dirancang teliti dari segi desain visual, copywriting teknis, hingga arsitektur kode.',
      items: [
        {
          icon: '🎨',
          title: 'Desain Unik & Berkarakter',
          description:
            'Tampilan eksklusif dengan aksen sketsa tangan (Drawably), tipografi elegan, serta dukungan mode gelap (Dark Mode) dan terang yang nyaman di mata.',
        },
        {
          icon: '⚡',
          title: 'Performa Ekstrem (Skor 100)',
          description:
            'Dibangun dengan SvelteKit & Tailwind CSS 4 yang ultra-ringan. Buka instan tanpa loading berputar, membuat recruiter dan calon klien betah.',
        },
        {
          icon: '📄',
          title: 'ATS & Recruiter-Friendly',
          description:
            'Dilengkapi tombol download CV format ATS, highlight pencapaian dengan metrik terukur, dan ringkasan riwayat kerja yang mudah dipindai.',
        },
        {
          icon: '🌐',
          title: 'Sistem Dwibahasa (ID / EN)',
          description:
            'Siap untuk pasar karir lokal maupun remote luar negeri. Pengunjung dapat mengganti bahasa secara instan dalam satu klik.',
        },
        {
          icon: '🔗',
          title: 'Setup Custom Domain & HTTPS',
          description:
            'Bantuan integrasi domain pribadi (contoh: namamu.dev atau namamu.com) lengkap dengan sertifikat keamanan SSL otomatis.',
        },
        {
          icon: '📱',
          title: 'Mobile-First & Responsif',
          description:
            'Tampilan sempurna di layar HP, tablet, maupun monitor desktop dengan navigasi drawer sentuh yang ergonomis.',
        },
      ],
    },
    packages: {
      badge: 'Investasi Transparan',
      heading: 'Paket Pembuatan Web Portofolio',
      subheading: 'Sekali bayar, website dan kode sepenuhnya milik Anda. Tanpa biaya langganan bulanan dari kami.',
      popularBadge: 'Paling Diminati',
      oneTimePayment: 'Sekali Bayar · Tanpa Langganan',
      deliveryLabel: 'Estimasi Pengerjaan',
      featuresLabel: 'Fitur yang Didapatkan',
      ctaButton: 'Pesan via WhatsApp',
      customInquiryNote:
        'Punya kebutuhan khusus atau ingin konsultasi paket yang paling pas? Diskusikan langsung via WhatsApp gratis.',
    },
    process: {
      badge: 'Metode Kerja',
      heading: 'Alur Pengerjaan 4 Tahap yang Rapi',
      subheading: 'Proses terstruktur agar website Anda selesai tepat waktu dengan kualitas terbaik.',
      steps: [
        {
          step: '01',
          title: 'Konsultasi & Discovery',
          description:
            'Diskusi santai mengenai profil Anda, target karir atau jenis klien yang disasar, materi yang sudah ada, dan preferensi gaya visual.',
          output: 'Kesepakatan lingkup kerja & checklist materi awal',
        },
        {
          step: '02',
          title: 'Struktur Konten & Wireframe',
          description:
            'Kurasi proyek unggulan, penulisan narasi pencapaian (STAR method), dan perancangan tata letak website agar mudah dinavigasi.',
          output: 'Draft konten lengkap & arahan visual terkonfirmasi',
        },
        {
          step: '03',
          title: 'Development & Optimasi',
          description:
            'Pengkodean sistem, integrasi aset visual, uji coba responsif di berbagai ukuran layar, serta pengujian performa Lighthouse 100.',
          output: 'Tautan demo staging yang dapat dicoba langsung',
        },
        {
          step: '04',
          title: 'Review, Domain & Launch',
          description:
            'Sesi perbaikan minor, setup domain kustom, pendaftaran sitemap ke Google, dan penyerahan repositori kode ke GitHub Anda.',
          output: 'Website portofolio live di internet & serah terima kode',
        },
      ],
    },
    showcase: {
      badge: 'Bukti Karya',
      heading: 'Portofolio Nyata yang Terbukti Berjalan',
      subheading:
        'Bukan sekadar gambar mock-up. Berikut adalah beberapa contoh sistem produksi yang telah kami luncurkan:',
      liveDemo: 'Kunjungi Website',
      sourceCode: 'Lihat Kode Sumber',
      exploreNote: 'Ingin melihat seluruh daftar proyek dan studi kasus teknis mendalam?',
    },
    faq: {
      badge: 'Tanya Jawab',
      heading: 'Pertanyaan yang Sering Diajukan',
      subheading: 'Jawaban transparan untuk hal-hal umum seputar pembuatan website portofolio.',
      helpText: 'Masih ada pertanyaan lain yang belum terjawab?',
    },
    cta: {
      badge: 'Mulai Sekarang',
      heading: 'Siap Tampil Beda & Memikat Peluang Baru?',
      subheading:
        'Jangan biarkan peluang kerja impian atau klien berbayar tinggi terlewat hanya karena portofolio Anda belum mencerminkan kapasitas Anda yang sesungguhnya. Hubungi Ryan sekarang untuk konsultasi santai.',
      whatsappButton: 'Chat WhatsApp Sekarang',
      emailButton: 'Kirim Pesan via Email',
      mainSiteLink: 'Lihat Portofolio Developer Ryan Prayoga ↗',
    },
    footer: {
      tag: 'Jasa Pembuatan Web Portofolio Kustom & Performa Tinggi',
      description:
        'Dibuat langsung oleh Ryan Prayoga — Fullstack Developer & Sub Team Lead. Membantu engineer, desainer, dan profesional tampil standout di industri teknologi global.',
      linksHeading: 'Navigasi Cepat',
      backToTop: 'Kembali ke atas ↑',
      rights: 'Hak Cipta Terpelihara.',
    },
  },
  en: {
    nav: {
      services: 'Services',
      whyUs: 'Why Custom',
      packages: 'Pricing',
      process: 'Process',
      showcase: 'Showcase',
      faq: 'FAQ',
      contact: 'Contact',
      personalPortfolio: 'Personal Portfolio ↗',
      ctaConsultation: 'Chat on WA',
    },
    hero: {
      status: 'Open for New Portfolio Projects',
      title: 'Professional Custom Web Portfolios that ',
      titleHighlight: 'Stand Out & Convert',
      subtitle:
        'Elevate your personal branding, impress top-tier tech recruiters, or win international clients with a bespoke, high-performance portfolio website. Zero generic templates, zero monthly hosting fees.',
      ctaWhatsapp: 'Free Consultation on WhatsApp',
      ctaPackages: 'View Packages & Pricing',
      metrics: [
        { value: '100', label: 'Lighthouse Score', note: 'Sub-second page loads' },
        { value: '$0', label: 'Monthly Server Cost', note: 'Free lifetime static hosting' },
        { value: '100%', label: 'Code Ownership', note: 'Private GitHub repository' },
        { value: '4+ Yrs', label: 'Lead Dev Experience', note: 'Enterprise engineering rigor' },
      ],
    },
    comparison: {
      badge: 'Superior Choice',
      heading: 'Why a Custom Portfolio Instead of Generic Templates?',
      subheading:
        'Many professionals rely on Wix, Squarespace, or cluttered WordPress templates that load slowly and look identical. Here is why bespoke craftsmanship wins every time:',
      genericTitle: 'Generic Site Builders (Wix / WP)',
      genericPoints: [
        'Sluggish load times (2-5s) burdened by unused bundled plugins and trackers',
        'Generic layout templates that blur into thousands of other candidates',
        'Escalating recurring subscriptions ($12 - $35/month forever)',
        'Painful code customizations and brittle technical SEO control',
        'Vendor lock-in with zero ownership over clean, portable source code',
      ],
      customTitle: 'Handcrafted by Ryan Prayoga',
      customPoints: [
        'Lightning-fast <0.5s loads (95-100 Google Lighthouse & all green Core Web Vitals)',
        'Authentic "Engineering Sketchbook" aesthetic that makes an unforgettable impression',
        '$0 lifetime hosting cost via modern Cloudflare Pages / Vercel deployments',
        'Complete SEO meta tags, rich Open Graph social previews, and Schema.org markup',
        '100% full source code ownership in your private GitHub repository',
      ],
    },
    services: {
      badge: 'Key Capabilities',
      heading: 'Everything a Standout Portfolio Needs',
      subheading:
        'Every website is engineered with obsessive attention to visual craft, persuasive storytelling, and clean code.',
      items: [
        {
          icon: '🎨',
          title: 'Unique Hand-Crafted Aesthetic',
          description:
            'Bespoke visual styling with hand-drawn sketchbook accents (Drawably), refined typography, and seamless dark/light mode switches.',
        },
        {
          icon: '⚡',
          title: 'Extreme Performance (Score 100)',
          description:
            'Engineered with lightweight SvelteKit and Tailwind CSS 4. Instantaneous page switches without loading spinners keep visitors engaged.',
        },
        {
          icon: '📄',
          title: 'ATS & Recruiter-Friendly',
          description:
            'Integrated one-click ATS resume download, structured impact highlights using the STAR method, and an easily scannable work history.',
        },
        {
          icon: '🌐',
          title: 'Instant Bilingual Support (ID / EN)',
          description:
            'Ready for both domestic opportunities and remote global contracts. Visitors toggle languages effortlessly in a single click.',
        },
        {
          icon: '🔗',
          title: 'Custom Domain & SSL Setup',
          description:
            'Full assistance connecting your own custom domain (e.g. yourname.dev or yourname.com) with automatic HTTPS certificate setup.',
        },
        {
          icon: '📱',
          title: 'Mobile-First & Ergonomic',
          description:
            'Flawless rendering on smartphones, tablets, and wide monitors with accessible, focus-trapped touch navigation.',
        },
      ],
    },
    packages: {
      badge: 'Transparent Investment',
      heading: 'Web Portfolio Creation Packages',
      subheading:
        'One-time payment, full code ownership. No hidden platform subscriptions or recurring maintenance lock-in.',
      popularBadge: 'Most Popular',
      oneTimePayment: 'One-Time Payment · No Recurring Fees',
      deliveryLabel: 'Estimated Turnaround',
      featuresLabel: 'Included Features',
      ctaButton: 'Order via WhatsApp',
      customInquiryNote:
        'Have custom requirements or need guidance choosing the right package? Let’s chat freely on WhatsApp.',
    },
    process: {
      badge: 'Methodology',
      heading: 'A Clear 4-Step Production Process',
      subheading: 'Structured execution ensuring your website launches on schedule with uncompromising quality.',
      steps: [
        {
          step: '01',
          title: 'Consultation & Discovery',
          description:
            'An informal discovery call to explore your career goals, target audience, existing materials, and visual tastes.',
          output: 'Agreed project scope & content checklist',
        },
        {
          step: '02',
          title: 'Content Curation & Wireframing',
          description:
            'Curating top projects, refining impact summaries (STAR framework), and structuring layout hierarchy for clarity.',
          output: 'Complete content draft & approved visual direction',
        },
        {
          step: '03',
          title: 'Development & Optimization',
          description:
            'Writing clean code, responsive testing across mobile and desktop devices, and tuning for 100 Lighthouse performance.',
          output: 'Interactive staging preview link for live testing',
        },
        {
          step: '04',
          title: 'Review, Domain Setup & Launch',
          description:
            'Minor polish rounds, connecting your custom domain, submitting sitemaps to Google, and delivering GitHub source code.',
          output: 'Live website online & complete code handover',
        },
      ],
    },
    showcase: {
      badge: 'Proof of Work',
      heading: 'Live Production Work & Quality Proof',
      subheading: 'Not theoretical UI mockups. Here are real, live systems engineered to production standards:',
      liveDemo: 'Live Demo',
      sourceCode: 'View Source',
      exploreNote: 'Looking to explore Ryan’s complete engineering background and deep technical case studies?',
    },
    faq: {
      badge: 'FAQ',
      heading: 'Frequently Asked Questions',
      subheading: 'Clear answers to common questions about custom portfolio development.',
      helpText: 'Have a specific question not covered here?',
    },
    cta: {
      badge: 'Get Started',
      heading: 'Ready to Stand Out & Unlock Better Opportunities?',
      subheading:
        'Do not let an outdated resume or generic template limit your career growth. Connect with Ryan today for an honest, friendly consultation.',
      whatsappButton: 'Chat on WhatsApp Now',
      emailButton: 'Send an Email',
      mainSiteLink: 'Visit Ryan Prayoga’s Developer Portfolio ↗',
    },
    footer: {
      tag: 'Bespoke High-Performance Web Portfolio Development',
      description:
        'Crafted by Ryan Prayoga — Fullstack Developer & Sub Team Lead. Empowering engineers, designers, and tech leaders to establish authoritative personal brands.',
      linksHeading: 'Quick Links',
      backToTop: 'Back to top ↑',
      rights: 'All rights reserved.',
    },
  },
};
