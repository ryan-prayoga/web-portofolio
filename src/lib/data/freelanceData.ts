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
    priceIdr: 'Rp 699.000',
    priceUsd: '$49',
    duration: {
      id: '2 - 4 hari kerja',
      en: '2 - 4 business days',
    },
    description: {
      id: 'Website profil satu halaman (one-page) profesional untuk memperkenalkan bisnis, menampilkan katalog layanan/menu, dan menerima pesanan via WhatsApp.',
      en: 'Clean, fast single-page profile to present your business, showcase your services or menu, and convert visitors into WhatsApp inquiries.',
    },
    features: {
      id: [
        'Website 1 Halaman Responsif (Tampilan optimal di HP & Laptop)',
        'Profil Bisnis, Nilai Keunggulan & Jam Operasional',
        'Katalog Produk / Menu / Layanan (Hingga 6 item)',
        'Integrasi Peta Lokasi Google Maps & Alamat Usaha',
        'Tombol Chat WhatsApp Langsung (Direct Order)',
        'Hosting Gratis Tahun Pertama (Tanpa Biaya Bulanan)',
        'Garansi Perbaikan & Bantuan Revisi 7 Hari',
      ],
      en: [
        'Responsive Single-Page Layout (Mobile & Desktop)',
        'Business Profile, Value Proposition & Operating Hours',
        'Product / Menu / Service Catalog (Up to 6 items)',
        'Google Maps Location & Contact Integration',
        'Direct WhatsApp Order & Inquiry Button',
        'Free Hosting for the First Year (No Monthly Fees)',
        '7-Day Warranty & Revision Support',
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
      id: 'Paling Diminati · Rental, Travel, Resto & Kontraktor',
      en: 'Most Popular · Rental, Travel, Resto & Contractors',
    },
    priceIdr: 'Rp 1.499.000',
    priceUsd: '$99',
    duration: {
      id: '4 - 7 hari kerja',
      en: '4 - 7 business days',
    },
    description: {
      id: 'Website bisnis multi-section lengkap dengan katalog portofolio proyek/unit, testimoni pelanggan, formulir pemesanan, dan optimasi Google agar mudah ditemukan.',
      en: 'Complete multi-section business website with project/unit showcase, customer testimonials, and Google SEO to drive inbound leads.',
    },
    features: {
      id: [
        'Semua fitur Paket Starter Bisnis',
        'Katalog Portofolio Proyek / Unit Rental / Menu Lengkap',
        'Tombol Pesan / Booking WhatsApp Khusus Tiap Layanan',
        'Bagian Ulasan / Testimoni Pelanggan & Legalitas Usaha',
        'Kecepatan Kilat (<0.5 detik, Skor Google Lighthouse 95-100)',
        'SEO Google Lokal & Kartu Media Sosial (WhatsApp & Instagram share)',
        'Bantuan Penuh Setting Domain Usaha (.com / .id / .co.id)',
        'Kepemilikan Kode 100% Tanpa Terkunci Vendor',
        'Garansi Bug & Dukungan 14 Hari',
      ],
      en: [
        'All features in Starter Business Package',
        'Full Project / Rental Unit / Service Showcase',
        'Dedicated WhatsApp Booking Button for Each Service',
        'Customer Testimonials & Business Verification Section',
        'Sub-Second Load Time (95-100 Google Lighthouse Score)',
        'Local Google SEO & Social Share Cards (WhatsApp/IG preview)',
        'Full Setup Support for Custom Domain (.com / .id)',
        '100% Code Ownership with Zero Vendor Lock-in',
        '14-Day Bug Warranty & Support',
      ],
    },
    ctaMessage: {
      id: 'Halo Ryan, saya tertarik memesan Paket Portofolio Bisnis Pro untuk usaha saya. Bagaimana langkah awalnya?',
      en: 'Hi Ryan, I am interested in the Business Portfolio Pro package for my business. How do we get started?',
    },
  },
  {
    id: 'bespoke',
    name: {
      id: 'Custom Korporat & Katalog',
      en: 'Custom Corporate & Catalog',
    },
    tag: {
      id: 'Travel Skala Besar, Multi-Cabang & Agensi',
      en: 'Multi-Branch, Travel & Full Agencies',
    },
    priceIdr: 'Rp 2.999.000+',
    priceUsd: '$199+',
    duration: {
      id: '7 - 14 hari kerja',
      en: '7 - 14 business days',
    },
    description: {
      id: 'Website eksklusif dari nol dengan fitur kustom, filter katalog produk/paket travel/unit rental, sistem update konten sendiri (CMS), dan email bisnis resmi.',
      en: 'Bespoke website built from scratch with custom catalog filters, easy content management (CMS), and corporate email setup.',
    },
    features: {
      id: [
        'Semua fitur Paket Bisnis Pro',
        'Desain 100% Kustom Mengikuti Branding Perusahaan',
        'Fitur Filter Pencarian Katalog / Paket Wisata / Unit Rental',
        'Dashboard CMS untuk Update Promo, Menu, & Artikel Sendiri',
        'Setup Domain Bisnis + Email Resmi Perusahaan (info@namabisnis.com)',
        'Pendaftaran ke Google Search Console & Google Analytics Bisnis',
        'Sesi Konsultasi Strategi Digital 1-on-1',
        'Garansi Perbaikan & Support Prioritas 30 Hari',
      ],
      en: [
        'All features in Business Pro Package',
        '100% Custom Design Aligned with Corporate Branding',
        'Interactive Filter for Tour Packages, Rental Units, or Products',
        'Admin CMS Dashboard to Update Promotions, Menus & Articles',
        'Custom Domain + Corporate Email Setup (info@yourbusiness.com)',
        'Google Search Console & Business Analytics Setup',
        '1-on-1 Digital Strategy Session',
        '30-Day Bug Warranty & Priority Support',
      ],
    },
    ctaMessage: {
      id: 'Halo Ryan, saya ingin konsultasi Paket Custom Korporat untuk kebutuhan website bisnis kami. Boleh jadwalkan diskusi?',
      en: 'Hi Ryan, I would like to consult about the Custom Corporate package for our business website. Can we schedule a call?',
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
      id: 'Tidak ada biaya bulanan. Berbeda dengan platform seperti Shopify atau Wix yang menarik Rp 150.000 - Rp 400.000 setiap bulan, website Anda dibangun sebagai file statis sehingga biaya servernya nihil. Hosting tahun pertama saya tanggung; setelahnya website dapat tetap saya hosting-kan atau dipindahkan ke akun Anda sendiri (Cloudflare Pages / Netlify — keduanya gratis) karena seluruh kode menjadi milik Anda. Biaya rutin satu-satunya adalah perpanjangan nama domain tahunan.',
      en: 'No monthly fees. Unlike site builders charging Rp 150,000 - Rp 400,000 every month, your site ships as static files, so server cost is effectively zero. I cover hosting for the first year; after that I can keep hosting it, or you move it to your own account (Cloudflare Pages / Netlify, both free) since you own the full source code. Your only recurring cost is the annual domain renewal.',
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
      id: 'Sangat bisa! Kami akan membantu proses pendaftaran domain atau konfigurasi DNS dari penyedia domain Anda (.com, .id, .co.id, dll.) hingga sertifikat keamanan HTTPS aktif beroperasi.',
      en: 'Absolutely! We provide end-to-end setup for your business domain (.com, .id, etc.) including automated SSL/HTTPS certificates.',
    },
  },
  {
    question: {
      id: 'Berapa lama waktu pengerjaan website sampai live?',
      en: 'How long does it take until the website is live?',
    },
    answer: {
      id: 'Rata-rata pengerjaan berkisar antara 2 hingga 7 hari kerja tergantung paket dan kelengkapan materi awal Anda. Progres pengerjaan dapat Anda pantau secara langsung melalui tautan demo preview.',
      en: 'Development typically takes 2 to 7 business days depending on the selected package and material readiness, with a live staging link provided to review progress.',
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
