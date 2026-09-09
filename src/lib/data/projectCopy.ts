import type { ProjectSlug } from './projects';
import type { Locale } from './uiCopy';

export interface ProjectCopy {
  summary: string;
  focus: string;
}

export const projectCopy = {
  en: {
    whatsappdesk: {
      summary:
        'Ultra-lightweight multi-platform desktop WhatsApp client built with Rust and Tauri v2 — slashing RAM from 1.5GB to ~18MB with zero-GC runtime.',
      focus:
        'Native OS WebKit/WebView2/WebKitGTK integration, persistent session storage, privacy blur mode, permanent chat download interceptor, native Cocoa menu bar and Dock badges, signed multi-platform releases (.dmg, .exe, .deb, .AppImage).',
    },
    kasbadminton: {
      summary:
        'Real-time badminton club cash & match manager — 2-pair matchup calculations, dynamic QRIS generation, offline-first PWA, and single Go binary delivery via go:embed.',
      focus:
        'Single binary deployment with SvelteKit SPA embedded in Go (chi/pgx), Server-Sent Events (SSE) for live session sync, automated goose schema migrations, and idempotent debt reconciliation (player_balances). Live in production at kasbadminton.com.',
    },
    nativedesign: {
      summary:
        'Open-source design intelligence engine and CLI for AI coding agents enforcing authentic 2026 native OS guidelines across Apple, Google, Microsoft, and Linux.',
      focus:
        'Deterministic AST rule-checking for anti-AI-slop design, enforcing Apple Liquid Glass, Android 17 M3 Expressive, Windows 11 WinUI, and GNOME Libadwaita standards, strict touch targets (44pt/48dp), and semantic theme token validation.',
    },
    pantauanggaran: {
      summary:
        'Public dashboard monitoring 3M+ government procurement records for anomalies — regional maps, agency rankings, risk clusters.',
      focus:
        'PostGIS materialized views for map geometry, GIN trigram full-text search, K-Means clustering with spatial-lag features (plus an ablation study), optional Redis cache with graceful degradation, CI with a real test gate.',
    },
    putraselamatmakmur: {
      summary:
        'Company profile + internal admin for a real forklift-service client — scoped, built, shipped, and SEO-tuned end to end.',
      focus:
        'Static-first SvelteKit with full prerender, curated image pipeline (127 photos → 12, WebP via sharp), JSON-LD LocalBusiness SEO, zero-trust deploy through Cloudflare Access. Lighthouse mobile: 90 / 100 / 100 / 92.',
    },
    openrowdb: {
      summary:
        'Native macOS database client for Postgres and MySQL — no Electron, no JVM. Open source, distributed as signed DMG releases.',
      focus:
        'Swift 6 + SwiftUI with wire-protocol drivers over NIO, SQL tokenizer/formatter/completion written from scratch, SSH tunneling + Keychain secret store, 28 test files, scripted release pipeline.',
    },
    jedug: {
      summary: 'Civic platform where citizens report and track damaged public infrastructure — live at jedug.id.',
      focus:
        'Hand-rolled SSE hub for realtime issue updates, Web Push with a retrying delivery job queue, PostGIS nearby-alerts, R2 presigned uploads, 15 versioned migrations, 21 Go test files.',
    },
    komikreader: {
      summary: 'Self-hosted comic reader PWA built on Suwayomi with Keiyoushi extensions.',
      focus:
        '20 test files across Vitest + Playwright (desktop and mobile), CI/CD with secret scanning before deploy, SQLite auth layer, Docker + Caddy self-hosting.',
    },
  },
  id: {
    whatsappdesk: {
      summary:
        'Aplikasi desktop WhatsApp multi-platform ultra-ringan berbasis Rust & Tauri v2 — memangkas RAM dari 1.5GB menjadi ~18MB tanpa overhead GC.',
      focus:
        'Pemanfaatan WebKit/WebView2 bawaan OS, penyimpanan sesi persisten, mode privasi anti-intip, pencegatan unduhan chat permanen, Dock badge macOS native, rilis installer multi-platform (.dmg, .exe, .deb, .AppImage).',
    },
    kasbadminton: {
      summary:
        'Aplikasi operasional dan kas patungan kok badminton realtime — pencatatan matchup, pembayaran QRIS dinamis, PWA offline-first, disajikan satu binary Go via go:embed.',
      focus:
        'Satu binary Go (chi/pgx) dengan SvelteKit SPA ter-embed, Server-Sent Events (SSE) untuk sinkronisasi live pertandingan, migrasi schema goose terotomasi, dan rekonsiliasi saldo utang idempoten. Live di kasbadminton.com.',
    },
    nativedesign: {
      summary:
        'Design intelligence engine dan CLI open-source untuk AI coding agents yang menegakkan standar desain native resmi 2026 di Apple, Google, Microsoft, dan Linux.',
      focus:
        'Aturan deterministik anti-AI-slop untuk Apple Liquid Glass, Android 17 M3 Expressive, Windows 11 WinUI, dan GNOME Libadwaita, penegakan hit-target ketat (44pt/48dp), dan validasi token tema semantik.',
    },
    pantauanggaran: {
      summary:
        'Dashboard publik pemantau 3jt+ record pengadaan pemerintah untuk deteksi anomali — peta wilayah, ranking instansi, klaster risiko.',
      focus:
        'Materialized view PostGIS untuk geometri peta, full-text search GIN trigram, K-Means dengan fitur spatial-lag (plus ablation study), cache Redis opsional yang degrade dengan aman, CI dengan test gate beneran.',
    },
    putraselamatmakmur: {
      summary:
        'Company profile + admin internal untuk klien jasa servis forklift nyata — scoping, build, rilis, dan SEO dikerjakan end-to-end.',
      focus:
        'SvelteKit static-first full prerender, pipeline kurasi gambar (127 foto → 12, WebP via sharp), SEO JSON-LD LocalBusiness, deploy zero-trust lewat Cloudflare Access. Lighthouse mobile: 90 / 100 / 100 / 92.',
    },
    openrowdb: {
      summary:
        'Database client native macOS untuk Postgres dan MySQL — tanpa Electron, tanpa JVM. Open source, dirilis sebagai DMG.',
      focus:
        'Swift 6 + SwiftUI dengan driver wire-protocol di atas NIO, SQL tokenizer/formatter/completion ditulis dari nol, SSH tunneling + Keychain secret store, 28 file test, pipeline rilis ter-script.',
    },
    jedug: {
      summary: 'Platform warga untuk melaporkan dan melacak kerusakan infrastruktur publik — live di jedug.id.',
      focus:
        'SSE hub buatan sendiri untuk update isu realtime, Web Push dengan job queue ber-retry, nearby-alert PostGIS, upload presigned R2, 15 migration berversi, 21 file test Go.',
    },
    komikreader: {
      summary: 'PWA pembaca komik self-hosted di atas Suwayomi dengan extension Keiyoushi.',
      focus:
        '20 file test Vitest + Playwright (desktop dan mobile), CI/CD dengan secret scanning sebelum deploy, layer auth SQLite, self-hosting Docker + Caddy.',
    },
  },
} satisfies Record<Locale, Record<ProjectSlug, ProjectCopy>>;
