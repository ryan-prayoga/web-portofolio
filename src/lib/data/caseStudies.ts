import type { FeaturedSlug } from './projects';
import type { Locale } from './uiCopy';

export interface CaseStudy {
  readonly problem: string;
  readonly role: string;
  readonly decisions: readonly { readonly title: string; readonly body: string }[];
  readonly results: readonly string[];
}

/**
 * Case study penuh untuk project featured. Semua klaim bersumber dari
 * kode/CI/README project terkait — jangan tambah klaim tanpa bukti.
 */
export const caseStudies: Record<Locale, Record<FeaturedSlug, CaseStudy>> = {
  en: {
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
    putraselamatmakmur: {
      problem:
        'A forklift service company serving 13 manufacturers across Jabodetabek–Serang–Cilegon–Karawang had no web presence — leads came purely from word of mouth.',
      role: 'Freelance engineer end to end: scoping with the owner, design, build, SEO, deployment, and an internal admin now in progress.',
      decisions: [
        {
          title: 'Static-first, because a company profile has no excuse to be slow',
          body: 'SvelteKit with adapter-static and full prerender; the landing is a single optimized route served by Caddy on a VPS.',
        },
        {
          title: 'An image pipeline instead of a photo dump',
          body: 'Curated 127 client field photos down to 12, processed through sharp into 480/1200 WebP variants with SEO slugs — the heaviest asset class on a service site, handled deliberately.',
        },
        {
          title: 'SEO as engineering, not garnish',
          body: 'JSON-LD LocalBusiness, per-page canonical, OG 1200×630, sitemap and robots. Privacy-conscious choices: area-only address, and a publish gate on testimonials — fabricated testimonials were rejected outright.',
        },
        {
          title: 'Zero-trust deploy',
          body: 'CI rsyncs the build through a Cloudflare Access service token over cloudflared — no open SSH port on the client VPS.',
        },
        {
          title: 'Phase 2: an admin that models the real workflow',
          body: 'Go (chi) + GORM backend modeling the actual job lifecycle: pengecekan → SPH → PO → pengerjaan → invoice → paid/batal as a state machine with status logs, plus quotations with 11% VAT and per-item discounts.',
        },
      ],
      results: [
        "Live on the client's own domain: putraselamatmakmur.com",
        'Lighthouse mobile 90 performance / 100 accessibility / 100 best practices / 92 SEO',
        'A real, paying client shipped end to end — scoping through production',
      ],
    },
    brunogen: {
      problem:
        'API collections and docs drift from code the moment they are written by hand — every team pays this tax on Laravel, Express, and Go services alike.',
      role: 'Author and maintainer of an open-source npm CLI.',
      decisions: [
        {
          title: 'Parse the code, not the comments',
          body: 'Express routes are resolved through real AST parsing (@typescript-eslint/parser): mounted routers, request-access patterns, and local response helpers — not regex guesses.',
        },
        {
          title: 'Deep Laravel inference',
          body: 'FormRequest rules, inline validation, safe()->only(), enum(), JsonResource shapes and ->additional(), abort/error paths — split across 11 adapter modules.',
        },
        {
          title: 'Output for humans and for agents',
          body: "One scan emits OpenAPI, a Bruno collection, AI context artifacts (api-context.md, tools.json), and a runnable MCP server — the same inference feeds both a developer's API client and an LLM's tool belt.",
        },
        {
          title: 'Release discipline as a feature',
          body: 'CI matrix on Node 20 and 24 runs typecheck → lint → tests → build → CLI e2e → pack-size check → README link check → version-tag consistency. Publishing runs on GitHub Release with npm provenance.',
        },
      ],
      results: [
        'Published on npm as brunogen (v0.6.x), installable today',
        '13 test files (~3.4k LOC) with per-framework snapshot demos',
        'Generates working Bruno collections for Laravel, Express, and Go codebases in one command',
      ],
    },
  },
  id: {
    pantauanggaran: {
      problem:
        'Pengadaan pemerintah Indonesia mempublikasikan jutaan record, tapi publik tidak punya cara praktis menemukan anomali — datanya terlalu besar, kotor, dan tersebar lintas wilayah.',
      role: 'Dikerjakan solo: pipeline data, backend, ML clustering, frontend, sampai deployment.',
      decisions: [
        {
          title: 'PostGIS sebagai inti analitik',
          body: 'Geometri wilayah hidup di PostGIS dengan index GiST; GeoJSON peta disajikan dari materialized view (province_map_geoms, region_year_stats) yang di-refresh pipeline deploy — API tidak pernah merakit geometri per request.',
        },
        {
          title: 'Pencarian yang tahan data kotor',
          body: 'Nama paket diindeks tiga arah: GIN tsvector untuk full-text, gin_trgm_ops untuk fuzzy match terhadap entri penuh typo, dan GIN JSONB di atas payload mentah.',
        },
        {
          title: 'Clustering dengan ablation study',
          body: 'K-Means atas profil belanja instansi dengan fitur spatial-lag; K dipilih via inertia, Silhouette, dan Davies-Bouldin, plus ablation fitur spasial yang mendokumentasikan kontribusi geografi. Hasil masuk region_clusters dan disajikan lewat API.',
        },
        {
          title: 'Framing etis sebagai keputusan produk',
          body: 'Semua dilabeli "potensi anomali / perlu ditinjau" — platform menyodorkan sinyal untuk ditelaah, bukan menuduh.',
        },
      ],
      results: [
        '3jt+ record pengadaan bisa dijelajah per wilayah, instansi, dan klaster risiko',
        'Satu-satunya project di armada dengan CI ber-test-gate nyata (Go test + svelte-check + validasi compose) terpisah dari deploy',
        'Cache Redis opsional — degrade dengan aman saat tidak ada',
        'Live di pantauanggaran.ryanprayoga.dev',
      ],
    },
    putraselamatmakmur: {
      problem:
        'Perusahaan jasa servis forklift yang melayani 13 pabrikan di Jabodetabek–Serang–Cilegon–Karawang belum punya kehadiran web — lead murni dari mulut ke mulut.',
      role: 'Freelance engineer end-to-end: scoping bareng owner, desain, build, SEO, deployment, plus admin internal yang sedang berjalan.',
      decisions: [
        {
          title: 'Static-first, karena company profile tidak punya alasan untuk lambat',
          body: 'SvelteKit adapter-static full prerender; landing satu route teroptimasi, disajikan Caddy di VPS.',
        },
        {
          title: 'Pipeline gambar, bukan tumpukan foto',
          body: 'Kurasi 127 foto lapangan klien jadi 12, diproses sharp ke varian WebP 480/1200 dengan slug SEO — kelas aset terberat di situs jasa, ditangani dengan sengaja.',
        },
        {
          title: 'SEO sebagai engineering, bukan hiasan',
          body: 'JSON-LD LocalBusiness, canonical per halaman, OG 1200×630, sitemap dan robots. Pilihan sadar-privasi: alamat level area saja, dan publish-gate testimoni — testimoni karangan ditolak mentah.',
        },
        {
          title: 'Deploy zero-trust',
          body: 'CI rsync hasil build lewat Cloudflare Access service token di atas cloudflared — tanpa port SSH terbuka di VPS klien.',
        },
        {
          title: 'Fase 2: admin yang memodelkan alur kerja nyata',
          body: 'Backend Go (chi) + GORM memodelkan siklus job sebenarnya: pengecekan → SPH → PO → pengerjaan → invoice → paid/batal sebagai state machine dengan status log, plus quotation ber-PPN 11% dan diskon per item.',
        },
      ],
      results: [
        'Live di domain milik klien: putraselamatmakmur.com',
        'Lighthouse mobile 90 performa / 100 aksesibilitas / 100 best practice / 92 SEO',
        'Klien nyata yang membayar, dikerjakan end-to-end — dari scoping sampai production',
      ],
    },
    brunogen: {
      problem:
        'Koleksi API dan dokumentasi mulai menyimpang dari kode begitu ditulis manual — setiap tim membayar pajak ini di service Laravel, Express, maupun Go.',
      role: 'Author dan maintainer CLI open-source di npm.',
      decisions: [
        {
          title: 'Parse kodenya, bukan komentarnya',
          body: 'Route Express diresolusi lewat AST parsing beneran (@typescript-eslint/parser): mounted router, pola akses request, dan response helper lokal — bukan tebakan regex.',
        },
        {
          title: 'Inferensi Laravel yang dalam',
          body: 'FormRequest rules, validasi inline, safe()->only(), enum(), bentuk JsonResource dan ->additional(), jalur abort/error — dipecah ke 11 modul adapter.',
        },
        {
          title: 'Output untuk manusia dan untuk agent',
          body: 'Satu scan menghasilkan OpenAPI, koleksi Bruno, artefak konteks AI (api-context.md, tools.json), dan MCP server siap jalan — inferensi yang sama memberi makan API client developer sekaligus tool belt LLM.',
        },
        {
          title: 'Disiplin rilis sebagai fitur',
          body: 'CI matrix Node 20 dan 24 menjalankan typecheck → lint → test → build → e2e CLI → cek ukuran pack → cek link README → konsistensi version-tag. Publish jalan di GitHub Release dengan npm provenance.',
        },
      ],
      results: [
        'Terpublish di npm sebagai brunogen (v0.6.x), bisa dipasang hari ini',
        '13 file test (~3.4k LOC) dengan snapshot demo per framework',
        'Menghasilkan koleksi Bruno yang berfungsi untuk codebase Laravel, Express, dan Go dalam satu perintah',
      ],
    },
  },
};
