/**
 * Sumber kebenaran identitas — WAJIB konsisten dengan CV ATS
 * (Ryan_Prayoga_CV_ATS_EN.pdf / _ID.pdf). Recruiter membaca keduanya;
 * selisih judul/angka antara situs dan CV adalah bendera merah.
 */
export const profile = {
  name: 'Ryan Prayoga',
  role: 'Fullstack Developer · Sub Team Lead',
  location: 'Tangerang, Indonesia',
  company: 'PT Traspac Makmur Sejahtera',
  experienceYears: '4+',
  /** 2 FE + 2 BE — tim 5 orang termasuk lead, sesuai CV */
  teamSize: 4,
  education: {
    university: {
      school: 'Universitas Pasundan (UNPAS), Bandung',
      program: 'S1 Teknik Informatika',
      note: 'Expected Nov 2026',
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
