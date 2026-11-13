import type { FeaturedSlug } from './projects';
import type { Locale } from './uiCopy';

export interface DiagramNode {
  readonly label: string;
  readonly note: string;
}

export interface DiagramEdge {
  readonly label: string;
  /** 'back' = data mengalir dari node berikutnya ke node sebelumnya. */
  readonly dir?: 'forward' | 'back';
}

export interface CaseDiagram {
  readonly nodes: readonly DiagramNode[];
  /** edges[i] menghubungkan nodes[i] ke nodes[i + 1]. */
  readonly edges: readonly DiagramEdge[];
}

/**
 * Sketsa arsitektur tiap case study. Setiap node dan panah HANYA merangkum
 * hal yang sudah tertulis di caseStudies.ts (decisions/results) — jangan
 * menambah komponen yang tidak ada sumbernya di sana.
 */
export const caseDiagrams: Record<Locale, Record<FeaturedSlug, CaseDiagram>> = {
  en: {
    whatsappdesk: {
      nodes: [
        { label: 'OS WebView', note: 'WebKit · WebView2 · WebKitGTK, no bundled browser' },
        { label: 'Rust core (Tauri v2)', note: 'Blob stream interception, single-instance mutex' },
        { label: 'Desktop OS', note: 'Dock badge, system tray, native menus, Downloads folder' },
      ],
      edges: [{ label: 'download blobs' }, { label: 'native calls' }],
    },
    kasbadminton: {
      nodes: [
        { label: 'PWA client', note: 'SvelteKit static SPA, service worker cache, client-side QRIS' },
        { label: 'Go binary', note: 'SPA compiled in with go:embed, no Node.js runtime' },
        { label: 'PostgreSQL', note: 'player_balances state machine, goose migrations' },
      ],
      edges: [{ label: 'SSE updates', dir: 'back' }, { label: 'idempotent writes' }],
    },
    nativedesign: {
      nodes: [
        { label: 'Native UI code', note: 'SwiftUI · Jetpack Compose · WinUI · Libadwaita' },
        { label: 'AST rule engine', note: 'Anti-slop patterns, hit targets, semantic tokens' },
        { label: 'Scorecard', note: 'Deterministic audit from the CLI or an AI agent skill' },
      ],
      edges: [{ label: 'parse' }, { label: 'score' }],
    },
    pantauanggaran: {
      nodes: [
        { label: 'Procurement records', note: '3M+ rows, typo-ridden package names' },
        { label: 'PostgreSQL + PostGIS', note: 'Materialized views, GIN + trigram indexes, region_clusters' },
        { label: 'API', note: 'Serves map GeoJSON and clusters, optional Redis cache' },
        { label: 'Web app', note: 'Browse by region, agency, and risk cluster' },
      ],
      edges: [{ label: 'pipeline' }, { label: 'views' }, { label: 'GeoJSON' }],
    },
  },
  id: {
    whatsappdesk: {
      nodes: [
        { label: 'WebView OS', note: 'WebKit · WebView2 · WebKitGTK, tanpa browser bawaan' },
        { label: 'Core Rust (Tauri v2)', note: 'Pencegatan stream blob, mutex single-instance' },
        { label: 'OS desktop', note: 'Badge Dock, system tray, menu native, folder unduhan' },
      ],
      edges: [{ label: 'blob unduhan' }, { label: 'panggilan native' }],
    },
    kasbadminton: {
      nodes: [
        { label: 'Klien PWA', note: 'SPA SvelteKit static, cache service worker, QRIS di sisi klien' },
        { label: 'Binary Go', note: 'SPA dikompilasi lewat go:embed, tanpa runtime Node.js' },
        { label: 'PostgreSQL', note: 'State machine player_balances, migrasi goose' },
      ],
      edges: [{ label: 'update SSE', dir: 'back' }, { label: 'tulis idempoten' }],
    },
    nativedesign: {
      nodes: [
        { label: 'Kode UI native', note: 'SwiftUI · Jetpack Compose · WinUI · Libadwaita' },
        { label: 'Engine aturan AST', note: 'Pola anti-slop, hit-target, token semantik' },
        { label: 'Scorecard', note: 'Audit deterministik lewat CLI atau skill AI agent' },
      ],
      edges: [{ label: 'parse' }, { label: 'skor' }],
    },
    pantauanggaran: {
      nodes: [
        { label: 'Record pengadaan', note: '3jt+ baris, nama paket penuh tipo' },
        { label: 'PostgreSQL + PostGIS', note: 'Materialized view, indeks GIN + trigram, region_clusters' },
        { label: 'API', note: 'Menyajikan GeoJSON peta dan klaster, cache Redis opsional' },
        { label: 'Aplikasi web', note: 'Jelajah per wilayah, instansi, dan klaster risiko' },
      ],
      edges: [{ label: 'pipeline' }, { label: 'view' }, { label: 'GeoJSON' }],
    },
  },
};
