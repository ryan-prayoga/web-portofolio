export interface TechStep {
  tech: string;
  period: string;
  description: string;
  category: "backend" | "frontend" | "mobile" | "workflow";
  color: "cyan" | "blue" | "violet" | "success";
}

export const techJourney: TechStep[] = [
  {
    tech: "PHP / Laravel / Lumen",
    period: "Foundation",
    description:
      "Fondasi utama backend development. Membangun REST API, sistem autentikasi, dan arsitektur aplikasi enterprise.",
    category: "backend",
    color: "cyan",
  },
  {
    tech: "Nuxt 2",
    period: "Frontend Entry",
    description:
      "Masuk ke dunia frontend modern dengan Vue ecosystem. Membangun UI interaktif dan SSR application.",
    category: "frontend",
    color: "blue",
  },
  {
    tech: "Nuxt 3",
    period: "Frontend Evolution",
    description:
      "Migrasi dan pengembangan dengan Composition API, TypeScript, dan arsitektur yang lebih modern.",
    category: "frontend",
    color: "blue",
  },
  {
    tech: "Golang / Go Fiber",
    period: "Performance Stack",
    description:
      "Eksplorasi ke backend high-performance. Memahami concurrency, microservices, dan efisiensi sistem.",
    category: "backend",
    color: "cyan",
  },
  {
    tech: "Svelte / SvelteKit",
    period: "Modern Frontend",
    description:
      "Mengadopsi pendekatan kompilasi terbaru untuk UI yang lebih ringan, reaktif, dan performant.",
    category: "frontend",
    color: "violet",
  },
  {
    tech: "React Native / Flutter",
    period: "Mobile Development",
    description:
      "Memperluas kapabilitas ke mobile development. Membangun aplikasi cross-platform untuk kebutuhan client.",
    category: "mobile",
    color: "success",
  },
  {
    tech: "AI-Assisted Workflow",
    period: "Current Evolution",
    description:
      "Mengintegrasikan AI ke dalam workflow harian — brainstorming, research, code review, dan problem solving.",
    category: "workflow",
    color: "violet",
  },
];
