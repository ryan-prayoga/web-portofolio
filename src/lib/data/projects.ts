export type ProjectVisual = "tooling" | "map" | "sync" | "operations" | "bot" | "deploy";

export interface Project {
  name: string;
  slug: string;
  summary: string;
  role: string;
  stack: string[];
  focus: string;
  impact: string;
  category: string;
  tags: string[];
  year: string;
  visual: ProjectVisual;
  placeholderType:
    | "dashboard"
    | "data-management"
    | "map-interface"
    | "content-platform";
  url?: string;
}

export interface EnterpriseSystem {
  name: string;
  domain: string;
  summary: string;
  stack: string[];
  proof: string;
}

export const projects: Project[] = [
  {
    name: "Brunogen",
    slug: "brunogen",
    summary:
      "Developer tool yang membaca Laravel, Express, dan Go API lalu menghasilkan OpenAPI dan Bruno collection siap pakai.",
    role: "Creator",
    stack: ["TypeScript", "OpenAPI", "AST Parsing", "Vitest", "CLI"],
    focus:
      "Route scanning, request/response inference, regression fixtures, publish workflow, dan package hygiene untuk npm.",
    impact: "Public developer tooling dengan release history dan test pipeline yang jelas.",
    category: "Developer Tooling",
    tags: ["CLI", "OpenAPI", "Bruno", "Laravel", "Express", "Go"],
    year: "2026",
    visual: "tooling",
    placeholderType: "data-management",
    url: "https://github.com/ryan-prayoga/brunogen",
  },
  {
    name: "JEDUG",
    slug: "jedug",
    summary:
      "Platform pelaporan jalan rusak berbasis peta, upload bukti, anonymous device, moderasi admin, dan statistik publik.",
    role: "Full-Stack Product Engineer",
    stack: ["Go Fiber", "SvelteKit", "PostgreSQL", "PostGIS", "MapLibre", "R2"],
    focus:
      "Membangun flow submit laporan, smart merge issue terdekat, storage hardening, map clustering, heatmap, dan admin moderation.",
    impact: "Case study civic-tech yang menunjukkan product thinking, geospatial data, dan production hardening.",
    category: "Civic Tech",
    tags: ["Map", "PostGIS", "Moderation", "Upload Security", "Public Stats"],
    year: "2026",
    visual: "map",
    placeholderType: "map-interface",
    url: "https://github.com/ryan-prayoga/jedug_v2",
  },
  {
    name: "Media Sync",
    slug: "media-sync",
    summary:
      "Sistem sync media Android ke dashboard web dengan consent, thumbnail-first gallery, original request, dan bulk download.",
    role: "Full-Stack + Android Engineer",
    stack: ["Android", "Go", "SvelteKit", "PostgreSQL", "PM2", "Nginx"],
    focus:
      "Device bootstrap, metadata sync, thumbnail pipeline, request original file, auto-upload dari Android, dan deploy VPS.",
    impact: "Membuktikan kemampuan membangun workflow lintas device, backend, web, dan operasi production.",
    category: "Cross-Device System",
    tags: ["Android", "Sync", "Gallery", "Consent", "VPS Deploy"],
    year: "2026",
    visual: "sync",
    placeholderType: "content-platform",
    url: "https://github.com/ryan-prayoga/media-sync",
  },
  {
    name: "MessHub",
    slug: "messhub",
    summary:
      "Aplikasi operasional mess untuk kas, WiFi, feed, anggota, proposal, wallet, dan notifikasi internal.",
    role: "Full-Stack Engineer",
    stack: ["Go Fiber", "SvelteKit", "PostgreSQL", "PWA", "CI/CD"],
    focus:
      "Merapikan kebutuhan operasional harian menjadi dashboard mobile-first dengan auth, role, dan deploy split frontend/backend.",
    impact: "Contoh produk internal yang kecil tapi production-minded: jelas domainnya, jelas workflow-nya.",
    category: "Internal Operations",
    tags: ["PWA", "Operations", "Auth", "PostgreSQL", "CI/CD"],
    year: "2026",
    visual: "operations",
    placeholderType: "dashboard",
    url: "https://github.com/ryan-prayoga/messhub",
  },
  {
    name: "Marbot",
    slug: "marbot",
    summary:
      "Telegram bot dan webview untuk akses layanan SIMPEG seperti absensi, gaji, cuti, laporan, dan direktori pegawai.",
    role: "Automation Engineer",
    stack: ["Go", "Telegram Bot API", "SvelteKit", "Web Scraping", "Session Handling"],
    focus:
      "Integrasi layanan pegawai ke interface chat dan webview dengan state management, session, dan formatter output.",
    impact: "Menunjukkan kemampuan membuat automation layer di atas sistem existing yang tidak selalu punya API ideal.",
    category: "Automation",
    tags: ["Telegram Bot", "SIMPEG", "Go", "Webview", "Automation"],
    year: "2026",
    visual: "bot",
    placeholderType: "content-platform",
  },
  {
    name: "GAS CLI",
    slug: "gas-cli",
    summary:
      "CLI Bash untuk build dan deploy Go/Node web apps via PM2, Nginx, metadata SQLite, dan mode non-interactive CI.",
    role: "Tooling Engineer",
    stack: ["Bash", "PM2", "Nginx", "SQLite", "CI/CD"],
    focus:
      "Stack detection, build strategy, deploy wizard, preview config, metadata app, dan fallback terminal UX.",
    impact: "Mengubah pola deploy VPS yang repetitif menjadi workflow yang lebih cepat dan konsisten.",
    category: "DevOps Tooling",
    tags: ["CLI", "Deployment", "PM2", "Nginx", "VPS"],
    year: "2026",
    visual: "deploy",
    placeholderType: "data-management",
    url: "https://github.com/ryan-prayoga/gas-cli",
  },
];

export const enterpriseSystems: EnterpriseSystem[] = [
  {
    name: "Traffic Attitude Record",
    domain: "Government reporting",
    summary:
      "Sistem pencatatan dan pelaporan perilaku lalu lintas dengan workflow admin, publik, dan mobile.",
    stack: ["Laravel", "Nuxt", "PostgreSQL", "Mobile"],
    proof: "Multi-surface system: web admin, web publik, API, dan beberapa aplikasi mobile.",
  },
  {
    name: "Komcad",
    domain: "Government platform",
    summary:
      "Portal dan back office untuk Komponen Cadangan dengan modul publik, internal, API, dan mobile.",
    stack: ["Laravel", "Nuxt", "React Native", "Nginx"],
    proof: "Mengerjakan ekosistem front office, back office, API, dan mobile app.",
  },
  {
    name: "Disaster Management",
    domain: "Operations & simulation",
    summary:
      "Sistem manajemen bencana dengan simulasi, LMS, data operasional, peta, dan laporan.",
    stack: ["Laravel/Lumen", "Nuxt", "Leaflet", "PostgreSQL"],
    proof: "Punya domain kompleks: geospatial view, data real-time, simulasi, dan pelaporan.",
  },
  {
    name: "Persuratan TNI AD",
    domain: "Correspondence system",
    summary:
      "Sistem persuratan dengan dashboard, OCR service, scanner bridge, queue worker, dan PDF generation.",
    stack: ["Go Fiber", "SvelteKit", "FastAPI", "Redis", "RabbitMQ"],
    proof: "Integrasi lintas service: web, API, OCR, scanner desktop bridge, dan dokumen PDF.",
  },
  {
    name: "KMS Traspac Svelte",
    domain: "Legacy modernization",
    summary:
      "Migrasi Knowledge Management System dari stack lama ke Go Fiber + SvelteKit tanpa mengganti schema utama.",
    stack: ["Go Fiber", "SvelteKit", "PostgreSQL", "DaisyUI"],
    proof: "Progressive rebuild dengan parity route/endpoint dan compatibility layer terhadap sistem lama.",
  },
];
