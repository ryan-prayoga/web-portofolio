/**
 * Sumber kebenaran identitas — WAJIB konsisten dengan CV ATS
 * (Ryan_Prayoga_CV_ATS_EN.pdf / _ID.pdf). Recruiter membaca keduanya;
 * selisih judul/angka antara situs dan CV adalah bendera merah.
 */
export const profile = {
  name: 'Ryan Prayoga',
  role: 'Fullstack Developer',
  location: 'Tangerang, Indonesia',
  company: 'PT Traspac Makmur Sejahtera',
  experienceYears: '4+',
  productionApps: '10+',
  education: {
    university: {
      school: 'Universitas Pasundan (UNPAS), Bandung',
      program: 'S1 Teknik Informatika',
      note: {
        en: 'Undergraduate',
        id: 'Mahasiswa Aktif',
      },
    },
    smk: {
      school: 'SMK Negeri 5 Kab. Tangerang',
      program: 'Rekayasa Perangkat Lunak',
      note: '2020',
    },
  },
  languages: [
    { name: 'Bahasa Indonesia', level: 'Native' },
    { name: 'English', level: 'Conversational' },
  ],
} as const;
