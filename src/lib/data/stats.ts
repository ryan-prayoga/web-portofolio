export interface Stat {
  value: string;
  label: string;
  caption: string;
  icon: string;
}

export const stats: Stat[] = [
  {
    value: "4+",
    label: "Tahun",
    caption:
      "Pengalaman profesional membangun aplikasi web dan mobile berskala enterprise",
    icon: "briefcase",
  },
  {
    value: "1+",
    label: "Tahun Leadership",
    caption:
      "Memimpin ritme kerja, task management, dan delivery tim secara konsisten",
    icon: "users",
  },
  {
    value: "4",
    label: "Anggota Tim",
    caption: "Tim yang dikelola secara aktif dalam pengembangan project client",
    icon: "team",
  },
  {
    value: "Multi",
    label: "Stack Engineer",
    caption:
      "Backend, frontend, mobile, dan deployment — terbiasa lintas teknologi",
    icon: "layers",
  },
  {
    value: "Staging",
    label: "→ Production",
    caption:
      "Terbiasa menangani deployment workflow dari development hingga production",
    icon: "rocket",
  },
  {
    value: "AI",
    label: "Aware Engineer",
    caption: "Memanfaatkan AI sebagai tools produktivitas dan problem solving",
    icon: "cpu",
  },
];
