# Ryan Prayoga — Existing Design System

Extraction baseline: 15 September 2026. This document codifies the current **Engineering Sketchbook** interface, not a redesign. Task 2 changes documentation/evidence only. Future approved six-category behavior is explicitly labelled **PLANNED**, never represented as captured functionality.

Authority: `src/app.css`, the Svelte components/routes, `src/lib/actions/drawably.ts`, installed `drawably/style.css`, and fresh production computed styles. Evidence root: `.omo/evidence/audit-menyeluruh-20260915/task-2/`; `capture-manifest.json` binds source/build SHA256, commands, browser version, screenshots and timestamps. `supplemental-report.json` records additional primitive and failure states. Full copy/facts are in `../editorial-ledger.md` relative to that evidence root.

Extraction references: frontend design router and `design-system-architecture`, designpowers README/lane-c, and perfection evidence discipline. No external style skill, image generation, competitor clone, React tooling, or dependency migration applies. Lighthouse measurement/optimization belongs to task 17; this document asserts no performance score or WCAG certification.

## 1. Atmosphere & Identity

A personal engineering sketchbook: warm near-white paper, charcoal ink, restrained burnt-rust emphasis, hand-drawn SVG outlines and handwritten type. The recognizable moment is the portrait’s pencil/eraser reveal, not a stock illustration. Content is live semantic DOM; drawings decorate controls and frames rather than replacing text with raster screenshots. Preserve the existing personal identity, eight project entries, four featured studies, original portrait/project media and social destinations. Do not turn the site into a generic SaaS/agency template or replace the material with a different brand aesthetic.

### Audience and decision path

- Recruiter/technical reviewer: identity → dated experience → project evidence → skills/education → CV/contact. Wants verifiable contribution rather than unqualified impact claims.
- Business owner: understand service → compare approach → understand scope/price → support terms → process → real examples → FAQ → consultation. Material terms must remain visible, not tooltip-only.
- Keyboard, low-vision, reduced-motion and bilingual/mobile visitor: same tasks with readable wrapping, distinct focus, reachable controls and no required hover knowledge.

Existing homepage order: Identity, Experience, Work, Skills, Education, Contact. Freelance order: Hero, Comparison, Services, Pricing, Revisions, Process, Showcase, FAQ, Contact. Keep this order unless a later approved task explicitly changes it. Persona contract for future copy: **saya/I**, not kami/we. Preserve factual history; do not infer present employment or completed graduation.

## 2. Color

### Actual semantic tokens

| Role        | CSS token             | Light     | Dark      | Existing use                                |
| ----------- | --------------------- | --------- | --------- | ------------------------------------------- |
| Paper       | `--color-paper`       | `#fbfaf8` | `#121316` | Body, card surface, solid-button foreground |
| Ink         | `--color-ink`         | `#14161a` | `#f2f0ec` | Primary text, default sketch stroke         |
| Muted       | `--color-muted`       | `#6e6a63` | `#9a958c` | Secondary prose, labels, dates              |
| Rule        | `--color-rule`        | `#e4e0d9` | `#2a2d31` | Separators and quiet boundaries             |
| Rust accent | `--color-accent`      | `#a33b14` | `#e8703a` | CTA fill, focus, links, headings/metrics    |
| Accent wash | `--color-accent-soft` | `#f4e9e3` | `#26201c` | Highlighted comparison/contact surfaces     |

Light-first `:root` with `color-scheme: light`; `.dark` replaces tokens and sets dark color scheme. Existing dark bootstrap reads stored preference/OS; runtime reliability defects are recorded in §8. Actual browser theme captures match these six values at all three widths. Dark button text is dark paper on orange accent, not always white.

Calculated opaque contrast (WCAG luminance, not screenshot sampling): ink/paper17.36 light and16.32 dark; muted/paper5.16 and6.24; accent/paper6.30 and6.02; rule/paper1.26 and1.34. Rule is decorative separation, insufficient alone as a required control boundary. Alpha-muted text and images are not covered by these ratios. Raw calculations are in `verification.json`.

`--drawably-ink`, `--drawably-paper`, `--drawably-stroke` alias ink/paper/ink; `--drawably-width: 1.5`. `.drawably-accent` changes ink/stroke to accent. Solid buttons set ink/stroke/fill to accent and foreground paper, all with important overrides. Button CSS background is intentionally transparent so the SVG blob supplies fill without a second rectangular border.

Other existing colors are **exceptions, not new general-purpose palette tokens**: rose-500 in the generic-builder comparison crosses; emerald-500 for the contact clock dot; alpha-muted labels (60/70/75%), paper at 40/60/85/90/98%, accent-soft at 10/25/30%, rule at 30/40/50/60%, ink at 15/90%. Low-opacity text requires separate contrast review: full-token contrast does not certify these variants. Accent also decorates current metrics/headers; describing it as “interactive only” would misstate this baseline.

Portrait canvas illustration uses local material colors: eraser wood `#b45309/#d97706/#78350f`, felt `#1f2937/#374151`, pencil cedar `#fed7aa`, graphite `#0f172a`, barrel `#f59e0b`, highlight `#fef08a`, ferrule `#64748b`; black/white/slate alpha for dust/shadow/masks. These are illustration materials, not interface state colors.

Print overrides: white paper, `#111111` ink, `#555555` muted, `#dddddd` rule, `#8a3110` accent, white accent-soft; body 11pt, `.no-print` hidden, links inherit and lose decoration, sections avoid page breaks. Print output is source-documented, not print-QA certified.

## 3. Typography

### Real fonts, not the stale README description

| Token                           | Stack                                                       | Role/status                                          |
| ------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------- |
| `--font-sans`                   | Patrick Hand, cursive, system-ui, -apple-system, sans-serif | **Actual body font**, despite the name “sans”        |
| `--font-display`, `--font-hand` | Patrick Hand, cursive, sans-serif                           | Headings, brand, buttons, badges, notes              |
| `--font-grotesk`                | Hanken Grotesk, system-ui, -apple-system, sans-serif        | Declared, no rendered use observed on baseline pages |
| `--font-mono`                   | JetBrains Mono, ui-monospace, monospace                     | Conditional visitor-time detail in Contact           |

All three font faces are self-hosted WOFF2 with `font-display: swap`; Patrick range 100–900, Hanken 400–700, JetBrains 100–800 as declared. Patrick is preloaded in `app.html`. The Asia/Jakarta baseline actually loads Patrick; Hanken and JetBrains remain unloaded there because no matching rendered text requires them. Hanken is **not** the current body font. JetBrains is conditional when visitor timezone differs. Do not silently “correct” body typography while editing copy.

Body base 16px, weight 400, line-height 1.6 (25.6px), `font-feature-settings: 'tnum' 1`, antialiasing. h1–h4 inherit display. Drawably host forces inherited font; buttons/badges force hand font with `.02em` letter spacing, overriding their library Inter/Geist defaults. Computed 14px badges use 20px line-height and .28px tracking.

### Existing scale (16px root)

| Utility/role         | Size / standard line-height | Usage                                                            |
| -------------------- | --------------------------- | ---------------------------------------------------------------- |
| Conditional timezone | 0.7rem = 11.2px             | Mono visitor time; existing readability debt                     |
| `text-xs`            | 12 / 16px                   | Captions, **also existing mobile features/FAQ/process prose**    |
| `text-sm`            | 14 / 20px                   | Nav, supporting text, badges, card copy                          |
| `text-base`          | 16 / 24px                   | CTA, regular study body                                          |
| `text-lg`            | 18 / 28px                   | Card title, freelance lead ≥640                                  |
| `text-xl`            | 20 / 28px                   | Brand, job title, card title                                     |
| `text-2xl`           | 24 / 32px                   | Mobile section titles, role ≥640                                 |
| `text-3xl`           | 30 / 36px                   | Mobile freelance hero/study title, desktop portfolio sections    |
| `text-4xl`           | 36 / 40px                   | Mobile identity; desktop freelance section/study title           |
| `text-5xl`           | 48 / 48px                   | Desktop identity, tablet freelance hero, freelance contact title |
| `text-6xl`           | 60 / 60px before override   | Freelance hero ≥1024                                             |

Freelance hero explicitly overrides line-height to 1.15 (34.5/55.2/69px). `leading-relaxed` = 1.625, `leading-snug` = 1.375, `leading-tight` = 1.25. Heading tracking-tight = -.025em; label tracking-wide = .025em, wider = .05em, widest = .1em except Drawably `.02em` override. Weights used 400/500/600/700/800. Actual face capability may synthesize weights; no new weight asset is authorized.

Bilingual text uses natural browser wrapping and `text-balance` on selected headings. `max-w-prose` limits long paragraphs; chips/CTAs flex-wrap; contact email uses break-all; avatar hint truncates. Never treat the single shared education/language fields as localized text. Do not shrink material terms or hide copy to avoid wrapping. EN and ID need final read-through independently.

## 4. Spacing & Layout

No project `--space-*` variables currently exist. Existing spacing uses Tailwind’s 4px unit with half-steps. Record intent without pretending new CSS tokens were implemented:

| Existing utility step  | Pixels                    | Typical use                                           |
| ---------------------- | ------------------------- | ----------------------------------------------------- |
| .5 / 1 / 1.5           | 2 / 4 / 6                 | Fine alignment, icon gap, thin label padding          |
| 2 / 2.5 / 3 / 3.5      | 8 / 10 / 12 / 14          | Cluster gaps, chips, compact controls                 |
| 4 / 5 / 6 / 7 / 8      | 16 / 20 / 24 / 28 / 32    | Card padding, grid gap, control groups                |
| 10 / 12 / 14 / 16      | 40 / 48 / 56 / 64         | Major content spacing/section padding                 |
| 20 / 24 / 28 / 36 / 40 | 80 / 96 / 112 / 144 / 160 | Bottom spacing, freelance sections, hero/error offset |

Main containers: `max-w-5xl` 1024px including 24px horizontal padding. At 1280px, outer x=128 and content starts x=152; at 768/375, content starts x=24 with inner widths 720/327. Study `max-w-3xl` = 768px; lead `max-w-2xl` = 672px, `max-w-xl` = 576px, `max-w-sm` = 384px; prose max 65ch. No sidebar/app shell. Document owns normal page scrolling.

- Portfolio section padding y=56px; Identity top 112px mobile, 144px ≥640, bottom56; Contact bottom80. Study top112/bottom80. Explicit 404 top160/bottom96.
- Freelance regular sections y=64px mobile/96px ≥640 with 1px rule top. Hero top112/144, bottom64/96. Pricing grid gap32; service/process/showcase gap24; FAQ gap16; body-to-grid generally48px.
- Identity grid gap40, 1fr/auto ≥640; portrait first on mobile, right on larger screens. Portrait outer 144px/176px at640, padding8, inner aspect4/5. Facts 2→4 columns at640 with16px gap.
- Work featured cards become `minmax(0,1fr) minmax(0,1.2fr)` at768, inner padding20→28 at640; non-featured cards 1→2 at640. Project image aspect1100/688, `object-cover`, meaningful study preview separate from decorative linked thumbnail (`alt=""`, aria-hidden, tabindex-1).
- Experience date column minmax(0,13rem) + 1fr at640; Education 2 columns at640 plus full-width language card. Skills primary spans2 at640.
- **Existing** pricing 1 column until1024, then3. Existing revision packs3 at640. Comparison2 at768; services2 at640/3 at1024; process2 at640/4 at1024; showcase2 at640.

### Breakpoint contract

Tailwind sm640, md768, lg1024, xl1280. Portfolio mobile nav closes/hides at640; status shown900. Freelance menu persists until1120, consultation button appears720, portfolio shortcut1280. Do not copy the portfolio640 breakpoint onto freelance. Header fixed top, z60; dialog z55, viewport inset0, padding top96/horizontal24/bottom32; page-background gets inert and body scrolling locks while open. Existing freelance dialog has **no scroll owner/max-height treatment**, causing short-screen clipping (§8). HTML scroll padding top72px.

## 5. Components and States

These are existing Svelte primitives/actions, not new generic components. Native anchors keep links/downloads; buttons keep toggles. `Icon.svelte` renders the existing 24×24 stroke paths with currentColor, default16px/1.75 stroke, round caps/joins; usage12–20px, selected check2.25. Labelled icons role img, otherwise presentation/aria-hidden, focusable false. Theme has inline20px sun/moon SVG. Geometry/social destinations are preserved.

### DrawButton / text link

- Structure: native `<a>` or `<button>` + live text + optional Icon, `use:drawButton`; generated SVG behind text. Variants actually used outline and solid. Header compact controls min36px; theme36px mobile/34px ≥640. Primary CTA regular16px, padding x16–32/y6–12; package CTA full width height48px.
- Default outline ink stroke/paper surface; solid accent blob/paper text. Hover library lift translateY(-1px), outline 10% stroke wash, optional resketch; utility hover accent or opacity85/90. Active library sink translateY(1px) scale(.98), often utility active scale(.95). Tailwind translate/scale individual properties coexist with `transform`; inspect both, not transform alone.
- Focus: global 2px accent outline, offset2 plus Drawably sketch focus path. CSS is layered so the unlayered focus rule remains visible. Actual focus captures exist for language/theme/solid/outline/FAQ/avatar. Text links hover accent/underline; focus uses same global rule.
- Disabled/loading/error/success: **not present in rendered routes** (zero disabled controls observed). Library supports disabled opacity.45/cursor not-allowed; async states are not part of the current product baseline and were not fabricated for screenshots.

### DrawCard / DrawBadge / section heading

- Card native article/div/link, padding16 facts,24 ordinary,32 larger,40 email desktop,56 contact desktop; hand-drawn ink border. Featured project contains text/buttons plus image; not an image pretending to be UI.
- Existing hover lift2px or4px and resketch on many cards. Some are non-interactive div/article with cursor pointer: an inherited affordance/motion defect, not permission to proliferate it. Interactive project/email cards actually navigate.
- Badge native span/li, outline, typically12px x4px or14px x4px. Labels/chips remain live text. Default mostly passive; some current badges resketch on hover despite no action. Do not add tabindex to passive cards solely to simulate focus testing.
- Section structure badge → heading → optional intro → content grid. Decorative `//`, ordinal `01` etc. are source copy/ornament, not localized facts. Portfolio Skills currently uses dt/dd without a dl wrapper: semantic debt for task11.
- `drawDivider`, `drawCheckbox`, `drawCircle`, `drawUnderline` are exported actions but no live route consumers were observed; do not invent new controls to showcase them.

### Locale and theme controls

- Locale button visually emphasizes active EN/ID using bold accent, inactive muted; click switches both ways, no separate tablist and no aria-pressed. Baseline screenshots show selected label and document language. Current tooltip language differs between portfolio/freelance. Label localization is future task11/12.
- Theme default follows startup saved/OS state; click light/dark with sun/moon and English aria/title. Normal two-way state is captured; storage-denied and OS-change behavior is defective. “System” is an internal preference, not a third visible button.

### Mobile navigation

- Default closed, native toggle with aria-expanded/controls; open viewport dialog with aria-modal and accessible name, background inert. First link focused on open; Escape closes; focus normally returns. Portfolio keyboard loop includes toggle; freelance loop only dialog links, excluding visible Close in header. This is inherited accessibility debt.
- Portfolio has four section links plus CV, Directory caption and location/availability footer; freelance seven section links, portfolio link, consultation CTA and footer. Some labels remain hardcoded or wrong-language. Baseline menus exercised at375 and freelance768; menu absent1280 is expected, not missing coverage.

### FAQ

- Eight native buttons inside sketch cards; first open initially, one-at-a-time or none. Click/Enter toggles aria-expanded; plus rotates45deg over200ms. Conditional answer div removed when closed; no open/close body animation. Current buttons lack aria-controls/answer IDs. All eight complete answers are captured in EN/ID at each width, not just first default answer.

### Portrait reveal

- Real photo + SSR static sketch + canvas mask; role button/tabindex0 with hover/click/Enter/Space handlers and companion hint button. Fine pointer enter erases, leave redraws; coarse uses tap toggle. Visible full portrait remains real media, no new generated asset.
- Rest/mid/revealed/focus/keyboard-revealed captures recorded at375/768/1280. The chosen baseline device was fine-pointer Chromium; coarse physical-touch behavior is source-extracted, not tested on a phone. Title “Hover out to re-sketch” remains English; current hint may say tap for keyboard state. Reduced motion snaps progress; canvas itself is aria-hidden.

### PLANNED — ServiceCategoryTabs and FreelanceOfferCard (task8, not existing)

No category tabs exist in the baseline. Planned order: Company Profile; Landing Page; Toko Online / Online Store; Sistem Booking / Booking System; Website Top Up / Top-Up Website; Sistem Custom / Custom System. Company Profile default, category IDs stable on locale change.

- Reusable native tab buttons in horizontal wrapping tablist; stable tab/panel IDs, aria-controls/aria-labelledby, aria-selected, roving tabindex. Left/Right wrap; Home/End move focus; **manual activation** Enter/Space; focus stays on activated tab. Pointer click activates. No storage/query-string persistence.
- Use existing hand type, ink/paper/rust, DrawButton geometry, global focus and current spacing steps; selected must be distinguishable beyond color via state semantics/weight/outline. Final exact selected visual primitive must pass task8 local state harness before integration; this document does not invent a captured tab appearance.
- SSR/no-JS shows all six panels with headings, readable content and anchor navigation. Only after mount apply tab behavior/hidden inactive panels; inactive panel descendants must not be focusable. Do not hide SSR pricing data.
- Company Profile panel contains pro + bespoke, max2 columns desktop/1 mobile. Landing contains starter at readable card width, not a giant full-width box. Four consultation panels each contain narrative + CTA and **no fabricated price**. All material warranty/renewal/dynamic-cost qualifiers are visible.
- Planned prices: starter fixed IDR850000/14-day bug warranty; pro fixed IDR1750000/30 days; bespoke **starting** IDR2450000/60 days. Four consultation categories have no promised warranty/amount. Existing three-card prices differ and remain recorded only as baseline.
- Required preintegration states: default, hover, focus, selected, arrow-focused-not-yet-selected, locale switch, no-JS, panel CTA; disabled/loading/error N/A unless later required. Test320/375/768/1280 and long bilingual labels, no horizontal content scroll. Do not install a tabs/animation library or ship a demo route.

## 6. Motion & Interaction

| Mechanism                     | Existing duration/easing                | Meaning and limitation                                                                 |
| ----------------------------- | --------------------------------------- | -------------------------------------------------------------------------------------- |
| Tailwind transition defaults  | 150ms cubic-bezier(.4,0,.2,1)           | Colors, opacity, transforms; some `transition-all` also catches paint changes          |
| Drawably button transform     | 120ms ease                              | Hover lift/press sink; utility transitions can override                                |
| Drawably SVG boil             | 1200ms step-end infinite,3 frames       | Existing sketch material; random seed/resketch prevents exact cross-run pixel identity |
| Nav link translation/FAQ plus | 200ms                                   | Link affordance; expanded plus45deg                                                    |
| Project thumbnail zoom        | 500ms                                   | Hover scale1.02                                                                        |
| Scroll reveal                 | 450ms ease, opacity0→1, translateY8px→0 | IntersectionObserver threshold.12, rootMargin bottom-8%, one-shot                      |
| Theme circular reveal         | 850ms cubic-bezier(.16,1,.3,1)          | Top-right blurred SVG mask0→350vmax; old view behind; fallback immediate               |
| Avatar erase/redraw           | ~1.72s / ~2.08s                         | rAF speeds.58/.48, dt capped.05; not a CSS transform-only effect                       |
| Avatar layer opacity          | 150/300ms                               | Static-sketch-to-canvas handoff, reveal                                                |
| Pulse hints/clock             | Tailwind pulse2s infinite               | Existing decorative pulse; not disabled by current reduced-motion rules                |

Reduced motion removes view-transition animations, smooth scroll, reveal transition and Drawably boil/check/dot/knob transitions. Avatar progress jumps to target. **Observed gap:** hint and clock pulse remain `animation-name: pulse` under reduced motion at all three widths. Hover resketch also is not media-gated in the action. Record for task17/11 review, do not globally remove signature motion in task2.

No claim of 60fps, compositor-only animation or stable frame-perfect random outlines is made. Future motion must communicate real actions/state and respect reduced motion; preserve the material without adding ornamental motion. Baseline random sketch and live clock must be considered when choosing settled comparisons, not used to wave away layout defects.

## 7. Depth & Surface

Strategy is **mixed, sketch-border first**. Most cards are flat paper with thin irregular multi-path SVG outlines, not nested elevated boxes. The SVG is absolute inset0,100% size, overflow visible, pointer-events none, z-1 inside isolated host; browser stroke is1.5px. Solid blob stroke4px; scribble1.5px; fill inherits theme accent.

Existing tonal washes: comparison accent-soft30%, final contact25%, generic comparison paper40% with opacity.9, small inquiry boxes paper60% with dashed rule. Pro offer uses accent sketch and shadow-md; computed surface still paper because existing class precedence wins over its competing accent-soft10% utility. Do not assert that every declared class wins.

Existing shadows: hint shadow-xs (`0 1px 2px rgb(0 0 0 / .05)`); comparison/contact CTA shadow-sm (Tailwind two-layer small shadow); popular offer shadow-md (`0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1)`). Other cards do not gain new shadows. Navbar paper85% portfolio/90% freelance with backdrop blur; dialog paper98% + blur-md. Rounded-lg8px on project media, rounded-sm4px hint; cards rely on sketch geometry, not a uniform CSS radius system. No new glass/gradient rebrand.

## 8. Accessibility Constraints & Existing Debt

Target for subsequent implementation: WCAG2.2 AA, readable normal text4.5:1/large3:1, non-text state boundaries3:1, visible keyboard focus and target reachability, reduced motion, correct accessible names, bilingual wrapping and genuine not-found semantics. These are constraints, **not a baseline conformance claim**. Existing small12px body terms and alpha-muted captions require care; no new unreadable text is justified by matching them.

### Located debt / exit owners

User authorized recording defects for remediation; this is not permanent acceptance of defects or permission to pass final QA.

| Debt                                                                                                         | Evidence/location                                           | Affected users                              | Exit owner                    |
| ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- | ------------------------------------------- | ----------------------------- |
| Locale init/write throws with denied storage; hydration class can remain absent                              | `locale.svelte.ts:27,32`; supplemental storage-denied probe | Privacy/storage-restricted users            | task3; labels task11/12       |
| Repeated theme clicks remain dark with wrong label; OS change not followed                                   | `theme.ts:29–30,85–86`; denied-storage/OS probes            | Theme/accessibility preference users        | task4; copy task11            |
| Freelance short menu CTA below viewport, overflow visible while body locked                                  | 375×568 CTA top586/bottom634;667×375 same top; screenshots  | Small/landscape and keyboard users          | task12                        |
| Freelance Close excluded from tab loop; prior overflow/inert not fully restored                              | `FreelanceNav.svelte:72–100` source inspection              | Keyboard/SPA users                          | task12                        |
| Hardcoded EN/ID menu/ThemeToggle/education/preview alt/email subject                                         | Ledger exact rows + menu/FAQ/404 snapshots                  | Bilingual/screen-reader users               | tasks10–13                    |
| Unknown `/work/tidak-ada` returns404 but generic “Not Found” in ID; explicit `/404` page is localized but200 | Current preview route evidence                              | Lost-link visitors/search readers           | task13, host verification14   |
| Person `worksFor`/`alumniOf` imply unverified current job/completed education                                | Source+CV dated cross-check                                 | Recruiters/search users                     | tasks11/13                    |
| Old offers/pack credits/unqualified SEO/speed/fees/“Most Popular”/verified claims                            | Full ledger/FAQ evidence                                    | Business purchasers                         | tasks7/9/10/13                |
| No category selection exists yet                                                                             | Baseline three offers; no tablist                           | Business purchasers                         | task8 primitive gate          |
| Passive hover/cursor affordances, continuous sketch/pulse and very small muted copy                          | Cards/hints/contact; reduced-motion probes                  | Cognitive/low-vision/motion-sensitive users | tasks11/17, preserve identity |
| FAQ disclosure lacks explicit relationship IDs; Skills dt/dd parent semantics                                | FAQ/Skills source                                           | Assistive tech                              | tasks9/11                     |
| Header theme-color dark `#141618` differs from actual paper `#121316`                                        | `app.html:7`                                                | Browser-chrome theme consistency            | tasks4/13                     |
| Freelance-host studies inherit freelance navigation; main sitemap advertises alias                           | Layout host-first classification; sitemap source            | Cross-host visitors/search engines          | task13,14                     |

### Baseline evidence and explicit limits

Fresh production build + artifact verifier exit0. Captured8 route states × EN/ID ×375×667,768×1024,1280×800 =48 page records, full-page PNGs, exact DOM text/attributes/head/decoded links, aria snapshots and computed styles. Primitive state records include default, hover, keyboard focus, press, locale-selected, dark, FAQ-open/all8, FAQ-closed, menu-open/Escape/focus return; supplement adds avatar rest/mid/end and short-menu/storage/OS/reduced-motion probes. Menus absent at desktop and disabled/loading states absent are explicitly N/A, not simulated successes.

Capture files are references for future comparison, not a polished-UI PASS. Full cross-host static Caddy testing/no-JS future tabs task14/8; full screen-reader/zoom200/320 stress and performance tasks11–17; physical mobile and print not certified. Independent reviewer confirmation is separate from task2 DoneClaim. See `coverage-gaps.md` for exact tested/not-tested boundaries and `cleanup.json` + supplemental cleanup for resource receipts.
