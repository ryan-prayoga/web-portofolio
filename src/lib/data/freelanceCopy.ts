import type { IconName } from '$lib/data/icons';
import type { Locale } from '$lib/data/uiCopy';

export interface FreelanceCopy {
  readonly nav: {
    readonly services: string;
    readonly whyUs: string;
    readonly packages: string;
    readonly process: string;
    readonly revisions: string;
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
      readonly icon: IconName;
      readonly tag: string;
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
    readonly customInquiryCta: string;
  };
  readonly revisions: {
    readonly badge: string;
    readonly heading: string;
    readonly subheading: string;
    readonly minorTitle: string;
    readonly minorNote: string;
    readonly minorItems: readonly string[];
    readonly majorTitle: string;
    readonly majorNote: string;
    readonly majorItems: readonly string[];
    readonly packsTitle: string;
    readonly requestsLabel: string;
    readonly perRequestLabel: string;
    readonly validity: string;
    readonly packCta: string;
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
    readonly exploreNote: string;
    readonly exploreCta: string;
  };
  readonly faq: {
    readonly badge: string;
    readonly heading: string;
    readonly subheading: string;
    readonly helpText: string;
    readonly helpCta: string;
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
    readonly contactHeading: string;
    readonly backToTop: string;
    readonly rights: string;
  };
}

export const freelanceCopy: Record<Locale, FreelanceCopy> = {
  id: {
    nav: {
      services: 'Layanan',
      whyUs: 'Keunggulan',
      packages: 'Paket Biaya',
      process: 'Alur Kerja',
      revisions: 'Revisi',
      showcase: 'Contoh Bisnis',
      faq: 'FAQ',
      contact: 'Kontak',
      personalPortfolio: 'Portofolio Pengembang',
      ctaConsultation: 'Konsultasi WhatsApp',
    },
    hero: {
      status: 'Menerima Pembuatan Web Bisnis & Jasa',
      title: 'Jasa Pembuatan Web Portofolio & Profil Bisnis yang ',
      titleHighlight: 'Kredibel & Cepat',
      subtitle:
        'Tingkatkan reputasi usaha jasa, rental, travel, resto, kontraktor, dan UMKM Anda dengan website profil profesional. Tampilkan katalog layanan/produk, terima order via WhatsApp, dan tanpa biaya langganan bulanan.',
      ctaWhatsapp: 'Konsultasi via WhatsApp',
      ctaPackages: 'Lihat Pilihan Paket',
      metrics: [
        { value: '100', label: 'Skor Kecepatan Google', note: 'Akses instan di ponsel' },
        { value: 'Rp 0', label: 'Biaya Server Bulanan', note: 'Hemat biaya operasional' },
        { value: 'Direct WA', label: 'Terhubung ke Pelanggan', note: 'Order langsung ke WhatsApp' },
        { value: '4+ Thn', label: 'Pengalaman Rekayasa Web', note: 'Kualitas rapi & bergaransi' },
      ],
    },
    comparison: {
      badge: 'Solusi Efisien',
      heading: 'Kenapa Website Custom, Bukan Template Pasaran?',
      subheading:
        'Banyak pemilik usaha menggunakan template instan WordPress atau pembuat situs sewa yang membebani biaya rutin dan sering lambat diakses pelanggan. Inilah keunggulan website buatan tangan:',
      genericTitle: 'Situs Template Sewa (Wix / WordPress Pasaran)',
      genericPoints: [
        'Beban biaya langganan bulanan terus berjalan (Rp 150rb - Rp 400rb/bulan selamanya)',
        'Loading lambat di ponsel pelanggan karena tumpukan plugin berat yang tidak perlu',
        'Desain pasaran dan tata letak kaku, sulit disesuaikan dengan alur pemesanan usaha',
        'Rentan error atau gangguan spam/keamanan jika plugin tidak rutin diperbarui',
        'Data dan website terkunci pada platform, tidak memiliki file kode utuh',
      ],
      customTitle: 'Website Bisnis Handcrafted oleh Ryan Prayoga',
      customPoints: [
        'Rp 0 biaya server bulanan — arsitektur static modern, kode sepenuhnya milik Anda',
        'Kecepatan buka kilat di bawah 0.5 detik di semua smartphone (Skor Google 95-100)',
        'Desain kustom eksklusif yang mencerminkan identitas dan kredibilitas bisnis Anda',
        'Tombol WhatsApp terintegrasi rapi dengan template pesan pemesanan otomatis',
        'Kode sumber 100% milik bisnis Anda, aman dari celah plugin dan bebas vendor lock-in',
      ],
    },
    services: {
      badge: 'Fitur Utama',
      heading: 'Semua Kebutuhan Portofolio Usaha Anda',
      subheading:
        'Setiap website dirancang untuk memudahkan calon pembeli melihat produk/layanan dan langsung melakukan pemesanan.',
      items: [
        {
          icon: 'gallery',
          tag: 'KATALOG',
          title: 'Katalog Portofolio & Layanan',
          description:
            'Tampilkan galeri foto proyek, paket tour, unit armada rental, atau menu kuliner secara bersih, rapi, dan memikat pelanggan.',
        },
        {
          icon: 'message',
          tag: 'WHATSAPP',
          title: 'Direct Order & Chat WhatsApp',
          description:
            'Tombol pemesanan langsung membuka chat WhatsApp admin dengan pesan otomatis yang rapi sesuai paket atau layanan yang dipilih.',
        },
        {
          icon: 'bolt',
          tag: 'PERFORMA',
          title: 'Kecepatan Buka Sub-Detik',
          description:
            'Dibangun dengan arsitektur modern ultra-ringan. Buka instan tanpa loading berputar sehingga calon pembeli tidak beralih ke kompetitor.',
        },
        {
          icon: 'mapPin',
          tag: 'GOOGLE SEO',
          title: 'Optimasi Google & Peta Lokasi',
          description:
            'Integrasi alamat Google Maps, jam buka, dan optimasi SEO lokal agar bisnis Anda mudah ditemukan saat dicari di internet.',
        },
        {
          icon: 'globe',
          tag: 'DOMAIN',
          title: 'Domain Nama Usaha & SSL Aman',
          description:
            'Menggunakan alamat domain bisnis Anda sendiri (seperti namabisnis.com atau .id) lengkap dengan sertifikat keamanan resmi HTTPS.',
        },
        {
          icon: 'phone',
          tag: 'RESPONSIF',
          title: 'Optimal di Layar Smartphone',
          description:
            'Lebih dari 80% calon pembeli membuka website melalui ponsel. Tampilan dirancang khusus agar nyaman digunakan satu tangan.',
        },
      ],
    },
    packages: {
      badge: 'Pilihan Investasi',
      heading: 'Paket Pembuatan Website Bisnis',
      subheading:
        'Sekali bayar, sudah termasuk domain dan hosting tahun pertama. Hasilnya milik usaha Anda seutuhnya, tanpa langganan bulanan tersembunyi.',
      popularBadge: 'Paling Diminati',
      oneTimePayment: 'Sekali Bayar · Tanpa Biaya Bulanan',
      deliveryLabel: 'Estimasi Pengerjaan',
      featuresLabel: 'Fasilitas yang Didapatkan',
      ctaButton: 'Pesan via WhatsApp',
      customInquiryNote:
        'Punya kebutuhan khusus di luar paket atau ingin konsultasi awal? Kami siap berdiskusi santai via WhatsApp.',
      customInquiryCta: 'Konsultasi Bebas via WhatsApp',
    },
    revisions: {
      badge: 'Revisi & Request',
      heading: 'Revisi Minor Gratis, Request Major Harganya Jelas',
      subheading:
        'Patokannya sederhana: minor mengubah isi, major menambah bangunan. Tidak ada tagihan kejutan — kategori sebuah permintaan selalu saya sebutkan sebelum dikerjakan.',
      minorTitle: 'Revisi Minor',
      minorNote: 'Gratis selama hosting aktif',
      minorItems: [
        'Ganti teks, judul, dan perbaikan salah ketik',
        'Ganti foto, logo, atau warna',
        'Ubah harga, jam buka, alamat, dan nomor WhatsApp',
        'Tukar atau perbarui item katalog yang sudah ada',
        'Ubah urutan section',
      ],
      majorTitle: 'Request Major',
      majorNote: 'Berbayar per paket request',
      majorItems: [
        'Halaman baru di luar struktur awal',
        'Section baru yang belum pernah ada',
        'Fitur atau integrasi baru (form, booking, pembayaran, multi-bahasa)',
        'Penambahan lebih dari 10 item katalog sekaligus',
        'Perombakan desain menyeluruh',
      ],
      packsTitle: 'Paket Request Major',
      requestsLabel: 'request',
      perRequestLabel: 'per request',
      validity:
        'Berlaku 12 bulan sejak pembelian. Sisa request tidak hangus selama masa itu, dan tidak ada langganan bulanan.',
      packCta: 'Ambil Paket Ini',
    },
    process: {
      badge: 'Alur Kerja',
      heading: 'Proses Pengerjaan 4 Tahap yang Jelas',
      subheading: 'Alur kerja praktis agar website usaha Anda segera online tanpa menyita waktu operasional Anda.',
      steps: [
        {
          step: '01',
          title: 'Konsultasi & Kirim Materi',
          description:
            'Kirimkan daftar layanan/produk, foto dokumentasi dari ponsel, dan nomor kontak admin usaha Anda via WhatsApp.',
          output: 'Kesepakatan lingkup pengerjaan & jadwal rilis',
        },
        {
          step: '02',
          title: 'Penyusunan Desain & Katalog',
          description:
            'Kami merapikan teks penawaran usaha Anda, menyusun tata letak katalog, dan menyiapkan alur tombol pemesanan WhatsApp.',
          output: 'Tautan demo preview interaktif untuk ditinjau',
        },
        {
          step: '03',
          title: 'Optimasi & Penyesuaian',
          description:
            'Penyesuaian detail berdasarkan masukan Anda, uji coba tampilan responsif di ponsel, dan pengetesan kecepatan akses.',
          output: 'Website teroptimasi siap rilis publik',
        },
        {
          step: '04',
          title: 'Pemasangan Domain & Go Live',
          description:
            'Pemasangan domain bisnis Anda (contoh: namabisnis.com), pendaftaran ke Google, dan serah terima kepemilikan website.',
          output: 'Website resmi live dan siap dipromosikan',
        },
      ],
    },
    showcase: {
      badge: 'Bukti Karya',
      heading: 'Website & Sistem Nyata yang Telah Berjalan',
      subheading:
        'Bukan sekadar gambar konsep. Berikut adalah beberapa contoh sistem nyata dan katalog bisnis yang telah kami buat:',
      liveDemo: 'Buka Website',
      exploreNote: 'Ingin berkonsultasi mengenai konsep website yang paling cocok untuk jenis usaha Anda?',
      exploreCta: 'Lihat Rekam Jejak Rekayasa Lengkap di ryanprayoga.dev',
    },
    faq: {
      badge: 'Tanya Jawab',
      heading: 'Pertanyaan Seputar Pembuatan Web',
      subheading: 'Informasi lengkap dan transparan sebelum Anda memulai pemesanan website usaha.',
      helpText: 'Ada pertanyaan lain mengenai kebutuhan bisnis Anda?',
      helpCta: 'Tanyakan Langsung via WhatsApp',
    },
    cta: {
      badge: 'Mulai Sekarang',
      heading: 'Siap Membuat Bisnis Anda Tampil Lebih Kredibel?',
      subheading:
        'Jangan biarkan calon pembeli ragu karena bisnis Anda belum memiliki website resmi. Hubungi Ryan sekarang untuk konsultasi gratis mengenai kebutuhan website usaha Anda.',
      whatsappButton: 'Chat WhatsApp Sekarang',
      emailButton: 'Kirim Email Penawaran',
      mainSiteLink: 'Lihat Profil Teknis Developer di ryanprayoga.dev',
    },
    footer: {
      tag: 'Jasa Pembuatan Website Portofolio & Profil Bisnis Profesional',
      description:
        'Dikerjakan oleh Ryan Prayoga — Fullstack Developer & Sub Team Lead. Membantu bisnis jasa, rental, travel, kuliner, dan UMKM memiliki website berkinerja tinggi.',
      linksHeading: 'Navigasi',
      contactHeading: 'Hubungi & Profil',
      backToTop: 'Kembali ke atas',
      rights: 'Hak Cipta Terpelihara.',
    },
  },
  en: {
    nav: {
      services: 'Services',
      whyUs: 'Why Us',
      packages: 'Pricing',
      process: 'Process',
      revisions: 'Revisions',
      showcase: 'Case Studies',
      faq: 'FAQ',
      contact: 'Contact',
      personalPortfolio: 'Developer Portfolio',
      ctaConsultation: 'WhatsApp Inquiry',
    },
    hero: {
      status: 'Open for Business Website Projects',
      title: 'Professional Business Portfolio & Website Development That Is ',
      titleHighlight: 'Fast & Trustworthy',
      subtitle:
        'Elevate your services, rental, travel, dining, contractor, or local business with a high-performance profile website. Showcase your catalog, capture WhatsApp inquiries, and eliminate recurring monthly hosting costs.',
      ctaWhatsapp: 'Free WhatsApp Consultation',
      ctaPackages: 'View Pricing Packages',
      metrics: [
        { value: '100', label: 'Google Speed Score', note: 'Instant sub-second loading' },
        { value: 'Rp 0', label: 'Monthly Server Cost', note: 'Save operational budget' },
        { value: 'Direct WA', label: 'Customer Connection', note: 'Direct WhatsApp checkout' },
        { value: '4+ Yrs', label: 'Web Engineering Rigor', note: 'Quality production craft' },
      ],
    },
    comparison: {
      badge: 'Modern Approach',
      heading: 'Why Handcrafted Over Generic Rented Builders?',
      subheading:
        'Many business owners struggle with clunky site builders that charge perpetual monthly fees and load sluggishly on mobile phones. Here is how handcrafted static engineering solves that:',
      genericTitle: 'Generic Rented Site Builders (Wix / WordPress)',
      genericPoints: [
        'Persistent monthly recurring subscription fees draining your operational budget',
        'Sluggish load times on mobile devices caused by heavy unoptimized plugins',
        'Generic templates with rigid layouts that do not match your exact customer flow',
        'Frequent plugin breakages, vulnerability to spam, and maintenance overhead',
        'Data and content locked to vendor platforms with zero code ownership',
      ],
      customTitle: 'Handcrafted Business Websites by Ryan Prayoga',
      customPoints: [
        'Rp 0 recurring monthly server costs through modern high-availability static infrastructure',
        'Sub-second load times under 0.5s on all mobile devices (Google score 95-100)',
        'Bespoke design custom-tailored to represent your business authority and branding',
        'Seamless WhatsApp integration with pre-filled order messages for instant conversion',
        '100% full source code ownership with zero plugin bloat or vendor lock-in',
      ],
    },
    services: {
      badge: 'Core Features',
      heading: 'Everything Your Business Website Needs',
      subheading:
        'Every website is built to make it frictionless for visitors to discover your catalog and contact your team.',
      items: [
        {
          icon: 'gallery',
          tag: 'CATALOG',
          title: 'Service & Portfolio Showcase',
          description:
            'Display your project gallery, tour packages, rental units, or dining menus in a clean, visual layout.',
        },
        {
          icon: 'message',
          tag: 'WHATSAPP',
          title: 'Direct WhatsApp Inquiries',
          description:
            'One-tap inquiry buttons that open WhatsApp with pre-formatted product or service details ready to send.',
        },
        {
          icon: 'bolt',
          tag: 'PERFORMANCE',
          title: 'Sub-Second Page Loads',
          description:
            'Built on modern ultra-lightweight architecture so pages open instantaneously without spinning loaders.',
        },
        {
          icon: 'mapPin',
          tag: 'GOOGLE SEO',
          title: 'Local SEO & Maps Integration',
          description:
            'Embedded Google Maps location, opening hours, and structured data to help customers find you on Google Search.',
        },
        {
          icon: 'globe',
          tag: 'DOMAIN',
          title: 'Business Domain & SSL Security',
          description:
            'Operate under your official domain name (e.g. yourbusiness.com) complete with automatic HTTPS security.',
        },
        {
          icon: 'phone',
          tag: 'RESPONSIVE',
          title: 'Mobile-First Smartphone Layout',
          description:
            'Over 80% of local customers browse on mobile. Layouts are optimized for fluid, one-handed touch navigation.',
        },
      ],
    },
    packages: {
      badge: 'Investment',
      heading: 'Transparent Business Website Packages',
      subheading:
        'One payment, with the first year of domain and hosting included. You own the result outright, with no hidden monthly subscription.',
      popularBadge: 'Most Popular',
      oneTimePayment: 'One-Time Payment · Zero Monthly Fees',
      deliveryLabel: 'Estimated Turnaround',
      featuresLabel: 'Included Features',
      ctaButton: 'Order via WhatsApp',
      customInquiryNote:
        'Have custom operational requirements or need initial guidance? Let us discuss freely via WhatsApp.',
      customInquiryCta: 'Free Consultation via WhatsApp',
    },
    revisions: {
      badge: 'Revisions & Requests',
      heading: 'Minor Revisions Free, Major Requests Clearly Priced',
      subheading:
        'Simple rule: minor changes the contents, major adds structure. No surprise invoices — I name the category of a request before starting it.',
      minorTitle: 'Minor Revision',
      minorNote: 'Free while hosting is active',
      minorItems: [
        'Text and heading edits, typo fixes',
        'Swapping photos, logo, or colours',
        'Updating prices, opening hours, address, WhatsApp number',
        'Replacing or refreshing existing catalog items',
        'Reordering sections',
      ],
      majorTitle: 'Major Request',
      majorNote: 'Paid, sold in request packs',
      majorItems: [
        'A new page beyond the original structure',
        'A new section that did not exist before',
        'A new feature or integration (forms, booking, payments, multi-language)',
        'Adding more than 10 catalog items at once',
        'A full design overhaul',
      ],
      packsTitle: 'Major Request Packs',
      requestsLabel: 'requests',
      perRequestLabel: 'per request',
      validity:
        'Valid for 12 months from purchase. Unused requests keep until then, and there is no monthly subscription.',
      packCta: 'Take This Pack',
    },
    process: {
      badge: 'Execution',
      heading: 'A Clear 4-Step Production Process',
      subheading:
        'A streamlined workflow designed to launch your business online without interrupting your daily operations.',
      steps: [
        {
          step: '01',
          title: 'Consultation & Materials',
          description:
            'Share your service catalog, photos from your phone, and customer service contact details via WhatsApp.',
          output: 'Agreed project scope & target launch date',
        },
        {
          step: '02',
          title: 'Design & Catalog Assembly',
          description:
            'We polish your marketing copy, arrange catalog presentation, and connect direct WhatsApp booking routes.',
          output: 'Interactive staging preview link for review',
        },
        {
          step: '03',
          title: 'Optimization & Feedback',
          description:
            'Refinements based on your review, responsive mobile checks, and tuning for top-tier Google speed scores.',
          output: 'Polished website ready for public launch',
        },
        {
          step: '04',
          title: 'Domain Connection & Launch',
          description:
            'Connecting your official business domain name, Google indexing registration, and complete code handover.',
          output: 'Live website ready to share with customers',
        },
      ],
    },
    showcase: {
      badge: 'Case Studies',
      heading: 'Shipped Work & Production Systems',
      subheading: 'Real, live business systems and portfolios engineered to rigorous standards:',
      liveDemo: 'Visit Website',
      exploreNote: 'Want to discuss what structure works best for your specific business niche?',
      exploreCta: 'See the Full Engineering Track Record at ryanprayoga.dev',
    },
    faq: {
      badge: 'FAQ',
      heading: 'Frequently Asked Questions',
      subheading: 'Clear, transparent answers about custom website development for your business.',
      helpText: 'Have a specific question about your business setup?',
      helpCta: 'Ask Directly via WhatsApp',
    },
    cta: {
      badge: 'Get Started',
      heading: 'Ready to Make Your Business Stand Out Online?',
      subheading:
        'Do not lose prospective clients due to a lack of an official online presence. Contact Ryan today for a friendly consultation.',
      whatsappButton: 'Chat on WhatsApp Now',
      emailButton: 'Send an Email Inquiry',
      mainSiteLink: 'Explore Developer Engineering Portfolio at ryanprayoga.dev',
    },
    footer: {
      tag: 'Professional Business Website & Portfolio Development',
      description:
        'Engineered by Ryan Prayoga — Fullstack Developer & Sub Team Lead. Helping services, rental, travel, and local enterprises build trusted digital presence.',
      linksHeading: 'Navigation',
      contactHeading: 'Contact & Profile',
      backToTop: 'Back to top',
      rights: 'All rights reserved.',
    },
  },
};
