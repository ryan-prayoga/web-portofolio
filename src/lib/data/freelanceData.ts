import type { Locale } from '$lib/data/uiCopy';

/**
 * Konfigurasi kontak layanan freelance.
 * Nomor WhatsApp dapat disesuaikan sewaktu-waktu.
 */
export const FREELANCE_CONFIG = {
  whatsappNumber: '6281234567890',
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
      id: 'Starter Portofolio',
      en: 'Starter Portfolio',
    },
    tag: {
      id: 'Fresh Grad & Junior Dev',
      en: 'Fresh Grad & Junior Dev',
    },
    priceIdr: 'Rp 699.000',
    priceUsd: '$49',
    duration: {
      id: '2 - 4 hari kerja',
      en: '2 - 4 business days',
    },
    description: {
      id: 'Portofolio satu halaman (one-page) yang clean, cepat, dan profesional untuk mulai melamar kerja atau proyek.',
      en: 'Clean, fast, single-page portfolio designed to make a strong impression on recruiters and clients.',
    },
    features: {
      id: [
        'Halaman Tunggal Responsif (Mobile & Desktop)',
        'Dark & Light Mode otomatis',
        'Bio, Keahlian (Skills), & Ringkasan Karir',
        'Showcase 3 - 5 Proyek Unggulan',
        'Tombol Unduh CV ATS (PDF)',
        'Tombol Kontak Langsung (WhatsApp & Email)',
        'Setup Hosting Gratis Selamanya (Cloudflare / Vercel)',
        'Garansi Bug & Bantuan Revisi Minor 7 Hari',
      ],
      en: [
        'Responsive Single-Page Layout (Mobile & Desktop)',
        'Automatic Dark & Light Mode',
        'Bio, Skills Matrix, & Career Summary',
        'Showcase of 3 - 5 Featured Projects',
        'Integrated ATS Resume Download (PDF)',
        'Direct Contact Links (WhatsApp & Email)',
        'Free Lifetime Hosting Setup (Cloudflare / Vercel)',
        '7-Day Bug Warranty & Minor Revision Support',
      ],
    },
    ctaMessage: {
      id: 'Halo Ryan, saya tertarik memesan Paket Starter Portofolio. Boleh konsultasi lebih lanjut?',
      en: "Hi Ryan, I'm interested in the Starter Portfolio package. Can we discuss further?",
    },
  },
  {
    id: 'pro',
    popular: true,
    name: {
      id: 'Standout Pro',
      en: 'Standout Pro',
    },
    tag: {
      id: 'Paling Diminati · Mid & Senior Pro',
      en: 'Most Popular · Mid & Senior Dev',
    },
    priceIdr: 'Rp 1.499.000',
    priceUsd: '$99',
    duration: {
      id: '4 - 7 hari kerja',
      en: '4 - 7 business days',
    },
    description: {
      id: 'Portofolio multi-section dengan case study mendalam, dwibahasa, dan estetika unik sketchbook untuk memikat klien global.',
      en: 'Full multi-section portfolio with deep case studies, bilingual support, and bespoke sketchbook aesthetics.',
    },
    features: {
      id: [
        'Semua fitur Paket Starter',
        'Halaman / Modal Detail Case Study (STAR Method & Metrics)',
        'Sistem Dwibahasa (Switch Instan ID / EN)',
        'Desain Eksklusif "Engineering Sketchbook" (Drawably)',
        'Skor Lighthouse 95 - 100 (Core Web Vitals Hijau)',
        'Full SEO Meta, Social Share Card (Open Graph), & Schema.org',
        'Bantuan Setup Custom Domain (contoh: namakamu.dev / .com)',
        'Kode Sumber 100% Milik Anda (Private GitHub Repo)',
        'Garansi Bug & Dukungan 14 Hari',
      ],
      en: [
        'All features in Starter Package',
        'In-depth Case Study Pages/Modals (STAR Method & Metrics)',
        'Instant Bilingual Switch (ID / EN)',
        'Exclusive "Engineering Sketchbook" Aesthetic (Drawably)',
        '95 - 100 Lighthouse Score (Green Core Web Vitals)',
        'Full SEO Meta, Open Graph Cards, & Schema.org Person',
        'Assistance with Custom Domain Setup (e.g. yourname.dev)',
        '100% Source Code Ownership (Private GitHub Repo)',
        '14-Day Bug Warranty & Priority Support',
      ],
    },
    ctaMessage: {
      id: 'Halo Ryan, saya ingin konsultasi dan pesan Paket Standout Pro Portofolio. Bagaimana langkah awalnya?',
      en: 'Hi Ryan, I would like to order the Standout Pro Portfolio package. How do we get started?',
    },
  },
  {
    id: 'bespoke',
    name: {
      id: 'Bespoke Executive',
      en: 'Bespoke Executive',
    },
    tag: {
      id: 'Tech Lead, Founder & Agency',
      en: 'Tech Lead, Founder & Agency',
    },
    priceIdr: 'Rp 2.999.000+',
    priceUsd: '$199+',
    duration: {
      id: '7 - 14 hari kerja',
      en: '7 - 14 business days',
    },
    description: {
      id: 'Website personal branding kustom penuh dari nol. Dilengkapi integrasi blog/CMS, visual khusus, domain dan email bisnis.',
      en: 'Fully customized executive personal branding site with custom design, blog/CMS integration, and business email setup.',
    },
    features: {
      id: [
        'Semua fitur Paket Standout Pro',
        'Desain 100% Kustom (Bisa dari wireframe/Figma pribadi)',
        'Integrasi Blog Teknis Markdown / Headless CMS',
        'Animasi Interaktif Lanjutan & Custom UI Elements',
        'Setup Domain Kustom + Email Bisnis Profesional (halo@namamu.com)',
        'Google Search Console & Google Analytics Terkonfigurasi',
        'Sesi Diskusi 1-on-1 & Panduan Manajemen Konten',
        'Garansi Perbaikan & Support Prioritas 30 Hari',
      ],
      en: [
        'All features in Standout Pro Package',
        '100% Custom Design (From scratch or your Figma design)',
        'Technical Blog / Markdown Headless CMS Integration',
        'Advanced Interactive Animations & Bespoke UI Elements',
        'Custom Domain + Professional Business Email Setup',
        'Google Search Console & Privacy-Friendly Analytics',
        '1-on-1 Strategy Call & Content Management Guide',
        '30-Day Bug Warranty & Priority Support',
      ],
    },
    ctaMessage: {
      id: 'Halo Ryan, saya tertarik dengan Paket Bespoke Executive untuk portofolio kustom. Boleh jadwalkan diskusi?',
      en: "Hi Ryan, I'm interested in the Bespoke Executive package for a custom portfolio. Can we schedule a chat?",
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
      id: 'Tidak ada biaya bulanan sama sekali dari kami! Website dibangun dengan arsitektur statis modern yang dapat di-hosting 100% gratis selamanya di platform kelas dunia seperti Cloudflare Pages atau Vercel. Anda hanya perlu memperpanjang domain tahunan Anda sendiri (sekitar Rp 120rb - Rp 180rb/tahun) jika menggunakan domain kustom.',
      en: 'No monthly fees whatsoever! The site is built with modern static architecture that can be hosted 100% free forever on platforms like Cloudflare Pages or Vercel. You only pay for your own annual domain renewal (typically $10 - $15/year) if using a custom domain.',
    },
  },
  {
    question: {
      id: 'Bagaimana jika saya belum memiliki materi CV, foto, atau tulisan proyek?',
      en: 'What if I don’t have ready-to-use resume copy, photos, or project write-ups?',
    },
    answer: {
      id: 'Tenang saja, kami akan membantu memandu Anda! Kami menyediakan kuesioner ringkas dan template STAR method untuk merangkum proyek Anda agar terdengar meyakinkan bagi recruiter dan klien. Kami juga memberikan tips pemilihan foto profil yang representatif.',
      en: 'No worries at all! We will guide you with a straightforward questionnaire and the STAR framework to showcase your projects compellingly for recruiters and clients, along with photo guidelines.',
    },
  },
  {
    question: {
      id: 'Berapa lama proses pembuatan portofolio?',
      en: 'How long does it take to build and launch the portfolio?',
    },
    answer: {
      id: 'Rata-rata pengerjaan berkisar antara 2 hingga 7 hari kerja tergantung paket yang Anda pilih dan kelengkapan materi awal. Kami mengutamakan ketepatan waktu dengan progres transparan setiap tahapnya.',
      en: 'Turnaround typically ranges from 2 to 7 business days depending on the selected package and content readiness. We maintain transparent progress updates throughout.',
    },
  },
  {
    question: {
      id: 'Apakah saya mendapatkan seluruh kode sumbernya?',
      en: 'Do I get 100% of the source code?',
    },
    answer: {
      id: 'Ya, 100%! Seluruh kode sumber diserahkan ke akun GitHub pribadi Anda lengkap dengan lisensi kepemilikan penuh, tanpa vendor lock-in. Anda bebas memodifikasi, menambah konten, atau mendeploy ulang kapan saja.',
      en: 'Yes, 100%! The full codebase is delivered to your personal GitHub account with complete ownership and zero vendor lock-in. You can modify, expand, or redeploy whenever you want.',
    },
  },
  {
    question: {
      id: 'Apakah bisa menggunakan domain pribadi seperti namasaya.com atau namasaya.dev?',
      en: 'Can I use my own domain such as myname.com or myname.dev?',
    },
    answer: {
      id: 'Sangat bisa! Kami akan memandu atau membantu langsung proses pointing DNS dari registrar domain Anda (Niagahoster, Namecheap, Domainesia, Cloudflare, dll.) hingga sertifikat HTTPS aktif.',
      en: 'Absolutely! We will guide or assist directly in configuring DNS records from your registrar (Namecheap, Cloudflare, GoDaddy, etc.) complete with automatic SSL/HTTPS.',
    },
  },
  {
    question: {
      id: 'Bagaimana cara pemesanan dan pembayarannya?',
      en: 'How do the ordering and payment processes work?',
    },
    answer: {
      id: 'Cukup klik tombol WhatsApp untuk konsultasi awal gratis. Setelah menyepakati paket dan cakupan kerja, pembayaran dilakukan dengan DP 50% di awal dan pelunasan 50% setelah website selesai direview dan siap go-live.',
      en: 'Simply tap the WhatsApp button for a free initial consultation. After agreeing on the scope and package, payment is split into 50% upfront deposit and 50% upon final review before go-live.',
    },
  },
] as const;
