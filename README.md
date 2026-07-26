# ryanprayoga.dev

Portfolio personal Ryan Prayoga — Fullstack Developer & Sub Team Lead.
Fully static, zero runtime dependency, dwibahasa (EN/ID).

**Live:** https://ryanprayoga.dev

## Stack

- SvelteKit 2 + Svelte 5 (runes) + TypeScript
- Tailwind CSS 4 (`@theme` tokens: paper/ink/rust, light-first + dark
  via `prefers-color-scheme`)
- `adapter-static` — full prerender, tanpa server
- Geist Sans + Geist Mono (variable, self-hosted, 51KB)
- `dependencies: {}` — tidak ada runtime dep sama sekali

## Struktur konten

Semua konten hidup di `src/lib/data/` dan dijaga kontrak:

| File                   | Isi                                                  |
| ---------------------- | ---------------------------------------------------- |
| `profile.ts`           | Identitas — WAJIB konsisten dengan CV ATS            |
| `experience.ts`        | Riwayat kerja + bullet dampak (EN/ID)                |
| `skills.ts`            | Matrix skill mengikuti struktur CV                   |
| `projects.ts`          | Katalog 7 project terkurasi, 3 `featured`            |
| `projectCopy.ts`       | Ringkasan per project (EN/ID)                        |
| `caseStudies.ts`       | Case study penuh untuk project featured (EN/ID)      |
| `portfolioContract.ts` | Invariant: 3 featured, case study lengkap, aset utuh |

Drift (slug hilang, thumbnail hilang, case study bolong) gagal di
`npm run test:unit`, bukan di production.

## Development

```bash
nvm use          # 24.4.1 (engine-strict)
npm ci
npm run dev
```

## Quality gate

```bash
npm run quality
```

= format:check → lint → svelte-check → unit+coverage → build →
artifact verify (termasuk scan sisa modul purged) → Playwright e2e.
Gate yang sama jalan di CI sebelum deploy.

## Deploy

Static artifact dirilis atomic ke `/var/www/ryanprayoga.dev/current`
lewat GitHub Actions (job quality → job deploy self-hosted), disajikan
Caddy. Runbook cutover + rollback: [docs/DEPLOY.md](docs/DEPLOY.md).
