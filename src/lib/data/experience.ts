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
      title: 'Sub Team Lead & Fullstack Developer',
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
        'Built production web and mobile applications for government agencies and state-owned enterprises in an R&D division. Promoted to Sub Team Lead in September 2024.',
      bullets: [
        'Built and maintained microservice-based systems across identity management, learning platforms, and document processing',
        'Handled API integration and data processing with datasets from hundreds of thousands to millions of records',
        'Implemented SSO and multi-factor authentication (including biometric) for enterprise applications',
        'Developed mobile applications with real-time features: notifications, GPS tracking, and live chat',
        'Built automated document generation pipelines for certificates and PDF reports',
        'Managed VPS infrastructure, set up CI/CD pipelines, and led legacy stack modernization',
      ],
    },
  ],
  id: [
    {
      title: 'Sub Team Lead & Fullstack Developer',
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
        'Membangun aplikasi web dan mobile production untuk instansi pemerintah dan BUMN di divisi R&D. Dipromosikan jadi Sub Team Lead September 2024.',
      bullets: [
        'Membangun dan memelihara sistem berbasis microservice: identity management, learning platform, document processing',
        'Menangani integrasi API dan pengolahan data dari ratusan ribu sampai jutaan record',
        'Mengimplementasikan SSO dan multi-factor authentication (termasuk biometrik) untuk aplikasi enterprise',
        'Mengembangkan aplikasi mobile dengan fitur realtime: notifikasi, GPS tracking, live chat',
        'Membangun pipeline otomatis pembuatan dokumen untuk sertifikat dan laporan PDF',
        'Mengelola infrastruktur VPS, menyiapkan pipeline CI/CD, dan memimpin modernisasi legacy stack',
      ],
    },
  ],
};
