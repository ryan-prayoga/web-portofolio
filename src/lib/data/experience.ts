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
      title: 'Fullstack Developer',
      company: 'PT Traspac Makmur Sejahtera',
      location: 'Jakarta, Indonesia',
      period: 'Apr 2022 — May 2026',
      duration: '4 yrs 2 mos',
      summary:
        'Built production web and mobile applications for government agencies and state-owned enterprises in an R&D division. Main PIC across multiple concurrent projects — responsible for architecture decisions, development, and long-term maintenance.',
      bullets: [
        'Built and maintained microservice-based systems across identity management, learning platforms, and document processing',
        'Handled API integration and data processing with datasets from hundreds of thousands to millions of records',
        'Implemented SSO and multi-factor authentication (including biometric) for enterprise applications',
        'Developed mobile applications with real-time features: notifications, GPS tracking, and live chat',
        'Built automated document generation pipelines for certificates and PDF reports',
        'Managed VPS infrastructure, set up CI/CD pipelines, and led legacy stack modernization',
        'Kept 3–5 concurrent projects on track, maintaining code review practices and coding standards',
      ],
    },
  ],
  id: [
    {
      title: 'Fullstack Developer',
      company: 'PT Traspac Makmur Sejahtera',
      location: 'Jakarta, Indonesia',
      period: 'Apr 2022 — Mei 2026',
      duration: '4 thn 2 bln',
      summary:
        'Membangun aplikasi web dan mobile production untuk instansi pemerintah dan BUMN di divisi R&D. PIC utama beberapa proyek paralel — keputusan arsitektur, development, dan maintenance jangka panjang.',
      bullets: [
        'Membangun dan memelihara sistem berbasis microservice: identity management, learning platform, document processing',
        'Menangani integrasi API dan pengolahan data dari ratusan ribu sampai jutaan record',
        'Mengimplementasikan SSO dan multi-factor authentication (termasuk biometrik) untuk aplikasi enterprise',
        'Mengembangkan aplikasi mobile dengan fitur realtime: notifikasi, GPS tracking, live chat',
        'Membangun pipeline otomatis pembuatan dokumen untuk sertifikat dan laporan PDF',
        'Mengelola infrastruktur VPS, menyiapkan pipeline CI/CD, dan memimpin modernisasi legacy stack',
        'Menjaga 3–5 proyek paralel tetap on-track, serta menjalankan praktik code review dan standar koding',
      ],
    },
  ],
};
