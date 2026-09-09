import type { FeaturedSlug } from './projects';
import type { Locale } from './uiCopy';

export interface CaseStudy {
  readonly problem: string;
  readonly role: string;
  readonly decisions: readonly { readonly title: string; readonly body: string }[];
  readonly results: readonly string[];
}

/**
 * Case study penuh untuk 4 project featured. Semua klaim bersumber dari
 * kode, CI, README, dan metrik produksi nyata.
 */
export const caseStudies: Record<Locale, Record<FeaturedSlug, CaseStudy>> = {
  en: {
    whatsappdesk: {
      problem:
        'Official WhatsApp Desktop consumes 750MB–1.5GB RAM through bundled Chromium and Node.js (Electron), drains laptop battery, and lacks basic workplace privacy or power-user controls.',
      role: 'Creator & Systems Engineer: Rust backend, Tauri v2 configuration, native OS integration, and cross-platform release pipeline.',
      decisions: [
        {
          title: 'Zero-GC native runtime via Rust & Tauri v2',
          body: 'Leveraged native operating system WebViews (Apple WebKit on macOS, Edge WebView2 on Windows, WebKitGTK on Linux) instead of bundling an entire browser. Memory consumption dropped by over 90% with zero garbage collection spikes.',
        },
        {
          title: 'Encrypted blob stream interception',
          body: 'Intercepted encrypted media and document download blobs directly within the webview stream, solving stuck document viewer bugs and routing files straight into a persistent user downloads directory.',
        },
        {
          title: 'Deep desktop OS integration',
          body: 'Implemented native macOS Cocoa menus (Cmd+C/V/Z), dynamic unread badge count on the macOS Dock, system tray integration across platforms, and single-instance process mutex.',
        },
        {
          title: 'Workplace privacy & power controls',
          body: 'Built hotkey-toggled privacy blur (Cmd+Shift+P) for sensitive chats in open-office environments, window pinning (Always on Top), and instant mute hotkeys.',
        },
      ],
      results: [
        '~18–30MB idle RAM consumption vs 1.5GB on Electron',
        '3–5MB installer size vs 900MB official desktop installer',
        'Signed multi-platform releases on GitHub (v0.2.8): macOS universal/arm64 (.dmg), Windows (.exe/.msi), Linux (.deb/.AppImage/.rpm)',
        'Sub-0.3s cold start with instant window focus',
      ],
    },
    kasbadminton: {
      problem:
        'Tracking badminton shuttlecock usage per pair and splitting court fees manually across club members is chaotic, prone to missed debts, and creates ledger friction during sessions.',
      role: 'Solo Architect & Fullstack Engineer: end-to-end rewrite from v2 (Next.js/Prisma) to v4 (Go + SvelteKit static embedded), data migration, and live operations.',
      decisions: [
        {
          title: 'Single binary delivery with go:embed',
          body: 'Compiled SvelteKit static SPA directly into the Go binary using go:embed. Zero Node.js runtime on the VPS, instant sub-millisecond cold start, and idle RAM footprint below 16MB.',
        },
        {
          title: 'Realtime session sync via Server-Sent Events (SSE)',
          body: 'Chose unidirectional SSE over WebSockets for live match, debt, and balance updates across active courts — eliminating ping/pong connection overhead and saving mobile battery.',
        },
        {
          title: 'Dynamic QRIS & offline court-ready PWA',
          body: 'Generated exact-amount dynamic QRIS images on the client side with text-sharing fallbacks, paired with service worker caching for reliable operation in indoor courts with weak cellular signal.',
        },
        {
          title: 'Domain-driven idempotent debt reconciliation',
          body: 'Structured transactional balance state machines (player_balances) with goose migrations, ensuring debt recalculations remain 100% idempotent across repeated runs.',
        },
      ],
      results: [
        'Live and actively used in weekly production at kasbadminton.com',
        'Native arm64 automated CI/CD deployment with /healthz verification',
        '99+ domain logic tests guaranteeing zero accounting discrepancies',
        'Zero runtime memory leaks and instant responsiveness on low-end devices',
      ],
    },
    nativedesign: {
      problem:
        'AI coding agents (Claude, Cursor, Copilot) frequently generate mobile and desktop UIs that feel like 2017 web wrappers — hardcoded hex colors, hamburger drawers on iOS, and non-standard layouts.',
      role: 'Author & Systems Designer: engineered the deterministic multi-platform rule engine, CLI auditor, and design guidelines.',
      decisions: [
        {
          title: 'Deterministic AST anti-slop rules',
          body: 'Built strict parsing rules for SwiftUI, Jetpack Compose, WinUI, and Libadwaita code to detect and reject web-wrapper patterns, raw hex color literals, and non-platform idioms.',
        },
        {
          title: 'Authentic 2026 platform sub-engines',
          body: 'Formulated precise specifications for Apple Liquid Glass (floating translucent capsules, spring physics), Android 17 M3 Expressive (dynamic color, predictive back), and GNOME Libadwaita AdwHeaderBar.',
        },
        {
          title: 'Strict hit-target & ergonomics enforcement',
          body: 'Enforced 44×44pt minimum touch targets for Apple and 48×48dp for Android with 8dp separation grids, eliminating thumb-frustrating micro-buttons.',
        },
        {
          title: 'Semantic theme token mapping',
          body: 'Mandated semantic system tokens (systemBackground, colorScheme.surface) over static colors to guarantee resilience across system Dark Mode and high-contrast accessibility modes.',
        },
      ],
      results: [
        'Open-source CLI tool and AI agent skill with MIT license',
        'Comprehensive Rosetta Stone matrix bridging design tokens across 4 OS ecosystems',
        'Deterministic scorecard auditing native UI codebases automatically',
      ],
    },
    pantauanggaran: {
      problem:
        'Indonesian government procurement publishes millions of records, but the public has no practical way to spot anomalies — the data is too large, too messy, and spread across regions.',
      role: 'Solo build: data pipeline, backend, ML clustering, frontend, and deployment.',
      decisions: [
        {
          title: 'PostGIS as the analytical core',
          body: 'Region geometry lives in PostGIS with GiST indexes; map GeoJSON is served from materialized views (province_map_geoms, region_year_stats) refreshed by the deploy pipeline — the API never assembles geometry per request.',
        },
        {
          title: 'Search that survives dirty data',
          body: 'Package names are indexed three ways: tsvector GIN for full-text, gin_trgm_ops for fuzzy matching against typo-ridden entries, and JSONB GIN over raw payloads.',
        },
        {
          title: 'Clustering with an ablation study',
          body: 'K-Means over agency spending profiles with spatial-lag features; K chosen via inertia, Silhouette, and Davies-Bouldin, and a spatial-feature ablation documents what the geography actually contributes. Results land in region_clusters and are served via the API.',
        },
        {
          title: 'Ethical framing as a product decision',
          body: 'Everything is labeled "potential anomaly / needs review" — the platform surfaces signals for scrutiny, it does not accuse.',
        },
      ],
      results: [
        '3M+ procurement records browsable by region, agency, and risk cluster',
        'The only project in the fleet with CI running a real test gate (Go tests + svelte-check + compose validation) separate from deploy',
        'Optional Redis cache degrades gracefully when absent',
        'Live at pantauanggaran.ryanprayoga.dev',
      ],
    },
  },
  id: {
    whatsappdesk: {
      problem:
        'WhatsApp Desktop resmi memakan RAM 750MB–1.5GB melalui Chromium dan Node.js bawaan (Electron), boros baterai, dan minim fitur privasi atau kontrol keyboard tingkat lanjut.',
      role: 'Creator & Systems Engineer: backend Rust, konfigurasi Tauri v2, integrasi native OS, dan pipeline rilis multi-platform.',
      decisions: [
        {
          title: 'Runtime native zero-GC lewat Rust & Tauri v2',
          body: 'Memanfaatkan engine WebView bawaan OS (WebKit di macOS, WebView2 di Windows, WebKitGTK di Linux) tanpa menyertakan seluruh browser. Konsumsi RAM turun lebih dari 90% tanpa latency spike dari garbage collector.',
        },
        {
          title: 'Pencegatan stream unduhan berkas terenkripsi',
          body: 'Mencegat blob unduhan media dan dokumen terenkripsi langsung di stream webview, menyelesaikan masalah viewer macet dan menyimpan berkas otomatis ke direktori unduhan persisten.',
        },
        {
          title: 'Integrasi platform desktop mendalam',
          body: 'Mengimplementasikan menu Cocoa native di macOS (Cmd+C/V/Z), sinkronisasi badge jumlah pesan belum dibaca di Dock macOS, system tray lintas platform, dan mutex single-instance.',
        },
        {
          title: 'Kontrol privasi & produktivitas kerja',
          body: 'Membangun fitur blur privasi cepat (Cmd+Shift+P) untuk menyamarkan pesan di tempat umum, fitur pin jendela (Always on Top), dan tombol mute audio seketika.',
        },
      ],
      results: [
        'Konsumsi RAM idle hanya ~18–30MB vs 1.5GB pada Electron',
        'Ukuran installer hanya 3–5MB vs 900MB aplikasi desktop resmi',
        'Rilis resmi multi-platform di GitHub (v0.2.8): macOS universal (.dmg), Windows (.exe/.msi), Linux (.deb/.AppImage/.rpm)',
        'Cold start di bawah 0.3 detik dengan fokus jendela instan',
      ],
    },
    kasbadminton: {
      problem:
        'Pencatatan konsumsi kok per pair dan pembagian iuran sewa lapangan badminton secara manual sangat rawan selisih, utang terlewat, dan memicu ketidaknyamanan antarpemain.',
      role: 'Solo Architect & Fullstack Engineer: rewrite total dari v2 (Next.js/Prisma) ke v4 (Go + SvelteKit static embedded), migrasi data, dan operasional live.',
      decisions: [
        {
          title: 'Distribusi single binary lewat go:embed',
          body: 'Mengompilasi SPA SvelteKit static langsung ke dalam binary Go menggunakan go:embed. Zero runtime Node.js di VPS, cold start hitungan milidetik, dan konsumsi RAM idle di bawah 16MB.',
        },
        {
          title: 'Sinkronisasi realtime via Server-Sent Events (SSE)',
          body: 'Memilih SSE satu arah dibanding WebSocket untuk pembaruan sesi live, utang, dan saldo pemain di lapangan — memangkas overhead koneksi ping/pong dan sangat hemat baterai HP.',
        },
        {
          title: 'QRIS dinamis & PWA offline-first untuk GOR',
          body: 'Membuat QRIS dinamis dengan nominal pas di sisi klien beserta fallback share teks, dipadu caching service worker agar aplikasi tetap lancar di dalam GOR dengan sinyal lemah.',
        },
        {
          title: 'Rekonsiliasi saldo utang idempoten berbasis domain',
          body: 'Menyusun state machine saldo pemain (player_balances) dengan migrasi goose, menjamin rekonsiliasi keuangan tetap 100% konsisten meski diulang berkali-kali.',
        },
      ],
      results: [
        'Live dan aktif digunakan setiap pekan di kasbadminton.com',
        'Auto-deploy CI/CD arm64 native dengan verifikasi /healthz',
        '99+ domain logic test menjamin nol selisih perhitungan kas',
        'Bebas kebocoran memori dengan performa sangat enteng di HP apa pun',
      ],
    },
    nativedesign: {
      problem:
        'AI coding agents (Claude, Cursor, Copilot) sering menghasilkan UI mobile dan desktop yang terasa seperti web wrapper era 2017 — warna hex hardcoded, tombol hamburger di iOS, dan layout non-standar.',
      role: 'Author & Systems Designer: merancang engine aturan deterministik multi-platform, CLI auditor, dan panduan desain platform.',
      decisions: [
        {
          title: 'Aturan deterministik AST anti-slop',
          body: 'Membangun aturan parsing ketat untuk kode SwiftUI, Jetpack Compose, WinUI, dan Libadwaita guna mendeteksi dan menolak pola web-wrapper, warna hex mentah, dan idiom non-native.',
        },
        {
          title: 'Sub-engine platform resmi standar 2026',
          body: 'Merumuskan spesifikasi autentik untuk Apple Liquid Glass (kapsul mengambang, spring physics), Android 17 M3 Expressive (dynamic color, predictive back), dan GNOME AdwHeaderBar.',
        },
        {
          title: 'Penegakan hit-target & ergonomi ketat',
          body: 'Menegakkan target sentuh minimum 44×44pt di Apple dan 48×48dp di Android dengan grid spasi 8dp, melenyapkan tombol-tombol mikro yang menyulitkan jempol.',
        },
        {
          title: 'Pemetaan token tema semantik',
          body: 'Mewajibkan penggunaan token sistem semantik (systemBackground, colorScheme.surface) dibanding warna statis agar tampilan tetap adaptif di Dark Mode dan mode kontras tinggi.',
        },
      ],
      results: [
        'Tool CLI dan skill AI agent open-source dengan lisensi MIT',
        'Dokumentasi matriks Rosetta Stone perbandingan token di 4 ekosistem OS',
        'Scorecard deterministik untuk mengaudit codebase UI native secara otomatis',
      ],
    },
    pantauanggaran: {
      problem:
        'Pengadaan pemerintah Indonesia mempublikasikan jutaan record data, namun masyarakat sulit mendeteksi anomali karena data terlalu besar, berantakan, dan tersebar di berbagai daerah.',
      role: 'Solo build: data pipeline, backend, ML clustering, frontend, dan deployment.',
      decisions: [
        {
          title: 'PostGIS sebagai inti analitikal',
          body: 'Geometri wilayah disimpan di PostGIS dengan GiST index; GeoJSON peta disajikan dari materialized view (province_map_geoms, region_year_stats) yang di-refresh saat pipeline deploy — API tidak pernah merakit geometri per request.',
        },
        {
          title: 'Pencarian tangguh terhadap data kotor',
          body: 'Nama paket diindeks tiga lapis: tsvector GIN untuk full-text, gin_trgm_ops untuk fuzzy matching nama bertipo, dan JSONB GIN di atas payload mentah.',
        },
        {
          title: 'Clustering dengan studi ablasi',
          body: 'K-Means atas profil belanja instansi dengan fitur spatial-lag; K dipilih melalui inertia, Silhouette, dan Davies-Bouldin, disertai dokumentasi studi ablasi kontribusi geografi. Hasil disimpan di region_clusters dan disajikan via API.',
        },
        {
          title: 'Framing etis sebagai keputusan produk',
          body: 'Semua temuan dilabeli "potensi anomali / perlu telaah" — platform memunculkan sinyal untuk diteliti bersama, bukan menuduh.',
        },
      ],
      results: [
        '3jt+ record pengadaan dapat dijelajahi berdasarkan wilayah, instansi, dan klaster risiko',
        'Satu-satunya proyek di armada dengan test gate CI riil (Go test + svelte-check + compose validation) terpisah dari deploy',
        'Cache Redis opsional yang melakukan fallback secara aman jika server tidak ada',
        'Live di pantauanggaran.ryanprayoga.dev',
      ],
    },
  },
};
