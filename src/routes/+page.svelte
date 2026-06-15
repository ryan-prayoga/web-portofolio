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

  const academic = 'S1 Informatika - Universitas Pasundan';
  const email = socials.find((social) => social.name === 'Email');
  const github = socials.find((social) => social.name === 'GitHub');
  const linkedin = socials.find((social) => social.name === 'LinkedIn');
  const visualProjects = projects.filter((project) => project.thumbnail);
  const featuredProjects = projects;

  type Locale = 'en' | 'id';
  let locale = $state<Locale>('en');

  const copy = {
    en: {
      nav: { about: 'About', work: 'Work', stack: 'Stack', contact: 'Contact' },
      eyebrow: 'Tangerang, Indonesia / Full-stack delivery',
      heroRole: 'Full-Stack Engineer & Team Lead',
      heroBody:
        'Building enterprise systems, civic-tech products, developer tooling, and deployment workflows with calm technical ownership.',
      viewWork: 'View Work',
      downloadCv: 'Download CV',
      contact: 'Contact',
      proof: ['Professional experience', 'Engineers led', 'Systems shipped'],
      aboutKicker: 'About',
      aboutHeading: 'From software craft to delivery leadership.',
      aboutRows: [
        { kicker: 'Current role', body: `Hands-on delivery leadership at ${profile.company}, from planning and review to production decisions.` },
        { kicker: 'Academic', body: 'Formal computer science foundation that supports product, architecture, and engineering execution.' },
        { kicker: 'Operating range', body: 'Comfortable moving across product surfaces and production workflow when the system needs ownership.' },
      ],
      workKicker: 'Selected Work',
      workHeading: 'Selected work with production weight.',
      workIntro:
        'A focused index of civic-tech, developer tooling, automation, and deployment systems built for real constraints.',
      open: 'Open',
      stackKicker: 'Stack & Method',
      stackHeading: 'How I build systems that keep moving.',
      stackNotes: {
        backend: 'API, auth, business workflow, integrations, and data processing.',
        frontend: 'Public portals, internal dashboards, PWA, and operational interfaces.',
        mobile: 'Field apps, webview flows, upload media, and cross-device workflows.',
        workflow: 'Deployment, process management, review cadence, and AI-assisted iteration.',
      },
      contactKicker: 'Contact',
      contactHeading: "Let's build the next useful thing.",
      contactBody: 'Open for full-stack, backend, and team lead roles.',
      sendEmail: 'Send Email',
      viewGithub: 'View GitHub',
    },
    id: {
      nav: { about: 'Tentang', work: 'Karya', stack: 'Stack', contact: 'Kontak' },
      eyebrow: 'Tangerang, Indonesia / Pengembangan full-stack',
      heroRole: 'Full-Stack Engineer & Team Lead',
      heroBody:
        'Membangun sistem enterprise, produk civic-tech, developer tooling, dan deployment workflow dengan kepemilikan teknis yang tenang.',
      viewWork: 'Lihat Karya',
      downloadCv: 'Unduh CV',
      contact: 'Kontak',
      proof: ['Pengalaman profesional', 'Engineer dipimpin', 'Sistem dirilis'],
      aboutKicker: 'Tentang',
      aboutHeading: 'Dari kerajinan software ke kepemimpinan delivery.',
      aboutRows: [
        { kicker: 'Peran sekarang', body: `Kepemimpinan delivery yang hands-on di ${profile.company}, dari perencanaan dan review sampai keputusan production.` },
        { kicker: 'Akademik', body: 'Fondasi computer science formal yang menopang product, arsitektur, dan eksekusi engineering.' },
        { kicker: 'Cakupan kerja', body: 'Nyaman berpindah antar product surface dan workflow production saat sistem butuh kepemilikan.' },
      ],
      workKicker: 'Karya Pilihan',
      workHeading: 'Karya pilihan dengan bobot production.',
      workIntro:
        'Indeks ringkas civic-tech, developer tooling, automation, dan sistem deployment yang dibangun untuk constraint nyata.',
      open: 'Buka',
      stackKicker: 'Stack & Metode',
      stackHeading: 'Cara saya membangun sistem yang terus bergerak.',
      stackNotes: {
        backend: 'API, auth, business workflow, integrasi, dan pemrosesan data.',
        frontend: 'Portal publik, dashboard internal, PWA, dan interface operasional.',
        mobile: 'Aplikasi lapangan, flow webview, upload media, dan workflow lintas device.',
        workflow: 'Deployment, process management, ritme review, dan iterasi berbantuan AI.',
      },
      contactKicker: 'Kontak',
      contactHeading: 'Mari bangun hal berguna berikutnya.',
      contactBody: 'Terbuka untuk peran full-stack, backend, dan team lead.',
      sendEmail: 'Kirim Email',
      viewGithub: 'Lihat GitHub',
    },
  };

  const t = $derived(copy[locale]);
  const projectDescriptions = $derived(projectCopy[locale]);

  const navItems = $derived([
    { label: t.nav.about, href: '#about' },
    { label: t.nav.work, href: '#work' },
    { label: t.nav.stack, href: '#stack' },
    { label: t.nav.contact, href: '#contact' },
  ]);

  const proof = $derived([
    { value: profile.experience, label: t.proof[0] },
    { value: String(profile.teamSize), label: t.proof[1] },
    { value: '11+', label: t.proof[2] },
  ]);

  const aboutRows = $derived([
    { kicker: t.aboutRows[0].kicker, title: profile.role, body: t.aboutRows[0].body },
    { kicker: t.aboutRows[1].kicker, title: academic, body: t.aboutRows[1].body },
    { kicker: t.aboutRows[2].kicker, title: 'Backend, frontend, mobile, deploy', body: t.aboutRows[2].body },
  ]);

  const stackOrder: TechStep['category'][] = ['backend', 'frontend', 'mobile', 'workflow'];

  function groupStack(items: TechStep[], notes: Record<TechStep['category'], string>) {
    const grouped: Record<TechStep['category'], TechStep[]> = {
      backend: [],
      frontend: [],
      mobile: [],
      workflow: [],
    };

    for (const item of items) {
      grouped[item.category].push(item);
    }

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

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: SITE_URL,
    image: OG_IMAGE,
    jobTitle: 'Full-Stack Engineer',
    worksFor: {
      '@type': 'Organization',
      name: profile.company,
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Universitas Pasundan',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tangerang',
      addressCountry: 'ID',
    },
    sameAs: [
      github?.url,
      linkedin?.url,
    ].filter(Boolean),
    email: email?.label,
    knowsAbout: [
      'Full-Stack Development',
      'SvelteKit',
      'Go',
      'Laravel',
      'PostgreSQL',
      'DevOps',
      'Technical Leadership',
    ],
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
    const onScroll = () => {
      scrolled = window.scrollY > 32;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
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
  <meta
    name="description"
    content="Portfolio Ryan Prayoga: Full-Stack Engineer dan Team Lead dengan pengalaman enterprise systems, civic-tech, developer tooling, deployment workflow, dan pendidikan S1 Informatika Universitas Pasundan."
  />
  <meta name="author" content="Ryan Prayoga" />
  <meta
    name="keywords"
    content="Ryan Prayoga, Full-Stack Engineer, Team Lead, SvelteKit, Go, Laravel, PostgreSQL, Universitas Pasundan, Indonesia"
  />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href={PAGE_URL} />

  <meta property="og:type" content="profile" />
  <meta property="og:site_name" content="Ryan Prayoga" />
  <meta property="og:title" content="Ryan Prayoga - Full-Stack Engineer & Team Lead" />
  <meta
    property="og:description"
    content="Portfolio with selected work, stack, delivery method, and S1 Informatika Universitas Pasundan academic context."
  />
  <meta property="og:url" content={PAGE_URL} />
  <meta property="og:image" content={OG_IMAGE} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Ryan Prayoga — Full-Stack Engineer & Team Lead" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Ryan Prayoga - Full-Stack Engineer & Team Lead" />
  <meta name="twitter:description" content="Full-Stack Engineer & Team Lead — enterprise systems, civic-tech, developer tooling, and deployment workflows." />
  <meta name="twitter:image" content={OG_IMAGE} />

  {@html `<script type="application/ld+json">${JSON.stringify(personJsonLd)}</` + `script>`}
</svelte:head>

<div class="v5-root">
  <div class="grain" aria-hidden="true"></div>

  <nav class:scrolled class="site-nav">
    <a href="#top" class="brand" onclick={goTo('top')} aria-label="Ryan Prayoga home">
      <span>Ryan Prayoga</span>
    </a>

    <div class="desktop-links" aria-label="Section navigation">
      {#each navItems as item (item.href)}
        <a href={item.href} onclick={goTo(item.href.slice(1))}>{item.label}</a>
      {/each}
    </div>

    <div class="nav-actions">
      <div class="lang-toggle" role="group" aria-label="Language">
        <button
          type="button"
          class:active={locale === 'en'}
          aria-pressed={locale === 'en'}
          onclick={() => setLocale('en')}
        >
          EN
        </button>
        <button
          type="button"
          class:active={locale === 'id'}
          aria-pressed={locale === 'id'}
          onclick={() => setLocale('id')}
        >
          ID
        </button>
      </div>

      <button
        class="menu-button"
        type="button"
        onclick={() => (menuOpen = !menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        {menuOpen ? 'Close' : 'Menu'}
      </button>
    </div>
  </nav>

  {#if menuOpen}
    <div class="mobile-menu">
      {#each navItems as item, i (item.href)}
        <a href={item.href} onclick={goTo(item.href.slice(1))}>
          <span>0{i + 1}</span>
          {item.label}
        </a>
      {/each}
    </div>
  {/if}

  <main>
    <header id="top" class="hero-section">
      <div class="hero-grid" use:reveal={{ selector: '[data-hero]', stagger: 0.06, duration: 0.65 }}>
        <section class="hero-copy" aria-labelledby="v5-title">
          <p data-hero class="eyebrow">{t.eyebrow}</p>
          <h1 id="v5-title" data-hero>{profile.name}</h1>
          <p data-hero class="hero-role">{t.heroRole}</p>
          <p data-hero class="hero-body">
            {t.heroBody}
          </p>

          <div data-hero class="hero-actions">
            <a href="#work" onclick={goTo('work')} class="button primary">{t.viewWork}</a>
            <a href={locale === 'id' ? '/cv/cv-id.pdf' : '/cv/cv-en.pdf'} download class="button secondary">{t.downloadCv}</a>
            <a href={email?.url} class="button secondary">{t.contact}</a>
          </div>
        </section>

        <aside class="evidence-wall" aria-label="Project evidence wall" data-hero>
          <div class="wall-line"></div>
          {#each visualProjects.slice(0, 3) as project, i (project.slug)}
            <figure class="evidence-frame frame-{i + 1}">
              <img src={project.thumbnail} alt="{project.name} preview" />
              <figcaption>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {project.name}
              </figcaption>
            </figure>
          {/each}
          <div class="pipeline-panel">
            <span>Discover</span>
            <span>Build</span>
            <span>Deploy</span>
          </div>
        </aside>
      </div>

      <div class="proof-strip" use:reveal={{ selector: '[data-proof]', stagger: 0.06, duration: 0.6, y: 16 }}>
        {#each proof as item (item.label)}
          <div data-proof>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        {/each}
      </div>
    </header>

    <section id="about" class="section about-section">
      <div class="section-kicker" use:reveal={{ selector: '[data-r]', stagger: 0.1 }}>
        <p data-r>01 / {t.aboutKicker}</p>
        <h2 data-r>{t.aboutHeading}</h2>
      </div>

      <div class="about-layout">
        <div class="academic-mark" use:reveal={{ y: 28 }}>
          <span>S1</span>
          <p>{academic}</p>
        </div>

        <div class="about-rows" use:reveal={{ selector: '[data-about]', stagger: 0.1, y: 20 }}>
          {#each aboutRows as row (row.kicker)}
            <article data-about>
              <p>{row.kicker}</p>
              <h3>{row.title}</h3>
              <span>{row.body}</span>
            </article>
          {/each}
        </div>
      </div>
    </section>

    <section id="work" class="section work-section">
      <div class="work-intro" use:reveal={{ selector: '[data-r]', stagger: 0.1 }}>
        <p data-r>02 / {t.workKicker}</p>
        <h2 data-r>{t.workHeading}</h2>
        <span data-r>
          {t.workIntro}
        </span>
      </div>

      <div class="work-layout">
        <div class="work-preview" aria-hidden="true">
          {#if previewProject?.thumbnail}
            <img src={previewProject.thumbnail} alt="" />
          {:else}
            <div class="preview-fallback">{previewProject?.name}</div>
          {/if}
        </div>

        <div class="work-list" use:reveal={{ selector: '[data-project]', stagger: 0.07, y: 18 }}>
          {#each featuredProjects as project, i (project.slug)}
            {@const desc = projectDescriptions[project.slug]}
            <a
              data-project
              href={project.url ?? project.source ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              onmouseenter={() => (hoveredProject = i)}
              onfocus={() => (hoveredProject = i)}
            >
              <span class="project-number">0{i + 1}</span>
              <span class="project-copy">
                <strong>{project.name}</strong>
                <small>{desc?.summary ?? project.category}</small>
              </span>
              <span class="project-stack">{project.stack.slice(0, 3).join(' / ')}</span>
              <span class="project-arrow">{t.open}</span>
            </a>
          {/each}
        </div>
      </div>
    </section>

    <section id="stack" class="section stack-section">
      <div class="stack-heading" use:reveal={{ selector: '[data-r]', stagger: 0.1 }}>
        <p data-r>03 / {t.stackKicker}</p>
        <h2 data-r>{t.stackHeading}</h2>
      </div>

      <div class="stack-grid" use:reveal={{ selector: '[data-stack]', stagger: 0.08, y: 22 }}>
        {#each stackGroups as group (group.category)}
          <article data-stack>
            <p>{group.title}</p>
            <h3>{group.note}</h3>
            <div>
              {#each group.items as item (item.tech)}
                <span>{item.tech}</span>
              {/each}
            </div>
          </article>
        {/each}
      </div>

      <div class="workflow-strip" use:reveal={{ selector: '[data-flow]', stagger: 0.08, y: 12 }}>
        {#each workflow as item, i (item)}
          <span data-flow>{item}</span>
          {#if i < workflow.length - 1}
            <i aria-hidden="true">/</i>
          {/if}
        {/each}
      </div>
    </section>

    <section id="contact" class="section contact-section">
      <div class="contact-copy" use:reveal={{ selector: '[data-r]', stagger: 0.1 }}>
        <p data-r>04 / {t.contactKicker}</p>
        <h2 data-r>{t.contactHeading}</h2>
        <span data-r>{t.contactBody}</span>
        <div data-r class="contact-actions">
          <a href={email?.url} class="button primary">{t.sendEmail}</a>
          <a href="/cv/cv-en.pdf" download class="button secondary">CV (EN)</a>
          <a href="/cv/cv-id.pdf" download class="button secondary">CV (ID)</a>
          <a href={github?.url} target="_blank" rel="noopener noreferrer" class="button secondary">{t.viewGithub}</a>
        </div>
      </div>

      <div class="contact-links" use:reveal={{ selector: '[data-contact]', stagger: 0.1, y: 18 }}>
        {#each contactLinks as social, i (social?.name)}
          {#if social}
            <a
              data-contact
              href={social.url}
              target={social.url.startsWith('mailto:') ? undefined : '_blank'}
              rel={social.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            >
              <span>0{i + 1} / {social.name}</span>
              <strong>{social.label}</strong>
            </a>
          {/if}
        {/each}
      </div>
    </section>
  </main>
</div>

<style>
  :global(body) {
    background: #11100d;
  }

  :global(html) {
    color-scheme: dark;
  }

  :global(.v5-root *) {
    box-sizing: border-box;
  }

  .v5-root {
    --bg: #11100d;
    --bg-soft: #191713;
    --paper: #f6efe0;
    --paper-muted: #cfc3ad;
    --faint: #b0a489;
    --line: rgba(246, 239, 224, 0.16);
    --line-strong: rgba(246, 239, 224, 0.32);
    --clay: #d2653f;
    --lime: #c8ff64;
    --shadow: rgba(0, 0, 0, 0.46);
    position: relative;
    min-height: 100dvh;
    overflow-x: clip;
    background:
      linear-gradient(rgba(246, 239, 224, 0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(246, 239, 224, 0.035) 1px, transparent 1px),
      radial-gradient(circle at 78% 8%, rgba(210, 101, 63, 0.16), transparent 26rem),
      var(--bg);
    background-size: 5.25rem 5.25rem, 5.25rem 5.25rem, auto, auto;
    color: var(--paper);
    font-family: var(--font-grotesk);
  }

  .grain {
    position: fixed;
    inset: 0;
    z-index: 80;
    pointer-events: none;
    opacity: 0.05;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.8'/%3E%3C/svg%3E");
  }

  .site-nav {
    position: fixed;
    inset: 0 0 auto;
    z-index: 60;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.15rem 2.25rem;
    border-bottom: 1px solid transparent;
    transition:
      background-color 220ms ease,
      border-color 220ms ease;
  }

  .site-nav.scrolled {
    border-color: var(--line);
    background: rgba(17, 16, 13, 0.86);
    backdrop-filter: blur(16px);
  }

  .brand,
  .desktop-links,
  .menu-button,
  .button,
  .eyebrow,
  .section-kicker p,
  .work-intro p,
  .stack-heading p,
  .contact-copy p,
  .project-number,
  .project-stack,
  .project-arrow,
  .workflow-strip,
  .contact-links span {
    font-family: var(--font-mono-v4);
    letter-spacing: 0;
    text-transform: uppercase;
  }

  .brand {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    color: var(--paper);
    text-decoration: none;
  }

  .brand span {
    font-family: var(--font-display);
    font-size: 1.75rem;
    line-height: 1;
    text-transform: none;
  }

  .desktop-links {
    display: flex;
    gap: 2.4rem;
    font-size: 0.72rem;
  }

  .desktop-links a,
  .menu-button {
    color: var(--paper-muted);
    text-decoration: none;
  }

  .desktop-links a:hover,
  .desktop-links a:focus-visible {
    color: var(--paper);
  }

  .menu-button {
    display: none;
    min-height: 2.75rem;
    padding: 0 1rem;
    border: 1px solid var(--line-strong);
    background: transparent;
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .lang-toggle {
    display: inline-flex;
    border: 1px solid var(--line-strong);
  }

  .lang-toggle button {
    min-height: 2.4rem;
    padding: 0 0.7rem;
    border: 0;
    background: transparent;
    color: var(--paper-muted);
    font-family: var(--font-mono-v4);
    font-size: 0.7rem;
    text-transform: uppercase;
    cursor: pointer;
    transition:
      background-color 180ms ease,
      color 180ms ease;
  }

  .lang-toggle button + button {
    border-left: 1px solid var(--line);
  }

  .lang-toggle button.active {
    background: var(--clay);
    color: #17110e;
  }

  .lang-toggle button:focus-visible {
    color: var(--paper);
    outline: 1px solid var(--lime);
  }

  .mobile-menu {
    position: fixed;
    inset: 0;
    z-index: 50;
    display: grid;
    align-content: center;
    gap: 0;
    padding: 5rem 2rem 2rem;
    background: var(--bg);
  }

  .mobile-menu a {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    border-bottom: 1px solid var(--line);
    padding: 1.4rem 0;
    color: var(--paper);
    font-family: var(--font-display);
    font-size: 3rem;
    line-height: 1;
    text-decoration: none;
  }

  .mobile-menu span {
    color: var(--clay);
    font-family: var(--font-mono-v4);
    font-size: 0.8rem;
  }

  .hero-section,
  .section {
    width: min(100% - 4.5rem, 1420px);
    margin-inline: auto;
  }

  .hero-section {
    min-height: 100svh;
    padding-top: 7rem;
  }

  .hero-grid {
    display: grid;
    grid-template-columns: minmax(0, 0.86fr) minmax(28rem, 0.74fr);
    gap: 4rem;
    align-items: center;
    min-height: calc(100svh - 13rem);
  }

  .eyebrow {
    margin: 0 0 1.8rem;
    color: var(--lime);
    font-size: 0.74rem;
  }

  h1,
  h2 {
    margin: 0;
    font-family: var(--font-display);
    font-weight: 400;
    letter-spacing: 0;
  }

  .hero-copy h1 {
    max-width: 13ch;
    color: var(--paper);
    font-size: 7.2rem;
    line-height: 0.9;
  }

  .hero-role {
    margin: 1rem 0 0;
    max-width: 18ch;
    color: var(--clay);
    font-family: var(--font-display);
    font-size: 3.8rem;
    line-height: 0.98;
  }

  .hero-body {
    margin: 2rem 0 0;
    max-width: 42rem;
    color: var(--paper-muted);
    font-size: 1.14rem;
    line-height: 1.75;
  }

  .hero-actions,
  .contact-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 2.4rem;
  }

  .button {
    display: inline-flex;
    min-height: 3.2rem;
    align-items: center;
    justify-content: center;
    padding: 0 1.25rem;
    border: 1px solid var(--line-strong);
    color: var(--paper);
    font-size: 0.74rem;
    text-decoration: none;
    transition:
      transform 180ms ease,
      background-color 180ms ease,
      color 180ms ease,
      border-color 180ms ease;
  }

  .button:hover,
  .button:focus-visible {
    transform: translateY(-2px);
  }

  .button.primary {
    border-color: var(--clay);
    background: var(--clay);
    color: #17110e;
  }

  .button.secondary {
    background: rgba(246, 239, 224, 0.04);
  }

  .evidence-wall {
    position: relative;
    min-height: 35rem;
  }

  .wall-line {
    position: absolute;
    inset: 8% auto 10% 50%;
    width: 1px;
    background: var(--line);
  }

  .evidence-frame,
  .pipeline-panel {
    position: absolute;
    margin: 0;
    border: 1px solid var(--line-strong);
    background: var(--bg-soft);
    box-shadow: 0 2rem 5rem var(--shadow);
  }

  .evidence-frame {
    overflow: hidden;
  }

  .evidence-frame img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(0.84) contrast(1.06);
  }

  .evidence-frame figcaption {
    position: absolute;
    inset: auto 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.8rem 1rem;
    background: rgba(17, 16, 13, 0.82);
    color: var(--paper);
    font-size: 0.82rem;
  }

  .evidence-frame figcaption span {
    color: var(--lime);
    font-family: var(--font-mono-v4);
  }

  .frame-1 {
    top: 1rem;
    right: 1rem;
    width: 68%;
    aspect-ratio: 16 / 10;
  }

  .frame-2 {
    top: 12rem;
    left: 0;
    width: 50%;
    aspect-ratio: 4 / 3;
  }

  .frame-3 {
    right: 0;
    bottom: 1rem;
    width: 58%;
    aspect-ratio: 16 / 10;
  }

  .pipeline-panel {
    left: 2rem;
    bottom: 3rem;
    display: grid;
    gap: 0.8rem;
    min-width: 12rem;
    padding: 1rem;
    color: var(--paper-muted);
    font-family: var(--font-mono-v4);
    font-size: 0.72rem;
  }

  .pipeline-panel span {
    border-bottom: 1px solid var(--line);
    padding-bottom: 0.6rem;
  }

  .pipeline-panel span:last-child {
    border-bottom: 0;
    padding-bottom: 0;
    color: var(--lime);
  }

  .proof-strip {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }

  .proof-strip div {
    min-height: 6rem;
    padding: 1.2rem 1.5rem;
    border-right: 1px solid var(--line);
  }

  .proof-strip div:last-child {
    border-right: 0;
  }

  .proof-strip strong {
    display: block;
    color: var(--paper);
    font-family: var(--font-display);
    font-size: 2.4rem;
    font-weight: 400;
    line-height: 1;
  }

  .proof-strip span {
    display: block;
    margin-top: 0.5rem;
    color: var(--faint);
    font-size: 0.9rem;
  }

  .section {
    padding-block: 9rem;
  }

  .section-kicker,
  .work-intro,
  .stack-heading,
  .contact-section {
    border-top: 1px solid var(--line);
  }

  .section-kicker,
  .work-intro,
  .stack-heading {
    display: grid;
    grid-template-columns: minmax(12rem, 0.34fr) minmax(0, 0.66fr);
    gap: 3rem;
    padding-top: 1.4rem;
  }

  .section-kicker p,
  .work-intro p,
  .stack-heading p,
  .contact-copy p {
    margin: 0;
    color: var(--clay);
    font-size: 0.72rem;
  }

  .section-kicker h2,
  .work-intro h2,
  .stack-heading h2,
  .contact-copy h2 {
    max-width: 13ch;
    color: var(--paper);
    font-size: 5rem;
    line-height: 0.96;
  }

  .about-layout {
    display: grid;
    grid-template-columns: minmax(18rem, 0.42fr) minmax(0, 0.58fr);
    gap: 4rem;
    margin-top: 5rem;
  }

  .academic-mark {
    position: sticky;
    top: 7rem;
    align-self: start;
    border-top: 1px solid var(--line-strong);
    padding-top: 1.2rem;
  }

  .academic-mark span {
    display: block;
    color: var(--clay);
    font-family: var(--font-display);
    font-size: 9rem;
    line-height: 0.84;
  }

  .academic-mark p {
    max-width: 16rem;
    margin: 1.3rem 0 0;
    color: var(--paper);
    font-size: 1.25rem;
    line-height: 1.4;
  }

  .about-rows article {
    display: grid;
    grid-template-columns: minmax(7rem, 0.24fr) minmax(14rem, 0.34fr) minmax(0, 0.42fr);
    gap: 1.4rem;
    border-top: 1px solid var(--line);
    padding: 1.8rem 0;
  }

  .about-rows article:last-child {
    border-bottom: 1px solid var(--line);
  }

  .about-rows p {
    margin: 0;
    color: var(--faint);
    font-family: var(--font-mono-v4);
    font-size: 0.72rem;
    text-transform: uppercase;
  }

  .about-rows h3 {
    margin: 0;
    color: var(--paper);
    font-family: var(--font-display);
    font-size: 2rem;
    font-weight: 400;
    line-height: 1.05;
  }

  .about-rows span {
    color: var(--paper-muted);
    font-size: 0.95rem;
    line-height: 1.7;
  }

  .work-section {
    display: grid;
    grid-template-columns: minmax(18rem, 0.34fr) minmax(0, 0.66fr);
    gap: 4rem;
  }

  .work-intro {
    position: sticky;
    top: 7rem;
    display: block;
    align-self: start;
  }

  .work-intro h2 {
    margin-top: 1.2rem;
  }

  .work-intro span {
    display: block;
    max-width: 22rem;
    margin-top: 1.4rem;
    color: var(--paper-muted);
    line-height: 1.7;
  }

  .work-layout {
    display: grid;
    gap: 2rem;
  }

  .work-preview {
    position: sticky;
    top: 7rem;
    z-index: 1;
    aspect-ratio: 16 / 8;
    overflow: hidden;
    border: 1px solid var(--line-strong);
    background: var(--bg-soft);
    box-shadow: 0 2rem 5rem var(--shadow);
  }

  .work-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(0.82) contrast(1.05);
  }

  .preview-fallback {
    display: grid;
    height: 100%;
    place-items: center;
    color: var(--faint);
    font-family: var(--font-display);
    font-size: 3rem;
  }

  .work-list {
    display: grid;
  }

  .work-list a {
    display: grid;
    grid-template-columns: 4rem minmax(0, 1fr) minmax(10rem, 0.32fr) 4rem;
    gap: 1.2rem;
    align-items: baseline;
    border-bottom: 1px solid var(--line);
    padding: 1.6rem 0;
    color: var(--paper);
    text-decoration: none;
    transition:
      border-color 180ms ease,
      transform 180ms ease;
  }

  .work-list a:first-child {
    border-top: 1px solid var(--line);
  }

  .work-list a:hover,
  .work-list a:focus-visible {
    border-color: var(--line-strong);
    transform: translateX(0.35rem);
  }

  .project-number,
  .project-stack,
  .project-arrow {
    color: var(--faint);
    font-size: 0.68rem;
  }

  .project-copy strong {
    display: block;
    color: var(--paper);
    font-family: var(--font-display);
    font-size: 2.35rem;
    font-weight: 400;
    line-height: 1;
  }

  .project-copy small {
    display: block;
    max-width: 38rem;
    margin-top: 0.75rem;
    color: var(--paper-muted);
    font-size: 0.95rem;
    line-height: 1.65;
  }

  .project-arrow {
    color: var(--lime);
    text-align: right;
  }

  .stack-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    margin-top: 5rem;
    border-top: 1px solid var(--line);
    border-left: 1px solid var(--line);
  }

  .stack-grid article {
    min-height: 25rem;
    padding: 1.4rem;
    border-right: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }

  .stack-grid p {
    margin: 0;
    color: var(--lime);
    font-family: var(--font-mono-v4);
    font-size: 0.72rem;
    text-transform: uppercase;
  }

  .stack-grid h3 {
    min-height: 8rem;
    margin: 1rem 0 2.2rem;
    color: var(--paper);
    font-family: var(--font-display);
    font-size: 2.1rem;
    font-weight: 400;
    line-height: 1.05;
  }

  .stack-grid div {
    display: grid;
    gap: 0.7rem;
  }

  .stack-grid span {
    border-top: 1px solid var(--line);
    padding-top: 0.7rem;
    color: var(--paper-muted);
    font-size: 0.95rem;
  }

  .workflow-strip {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
    margin-top: 2rem;
    color: var(--paper);
    font-size: 0.78rem;
  }

  .workflow-strip i {
    color: var(--clay);
    font-style: normal;
  }

  .contact-section {
    display: grid;
    grid-template-columns: minmax(0, 0.62fr) minmax(18rem, 0.38fr);
    gap: 4rem;
    padding-top: 1.4rem;
  }

  .contact-copy h2 {
    max-width: 11ch;
    margin-top: 1.5rem;
    font-size: 6.6rem;
  }

  .contact-copy > span {
    display: block;
    max-width: 28rem;
    margin-top: 1.8rem;
    color: var(--paper-muted);
    font-size: 1.2rem;
    line-height: 1.65;
  }

  .contact-links {
    align-self: end;
    border-top: 1px solid var(--line);
  }

  .contact-links a {
    display: grid;
    gap: 0.7rem;
    border-bottom: 1px solid var(--line);
    padding: 1.4rem 0;
    color: var(--paper);
    text-decoration: none;
  }

  .contact-links span {
    color: var(--faint);
    font-size: 0.7rem;
  }

  .contact-links strong {
    overflow-wrap: anywhere;
    font-family: var(--font-display);
    font-size: 2rem;
    font-weight: 400;
  }

  @media (max-width: 1120px) {
    .hero-grid,
    .about-layout,
    .work-section,
    .contact-section {
      grid-template-columns: 1fr;
    }

    .hero-copy h1 {
      font-size: 5.8rem;
    }

    .hero-role {
      font-size: 3rem;
    }

    /* Tablet: drop fragile absolute positioning, flow frames in a grid */
    .evidence-wall {
      min-height: 0;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }

    .wall-line {
      display: none;
    }

    .evidence-frame,
    .pipeline-panel {
      position: static;
      width: 100%;
    }

    .evidence-frame {
      aspect-ratio: 16 / 10;
    }

    .pipeline-panel {
      align-self: center;
    }

    .work-intro,
    .academic-mark {
      position: static;
    }

    /* Decorative hover preview is useless without a pointer — hide it */
    .work-preview {
      display: none;
    }

    .stack-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 760px) {
    .site-nav {
      padding: 1rem;
    }

    .desktop-links {
      display: none;
    }

    .menu-button {
      display: inline-flex;
      align-items: center;
    }

    .hero-section,
    .section {
      width: min(100% - 2rem, 1420px);
    }

    .hero-section {
      padding-top: 6rem;
    }

    .hero-grid {
      gap: 2.6rem;
      min-height: auto;
      padding-bottom: 4rem;
    }

    .hero-copy h1 {
      font-size: 4.2rem;
    }

    .hero-role {
      font-size: 2.35rem;
    }

    .hero-body {
      font-size: 1rem;
    }

    .evidence-wall {
      grid-template-columns: 1fr;
    }

    .evidence-frame {
      width: 100%;
    }

    .proof-strip,
    .stack-grid {
      grid-template-columns: 1fr;
    }

    .proof-strip div,
    .proof-strip div:last-child {
      border-right: 0;
      border-bottom: 1px solid var(--line);
    }

    .proof-strip div:last-child {
      border-bottom: 0;
    }

    .section {
      padding-block: 6rem;
    }

    .section-kicker,
    .work-intro,
    .stack-heading {
      grid-template-columns: 1fr;
      gap: 1.2rem;
    }

    .section-kicker h2,
    .work-intro h2,
    .stack-heading h2 {
      font-size: 3.3rem;
    }

    .academic-mark span {
      font-size: 6rem;
    }

    .about-rows article,
    .work-list a {
      grid-template-columns: 1fr;
      gap: 0.9rem;
    }

    .project-copy strong {
      font-size: 2rem;
    }

    .project-arrow {
      text-align: left;
    }

    .stack-grid article {
      min-height: auto;
    }

    .stack-grid h3 {
      min-height: auto;
    }

    .contact-copy h2 {
      font-size: 4rem;
    }
  }
</style>
