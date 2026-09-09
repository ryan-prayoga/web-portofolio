import type { Locale } from '$lib/data/uiCopy';

/**
 * Konfigurasi kontak layanan freelance pembuatan web portofolio & bisnis.
 * whatsappNumber WAJIB format internasional tanpa '+' (62...), bukan angka
 * placeholder — seluruh CTA halaman freelance bergantung pada nilai ini dan
 * dijaga oleh tests/unit/freelance-copy.test.ts.
 */
export const FREELANCE_CONFIG = {
  whatsappNumber: '6283878727519',
  email: 'developer@ryanprayoga.dev',
  github: 'https://github.com/ryan-prayoga',
  linkedin: 'https://www.linkedin.com/in/ryanprayogaaa',
  mainPortfolioUrl: 'https://ryanprayoga.dev',
  freelanceUrl: 'https://freelance.ryanprayoga.dev',
} as const;

export function getWhatsAppUrl(text: string): string {
  return `https://wa.me/${FREELANCE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export type PricingPackage = {
  readonly id: 'starter' | 'pro' | 'bespoke';
  readonly popular?: boolean;
  readonly name: Record<Locale, string>;
  readonly tag: Record<Locale, string>;
  readonly priceIdr: string;
  /** Nilai numerik untuk schema.org — dijaga sinkron dengan priceIdr oleh unit test. */
  readonly priceValue: string;
  readonly priceUsd: string;
  readonly duration: Record<Locale, string>;
  readonly description: Record<Locale, string>;
  readonly features: Record<Locale, readonly string[]>;
  readonly ctaMessage: Record<Locale, string>;
};

export const pricingPackages: readonly PricingPackage[] = [
  {
    id: 'starter',
    name: {
      id: 'Starter Bisnis',
      en: 'Starter Business',
    },
    tag: {
      id: 'Usaha Baru, Jasa & Kuliner',
      en: 'New Business, Services & Dining',
    },
    priceIdr: 'Rp 1.250.000',
    priceValue: '1250000',
    priceUsd: '$79',
    duration: {
      id: '3 - 5 hari kerja',
      en: '3 - 5 business days',
    },
    description: {
      id: 'Terima beres: domain, hosting, dan website satu halaman yang cepat untuk memperkenalkan usaha, memajang layanan atau menu, dan menerima pesanan lewat WhatsApp.',
      en: 'Fully handled: domain, hosting, and a fast single-page site to introduce your business, show your services or menu, and take orders through WhatsApp.',
    },
    features: {
      id: [
        'Domain .com atau .id GRATIS 1 tahun, terdaftar atas nama Anda',
        'Hosting GRATIS 1 tahun (perpanjangan Rp 150.000/tahun)',
        'Website 1 halaman responsif, rapi di HP maupun laptop',
        'Profil usaha, keunggulan, alamat, dan jam operasional',
        'Katalog produk / menu / layanan hingga 8 item',
        'Peta Google Maps & tombol pesan langsung ke WhatsApp',
        'Terima beres: domain, hosting, SSL, sampai terbit di Google',
        'Revisi minor GRATIS selama hosting aktif',
        'Garansi perbaikan bug 14 hari',
      ],
      en: [
        'FREE .com or .id domain for 1 year, registered in your name',
        'FREE hosting for 1 year (Rp 150,000/year renewal)',
        'Responsive single-page site, clean on phone and laptop',
        'Business profile, strengths, address, and opening hours',
        'Product / menu / service catalog, up to 8 items',
        'Google Maps location & one-tap WhatsApp order button',
        'Fully handled: domain, hosting, SSL, and Google indexing',
        'FREE minor revisions for as long as hosting is active',
        '14-day bug fix warranty',
      ],
    },
    ctaMessage: {
      id: 'Halo Ryan, saya ingin konsultasi pembuatan website Paket Starter Bisnis untuk usaha saya.',
      en: 'Hi Ryan, I would like to consult about the Starter Business package for my business.',
    },
  },
  {
    id: 'pro',
    popular: true,
    name: {
      id: 'Portofolio Bisnis Pro',
      en: 'Business Portfolio Pro',
    },
    tag: {
      id: 'Rental, Travel, Resto & Kontraktor',
      en: 'Rental, Travel, Dining & Contractors',
    },
    priceIdr: 'Rp 2.450.000',
    priceValue: '2450000',
    priceUsd: '$155',
    duration: {
      id: '5 - 9 hari kerja',
      en: '5 - 9 business days',
    },
    description: {
      id: 'Website bisnis multi-section dengan katalog penuh, testimoni pelanggan, dan SEO lokal supaya usaha Anda ditemukan calon pembeli di Google.',
      en: 'A multi-section business site with a full catalog, customer testimonials, and local SEO so buyers can actually find you on Google.',
    },
    features: {
      id: [
        'Semua fitur Paket Starter Bisnis',
        'Pilihan domain .com / .id / .co.id GRATIS 1 tahun',
        'Website multi-section + halaman katalog penuh',
        'Tombol booking WhatsApp terpisah untuk tiap layanan atau unit',
        'Section testimoni pelanggan & verifikasi kredibilitas usaha',
        'SEO lokal Google + kartu preview rapi di WhatsApp/Instagram',
        'Skor Google 95-100, halaman terbuka di bawah 1 detik',
        'Email bisnis 1 alamat (nama@domainanda.com)',
        'Kode 100% milik Anda, bebas vendor lock-in',
        'Garansi perbaikan bug 30 hari',
      ],
      en: [
        'Everything in the Starter Business package',
        'FREE .com / .id / .co.id domain of your choice for 1 year',
        'Multi-section website plus a full catalog page',
        'A separate WhatsApp booking button for each service or unit',
        'Customer testimonials & business credibility section',
        'Local Google SEO + clean preview cards on WhatsApp/Instagram',
        'Google score 95-100, pages open in under a second',
        'One business email address (you@yourdomain.com)',
        '100% code ownership, no vendor lock-in',
        '30-day bug fix warranty',
      ],
    },
    ctaMessage: {
      id: 'Halo Ryan, saya tertarik dengan Paket Portofolio Bisnis Pro. Boleh minta detailnya?',
      en: 'Hi Ryan, I am interested in the Business Portfolio Pro package. Could you share the details?',
    },
  },
  {
    id: 'bespoke',
    name: {
      id: 'Custom Korporat & Katalog',
      en: 'Custom Corporate & Catalog',
    },
    tag: {
      id: 'Multi-Cabang, Travel & Agensi',
      en: 'Multi-Branch, Travel & Agencies',
    },
    priceIdr: 'Rp 4.500.000+',
    priceValue: '4500000',
    priceUsd: '$285+',
    duration: {
      id: '10 - 18 hari kerja',
      en: '10 - 18 business days',
    },
    description: {
      id: 'Website dibangun dari nol mengikuti alur bisnis Anda: filter katalog, dashboard untuk mengubah konten sendiri, dan email korporat resmi.',
      en: 'Built from scratch around your actual workflow: catalog filters, a dashboard to edit content yourself, and proper corporate email.',
    },
    features: {
      id: [
        'Semua fitur Paket Portofolio Bisnis Pro',
        'Desain 100% kustom mengikuti branding perusahaan',
        'Filter interaktif untuk paket tour, unit rental, atau produk',
        'Dashboard CMS untuk mengubah promo, menu, dan artikel sendiri',
        'Email korporat hingga 5 alamat + setup domain perusahaan',
        'Setup Google Search Console & analitik pengunjung',
        'Sesi strategi digital 1-on-1',
        'Prioritas support & garansi perbaikan bug 60 hari',
      ],
      en: [
        'Everything in the Business Portfolio Pro package',
        '100% custom design aligned with your corporate branding',
        'Interactive filters for tour packages, rental units, or products',
        'CMS dashboard to update promos, menus, and articles yourself',
        'Corporate email for up to 5 addresses + company domain setup',
        'Google Search Console & visitor analytics setup',
        'One-on-one digital strategy session',
        'Priority support & 60-day bug fix warranty',
      ],
    },
    ctaMessage: {
      id: 'Halo Ryan, saya butuh website kustom untuk perusahaan. Boleh diskusi kebutuhan dan biayanya?',
      en: 'Hi Ryan, I need a custom website for my company. Can we discuss the scope and cost?',
    },
  },
] as const;

export type RevisionPack = {
  readonly id: 'small' | 'medium' | 'large';
  readonly requests: string;
  readonly priceIdr: string;
  readonly perRequestIdr: string;
  readonly note: Record<Locale, string>;
  readonly ctaMessage: Record<Locale, string>;
};

/**
 * Harga request major setelah website live. Dijual per paket, bukan per jam:
 * pemilik usaha kecil butuh angka pasti sebelum menyetujui, bukan estimasi
 * jam yang bisa membengkak.
 */
export const revisionPacks: readonly RevisionPack[] = [
  {
    id: 'small',
    requests: '1 - 3',
    priceIdr: 'Rp 400.000',
    perRequestIdr: 'Rp 133.000',
    note: {
      id: 'Untuk satu-dua penambahan setelah website berjalan.',
      en: 'For a change or two once the site is already running.',
    },
    ctaMessage: {
      id: 'Halo Ryan, saya mau ambil paket request major 1-3 untuk website saya.',
      en: 'Hi Ryan, I would like to buy the 1-3 major request pack for my website.',
    },
  },
  {
    id: 'medium',
    requests: '4 - 8',
    priceIdr: 'Rp 900.000',
    perRequestIdr: 'Rp 112.500',
    note: {
      id: 'Untuk pengembangan bertahap sepanjang tahun.',
      en: 'For steady additions across the year.',
    },
    ctaMessage: {
      id: 'Halo Ryan, saya mau ambil paket request major 4-8 untuk website saya.',
      en: 'Hi Ryan, I would like to buy the 4-8 major request pack for my website.',
    },
  },
  {
    id: 'large',
    requests: '9 - 15',
    priceIdr: 'Rp 1.500.000',
    perRequestIdr: 'Rp 100.000',
    note: {
      id: 'Untuk usaha yang rutin menambah layanan atau cabang.',
      en: 'For businesses adding services or branches regularly.',
    },
    ctaMessage: {
      id: 'Halo Ryan, saya mau ambil paket request major 9-15 untuk website saya.',
      en: 'Hi Ryan, I would like to buy the 9-15 major request pack for my website.',
    },
  },
] as const;

export type FaqItem = {
  readonly question: Record<Locale, string>;
  readonly answer: Record<Locale, string>;
};

export const faqItems: readonly FaqItem[] = [
  {
    question: {
      id: 'Apakah ada biaya langganan bulanan setelah website selesai?',
      en: 'Are there any recurring monthly subscription fees after delivery?',
    },
    answer: {
      id: 'Tidak ada biaya bulanan. Berbeda dengan platform seperti Shopify atau Wix yang menarik Rp 150.000 - Rp 400.000 setiap bulan, website Anda dibangun sebagai file statis sehingga biaya servernya nihil. Tahun pertama domain dan hosting saya tanggung penuh. Setelah setahun, biayanya hanya perpanjangan hosting Rp 150.000 per tahun (bukan per bulan) dan perpanjangan domain sesuai tarif resmi registrar: sekitar Rp 180.000 untuk .com, Rp 220.000 untuk .id, dan Rp 280.000 untuk .co.id. Anda juga bebas memindahkan website ke akun sendiri seperti Cloudflare Pages atau Netlify yang gratis, karena seluruh kode menjadi milik Anda.',
      en: 'No monthly fees. Unlike site builders charging Rp 150,000 - Rp 400,000 every month, your site ships as static files, so server cost is effectively zero. I cover both domain and hosting for the first year in full. After that year the only costs are hosting renewal at Rp 150,000 per year — per year, not per month — and the domain at the registrar rate: roughly Rp 180,000 for .com, Rp 220,000 for .id, and Rp 280,000 for .co.id. You are also free to move the site to your own Cloudflare Pages or Netlify account for free, since you own the full source code.',
    },
  },
  {
    question: {
      id: 'Usaha apa saja yang cocok menggunakan layanan pembuatan website ini?',
      en: 'What types of businesses benefit most from this portfolio service?',
    },
    answer: {
      id: 'Sangat cocok untuk penyedia jasa (service AC, bengkel, salon, klinik, studio foto, konsultan), rental (mobil, motor, studio, kamera), agen travel & tour wisata, restoran/cafe/catering, konveksi/percetakan, kontraktor/interior, hingga company profile UMKM dan korporasi yang ingin tampil kredibel di hadapan klien.',
      en: 'Ideal for service providers (contractors, clinics, studios, salons, consultants), rentals (cars, cameras, venues), travel & tour agencies, restaurants/cafes, manufacturing/workshops, and businesses that need to establish instant credibility with prospective clients.',
    },
  },
  {
    question: {
      id: 'Bagaimana jika saya belum memiliki foto bagus atau tulisan profil usaha?',
      en: 'What if I do not have professional photos or finished copy ready?',
    },
    answer: {
      id: 'Tenang saja, kami akan memandu Anda! Cukup kirimkan foto-foto produk atau dokumentasi kerja dari ponsel, rincian harga/layanan yang biasa Anda kirim via chat, dan alamat lokasi usaha. Kami akan merapikan teksnya menjadi kalimat penawaran yang meyakinkan bagi calon pelanggan.',
      en: 'No worries at all! You only need to share your service list, photos from your phone, and contact details. We will structure and polish the content into clear, compelling messaging for your prospective customers.',
    },
  },
  {
    question: {
      id: 'Apakah pesanan dari website langsung terhubung ke WhatsApp admin usaha saya?',
      en: 'Will inquiries from the website connect directly to my business WhatsApp?',
    },
    answer: {
      id: 'Ya, setiap tombol pemesanan atau pertanyaan akan langsung membuka aplikasi WhatsApp pelanggan dengan teks otomatis yang rapi (misalnya menyebutkan nama produk/paket yang dipilih). Anda dan admin dapat langsung merespons pelanggan dengan cepat.',
      en: 'Yes, every order or inquiry button opens WhatsApp with pre-formatted messages specifying the exact service or package of interest, enabling prompt customer follow-up.',
    },
  },
  {
    question: {
      id: 'Apakah bisa menggunakan nama domain bisnis sendiri seperti namabisnis.com?',
      en: 'Can I use my own custom business domain like mybusiness.com?',
    },
    answer: {
      id: 'Bisa, dan domainnya sudah termasuk. Semua paket mendapat domain GRATIS 1 tahun: .com atau .id di paket Starter, ditambah pilihan .co.id di paket Pro dan Custom. Domain didaftarkan atas nama dan email Anda, jadi kepemilikannya jelas milik usaha Anda, bukan milik saya. Khusus .co.id, registrar mewajibkan dokumen legal usaha (NIB/SIUP, NPWP, akta, dan KTP direktur) — saya bantu proses pengajuannya. Kalau Anda sudah punya domain sendiri, konfigurasi DNS dan HTTPS-nya saya kerjakan tanpa biaya tambahan.',
      en: 'Yes, and the domain is included. Every package comes with a FREE domain for one year: .com or .id on Starter, plus .co.id on Pro and Custom. It is registered under your name and email, so ownership sits with your business, not with me. For .co.id the registrar requires business legal documents (business licence, tax number, deed of establishment, and the director ID) — I walk you through that filing. If you already own a domain, I handle the DNS and HTTPS setup at no extra cost.',
    },
  },
  {
    question: {
      id: 'Apa bedanya revisi minor yang gratis dengan request major yang berbayar?',
      en: 'What separates a free minor revision from a paid major request?',
    },
    answer: {
      id: 'Patokannya sederhana: minor mengubah isi, major menambah bangunan. Revisi MINOR gratis selama hosting Anda aktif — ganti teks, foto, harga, jam buka, nomor WhatsApp, warna, urutan section, tukar item katalog, dan perbaikan salah ketik. Request MAJOR berbayar karena butuh perancangan ulang dan pengetesan: halaman baru, section baru yang belum ada, fitur atau integrasi baru (form, booking, pembayaran, multi-bahasa), penambahan lebih dari 10 item katalog sekaligus, dan perombakan desain menyeluruh. Kalau ragu sebuah permintaan masuk kategori mana, tanyakan dulu lewat WhatsApp — saya sebutkan kategorinya sebelum dikerjakan, bukan setelah tagihan keluar.',
      en: 'Simple rule: minor changes the contents, major adds structure. MINOR revisions stay free for as long as your hosting is active — text, photos, prices, opening hours, WhatsApp number, colours, section order, swapping catalog items, and typo fixes. MAJOR requests are paid because they need design and testing work: a new page, a new section that does not exist yet, a new feature or integration (forms, booking, payments, multi-language), adding more than 10 catalog items at once, and a full design overhaul. If you are unsure which bucket a request falls in, ask on WhatsApp first — I tell you the category before starting, not after invoicing.',
    },
  },
  {
    question: {
      id: 'Berapa biaya untuk request major setelah website live?',
      en: 'How much does a major request cost after the site is live?',
    },
    answer: {
      id: 'Dijual per paket dengan harga tetap, bukan per jam, supaya Anda tahu angka pastinya sebelum menyetujui: 1-3 request Rp 400.000, 4-8 request Rp 900.000, dan 9-15 request Rp 1.500.000. Semakin besar paketnya, semakin murah biaya per request (Rp 133.000 turun sampai Rp 100.000). Paket berlaku 12 bulan sejak pembelian dan sisa request tidak hangus selama masa itu. Tidak perlu langganan — beli hanya ketika memang ada yang mau ditambah.',
      en: 'Sold as fixed-price packs rather than hourly, so you know the number before agreeing: 1-3 requests for Rp 400,000, 4-8 for Rp 900,000, and 9-15 for Rp 1,500,000. The bigger the pack, the cheaper each request becomes (Rp 133,000 down to Rp 100,000). A pack stays valid for 12 months and unused requests keep until then. No subscription — buy one only when you actually have something to add.',
    },
  },
  {
    question: {
      id: 'Berapa lama waktu pengerjaan website sampai live?',
      en: 'How long does it take until the website is live?',
    },
    answer: {
      id: 'Paket Starter 3-5 hari kerja, Portofolio Bisnis Pro 5-9 hari kerja, dan Custom Korporat 10-18 hari kerja. Hitungan hari dimulai setelah materi (foto, daftar layanan/harga, kontak) lengkap, dan progresnya bisa Anda pantau langsung lewat tautan preview.',
      en: 'Starter takes 3-5 business days, Business Portfolio Pro 5-9, and Custom Corporate 10-18. The clock starts once your materials (photos, service and price list, contacts) are complete, and you can follow progress through a live preview link.',
    },
  },
] as const;

export type BusinessShowcaseItem = {
  readonly slug: string;
  readonly name: string;
  readonly category: Record<Locale, string>;
  readonly description: Record<Locale, string>;
  readonly tags: Record<Locale, readonly string[]>;
  readonly metrics: string;
  readonly href: string;
};

export const businessShowcases: readonly BusinessShowcaseItem[] = [
  {
    slug: 'kasbadminton',
    name: 'Kas Badminton Community',
    category: {
      id: 'Aplikasi Kas & FinTech Komunitas Olahraga',
      en: 'Sports Community FinTech & Ledger',
    },
    description: {
      id: 'Platform realtime pencatatan kas, iuran QRIS dinamis, dan laporan keuangan transparan yang digunakan oleh komunitas bulu tangkis aktif.',
      en: 'Realtime ledger and dynamic QRIS payment tracking system designed for active sports clubs and community organizations.',
    },
    tags: {
      id: ['SaaS Realtime', 'Go & SvelteKit', 'FinTech QRIS', 'PWA'],
      en: ['Realtime SaaS', 'Go & SvelteKit', 'FinTech QRIS', 'PWA'],
    },
    metrics: 'Realtime SSE · PWA',
    href: 'https://kasbadminton.com',
  },
  {
    slug: 'putraselamatmakmur',
    name: 'Putra Selamat Makmur',
    category: {
      id: 'Profil Perusahaan & Pengadaan Bisnis',
      en: 'Corporate Profile & Procurement',
    },
    description: {
      id: 'Company profile resmi perusahaan pengadaan barang dan jasa industri dengan portofolio proyek terverifikasi, legalitas, dan kontak rekanan bisnis.',
      en: 'Official corporate website showcasing verified enterprise procurement projects, corporate credentials, and supplier inquiries.',
    },
    tags: {
      id: ['Company Profile', 'Kredibilitas B2B', 'Legalitas'],
      en: ['Company Profile', 'B2B Credibility', 'Legal Documents'],
    },
    metrics: 'B2B Verified · Fast Static',
    href: 'https://putraselamatmakmur.com',
  },
] as const;
