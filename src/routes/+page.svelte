<script lang="ts">
  import { profile } from '$lib/data/profile';
  import { socials } from '$lib/data/socials';
  import { techJourney, type TechStep } from '$lib/data/techJourney';
  import { projects } from '$lib/data/projects';
  import { projectCopy } from '$lib/data/projectCopy';
  import { reveal } from '$lib/actions/reveal';

  const SITE_URL = 'https://ryanprayoga.dev';
  const PAGE_URL = SITE_URL;
  const OG_IMAGE = `${SITE_URL}/og-image.png`;

  const academic = 'S1 Informatika — Universitas Pasundan';
  const email = socials.find((s) => s.name === 'Email');
  const github = socials.find((s) => s.name === 'GitHub');
  const linkedin = socials.find((s) => s.name === 'LinkedIn');

  const featuredProjects = projects;
  const imgSizes = '(max-width: 760px) 90vw, 40vw';

  type Locale = 'en' | 'id';
  let locale = $state<Locale>('en');

  const copy = {
    en: {
      nav: { work: 'Work', about: 'About', stack: 'Stack', contact: 'Contact' },
      available: 'Open to work',
      heroRole: 'Full-Stack Engineer & Team Lead',
      heroBody:
        'Building enterprise systems, civic-tech products, developer tooling, and deployment workflows with calm technical ownership.',
      viewWork: 'View Work',
      downloadCv: 'Download CV',
      contact: 'Contact',
      proof: ['Years experience', 'Engineers led', 'Systems shipped'],
      aboutKicker: 'About',
      aboutHeading: 'From software craft to delivery leadership.',
      aboutRows: [
        { kicker: 'Current role', body: `Hands-on delivery leadership at ${profile.company} — from planning and review to production decisions.` },
        { kicker: 'Academic', body: 'Formal computer science foundation supporting product, architecture, and engineering execution.' },
        { kicker: 'Operating range', body: 'Comfortable across product surfaces and production workflow when the system needs ownership.' },
      ],
      workKicker: 'Selected Work',
      workHeading: 'Selected work with production weight.',
      workIntro: 'Civic-tech, developer tooling, automation, and deployment systems built for real constraints.',
      open: 'Open',
      stackKicker: 'Stack & Method',
      stackHeading: 'How I build systems that keep moving.',
      stackNotes: {
        backend: 'API, auth, business workflow, integrations, and data processing.',
        frontend: 'Public portals, internal dashboards, PWA, and operational interfaces.',
        mobile: 'Field apps, webview flows, media upload, and cross-device workflows.',
        workflow: 'Deployment, process management, review cadence, and AI-assisted iteration.',
      },
      method: 'Method',
      contactKicker: 'Contact',
      contactHeading: "Let's build the next useful thing.",
      contactBody: 'Open for full-stack, backend, and team lead roles.',
      sendEmail: 'Send Email',
      viewGithub: 'View GitHub',
      footerNote: 'Built with SvelteKit',
      backToTop: 'Back to top',
    },
    id: {
      nav: { work: 'Karya', about: 'Tentang', stack: 'Stack', contact: 'Kontak' },
      available: 'Terbuka untuk kerja',
      heroRole: 'Full-Stack Engineer & Team Lead',
      heroBody:
        'Membangun sistem enterprise, produk civic-tech, developer tooling, dan deployment workflow dengan kepemilikan teknis yang tenang.',
      viewWork: 'Lihat Karya',
      downloadCv: 'Unduh CV',
      contact: 'Kontak',
      proof: ['Tahun pengalaman', 'Engineer dipimpin', 'Sistem dirilis'],
      aboutKicker: 'Tentang',
      aboutHeading: 'Dari kerajinan software ke kepemimpinan delivery.',
      aboutRows: [
        { kicker: 'Peran sekarang', body: `Kepemimpinan delivery yang hands-on di ${profile.company} — dari perencanaan dan review sampai keputusan production.` },
        { kicker: 'Akademik', body: 'Fondasi computer science formal yang menopang product, arsitektur, dan eksekusi engineering.' },
        { kicker: 'Cakupan kerja', body: 'Nyaman berpindah antar product surface dan workflow production saat sistem butuh kepemilikan.' },
      ],
      workKicker: 'Karya Pilihan',
      workHeading: 'Karya pilihan dengan bobot production.',
      workIntro: 'Civic-tech, developer tooling, automation, dan sistem deployment yang dibangun untuk constraint nyata.',
      open: 'Buka',
      stackKicker: 'Stack & Metode',
      stackHeading: 'Cara saya membangun sistem yang terus bergerak.',
      stackNotes: {
        backend: 'API, auth, business workflow, integrasi, dan pemrosesan data.',
        frontend: 'Portal publik, dashboard internal, PWA, dan interface operasional.',
        mobile: 'Aplikasi lapangan, flow webview, upload media, dan workflow lintas device.',
        workflow: 'Deployment, process management, ritme review, dan iterasi berbantuan AI.',
      },
      method: 'Metode',
      contactKicker: 'Kontak',
      contactHeading: 'Mari bangun hal berguna berikutnya.',
      contactBody: 'Terbuka untuk peran full-stack, backend, dan team lead.',
      sendEmail: 'Kirim Email',
      viewGithub: 'Lihat GitHub',
      footerNote: 'Dibangun dengan SvelteKit',
      backToTop: 'Ke atas',
    },
  };

  const t = $derived(copy[locale]);
  const projectDescriptions = $derived(projectCopy[locale]);

  const navItems = $derived([
    { label: t.nav.work, href: '#work' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.stack, href: '#stack' },
    { label: t.nav.contact, href: '#contact' },
  ]);

  const proof = $derived([
    { value: profile.experience.replace(/[^0-9+]/g, '') || '4+', label: t.proof[0] },
    { value: '5', label: t.proof[1] },
    { value: '11+', label: t.proof[2] },
  ]);

  const aboutRows = $derived([
    { kicker: t.aboutRows[0].kicker, title: profile.role, body: t.aboutRows[0].body },
    { kicker: t.aboutRows[1].kicker, title: academic, body: t.aboutRows[1].body },
    { kicker: t.aboutRows[2].kicker, title: 'Backend · Frontend · Mobile · Deploy', body: t.aboutRows[2].body },
  ]);

  const stackOrder: TechStep['category'][] = ['backend', 'frontend', 'mobile', 'workflow'];

  function groupStack(items: TechStep[], notes: Record<TechStep['category'], string>) {
    const grouped: Record<TechStep['category'], TechStep[]> = {
      backend: [], frontend: [], mobile: [], workflow: [],
    };
    for (const item of items) grouped[item.category].push(item);
    return stackOrder.map((category) => ({
      category,
      title: category[0].toUpperCase() + category.slice(1),
      note: notes[category],
      items: grouped[category],
    }));
  }

  const stackGroups = $derived(groupStack(techJourney, t.stackNotes));
  const workflow = ['Discover', 'Build', 'Review', 'Deploy', 'Improve'];
  const contactLinks = [email, github, linkedin].filter(Boolean);

  let scrolled = $state(false);
  let menuOpen = $state(false);
  let hoveredProject = $state(0);
  let previewProject = $derived(featuredProjects[hoveredProject] ?? featuredProjects[0]);
  let previewBase = $derived(previewProject?.thumbnail?.replace('.webp', ''));

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: SITE_URL,
    image: OG_IMAGE,
    jobTitle: 'Full-Stack Engineer',
    worksFor: { '@type': 'Organization', name: profile.company },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universitas Pasundan' },
    address: { '@type': 'PostalAddress', addressLocality: 'Tangerang', addressCountry: 'ID' },
    sameAs: [github?.url, linkedin?.url].filter(Boolean),
    email: email?.label,
    knowsAbout: ['Full-Stack Development', 'SvelteKit', 'Go', 'Laravel', 'PostgreSQL', 'DevOps', 'Technical Leadership'],
  };

  $effect(() => {
    const saved = localStorage.getItem('locale');
    if (saved === 'en' || saved === 'id') locale = saved;
  });

  $effect(() => {
    document.documentElement.lang = locale;
    localStorage.setItem('locale', locale);
  });

  $effect(() => {
    const onScroll = () => (scrolled = window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  function setLocale(value: Locale) {
    locale = value;
  }

  function goTo(id: string) {
    return (event: Event) => {
      event.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      menuOpen = false;
    };
  }
</script>

<svelte:head>
  <title>Ryan Prayoga — Full-Stack Engineer & Team Lead</title>
  <meta name="description" content="Portfolio Ryan Prayoga: Full-Stack Engineer dan Team Lead — enterprise systems, civic-tech, developer tooling, deployment workflow, S1 Informatika Universitas Pasundan." />
  <meta name="author" content="Ryan Prayoga" />
  <meta name="keywords" content="Ryan Prayoga, Full-Stack Engineer, Team Lead, SvelteKit, Go, Laravel, PostgreSQL, Universitas Pasundan, Indonesia" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href={PAGE_URL} />
  <meta property="og:type" content="profile" />
  <meta property="og:site_name" content="Ryan Prayoga" />
  <meta property="og:title" content="Ryan Prayoga — Full-Stack Engineer & Team Lead" />
  <meta property="og:description" content="Selected work, stack, and delivery method — full-stack engineer & team lead based in Tangerang, Indonesia." />
  <meta property="og:url" content={PAGE_URL} />
  <meta property="og:image" content={OG_IMAGE} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Ryan Prayoga — Full-Stack Engineer & Team Lead" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Ryan Prayoga — Full-Stack Engineer & Team Lead" />
  <meta name="twitter:description" content="Full-Stack Engineer & Team Lead — enterprise systems, civic-tech, developer tooling, deployment workflows." />
  <meta name="twitter:image" content={OG_IMAGE} />
  {@html `<script type="application/ld+json">${JSON.stringify(personJsonLd)}</` + `script>`}
</svelte:head>

<div class="swiss">
  <nav class:scrolled class="nav">
    <a href="#top" class="brand" onclick={goTo('top')} aria-label="Ryan Prayoga, home">
      Ryan Prayoga<span class="dot">.</span>
    </a>

    <div class="desktop-links" aria-label="Section navigation">
      {#each navItems as item (item.href)}
        <a href={item.href} onclick={goTo(item.href.slice(1))}>{item.label}</a>
      {/each}
    </div>

    <div class="nav-actions">
      <div class="lang" role="group" aria-label="Language">
        <button type="button" class:active={locale === 'en'} aria-pressed={locale === 'en'} onclick={() => setLocale('en')}>EN</button>
        <span aria-hidden="true">/</span>
        <button type="button" class:active={locale === 'id'} aria-pressed={locale === 'id'} onclick={() => setLocale('id')}>ID</button>
      </div>
      <a class="nav-cv" href={locale === 'id' ? '/cv/cv-id.pdf' : '/cv/cv-en.pdf'} download>CV ↗</a>
      <button class="menu-btn" type="button" onclick={() => (menuOpen = !menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
        {menuOpen ? 'Close' : 'Menu'}
      </button>
    </div>
  </nav>

  {#if menuOpen}
    <div class="mobile-menu">
      {#each navItems as item, i (item.href)}
        <a href={item.href} onclick={goTo(item.href.slice(1))}>
          <span>0{i + 1}</span>{item.label}
        </a>
      {/each}
      <a class="mm-cv" href={locale === 'id' ? '/cv/cv-id.pdf' : '/cv/cv-en.pdf'} download>
        <span>→</span>{t.downloadCv}
      </a>
    </div>
  {/if}

  <main id="top">
    <!-- HERO -->
    <header class="hero">
      <div class="hero-top">
        <span class="mono">Portfolio © 2026</span>
        <span class="mono status"><i></i>{t.available}</span>
      </div>

      <h1 class="hero-title">Ryan<br />Prayoga<span class="accent">.</span></h1>

      <div class="hero-body">
        <div class="hb-role">
          <p class="mono label">Role</p>
          <p class="role">{t.heroRole}</p>
        </div>
        <div class="hb-lead">
          <p class="mono label">Profile</p>
          <p class="lead">{t.heroBody}</p>
          <div class="cta">
            <a class="btn primary" href="#work" onclick={goTo('work')}>{t.viewWork} <span>→</span></a>
            <a class="btn" href={locale === 'id' ? '/cv/cv-id.pdf' : '/cv/cv-en.pdf'} download>{t.downloadCv}</a>
            <a class="btn" href={email?.url}>{t.contact}</a>
          </div>
        </div>
      </div>

      <div class="proof">
        {#each proof as item, i (item.label)}
          <div class="proof-cell">
            <span class="mono pn">0{i + 1}</span>
            <strong>{item.value}</strong>
            <span class="mono pl">{item.label}</span>
          </div>
        {/each}
        <div class="proof-cell loc">
          <span class="mono pn">04</span>
          <strong class="sm">{profile.location}</strong>
          <span class="mono pl">Based in</span>
        </div>
      </div>
    </header>

    <!-- WORK -->
    <section id="work" class="section">
      <div class="sec-head" use:reveal>
        <p class="mono idx">01 — {t.workKicker}</p>
        <h2>{t.workHeading}</h2>
        <p class="lead">{t.workIntro}</p>
      </div>

      <div class="work">
        <ol class="work-list" use:reveal>
          {#each featuredProjects as project, i (project.slug)}
            {@const desc = projectDescriptions[project.slug]}
            <li>
              <a
                class="row"
                href={project.url ?? project.source ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                onmouseenter={() => (hoveredProject = i)}
                onfocus={() => (hoveredProject = i)}
              >
                <span class="r-idx mono">0{i + 1}</span>
                <span class="r-main">
                  <span class="r-name">{project.name}</span>
                  <span class="r-desc">{desc?.summary ?? project.category}</span>
                </span>
                <span class="r-stack mono">{project.stack.slice(0, 3).join(' · ')}</span>
                <span class="r-arrow" aria-hidden="true">↗</span>
              </a>
            </li>
          {/each}
        </ol>

        <aside class="work-preview" aria-hidden="true">
          <div class="wp-inner">
            {#if previewBase}
              <picture>
                <source type="image/avif" srcset="{previewBase}-sm.avif 700w, {previewBase}.avif 1100w" sizes={imgSizes} />
                <img src={previewProject.thumbnail} srcset="{previewBase}-sm.webp 700w, {previewBase}.webp 1100w" sizes={imgSizes} alt="" width="1100" height="688" loading="lazy" decoding="async" />
              </picture>
            {:else}
              <div class="wp-fallback">{previewProject?.name}</div>
            {/if}
            <div class="wp-meta mono">
              <span>{previewProject?.category}</span>
              <span>{previewProject?.year}</span>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <!-- ABOUT -->
    <section id="about" class="section">
      <div class="sec-head" use:reveal>
        <p class="mono idx">02 — {t.aboutKicker}</p>
        <h2>{t.aboutHeading}</h2>
      </div>

      <div class="about" use:reveal>
        {#each aboutRows as row (row.kicker)}
          <article class="about-row">
            <p class="mono ar-k">{row.kicker}</p>
            <h3 class="ar-t">{row.title}</h3>
            <p class="ar-b">{row.body}</p>
          </article>
        {/each}
      </div>
    </section>

    <!-- STACK -->
    <section id="stack" class="section">
      <div class="sec-head" use:reveal>
        <p class="mono idx">03 — {t.stackKicker}</p>
        <h2>{t.stackHeading}</h2>
      </div>

      <div class="stack-grid" use:reveal>
        {#each stackGroups as group (group.category)}
          <article class="stack-cell">
            <p class="mono sc-title">{group.title}</p>
            <p class="sc-note">{group.note}</p>
            <ul class="sc-tags">
              {#each group.items as item (item.tech)}
                <li>{item.tech}</li>
              {/each}
            </ul>
          </article>
        {/each}
      </div>

      <div class="workflow mono" use:reveal>
        <span class="wf-label">{t.method}</span>
        {#each workflow as step, i (step)}
          <span class="wf-step">{step}</span>{#if i < workflow.length - 1}<span class="wf-sep" aria-hidden="true">→</span>{/if}
        {/each}
      </div>
    </section>

    <!-- CONTACT -->
    <section id="contact" class="section contact">
      <div class="sec-head" use:reveal>
        <p class="mono idx">04 — {t.contactKicker}</p>
        <h2 class="contact-h">{t.contactHeading}</h2>
        <p class="lead">{t.contactBody}</p>
      </div>

      <ul class="contact-links" use:reveal>
        {#each contactLinks as social, i (social?.name)}
          {#if social}
            <li>
              <a
                href={social.url}
                target={social.url.startsWith('mailto:') ? undefined : '_blank'}
                rel={social.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              >
                <span class="cl-idx mono">0{i + 1}</span>
                <span class="cl-name">{social.name}</span>
                <span class="cl-val mono">{social.label}</span>
                <span class="cl-arrow" aria-hidden="true">↗</span>
              </a>
            </li>
          {/if}
        {/each}
      </ul>

      <div class="cta contact-cta" use:reveal>
        <a class="btn primary" href={email?.url}>{t.sendEmail} <span>→</span></a>
        <a class="btn" href="/cv/cv-en.pdf" download>CV (EN)</a>
        <a class="btn" href="/cv/cv-id.pdf" download>CV (ID)</a>
      </div>
    </section>
  </main>

  <footer class="footer">
    <span class="mono">© 2026 Ryan Prayoga</span>
    <span class="mono">{profile.location}</span>
    <span class="mono">{t.footerNote}</span>
    <a class="mono to-top" href="#top" onclick={goTo('top')}>{t.backToTop} ↑</a>
  </footer>
</div>

<style>
  :global(html) {
    color-scheme: light;
    overflow-x: hidden;
  }
  :global(body) {
    background: #f4f2ec;
    overflow-x: hidden;
    max-width: 100%;
  }
  :global(.swiss ::selection) {
    background: #ff3d00;
    color: #f4f2ec;
  }

  .swiss {
    --paper: #f4f2ec;
    --paper-2: #ece9df;
    --ink: #15120b;
    --ink-2: #46412f;
    --faint: #6c6655;
    --rule: rgba(21, 18, 11, 0.16);
    --rule-2: rgba(21, 18, 11, 0.32);
    --accent: #ff3d00;
    --accent-ink: #c93000;
    --sans: 'Archivo', system-ui, sans-serif;
    --mono: 'JetBrains Mono', ui-monospace, monospace;
    --pad: clamp(1.25rem, 5vw, 4rem);

    min-height: 100dvh;
    background: var(--paper);
    color: var(--ink);
    font-family: var(--sans);
    font-feature-settings: 'tnum' 1, 'ss01' 1;
    -webkit-font-smoothing: antialiased;
    overflow-x: clip;
  }

  .swiss :global(*) {
    box-sizing: border-box;
  }

  .mono {
    font-family: var(--mono);
    font-size: 0.7rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  /* ── NAV ── */
  .nav {
    position: fixed;
    inset: 0 0 auto;
    z-index: 60;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.85rem var(--pad);
    border-bottom: 1px solid transparent;
    transition: background-color 0.25s, border-color 0.25s;
  }
  .nav.scrolled {
    background: color-mix(in srgb, var(--paper) 82%, transparent);
    backdrop-filter: blur(10px);
    border-bottom-color: var(--rule);
  }
  .brand {
    font-weight: 700;
    font-size: 1.05rem;
    letter-spacing: -0.02em;
    color: var(--ink);
    text-decoration: none;
  }
  .brand .dot {
    color: var(--accent);
  }
  .desktop-links {
    display: flex;
    gap: 1.6rem;
  }
  .desktop-links a {
    font-family: var(--mono);
    font-size: 0.72rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--ink-2);
    text-decoration: none;
    transition: color 0.18s;
  }
  .desktop-links a:hover,
  .desktop-links a:focus-visible {
    color: var(--accent-ink);
  }
  .nav-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .lang {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-family: var(--mono);
    font-size: 0.72rem;
  }
  .lang span {
    color: var(--rule-2);
  }
  .lang button {
    border: 0;
    background: none;
    padding: 0;
    cursor: pointer;
    color: var(--faint);
    font: inherit;
    transition: color 0.18s;
  }
  .lang button.active {
    color: var(--ink);
    font-weight: 600;
  }
  .lang button:hover {
    color: var(--accent-ink);
  }
  .nav-cv {
    font-family: var(--mono);
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--ink);
    text-decoration: none;
    border-bottom: 1px solid var(--ink);
    padding-bottom: 1px;
  }
  .nav-cv:hover {
    color: var(--accent-ink);
    border-color: var(--accent);
  }
  .menu-btn {
    display: none;
    border: 1px solid var(--rule-2);
    background: none;
    font-family: var(--mono);
    font-size: 0.7rem;
    text-transform: uppercase;
    padding: 0.45rem 0.7rem;
    cursor: pointer;
    color: var(--ink);
  }
  .mobile-menu {
    position: fixed;
    inset: 0;
    z-index: 55;
    display: grid;
    align-content: center;
    gap: 0;
    padding: 5rem var(--pad) 2rem;
    background: var(--paper);
  }
  .mobile-menu a {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    padding: 1.1rem 0;
    border-top: 1px solid var(--rule);
    font-size: clamp(2rem, 9vw, 3rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--ink);
    text-decoration: none;
  }
  .mobile-menu a:last-child {
    border-bottom: 1px solid var(--rule);
  }
  .mobile-menu span {
    font-family: var(--mono);
    font-size: 0.8rem;
    color: var(--accent);
  }
  .mobile-menu .mm-cv {
    color: var(--accent-ink);
  }

  /* ── LAYOUT ── */
  main {
    padding: 0 var(--pad);
  }
  .section {
    padding-block: clamp(4rem, 10vw, 8.5rem);
    border-top: 1px solid var(--rule);
  }
  .lead {
    color: var(--ink-2);
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    line-height: 1.55;
    max-width: 38ch;
  }
  .label {
    color: var(--faint);
    margin: 0 0 0.6rem;
  }

  /* ── HERO ── */
  .hero {
    padding-top: clamp(6.5rem, 14vw, 9rem);
    padding-bottom: clamp(2rem, 5vw, 3.5rem);
  }
  .hero-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid var(--rule);
  }
  .status {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--ink);
  }
  .status i {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 60%, transparent);
    animation: pulse 2.4s ease-out infinite;
  }
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 55%, transparent); }
    70% { box-shadow: 0 0 0 7px transparent; }
    100% { box-shadow: 0 0 0 0 transparent; }
  }
  .hero-title {
    margin: clamp(1.5rem, 4vw, 3rem) 0 0;
    font-size: clamp(2.8rem, 15.5vw, 15rem);
    font-weight: 800;
    line-height: 0.82;
    letter-spacing: -0.045em;
    text-transform: none;
    overflow-wrap: anywhere;
  }
  .hero-title .accent {
    color: var(--accent);
  }
  .hero-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(1.5rem, 4vw, 4rem);
    margin-top: clamp(2rem, 5vw, 3.5rem);
    padding-top: 1.6rem;
    border-top: 1px solid var(--rule);
  }
  .role {
    font-size: clamp(1.5rem, 3vw, 2.4rem);
    font-weight: 600;
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: var(--ink);
    max-width: 14ch;
  }
  .cta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
    margin-top: 1.6rem;
  }
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.7rem 1.1rem;
    border: 1px solid var(--rule-2);
    font-family: var(--mono);
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--ink);
    text-decoration: none;
    transition: background-color 0.18s, color 0.18s, border-color 0.18s, transform 0.18s;
  }
  .btn span {
    transition: transform 0.18s;
  }
  .btn:hover {
    transform: translateY(-2px);
    border-color: var(--ink);
  }
  .btn:hover span {
    transform: translateX(3px);
  }
  .btn.primary {
    background: var(--accent);
    border-color: var(--accent);
    color: var(--paper);
  }
  .btn.primary:hover {
    background: var(--accent-ink);
    border-color: var(--accent-ink);
  }

  .proof {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    margin-top: clamp(3rem, 7vw, 5rem);
    border-top: 1px solid var(--ink);
  }
  .proof-cell {
    min-width: 0;
    padding: 1.4rem 1.2rem 1.4rem 0;
    border-right: 1px solid var(--rule);
  }
  .proof-cell:last-child {
    border-right: 0;
  }
  .proof-cell .pn {
    display: block;
    color: var(--accent-ink);
    margin-bottom: 0.8rem;
  }
  .proof-cell strong {
    display: block;
    font-size: clamp(2.2rem, 5vw, 3.4rem);
    font-weight: 700;
    line-height: 0.95;
    letter-spacing: -0.03em;
  }
  .proof-cell strong.sm {
    font-size: clamp(1.1rem, 2.4vw, 1.7rem);
    font-weight: 600;
    overflow-wrap: anywhere;
  }
  .proof-cell .pl {
    display: block;
    margin-top: 0.6rem;
    color: var(--faint);
  }

  /* ── SECTION HEADER ── */
  .sec-head {
    display: grid;
    grid-template-columns: minmax(0, 0.4fr) minmax(0, 0.6fr);
    gap: clamp(1rem, 3vw, 3rem);
    align-items: end;
    margin-bottom: clamp(2.5rem, 6vw, 4.5rem);
  }
  .sec-head .idx {
    color: var(--accent-ink);
    grid-column: 1;
  }
  .sec-head h2 {
    grid-column: 1;
    margin: 0.8rem 0 0;
    font-size: clamp(1.9rem, 4.5vw, 3.6rem);
    font-weight: 600;
    line-height: 1;
    letter-spacing: -0.03em;
    max-width: 16ch;
  }
  .sec-head .lead {
    grid-column: 2;
    align-self: end;
  }

  /* ── WORK ── */
  .work {
    display: grid;
    grid-template-columns: minmax(0, 1.55fr) minmax(0, 0.95fr);
    gap: clamp(1.5rem, 4vw, 3.5rem);
    align-items: start;
  }
  .work-list {
    list-style: none;
    margin: 0;
    padding: 0;
    border-top: 1px solid var(--ink);
  }
  .work-list .row {
    display: grid;
    grid-template-columns: 2.5rem minmax(0, 1fr) auto 1.5rem;
    gap: 1rem;
    align-items: baseline;
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--rule);
    text-decoration: none;
    color: var(--ink);
    transition: padding-left 0.22s ease, background-color 0.22s;
  }
  .work-list .row:hover {
    padding-left: 0.9rem;
    background: var(--paper-2);
  }
  .r-idx {
    color: var(--faint);
    transition: color 0.18s;
  }
  .work-list .row:hover .r-idx {
    color: var(--accent-ink);
  }
  .r-name {
    display: block;
    font-size: clamp(1.5rem, 3vw, 2.3rem);
    font-weight: 600;
    line-height: 1;
    letter-spacing: -0.025em;
  }
  .r-desc {
    display: block;
    margin-top: 0.5rem;
    color: var(--faint);
    font-size: 0.92rem;
    line-height: 1.45;
    max-width: 46ch;
  }
  .r-stack {
    color: var(--ink-2);
    text-align: right;
    white-space: nowrap;
  }
  .r-arrow {
    justify-self: end;
    color: var(--accent);
    font-size: 1.1rem;
    opacity: 0;
    transform: translate(-4px, 4px);
    transition: opacity 0.2s, transform 0.2s;
  }
  .work-list .row:hover .r-arrow,
  .work-list .row:focus-visible .r-arrow {
    opacity: 1;
    transform: translate(0, 0);
  }

  .work-preview {
    position: sticky;
    top: 6rem;
  }
  .wp-inner {
    border: 1px solid var(--rule);
    background: var(--paper-2);
  }
  .work-preview picture,
  .wp-fallback {
    display: block;
    aspect-ratio: 16 / 10;
    overflow: hidden;
  }
  .work-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .wp-fallback {
    display: grid;
    place-items: center;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--faint);
  }
  .wp-meta {
    display: flex;
    justify-content: space-between;
    padding: 0.7rem 0.9rem;
    border-top: 1px solid var(--rule);
    color: var(--ink-2);
  }

  /* ── ABOUT ── */
  .about {
    border-top: 1px solid var(--ink);
  }
  .about-row {
    display: grid;
    grid-template-columns: minmax(0, 0.22fr) minmax(0, 0.36fr) minmax(0, 0.42fr);
    gap: clamp(1rem, 3vw, 2.5rem);
    padding: clamp(1.6rem, 3vw, 2.4rem) 0;
    border-bottom: 1px solid var(--rule);
  }
  .ar-k {
    color: var(--accent-ink);
  }
  .ar-t {
    margin: 0;
    font-size: clamp(1.2rem, 2.2vw, 1.7rem);
    font-weight: 600;
    line-height: 1.1;
    letter-spacing: -0.02em;
  }
  .ar-b {
    margin: 0;
    color: var(--ink-2);
    line-height: 1.6;
  }

  /* ── STACK ── */
  .stack-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    border-top: 1px solid var(--ink);
    border-left: 1px solid var(--rule);
  }
  .stack-cell {
    min-width: 0;
    padding: 1.4rem;
    border-right: 1px solid var(--rule);
    border-bottom: 1px solid var(--rule);
    min-height: 17rem;
    display: flex;
    flex-direction: column;
  }
  .sc-title {
    color: var(--accent-ink);
    margin: 0 0 0.9rem;
  }
  .sc-note {
    margin: 0 0 1.4rem;
    color: var(--ink-2);
    font-size: 0.95rem;
    line-height: 1.5;
  }
  .sc-tags {
    list-style: none;
    margin: auto 0 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }
  .sc-tags li {
    font-family: var(--mono);
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    padding: 0.3rem 0.5rem;
    border: 1px solid var(--rule);
    color: var(--ink-2);
  }
  .workflow {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.7rem;
    margin-top: 1.6rem;
    color: var(--ink);
  }
  .wf-label {
    color: var(--faint);
    margin-right: 0.4rem;
  }
  .wf-sep {
    color: var(--accent);
  }

  /* ── CONTACT ── */
  .contact-h {
    max-width: 12ch;
    font-size: clamp(2.2rem, 7vw, 5rem);
  }
  .contact-links {
    list-style: none;
    margin: 0;
    padding: 0;
    border-top: 1px solid var(--ink);
  }
  .contact-links a {
    display: grid;
    grid-template-columns: 2.5rem minmax(0, 0.3fr) minmax(0, 1fr) 1.5rem;
    gap: 1rem;
    align-items: baseline;
    padding: 1.3rem 0;
    border-bottom: 1px solid var(--rule);
    text-decoration: none;
    color: var(--ink);
    transition: padding-left 0.22s, background-color 0.22s;
  }
  .contact-links a:hover {
    padding-left: 0.9rem;
    background: var(--paper-2);
  }
  .cl-idx {
    color: var(--faint);
  }
  .cl-name {
    font-size: clamp(1.2rem, 2.4vw, 1.8rem);
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  .cl-val {
    color: var(--ink-2);
    align-self: center;
  }
  .cl-arrow {
    justify-self: end;
    color: var(--accent);
  }
  .contact-cta {
    margin-top: 2.2rem;
  }

  /* ── FOOTER ── */
  .footer {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem 2rem;
    justify-content: space-between;
    padding: 1.6rem var(--pad);
    border-top: 1px solid var(--ink);
    color: var(--faint);
  }
  .footer .to-top {
    color: var(--ink);
    text-decoration: none;
  }
  .footer .to-top:hover {
    color: var(--accent-ink);
  }

  /* ── REVEAL ── */
  :global(.swiss .reveal) {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  :global(.swiss .reveal.in) {
    opacity: 1;
    transform: none;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 1080px) {
    .work {
      grid-template-columns: 1fr;
    }
    .work-preview {
      display: none;
    }
    .stack-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .stack-cell {
      min-height: 0;
    }
  }
  @media (max-width: 760px) {
    .desktop-links,
    .nav-cv {
      display: none;
    }
    .menu-btn {
      display: inline-flex;
    }
    .hero-body {
      grid-template-columns: 1fr;
    }
    .proof {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .proof-cell:nth-child(2) {
      border-right: 0;
    }
    .proof-cell:nth-child(1),
    .proof-cell:nth-child(2) {
      border-bottom: 1px solid var(--rule);
    }
    .proof-cell.loc {
      grid-column: 1 / -1;
      border-right: 0;
      border-top: 1px solid var(--rule);
    }
    .proof-cell.loc strong.sm {
      white-space: nowrap;
    }
    .sec-head {
      grid-template-columns: 1fr;
    }
    .sec-head h2,
    .sec-head .lead {
      grid-column: 1;
    }
    .work-list .row {
      grid-template-columns: 2rem minmax(0, 1fr);
      gap: 0.5rem 0.9rem;
    }
    .r-stack {
      grid-column: 2;
      text-align: left;
      margin-top: 0.5rem;
      white-space: normal;
    }
    .r-arrow {
      display: none;
    }
    .about-row {
      grid-template-columns: 1fr;
      gap: 0.6rem;
    }
    .stack-grid {
      grid-template-columns: 1fr;
    }
    .contact-links a {
      grid-template-columns: 2rem 1fr;
    }
    .cl-val {
      grid-column: 2;
    }
    .cl-arrow {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .status i {
      animation: none;
    }
    .btn,
    .work-list .row,
    .contact-links a,
    .r-arrow {
      transition: none;
    }
  }
</style>
