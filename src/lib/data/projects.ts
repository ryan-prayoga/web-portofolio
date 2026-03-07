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
  image: string | null;
  placeholderType:
    | "dashboard"
    | "data-management"
    | "map-interface"
    | "content-platform";
}

export const projects: Project[] = [
  {
    name: "Traffic Attitude Record",
    slug: "traffic-attitude-record",
    summary:
      "Sistem pencatatan dan pelaporan perilaku lalu lintas untuk Korlantas Polri. Platform enterprise yang menangani data operasional skala nasional dengan workflow pelaporan terstruktur.",
    role: "Full-Stack Developer",
    stack: ["Laravel", "Nuxt 3", "PostgreSQL", "Ubuntu Server"],
    focus:
      "Membangun sistem pelaporan yang reliable dengan workflow approval multi-level dan dashboard analitik untuk monitoring nasional.",
    impact: "Digunakan dalam operasi pelaporan lalu lintas tingkat nasional",
    category: "Government · Enterprise",
    tags: ["Enterprise", "Government", "Secure Workflow", "Data Management"],
    year: "2023",
    image: null,
    placeholderType: "dashboard",
  },
  {
    name: "Learning Management System",
    slug: "lms",
    summary:
      "Platform manajemen pembelajaran digital yang mendukung pengelolaan materi, tracking progress peserta, dan sistem evaluasi terintegrasi.",
    role: "Full-Stack Developer",
    stack: ["Laravel", "Nuxt 2", "MySQL", "PM2"],
    focus:
      "Membangun arsitektur platform e-learning yang scalable dengan fitur tracking progress dan sistem evaluasi otomatis.",
    impact: "Mendukung proses pembelajaran digital secara terstruktur",
    category: "Web Platform · Education",
    tags: ["Learning System", "Web Platform", "Content Management"],
    year: "2022",
    image: null,
    placeholderType: "content-platform",
  },
  {
    name: "Disaster Management",
    slug: "disaster-management",
    summary:
      "Sistem manajemen bencana untuk monitoring, pelaporan, dan koordinasi respons bencana. Menangani data real-time dari berbagai sumber dan visualisasi peta.",
    role: "Full-Stack Developer",
    stack: ["Laravel", "Nuxt 3", "PostgreSQL", "Leaflet"],
    focus:
      "Integrasi data monitoring real-time, visualisasi peta interaktif, dan sistem koordinasi multi-instansi.",
    impact: "Membantu koordinasi dan respons penanganan bencana",
    category: "Government · Operations",
    tags: ["Operations", "Government", "Data Management", "Real-time"],
    year: "2023",
    image: null,
    placeholderType: "map-interface",
  },
  {
    name: "Website Komcad",
    slug: "website-komcad",
    summary:
      "Website resmi Komponen Cadangan pertahanan negara. Portal informasi dan manajemen data dengan standar keamanan tinggi dan arsitektur yang solid.",
    role: "Full-Stack Developer",
    stack: ["Laravel", "Nuxt 3", "PostgreSQL", "Nginx"],
    focus:
      "Pengembangan portal dengan standar keamanan tinggi, manajemen konten dinamis, dan performa optimal untuk akses publik.",
    impact: "Portal informasi resmi dengan standar keamanan pemerintah",
    category: "Government · Web Platform",
    tags: ["Government", "Web Platform", "Secure Workflow", "Internal System"],
    year: "2024",
    image: null,
    placeholderType: "data-management",
  },
];
