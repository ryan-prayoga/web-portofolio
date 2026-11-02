import type { Locale } from './uiCopy';

export interface ExperienceRole {
  readonly title: string;
  readonly company: string;
  readonly location: string;
  readonly period: string;
  readonly duration: string;
  readonly summary: string;
  readonly bullets: readonly string[];
}

/**
 * Riwayat kerja — angka dan rentang waktu identik dengan CV ATS.
 * Bullet = dampak, bukan daftar tugas.
 */
export const experience: Record<Locale, readonly ExperienceRole[]> = {
  en: [
    {
      title: 'Freelance Fullstack Developer',
      company: 'Putra Selamat Makmur',
      location: 'Tangerang, Indonesia',
      period: 'May 2026 — Oct 2026',
      duration: '6 mos',
      summary:
        'Delivered an end-to-end company profile and internal management web application for an industrial forklift-service client (Putra Selamat Makmur). Scoped, built, shipped, and SEO-tuned from scratch.',
      bullets: [
        'Architected and delivered an end-to-end industrial service platform with SvelteKit, TypeScript, and Tailwind CSS, achieving a 95+ mobile Lighthouse score and sub-second load times',
        'Engineered high-performance Go backend services deployed on Linux VPS with Caddy reverse proxy, ensuring zero-downtime delivery and atomic operations for invoicing and job dispatch',
        'Implemented interactive service catalog and WhatsApp business inquiry routing, transforming manual paper logs into streamlined digital operations and boosting lead conversion',
        'Optimized Schema.org structured data and Local SEO, securing top search engine rankings in the target industrial service market',
      ],
    },
    {
      title: 'Team Lead & Fullstack Developer',
      company: 'PT Traspac Makmur Sejahtera',
      location: 'Jakarta, Indonesia',
      period: 'Sep 2024 — May 2026',
      duration: '1 yr 8 mos',
      summary:
        'Led a 5-person engineering team (2 FE, 2 BE) in an R&D division. Main PIC across multiple concurrent projects — architecture decisions, development, and long-term maintenance.',
      bullets: [
        'Kept 3–5 concurrent projects on track, adjusting priorities based on team capacity and client/stakeholder needs',
        'Grew engineers from junior-level to production-ready through hands-on coaching and bi-annual reviews',
        'Established code review practices and coding standards for the team',
        'Distributed tasks and managed weekly sprints across frontend and backend teams',
        'Acted as the main bridge between the team and stakeholders — from scoping requirements to delivery updates',
      ],
    },
    {
      title: 'Fullstack Developer',
      company: 'PT Traspac Makmur Sejahtera',
      location: 'Jakarta, Indonesia',
      period: 'Apr 2022 — Sep 2024',
      duration: '2 yrs 5 mos',
      summary:
        'Built production web and mobile applications for government agencies and state-owned enterprises in an R&D division. Promoted to Team Lead in September 2024.',
      bullets: [
        'Architected and maintained 5+ microservices (identity management, learning platform, document processing) handling datasets from hundreds of thousands to 1M+ records',
        'Optimized complex database queries and integrated Redis caching, cutting average API latency by ~40% across high-volume transactional workflows',
        'Engineered enterprise SSO and biometric multi-factor authentication (MFA) architectures, securing critical government and BUMN platforms',
        'Developed cross-platform mobile applications with real-time features (GPS tracking, WebSocket notifications, live chat), maintaining high reliability in low-bandwidth environments',
        'Automated asynchronous PDF report and certificate generation pipelines, slashing batch processing time from minutes to sub-second per record',
        'Managed Linux VPS cloud infrastructure and established CI/CD automation (GitHub Actions, GitLab CI), reducing release deployment cycles by 60% with zero downtime',
      ],
    },
  ],
  id: [
    {
      title: 'Freelance Fullstack Developer',
      company: 'Putra Selamat Makmur',
      location: 'Tangerang, Indonesia',
      period: 'Mei 2026 — Okt 2026',
      duration: '6 bln',
      summary:
        'Membangun dan merilis company profile serta aplikasi web manajemen internal dari nol untuk klien pengadaan & rental forklift (Putra Selamat Makmur). Bertanggung jawab penuh mulai dari perancangan arsitektur hingga optimasi SEO.',
      bullets: [
        'Merancang dan mengembangkan platform web industri end-to-end menggunakan SvelteKit, TypeScript, dan Tailwind CSS, mencapai skor Lighthouse 95+ dan waktu muat sub-detik',
        'Membangun backend service Go berkinerja tinggi dan dideploy di VPS Linux dengan reverse proxy Caddy, menjamin operasional zero-downtime serta transaksi penerbitan invoice & surat perintah kerja secara atomik',
        'Mengimplementasikan katalog unit interaktif dan routing pemesanan otomatis ke WhatsApp bisnis, mengubah pencatatan manual berbasis kertas menjadi alur digital terpadu dan meningkatkan konversi prospek klien',
        'Mengoptimalkan data terstruktur Schema.org dan SEO lokal, mengamankan peringkat pencarian Google teratas di target pasar industri servis forklift',
      ],
    },
    {
      title: 'Team Lead & Fullstack Developer',
      company: 'PT Traspac Makmur Sejahtera',
      location: 'Jakarta, Indonesia',
      period: 'Sep 2024 — Mei 2026',
      duration: '1 thn 8 bln',
      summary:
        'Memimpin tim engineering 5 orang (2 FE, 2 BE) di divisi R&D. PIC utama beberapa proyek paralel — keputusan arsitektur, development, dan maintenance jangka panjang.',
      bullets: [
        'Menjaga 3–5 proyek paralel tetap on-track, menyesuaikan prioritas dengan kapasitas tim dan kebutuhan klien/stakeholder',
        'Membina engineer dari level junior sampai siap production lewat coaching langsung dan review dua kali setahun',
        'Menetapkan praktik code review dan standar koding untuk tim',
        'Membagi tugas dan mengelola sprint mingguan lintas tim frontend dan backend',
        'Jadi jembatan utama tim dengan stakeholder — dari scoping kebutuhan sampai update delivery',
      ],
    },
    {
      title: 'Fullstack Developer',
      company: 'PT Traspac Makmur Sejahtera',
      location: 'Jakarta, Indonesia',
      period: 'Apr 2022 — Sep 2024',
      duration: '2 thn 5 bln',
      summary:
        'Membangun aplikasi web dan mobile production untuk instansi pemerintah dan BUMN di divisi R&D. Dipromosikan jadi Team Lead September 2024.',
      bullets: [
        'Merancang arsitektur dan memelihara 5+ microservices (identity management, platform pembelajaran, pemrosesan dokumen) yang mengelola dataset dari ratusan ribu hingga 1 juta+ record',
        'Mengoptimalkan query database kompleks dan mengintegrasikan caching Redis, memangkas latensi rata-rata API hingga ~40% pada alur transaksi bervolume tinggi',
        'Mengembangkan arsitektur autentikasi enterprise SSO dan multi-factor authentication (MFA) berbasis biometrik, mengamankan portal penting pemerintah dan BUMN',
        'Mengembangkan aplikasi mobile lintas platform dengan fitur realtime (GPS tracking, notifikasi WebSocket, live chat) yang andal pada kondisi jaringan bandwidth rendah',
        'Membangun pipeline otomatis pembuatan dokumen asinkron untuk sertifikat dan laporan PDF, memangkas waktu pemrosesan batch dari beberapa menit menjadi sub-detik per dokumen',
        'Mengelola infrastruktur cloud VPS Linux dan mengimplementasikan otomatisasi CI/CD (GitHub Actions, GitLab CI), mempercepat siklus rilis deployment sebesar 60% tanpa downtime',
      ],
    },
  ],
};
