export type Locale = "en" | "id";

export interface ProjectCopy {
  summary: string;
  focus: string;
}

export const projectCopy: Record<Locale, Record<string, ProjectCopy>> = {
  en: {
    cinematix: {
      summary:
        "Cinema ticketing PWA with realtime 3D seat-POV selection — a feature absent from all major Indonesian cinema apps.",
      focus:
        "Realtime seat locking with double-book prevention via Socket.IO, Next.js App Router, Prisma + PostgreSQL, and GitHub Actions CI/CD.",
    },
    pildun: {
      summary:
        "World Cup 2026 score-prediction platform — create a room, invite friends, and compete on a realtime leaderboard.",
      focus:
        "Room codes, exact-score + knockout prediction, 48 teams & 104 matches, realtime leaderboard, deployed on VPS with PM2 + Caddy.",
    },
    koruptorrank: {
      summary:
        "Civic-tech ranking of Indonesian corruption cases with 260+ curated entries and multi-factor scoring.",
      focus:
        "Curated data sourced from Wikipedia, multi-factor scoring, filtering, and interactive ranking visualization.",
    },
    pantauanggaran: {
      summary:
        "Indonesian public procurement transparency platform. Real-time dashboard with AI-based anomaly detection.",
      focus:
        "SiRUP data scraping, normalization, region mapping, anomaly scoring, and interactive dashboard visualization.",
    },
    jedug: {
      summary:
        "Map-based damaged road reporting platform with photo upload, admin moderation, and public statistics.",
      focus:
        "Report submission flow, smart nearest-issue merge, storage hardening, map clustering, heatmap, and admin moderation.",
    },
    brunogen: {
      summary:
        "Developer tool that reads Laravel, Express, and Go APIs then generates OpenAPI specs and ready-to-use Bruno collections.",
      focus:
        "Route scanning, request/response inference, regression fixtures, publish workflow, and npm package hygiene.",
    },
    messhub: {
      summary:
        "Realtime operations app for daily mess management — cash, wifi, feed, members, and workflows in a mobile-first PWA.",
      focus:
        "WebSocket transport, role-based auth without changing existing flows, mobile-first dashboard, and PWA mode.",
    },
  },
  id: {
    cinematix: {
      summary:
        "PWA tiket bioskop dengan pemilihan kursi POV 3D realtime — fitur yang belum ada di aplikasi bioskop besar Indonesia.",
      focus:
        "Seat locking realtime anti double-book via Socket.IO, App Router Next.js, Prisma + PostgreSQL, dan CI/CD GitHub Actions.",
    },
    pildun: {
      summary:
        "Platform tebak skor Piala Dunia 2026 — bikin room, ajak teman, dan adu tebakan dengan leaderboard realtime.",
      focus:
        "Room code, prediksi exact-score + knockout, 48 tim & 104 match, leaderboard realtime, deploy VPS dengan PM2 + Caddy.",
    },
    koruptorrank: {
      summary:
        "Civic-tech peringkat kasus korupsi Indonesia dengan 260+ entri terkurasi dan scoring multi-faktor.",
      focus:
        "Kurasi data dari Wikipedia, scoring multi-faktor, filtering, dan visualisasi ranking interaktif.",
    },
    pantauanggaran: {
      summary:
        "Platform transparansi pengadaan publik Indonesia. Dashboard real-time dengan deteksi anomali berbasis AI.",
      focus:
        "Scraping data SiRUP, normalisasi, mapping wilayah, scoring anomali, dan visualisasi dashboard interaktif.",
    },
    jedug: {
      summary:
        "Platform pelaporan jalan rusak berbasis peta, upload bukti, moderasi admin, dan statistik publik.",
      focus:
        "Flow submit laporan, smart merge issue terdekat, storage hardening, map clustering, heatmap, dan admin moderation.",
    },
    brunogen: {
      summary:
        "Developer tool yang membaca Laravel, Express, dan Go API lalu menghasilkan OpenAPI dan Bruno collection siap pakai.",
      focus:
        "Route scanning, request/response inference, regression fixtures, publish workflow, dan package hygiene untuk npm.",
    },
    messhub: {
      summary:
        "Aplikasi operasional mess realtime untuk kas, wifi, feed, anggota, dan workflow harian — mobile-first PWA.",
      focus:
        "Transport WebSocket, auth + role tanpa ganti alur existing, dashboard mobile-first, dan mode PWA.",
    },
  },
};
