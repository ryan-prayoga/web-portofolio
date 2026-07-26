import type { ProjectSlug } from './projects';
import type { Locale } from './uiCopy';

export interface ProjectCopy {
  summary: string;
  focus: string;
}

export const projectCopy = {
  en: {
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
    brunogen: {
      summary:
        'Open-source CLI on npm that scans Laravel, Express, and Go codebases into OpenAPI specs, Bruno collections, and a runnable MCP server.',
      focus:
        'Real AST parsing (@typescript-eslint) for Express router resolution, deep Laravel inference (FormRequest rules, JsonResource), CI matrix on Node 20+24 with a release-gate script — published as brunogen v0.6.x.',
    },
    cinematix: {
      summary:
        'Cinema ticketing PWA with realtime seat locking and interactive 3D seat-POV preview — a feature absent from major Indonesian cinema apps.',
      focus:
        'Socket.IO room broadcast + seat locks with expiry for double-book prevention (409 on conflict), react-three-fiber seat viewer with real seat-grid geometry, Next.js App Router + Prisma + PostgreSQL.',
    },
    jedug: {
      summary: 'Civic platform where citizens report and track damaged public infrastructure — live at jedug.id.',
      focus:
        'Hand-rolled SSE hub for realtime issue updates, Web Push with a retrying delivery job queue, PostGIS nearby-alerts, R2 presigned uploads, 15 versioned migrations, 21 Go test files.',
    },
    openrowdb: {
      summary:
        'Native macOS database client for Postgres and MySQL — no Electron, no JVM. Open source, distributed as signed DMG releases.',
      focus:
        'Swift 6 + SwiftUI with wire-protocol drivers over NIO, SQL tokenizer/formatter/completion written from scratch, SSH tunneling + Keychain secret store, 28 test files, scripted release pipeline.',
    },
    komikreader: {
      summary: 'Self-hosted comic reader PWA built on Suwayomi with Keiyoushi extensions.',
      focus:
        '20 test files across Vitest + Playwright (desktop and mobile), CI/CD with secret scanning before deploy, SQLite auth layer, Docker + Caddy self-hosting.',
    },
  },
  id: {
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
    brunogen: {
      summary:
        'CLI open-source di npm yang memindai codebase Laravel, Express, dan Go menjadi spec OpenAPI, koleksi Bruno, dan MCP server siap jalan.',
      focus:
        'AST parsing beneran (@typescript-eslint) untuk resolusi router Express, inferensi Laravel dalam (FormRequest rules, JsonResource), CI matrix Node 20+24 dengan release-gate script — terpublish sebagai brunogen v0.6.x.',
    },
    cinematix: {
      summary:
        'PWA tiket bioskop dengan seat lock realtime dan preview 3D dari sudut pandang kursi — fitur yang belum ada di aplikasi bioskop besar Indonesia.',
      focus:
        'Broadcast room Socket.IO + seat lock ber-expiry untuk cegah double-book (409 saat konflik), seat viewer react-three-fiber dengan geometri grid kursi nyata, Next.js App Router + Prisma + PostgreSQL.',
    },
    jedug: {
      summary: 'Platform warga untuk melaporkan dan melacak kerusakan infrastruktur publik — live di jedug.id.',
      focus:
        'SSE hub buatan sendiri untuk update isu realtime, Web Push dengan job queue ber-retry, nearby-alert PostGIS, upload presigned R2, 15 migration berversi, 21 file test Go.',
    },
    openrowdb: {
      summary:
        'Database client native macOS untuk Postgres dan MySQL — tanpa Electron, tanpa JVM. Open source, dirilis sebagai DMG.',
      focus:
        'Swift 6 + SwiftUI dengan driver wire-protocol di atas NIO, SQL tokenizer/formatter/completion ditulis dari nol, SSH tunneling + Keychain secret store, 28 file test, pipeline rilis ter-script.',
    },
    komikreader: {
      summary: 'PWA pembaca komik self-hosted di atas Suwayomi dengan extension Keiyoushi.',
      focus:
        '20 file test Vitest + Playwright (desktop dan mobile), CI/CD dengan secret scanning sebelum deploy, layer auth SQLite, self-hosting Docker + Caddy.',
    },
  },
} satisfies Record<Locale, Record<ProjectSlug, ProjectCopy>>;
