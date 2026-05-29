<script lang="ts">
  import { onMount } from 'svelte';
  import logo from '$lib/assets/logo.png';
  import { profile } from '$lib/data/profile';
  import { projects } from '$lib/data/projects';
  import { socials } from '$lib/data/socials';
  import { techJourney } from '$lib/data/techJourney';

  type Locale = 'id' | 'en';

  let locale = $state<Locale>('id');
  let workSectionEl = $state<HTMLElement | null>(null);
  let journeyBlockEl = $state<HTMLElement | null>(null);
  let workProgress = $state(0);
  let journeyProgress = $state(0);

  const projectTranslations = {
    brunogen: {
      id: {
        category: 'Developer Tooling',
        summary:
          'Developer tool yang membaca Laravel, Express, dan Go API lalu menghasilkan OpenAPI dan Bruno collection siap pakai.',
        focus:
          'Route scanning, request/response inference, regression fixtures, publish workflow, dan package hygiene untuk npm.',
        impact: 'Public developer tooling dengan release history dan test pipeline yang jelas.',
        status: 'Public di npm dengan release aktif'
      },
      en: {
        category: 'Developer Tooling',
        summary:
          'A developer tool that reads Laravel, Express, and Go APIs and generates ready-to-use OpenAPI specs and Bruno collections.',
        focus:
          'Route scanning, request/response inference, regression fixtures, publish workflow, and package hygiene for npm.',
        impact: 'Public developer tooling with a clear release history and test pipeline.',
        status: 'Public on npm with active releases'
      }
    },
    jedug: {
      id: {
        category: 'Civic Tech',
        summary:
          'Platform pelaporan jalan rusak berbasis peta, upload bukti, anonymous device, moderasi admin, dan statistik publik.',
        focus:
          'Membangun flow submit laporan, smart merge issue terdekat, storage hardening, map clustering, heatmap, dan admin moderation.',
        impact: 'Case study civic-tech yang menunjukkan product thinking, geospatial data, dan production hardening.',
        status: 'Case study civic-tech production-ready'
      },
      en: {
        category: 'Civic Tech',
        summary:
          'A map-based road damage reporting platform with evidence upload, anonymous device IDs, admin moderation, and public statistics.',
        focus:
          'Built the report submission flow, smart merging of nearby issues, storage hardening, map clustering, heatmaps, and admin moderation.',
        impact: 'A civic-tech case study showcasing product thinking, geospatial data, and production hardening.',
        status: 'Production-ready civic-tech case study'
      }
    },
    'media-sync': {
      id: {
        category: 'Cross-Device System',
        summary:
          'Sistem sync media Android ke dashboard web dengan consent, thumbnail-first gallery, original request, dan bulk download.',
        focus:
          'Device bootstrap, metadata sync, thumbnail pipeline, request original file, auto-upload dari Android, dan deploy VPS.',
        impact: 'Membuktikan kemampuan membangun workflow lintas device, backend, web, dan operasi production.',
        status: 'Berjalan di Android, web, dan VPS'
      },
      en: {
        category: 'Cross-Device System',
        summary:
          'An Android-to-web media sync system with consent, a thumbnail-first gallery, original-file requests, and bulk download.',
        focus:
          'Device bootstrap, metadata sync, thumbnail pipeline, original-file requests, auto-upload from Android, and VPS deployment.',
        impact: 'Proves the ability to build workflows spanning device, backend, web, and production operations.',
        status: 'Running across Android, web, and VPS'
      }
    },
    messhub: {
      id: {
        category: 'Internal Operations',
        summary:
          'Aplikasi operasional mess untuk kas, WiFi, feed, anggota, proposal, wallet, dan notifikasi internal.',
        focus:
          'Merapikan kebutuhan operasional harian menjadi dashboard mobile-first dengan auth, role, dan deploy split frontend/backend.',
        impact: 'Contoh produk internal yang kecil tapi production-minded: jelas domainnya, jelas workflow-nya.',
        status: 'Produk internal dengan CI/CD'
      },
      en: {
        category: 'Internal Operations',
        summary:
          'An operations app for a shared residence covering cash, WiFi, feed, members, proposals, wallet, and internal notifications.',
        focus:
          'Turned daily operational needs into a mobile-first dashboard with auth, roles, and split frontend/backend deployment.',
        impact: 'A small but production-minded internal product with a clear domain and workflow.',
        status: 'Internal product with CI/CD'
      }
    },
    marbot: {
      id: {
        category: 'Automation',
        summary:
          'Telegram bot dan webview untuk akses layanan SIMPEG seperti absensi, gaji, cuti, laporan, dan direktori pegawai.',
        focus:
          'Integrasi layanan pegawai ke interface chat dan webview dengan state management, session, dan formatter output.',
        impact: 'Menunjukkan kemampuan membuat automation layer di atas sistem existing yang tidak selalu punya API ideal.',
        status: 'Automation layer di atas SIMPEG'
      },
      en: {
        category: 'Automation',
        summary:
          'A Telegram bot and webview for accessing employee services such as attendance, payroll, leave, reports, and the staff directory.',
        focus:
          'Integrated employee services into chat and webview interfaces with state management, sessions, and output formatting.',
        impact: 'Shows the ability to build an automation layer on top of existing systems that lack an ideal API.',
        status: 'Automation layer over SIMPEG'
      }
    },
    'gas-cli': {
      id: {
        category: 'DevOps Tooling',
        summary:
          'CLI Bash untuk build dan deploy Go/Node web apps via PM2, Nginx, metadata SQLite, dan mode non-interactive CI.',
        focus:
          'Stack detection, build strategy, deploy wizard, preview config, metadata app, dan fallback terminal UX.',
        impact: 'Mengubah pola deploy VPS yang repetitif menjadi workflow yang lebih cepat dan konsisten.',
        status: 'Dipakai untuk deploy VPS rutin'
      },
      en: {
        category: 'DevOps Tooling',
        summary:
          'A Bash CLI to build and deploy Go/Node web apps via PM2, Nginx, SQLite metadata, and a non-interactive CI mode.',
        focus:
          'Stack detection, build strategy, deploy wizard, preview config, app metadata, and a terminal UX fallback.',
        impact: 'Turns repetitive VPS deploys into a faster, more consistent workflow.',
        status: 'Used for routine VPS deploys'
      }
    }
  } as const;

  const translations = {
    id: {
      metaTitle: 'Ryan Prayoga — Portfolio',
      metaDescription:
        'Portfolio Ryan Prayoga, Full-Stack Engineer dan Team Leader yang fokus pada delivery, systems thinking, dan engineering execution.',
      skipLink: 'Lewati ke konten',
      nav: {
        proof: 'Bukti',
        work: 'Project',
        method: 'Cara Kerja',
        contact: 'Kontak'
      },
      languageLabel: 'Pilih bahasa',
      hero: {
        eyebrow: 'Full-Stack Engineer / Team Leader',
        deck:
          'Membangun sistem enterprise, memimpin tim, dan menjaga delivery tetap tenang di bawah tekanan.',
        body:
          'Full-Stack Engineer dengan pengalaman 4+ tahun membangun aplikasi web dan mobile berskala enterprise. Saat ini memimpin tim engineering dan terus mengeksplorasi teknologi modern termasuk AI.',
        primaryCta: 'Lihat selected work',
        secondaryCta: 'Mulai percakapan',
        signals: ['Enterprise delivery', 'Team leadership', 'AI-assisted workflow'],
        readout: {
          role: 'Role',
          roleValue: 'Team Leader',
          mode: 'Mode',
          modeValue: 'Hands-on',
          base: 'Base',
          baseValue: profile.location
        }
      },
      metrics: [
        {
          value: '4+',
          label: 'Tahun',
          body: 'Pengalaman profesional membangun aplikasi web dan mobile berskala enterprise.'
        },
        {
          value: '1+',
          label: 'Tahun Leadership',
          body: 'Memimpin ritme kerja, task management, dan delivery tim secara konsisten.'
        },
        {
          value: 'Staging',
          label: '→ Production',
          body: 'Terbiasa menangani deployment workflow dari development hingga production.'
        }
      ],
      proof: {
        eyebrow: 'Bukti',
        title: 'Delivery yang melampaui fase prototype.',
        body:
          'Nilai utamanya bukan hanya kemampuan menulis kode, tapi menjaga sistem tetap bergerak saat scope membesar, stakeholder bertambah, dan kualitas harus tetap naik.',
        items: [
          {
            value: '4+ tahun',
            label: 'Years Shipping',
            note: 'Enterprise web dan mobile delivery dengan scope yang nyata.'
          },
          {
            value: `${profile.teamSize}`,
            label: 'Team in Motion',
            note: 'Memimpin ritme task, review, dan quality bar secara aktif.'
          },
          {
            value: 'Multi',
            label: 'Stack Coverage',
            note: 'Backend, frontend, mobile, deployment, dan workflow AI.'
          },
          {
            value: 'Calm',
            label: 'Under Pressure',
            note: 'Terbiasa menjaga kualitas ketika project besar bergerak cepat.'
          }
        ]
      },
      story: {
        eyebrow: 'Perjalanan',
        title: 'Berangkat dari coding, lalu tumbuh ke delivery dan leadership.',
        paragraphs: [
          'Perjalanan profesional saya dimulai sejak 2021. Sejak saat itu saya aktif membangun aplikasi web dan mobile untuk kebutuhan enterprise dengan standar delivery yang tinggi.',
          'Dari developer, saya berkembang menjadi Team Leader yang tetap hands-on. Saya mengatur ritme kerja, menjaga kualitas implementasi, dan memastikan setiap project bergerak sesuai target.'
        ],
        meta: [
          {
            label: 'Experience Window',
            value: '2021 — Sekarang'
          },
          {
            label: 'Current Base',
            value: profile.company
          },
          {
            label: 'Education',
            value: 'Universitas Pasundan — Teknik Informatika · 2021 — Sekarang'
          },
          {
            label: 'Location',
            value: profile.location
          }
        ]
      },
      work: {
        eyebrow: 'Selected Work',
        title: 'Project besar, kompleks, dan dibangun untuk dipakai sungguhan.',
        body:
          'Mayoritas work di bawah ini adalah enterprise delivery, institutional system, atau public-facing platform dengan constraint operasional yang nyata.',
        role: 'Role',
        focus: 'Focus',
        impact: 'Impact',
        status: 'Status',
        privateDelivery: 'Private delivery'
      },
      method: {
        eyebrow: 'Cara Kerja',
        title: 'Pimpin, review, deploy, adapt.',
        body:
          'Cara kerja saya dibentuk oleh project yang harus stabil, tim yang perlu ritme, dan kebutuhan untuk tetap relevan terhadap stack yang terus berubah.',
        items: [
          {
            title: 'Lead the cadence',
            body:
              'Memimpin tim secara aktif, menjaga prioritas, kapasitas, dan tempo delivery agar tetap sehat.',
            points: [
              `Tim aktif ${profile.teamSize} orang`,
              'Distribusi task berbasis konteks dan urgensi',
              'Tetap hands-on ketika keputusan teknis perlu dipercepat'
            ]
          },
          {
            title: 'Review with rigor',
            body:
              'Code review dipakai untuk menjaga kualitas sistem, bukan sekadar formalitas pull request.',
            points: [
              'Menjaga konsistensi arsitektur dan maintainability',
              'Mencegah technical debt menumpuk tanpa arah',
              'Membaca implementasi dengan konteks product dan operasional'
            ]
          },
          {
            title: 'Ship with operations in mind',
            body:
              'Bergerak dari development ke staging lalu production dengan proses yang tenang dan bisa dipercaya.',
            points: [
              'Validasi sebelum release dan monitoring setelahnya',
              'Terbiasa dengan Ubuntu Server, PM2, Supervisor, Nginx, dan SSH',
              'Fokus pada stabilitas, bukan cuma launch'
            ]
          }
        ]
      },
      journey: {
        eyebrow: 'Stack Arc',
        title: 'Teknologi berubah, standar kerja tidak.',
        body:
          'Dari Laravel sampai SvelteKit, dari web sampai mobile, dan kini workflow berbasis AI. Adaptasi bergerak mengikuti kebutuhan nyata project.',
        periods: [
          'Foundation',
          'Frontend Entry',
          'Frontend Evolution',
          'Performance Stack',
          'Modern Frontend',
          'Mobile',
          'Current Evolution'
        ],
        categories: ['Backend', 'Frontend', 'Frontend', 'Backend', 'Frontend', 'Mobile', 'Workflow']
      },
      contact: {
        eyebrow: 'Kontak',
        title: 'Kalau brief-nya kompleks, biasanya itu justru menarik.',
        body:
          'Terbuka untuk kolaborasi, diskusi engineering, atau peran yang butuh kombinasi antara teknis, delivery, dan leadership.'
      }
    },
    en: {
      metaTitle: 'Ryan Prayoga — Portfolio',
      metaDescription:
        'Portfolio of Ryan Prayoga, a Full-Stack Engineer and Team Leader focused on delivery, systems thinking, and engineering execution.',
      skipLink: 'Skip to content',
      nav: {
        proof: 'Proof',
        work: 'Work',
        method: 'Method',
        contact: 'Contact'
      },
      languageLabel: 'Choose language',
      hero: {
        eyebrow: 'Full-Stack Engineer / Team Leader',
        deck:
          'Building enterprise systems, leading teams, and keeping delivery calm under pressure.',
        body:
          'Full-Stack Engineer with 4+ years of experience building enterprise-scale web and mobile products. Currently leading an engineering team while continuously exploring modern technologies, including AI.',
        primaryCta: 'See selected work',
        secondaryCta: 'Start a conversation',
        signals: ['Enterprise delivery', 'Team leadership', 'AI-assisted workflow'],
        readout: {
          role: 'Role',
          roleValue: 'Team Leader',
          mode: 'Mode',
          modeValue: 'Hands-on',
          base: 'Base',
          baseValue: profile.location
        }
      },
      metrics: [
        {
          value: '4+',
          label: 'Years',
          body: 'Professional experience building enterprise-scale web and mobile applications.'
        },
        {
          value: '1+',
          label: 'Years in Leadership',
          body: 'Leading team cadence, task management, and delivery with consistency.'
        },
        {
          value: 'Staging',
          label: '→ Production',
          body: 'Comfortable running deployment workflows from development to production.'
        }
      ],
      proof: {
        eyebrow: 'Proof',
        title: 'Delivery beyond the prototype phase.',
        body:
          'The real value is not just writing code, but keeping systems moving when scope grows, stakeholders expand, and quality still needs to go up.',
        items: [
          {
            value: '4+ years',
            label: 'Years Shipping',
            note: 'Enterprise web and mobile delivery with real operational scope.'
          },
          {
            value: `${profile.teamSize}`,
            label: 'Team in Motion',
            note: 'Actively leading team rhythm, reviews, and the quality bar.'
          },
          {
            value: 'Multi',
            label: 'Stack Coverage',
            note: 'Backend, frontend, mobile, deployment, and AI-assisted workflows.'
          },
          {
            value: 'Calm',
            label: 'Under Pressure',
            note: 'Used to protecting quality when large projects move fast.'
          }
        ]
      },
      story: {
        eyebrow: 'Journey',
        title: 'Started from coding, then grew into delivery and leadership.',
        paragraphs: [
          'My professional journey started in 2021. Since then, I have been actively building web and mobile products for enterprise needs with a high delivery standard.',
          'From developer, I grew into a Team Leader who remains hands-on. I manage team rhythm, maintain implementation quality, and make sure projects move with clarity.'
        ],
        meta: [
          {
            label: 'Experience Window',
            value: '2021 — Present'
          },
          {
            label: 'Current Base',
            value: profile.company
          },
          {
            label: 'Education',
            value: 'Universitas Pasundan — Informatics Engineering · 2021 — Present'
          },
          {
            label: 'Location',
            value: profile.location
          }
        ]
      },
      work: {
        eyebrow: 'Selected Work',
        title: 'Large-scale systems built for real use.',
        body:
          'Most of the work below sits in enterprise delivery, institutional systems, or public-facing platforms with real operational constraints.',
        role: 'Role',
        focus: 'Focus',
        impact: 'Impact',
        status: 'Status',
        privateDelivery: 'Private delivery'
      },
      method: {
        eyebrow: 'Operating Method',
        title: 'Lead, review, deploy, adapt.',
        body:
          'My operating style is shaped by projects that need stability, teams that need cadence, and stacks that keep evolving.',
        items: [
          {
            title: 'Lead the cadence',
            body:
              'Actively guiding team priorities, capacity, and delivery rhythm so execution stays healthy.',
            points: [
              `Active team of ${profile.teamSize}`,
              'Task distribution based on urgency and context',
              'Remaining hands-on when technical decisions need to move faster'
            ]
          },
          {
            title: 'Review with rigor',
            body:
              'Code review is used to protect system quality, not as a formality around pull requests.',
            points: [
              'Protecting architectural consistency and maintainability',
              'Preventing technical debt from growing without intent',
              'Reading implementation with product and operational context'
            ]
          },
          {
            title: 'Ship with operations in mind',
            body:
              'Moving from development to staging and production with a process that stays calm and trustworthy.',
            points: [
              'Validation before release and monitoring after launch',
              'Comfortable with Ubuntu Server, PM2, Supervisor, Nginx, and SSH',
              'Focused on stability, not just launch velocity'
            ]
          }
        ]
      },
      journey: {
        eyebrow: 'Stack Arc',
        title: 'Technology changes. Working standards should not.',
        body:
          'From Laravel to SvelteKit, from web to mobile, and now AI-assisted workflows. The adaptation follows real project needs.',
        periods: [
          'Foundation',
          'Frontend Entry',
          'Frontend Evolution',
          'Performance Stack',
          'Modern Frontend',
          'Mobile',
          'Current Evolution'
        ],
        categories: ['Backend', 'Frontend', 'Frontend', 'Backend', 'Frontend', 'Mobile', 'Workflow']
      },
      contact: {
        eyebrow: 'Contact',
        title: 'If the brief is complex, that usually makes it more interesting.',
        body:
          'Open to collaboration, engineering conversations, or roles that need a mix of technical depth, delivery discipline, and leadership.'
      }
    }
  } as const;

  const copy = $derived(translations[locale]);

  const localizedProjects = $derived(
    projects.map((project, index) => {
      const entry = projectTranslations[project.slug as keyof typeof projectTranslations];
      const translated = entry?.[locale] ?? {
        category: project.category,
        summary: project.summary,
        focus: project.focus,
        impact: project.impact,
        status: project.year
      };

      return {
        ...project,
        number: `${index + 1}`.padStart(2, '0'),
        category: translated.category,
        summary: translated.summary,
        focus: translated.focus,
        impact: translated.impact,
        status: translated.status
      };
    })
  );

  const localizedJourney = $derived(
    techJourney.map((item, index) => ({
      ...item,
      number: `${index + 1}`.padStart(2, '0'),
      period: copy.journey.periods[index],
      categoryLabel: copy.journey.categories[index]
    }))
  );

  const contactLinks = $derived(
    socials.map((social) => ({
      href: social.url,
      title: social.name,
      subtitle: social.label
    }))
  );

  const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

  const getScrollProgress = (element: HTMLElement | null) => {
    if (!element) return 0;

    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const totalDistance = rect.height + viewportHeight;

    return clamp((viewportHeight - rect.top) / totalDistance);
  };

  onMount(() => {
    let frame = 0;

    const syncScrollMotion = () => {
      frame = 0;
      workProgress = getScrollProgress(workSectionEl);
      journeyProgress = getScrollProgress(journeyBlockEl);
    };

    const queueScrollMotion = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(syncScrollMotion);
    };

    queueScrollMotion();

    window.addEventListener('scroll', queueScrollMotion, { passive: true });
    window.addEventListener('resize', queueScrollMotion);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener('scroll', queueScrollMotion);
      window.removeEventListener('resize', queueScrollMotion);
    };
  });
</script>

<svelte:head>
  <title>{copy.metaTitle}</title>
  <meta name="description" content={copy.metaDescription} />
</svelte:head>

<div class="portfolio-page">
  <a class="skip-link" href="#content">{copy.skipLink}</a>

  <header class="topbar">
    <a class="brand" href="/v2#top" aria-label="Ryan Prayoga home">
      <img src={logo} alt="RP Logo" />
      <span>{profile.name}</span>
    </a>

    <nav aria-label="Section navigation">
      <a href="#proof">{copy.nav.proof}</a>
      <a href="#work">{copy.nav.work}</a>
      <a href="#method">{copy.nav.method}</a>
      <a href="#contact">{copy.nav.contact}</a>
    </nav>

    <div class="locale-switch" role="group" aria-label={copy.languageLabel}>
      <button type="button" class:active={locale === 'id'} onclick={() => (locale = 'id')}>
        ID
      </button>
      <button type="button" class:active={locale === 'en'} onclick={() => (locale = 'en')}>
        EN
      </button>
    </div>
  </header>

  <main id="content">
    <section class="hero" id="top">
      <div class="hero-copy">
        <p class="eyebrow">{copy.hero.eyebrow}</p>
        <h1>{profile.name}</h1>
        <p class="hero-deck">{copy.hero.deck}</p>
        <p class="hero-body">{copy.hero.body}</p>

        <div class="hero-actions">
          <a class="button button-solid" href="#work">{copy.hero.primaryCta}</a>
          <a class="button button-ghost" href="#contact">{copy.hero.secondaryCta}</a>
        </div>

        <div class="hero-signals" aria-label="Core strengths">
          {#each copy.hero.signals as signal}
            <span>{signal}</span>
          {/each}
        </div>
      </div>

      <div class="hero-visual" aria-hidden="true">
        <div class="visual-frame">
          <div class="visual-grid"></div>
          <div class="visual-orbit visual-orbit-a"></div>
          <div class="visual-orbit visual-orbit-b"></div>
          <div class="visual-orbit visual-orbit-c"></div>
          <div class="visual-pulse pulse-a"></div>
          <div class="visual-pulse pulse-b"></div>
          <div class="visual-pulse pulse-c"></div>
          <div class="visual-mark">RP</div>

          <div class="visual-readout">
            <div>
              <span>{copy.hero.readout.role}</span>
              <strong>{copy.hero.readout.roleValue}</strong>
            </div>
            <div>
              <span>{copy.hero.readout.mode}</span>
              <strong>{copy.hero.readout.modeValue}</strong>
            </div>
            <div>
              <span>{copy.hero.readout.base}</span>
              <strong>{copy.hero.readout.baseValue}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="metrics">
      {#each copy.metrics as item}
        <article>
          <strong>{item.value}</strong>
          <h2>{item.label}</h2>
          <p>{item.body}</p>
        </article>
      {/each}
    </section>

    <section class="section" id="proof">
      <div class="section-heading">
        <p class="eyebrow">{copy.proof.eyebrow}</p>
        <div>
          <h2>{copy.proof.title}</h2>
          <p>{copy.proof.body}</p>
        </div>
      </div>

      <div class="proof-grid">
        {#each copy.proof.items as item}
          <article class="proof-card">
            <strong>{item.value}</strong>
            <h3>{item.label}</h3>
            <p>{item.note}</p>
          </article>
        {/each}
      </div>

      <div class="story-grid">
        <div class="story-copy">
          <p class="eyebrow">{copy.story.eyebrow}</p>
          <h3>{copy.story.title}</h3>
          {#each copy.story.paragraphs as paragraph}
            <p>{paragraph}</p>
          {/each}
        </div>

        <dl class="story-meta">
          {#each copy.story.meta as item}
            <div>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          {/each}
        </dl>
      </div>
    </section>

    <section
      class="section work-section"
      id="work"
      bind:this={workSectionEl}
      style={`--work-progress:${workProgress};`}
    >
      <div class="work-shell">
        <div class="work-intro">
          <p class="eyebrow">{copy.work.eyebrow}</p>
          <h2>{copy.work.title}</h2>
          <p class="work-body">{copy.work.body}</p>
        </div>

        <div class="work-list">
          {#each localizedProjects as item, index}
            <article
              class="work-item"
              id={`case-${item.slug}`}
              style={`--work-depth:${index % 2 === 0 ? 24 + index * 8 : -(24 + index * 8)}px;`}
            >
              <div class="work-head">
                <strong>{item.number}</strong>
                <div>
                  <p>{item.category} / {item.year}</p>
                  <h3>{item.name}</h3>
                </div>
              </div>

              <div class="work-layout">
                <div class={`case-visual case-${item.placeholderType}`} aria-hidden="true">
                {#if item.placeholderType === 'dashboard'}
                  <div class="scene dashboard-scene">
                    <div class="scene-topbar"></div>
                    <div class="scene-bars">
                      {#each [54, 78, 46, 66, 59, 84, 52] as bar}
                        <span style={`--bar:${bar}%`}></span>
                      {/each}
                    </div>
                    <div class="scene-lines">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                {:else if item.placeholderType === 'content-platform'}
                  <div class="scene content-scene">
                    <div class="content-side">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div class="content-main">
                      <div class="content-hero"></div>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                {:else if item.placeholderType === 'map-interface'}
                  <div class="scene map-scene">
                    <div class="map-grid"></div>
                    <span class="map-path path-a"></span>
                    <span class="map-path path-b"></span>
                    <span class="map-dot dot-a"></span>
                    <span class="map-dot dot-b"></span>
                    <span class="map-dot dot-c"></span>
                  </div>
                {:else}
                  <div class="scene data-scene">
                    <div class="data-toolbar">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div class="data-rows">
                      <div><span></span><span></span><span></span></div>
                      <div><span></span><span></span><span></span></div>
                      <div><span></span><span></span><span></span></div>
                    </div>
                  </div>
                {/if}
              </div>

                <div class="work-copy">
                  <p class="summary">{item.summary}</p>

                  <div class="spec-grid">
                    <div>
                      <span>{copy.work.role}</span>
                      <p>{item.role}</p>
                    </div>
                    <div>
                      <span>{copy.work.focus}</span>
                      <p>{item.focus}</p>
                    </div>
                    <div>
                      <span>{copy.work.impact}</span>
                      <p>{item.impact}</p>
                    </div>
                    <div>
                      <span>{copy.work.status}</span>
                      <p>{item.status}</p>
                    </div>
                  </div>

                  <div class="pill-row pill-row-strong">
                    {#each item.stack as stack}
                      <span>{stack}</span>
                    {/each}
                  </div>

                  <div class="pill-row">
                    <span>{copy.work.privateDelivery}</span>
                    {#each item.tags as tag}
                      <span>{tag}</span>
                    {/each}
                  </div>
                </div>

              </div>
            </article>
          {/each}
        </div>
      </div>
    </section>

    <section class="section" id="method">
      <div class="section-heading">
        <p class="eyebrow">{copy.method.eyebrow}</p>
        <div>
          <h2>{copy.method.title}</h2>
          <p>{copy.method.body}</p>
        </div>
      </div>

      <div class="method-list">
        {#each copy.method.items as item, index}
          <article class="method-item">
            <strong>{`${index + 1}`.padStart(2, '0')}</strong>
            <div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
            <ul>
              {#each item.points as point}
                <li>{point}</li>
              {/each}
            </ul>
          </article>
        {/each}
      </div>

      <div
        class="journey-block"
        bind:this={journeyBlockEl}
        style={`--journey-progress:${journeyProgress};`}
      >
        <div class="journey-stage">
          <div class="journey-copy">
            <p class="eyebrow">{copy.journey.eyebrow}</p>
            <h3>{copy.journey.title}</h3>
            <p>{copy.journey.body}</p>
          </div>

          <div class="journey-track">
            {#each localizedJourney as item, index}
              <article
                class="journey-card"
                style={`--journey-depth:${index % 2 === 0 ? 26 + index * 5 : -(26 + index * 5)}px;`}
              >
                <strong>{item.number}</strong>
                <p>{item.period}</p>
                <h4>{item.tech}</h4>
                <small>{item.categoryLabel}</small>
              </article>
            {/each}
          </div>
        </div>
      </div>
    </section>

    <section class="section contact-section" id="contact">
      <div class="section-heading contact-heading">
        <p class="eyebrow">{copy.contact.eyebrow}</p>
        <div>
          <h2>{copy.contact.title}</h2>
          <p>{copy.contact.body}</p>
        </div>
      </div>

      <div class="contact-grid">
        {#each contactLinks as item}
          <a href={item.href} target="_blank" rel="noopener noreferrer">
            <span>{item.title}</span>
            <small>{item.subtitle}</small>
            <strong>&#8599;</strong>
          </a>
        {/each}
      </div>
    </section>
  </main>
</div>

<style>
  :global(html) {
    color-scheme: dark;
  }

  :global(body) {
    background:
      radial-gradient(circle at top, rgba(45, 212, 255, 0.12), transparent 34%),
      linear-gradient(180deg, #06111d 0%, #040913 100%);
  }

  :global([id]) {
    scroll-margin-top: 6rem;
  }

  .portfolio-page {
    --border: rgba(157, 181, 206, 0.14);
    --border-strong: rgba(45, 212, 255, 0.28);
    --text: #eef5ff;
    --muted: rgba(204, 218, 239, 0.72);
    --dim: rgba(204, 218, 239, 0.44);
    --accent: #2dd4ff;
    min-height: 100vh;
    color: var(--text);
    background:
      linear-gradient(rgba(86, 108, 136, 0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(86, 108, 136, 0.08) 1px, transparent 1px),
      linear-gradient(180deg, rgba(7, 17, 29, 0.25), rgba(4, 9, 19, 0.92));
    background-size: 72px 72px, 72px 72px, auto;
    overflow-x: clip;
  }

  .skip-link {
    position: absolute;
    left: 1rem;
    top: 1rem;
    transform: translateY(-180%);
    z-index: 100;
    padding: 0.75rem 1rem;
    border: 1px solid var(--border-strong);
    background: rgba(4, 9, 19, 0.94);
    color: var(--text);
    text-decoration: none;
  }

  .skip-link:focus-visible {
    transform: translateY(0);
  }

  .topbar,
  .hero,
  .metrics,
  .section {
    width: min(1280px, calc(100vw - 2.8rem));
    margin-left: auto;
    margin-right: auto;
  }

  .topbar {
    position: sticky;
    top: 1rem;
    z-index: 40;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
    padding: 0.95rem 1.2rem;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: rgba(4, 9, 19, 0.74);
    backdrop-filter: blur(22px);
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: 0.85rem;
    color: var(--text);
    text-decoration: none;
    font-family: var(--font-heading);
    font-weight: 600;
  }

  .brand img {
    width: 2.15rem;
    height: 2.15rem;
    object-fit: contain;
  }

  .topbar nav {
    display: flex;
    justify-content: center;
    gap: 1.2rem;
    flex-wrap: wrap;
  }

  .topbar nav a,
  .button,
  .contact-grid a,
  .locale-switch button {
    transition:
      color 220ms ease,
      border-color 220ms ease,
      background-color 220ms ease,
      transform 220ms ease,
      box-shadow 220ms ease;
  }

  .topbar nav a {
    color: var(--dim);
    text-decoration: none;
    font-size: 0.92rem;
  }

  .topbar nav a:hover,
  .topbar nav a:focus-visible {
    color: var(--text);
  }

  .locale-switch {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.3rem;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.03);
  }

  .locale-switch button {
    min-width: 2.8rem;
    min-height: 2.2rem;
    padding: 0 0.7rem;
    border-radius: 999px;
    color: var(--dim);
    cursor: pointer;
  }

  .locale-switch button.active {
    background: var(--accent);
    color: #04111d;
    font-weight: 700;
  }

  .hero {
    display: grid;
    grid-template-columns: minmax(0, 1.08fr) minmax(320px, 0.92fr);
    gap: clamp(2rem, 5vw, 4.5rem);
    align-items: center;
    padding-top: 5rem;
    min-height: calc(100svh - 5rem);
  }

  .eyebrow {
    margin: 0 0 1rem;
    color: var(--accent);
    font-size: 0.78rem;
    letter-spacing: 0.24em;
    text-transform: uppercase;
  }

  .hero-copy h1,
  .section-heading h2,
  .work-intro h2 {
    margin: 0;
    font-family: var(--font-heading);
    letter-spacing: -0.07em;
    line-height: 0.93;
  }

  .hero-copy h1 {
    font-size: clamp(4rem, 10vw, 8.2rem);
    text-wrap: balance;
  }

  .hero-deck {
    max-width: 29rem;
    margin: 1.4rem 0 0;
    font-family: var(--font-heading);
    font-size: clamp(1.3rem, 2vw, 1.9rem);
    line-height: 1.06;
    color: rgba(238, 245, 255, 0.92);
  }

  .hero-body,
  .section-heading p,
  .work-body,
  .story-copy p,
  .proof-card p,
  .summary,
  .spec-grid p,
  .method-item p,
  .journey-copy p {
    color: var(--muted);
    line-height: 1.8;
  }

  .hero-body {
    max-width: 33rem;
    margin-top: 1.35rem;
  }

  .hero-actions {
    display: flex;
    gap: 0.9rem;
    flex-wrap: wrap;
    margin-top: 2rem;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 3.35rem;
    padding: 0 1.4rem;
    border-radius: 999px;
    border: 1px solid transparent;
    text-decoration: none;
    font-family: var(--font-heading);
    font-size: 0.95rem;
    font-weight: 600;
  }

  .button-solid {
    background: var(--accent);
    color: #05121e;
    box-shadow: 0 18px 40px rgba(45, 212, 255, 0.2);
  }

  .button-solid:hover,
  .button-solid:focus-visible {
    transform: translateY(-1px);
    box-shadow: 0 22px 44px rgba(45, 212, 255, 0.28);
  }

  .button-ghost {
    border-color: var(--border-strong);
    color: var(--text);
    background: rgba(10, 18, 33, 0.45);
  }

  .button-ghost:hover,
  .button-ghost:focus-visible {
    background: rgba(10, 18, 33, 0.74);
    border-color: rgba(45, 212, 255, 0.44);
  }

  .hero-signals {
    display: flex;
    gap: 0.9rem;
    flex-wrap: wrap;
    margin-top: 1.35rem;
    color: var(--dim);
    font-size: 0.92rem;
  }

  .hero-signals span {
    position: relative;
    padding-left: 1rem;
  }

  .hero-signals span::before,
  .method-item li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.5rem;
    width: 0.42rem;
    height: 0.42rem;
    border-radius: 999px;
    background: var(--accent);
  }

  .hero-visual {
    align-self: stretch;
  }

  .visual-frame {
    position: relative;
    min-height: 36rem;
    border-radius: 2rem;
    border: 1px solid var(--border);
    background:
      radial-gradient(circle at 26% 28%, rgba(45, 212, 255, 0.18), transparent 26%),
      radial-gradient(circle at 78% 72%, rgba(45, 212, 255, 0.12), transparent 34%),
      linear-gradient(180deg, rgba(10, 18, 33, 0.9), rgba(4, 9, 19, 0.76));
    overflow: hidden;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.42);
  }

  .visual-grid {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(rgba(142, 165, 191, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(142, 165, 191, 0.1) 1px, transparent 1px);
    background-size: 60px 60px;
    mask: linear-gradient(180deg, rgba(0, 0, 0, 0.88), transparent 100%);
  }

  .visual-orbit,
  .visual-pulse {
    position: absolute;
    border-radius: 999px;
  }

  .visual-orbit {
    border: 1px solid rgba(45, 212, 255, 0.24);
  }

  .visual-orbit-a {
    top: 2.4rem;
    right: 2.8rem;
    width: 7rem;
    height: 7rem;
  }

  .visual-orbit-b {
    left: 2.4rem;
    bottom: 4.8rem;
    width: 13rem;
    height: 13rem;
  }

  .visual-orbit-c {
    right: 1.8rem;
    bottom: 2rem;
    width: 5.5rem;
    height: 5.5rem;
  }

  .visual-pulse {
    width: 0.9rem;
    height: 0.9rem;
    background: var(--accent);
    box-shadow: 0 0 24px rgba(45, 212, 255, 0.8);
    animation: pulse 3.6s ease-in-out infinite;
  }

  .pulse-a {
    top: 3.9rem;
    right: 4.6rem;
  }

  .pulse-b {
    left: 4.7rem;
    bottom: 8.4rem;
    animation-delay: 0.6s;
  }

  .pulse-c {
    right: 3rem;
    bottom: 3.2rem;
    animation-delay: 1s;
  }

  .visual-mark {
    position: absolute;
    inset: 50% auto auto 50%;
    transform: translate(-50%, -50%);
    font-family: var(--font-heading);
    font-size: clamp(6rem, 15vw, 10rem);
    letter-spacing: -0.08em;
    color: rgba(238, 245, 255, 0.07);
  }

  .visual-readout {
    position: absolute;
    right: 1.35rem;
    bottom: 1.35rem;
    width: min(18rem, calc(100% - 2.7rem));
    display: grid;
    gap: 0.85rem;
    padding: 1.1rem;
    border-radius: 1.3rem;
    border: 1px solid rgba(45, 212, 255, 0.16);
    background: rgba(4, 9, 19, 0.68);
    backdrop-filter: blur(14px);
  }

  .visual-readout div {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: baseline;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid rgba(157, 181, 206, 0.12);
  }

  .visual-readout div:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }

  .visual-readout span,
  .spec-grid span,
  .story-meta dt,
  .work-head p,
  .journey-card p {
    color: var(--accent);
    font-size: 0.75rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .metrics {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-top: 2rem;
    border-top: 1px solid var(--border);
  }

  .metrics article {
    padding: 1.1rem 1rem 0;
    border-right: 1px solid var(--border);
  }

  .metrics article:last-child {
    border-right: none;
  }

  .metrics strong,
  .proof-card strong,
  .work-head strong,
  .method-item strong,
  .journey-card strong {
    display: block;
    font-family: var(--font-heading);
    font-size: clamp(2.1rem, 4vw, 3.8rem);
    letter-spacing: -0.08em;
  }

  .metrics h2,
  .proof-card h3,
  .story-copy h3,
  .work-head h3,
  .method-item h3,
  .journey-copy h3 {
    margin: 0.35rem 0 0;
    font-family: var(--font-heading);
    font-size: 1.25rem;
    line-height: 1.08;
  }

  .metrics p {
    margin: 0.6rem 0 0;
    color: var(--dim);
    line-height: 1.7;
  }

  .section {
    padding: 8rem 0;
  }

  .section-heading {
    display: grid;
    grid-template-columns: minmax(0, 1.08fr) minmax(280px, 0.92fr);
    gap: 2rem;
    align-items: end;
    padding-top: 1.4rem;
    border-top: 1px solid var(--border);
  }

  .section-heading h2 {
    font-size: clamp(2.3rem, 5vw, 4.6rem);
  }

  .section-heading p {
    margin: 0;
  }

  .proof-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.4rem;
    margin-top: 2.4rem;
  }

  .proof-card,
  .story-meta div,
  .work-item,
  .method-item {
    padding-top: 1.15rem;
    border-top: 1px solid var(--border);
  }

  .story-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.08fr) minmax(280px, 0.92fr);
    gap: 2rem;
    margin-top: 4rem;
  }

  .story-meta {
    display: grid;
    gap: 1rem;
    align-content: start;
  }

  .story-meta dd {
    margin: 0.45rem 0 0;
    font-family: var(--font-heading);
    font-size: 1.08rem;
    line-height: 1.45;
  }

  .work-list {
    display: grid;
    gap: 3.5rem;
    margin-top: 0;
  }

  .work-shell {
    display: grid;
    grid-template-columns: minmax(280px, 0.38fr) minmax(0, 0.62fr);
    gap: 2rem;
    align-items: start;
    padding-top: 1.4rem;
    border-top: 1px solid var(--border);
  }

  .work-intro {
    position: sticky;
    top: 7rem;
    align-self: start;
  }

  .work-intro h2 {
    font-size: clamp(2.3rem, 5vw, 4.6rem);
  }

  .work-body {
    max-width: 25rem;
    margin: 1rem 0 0;
  }

  .work-head {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1rem;
    align-items: start;
  }

  .work-head p {
    margin: 0;
  }

  .work-layout {
    display: grid;
    grid-template-columns: minmax(260px, 0.4fr) minmax(0, 0.6fr);
    gap: 1.6rem;
    margin-top: 1.5rem;
  }

  .work-item {
    transform: translate3d(0, calc((0.5 - var(--work-progress)) * var(--work-depth, 0px)), 0);
    transition:
      transform 260ms ease,
      border-color 220ms ease;
    will-change: transform;
  }

  .work-item:hover {
    border-color: rgba(45, 212, 255, 0.24);
  }

  .case-visual {
    position: relative;
    min-height: 19rem;
    border-radius: 1.8rem;
    border: 1px solid rgba(45, 212, 255, 0.14);
    background:
      radial-gradient(circle at top left, rgba(45, 212, 255, 0.12), transparent 28%),
      linear-gradient(180deg, rgba(10, 18, 33, 0.92), rgba(4, 9, 19, 0.78));
    overflow: hidden;
  }

  .case-visual::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(rgba(142, 165, 191, 0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(142, 165, 191, 0.08) 1px, transparent 1px);
    background-size: 36px 36px;
  }

  .scene {
    position: absolute;
    inset: 1rem;
    z-index: 1;
  }

  .dashboard-scene,
  .data-scene {
    display: grid;
    gap: 0.9rem;
  }

  .scene-topbar,
  .content-hero {
    height: 2.4rem;
    border-radius: 999px;
    background: rgba(45, 212, 255, 0.12);
    border: 1px solid rgba(45, 212, 255, 0.22);
  }

  .scene-bars {
    display: flex;
    align-items: end;
    gap: 0.65rem;
    height: 9rem;
    padding: 1rem;
    border-radius: 1.2rem;
    background: rgba(255, 255, 255, 0.03);
  }

  .scene-bars span {
    flex: 1;
    height: var(--bar);
    border-radius: 999px 999px 0 0;
    background: linear-gradient(180deg, rgba(45, 212, 255, 0.85), rgba(45, 212, 255, 0.18));
  }

  .scene-lines,
  .content-side,
  .content-main,
  .data-rows {
    display: grid;
    gap: 0.75rem;
  }

  .scene-lines span,
  .content-side span,
  .content-main span,
  .data-rows span {
    display: block;
    height: 0.85rem;
    border-radius: 999px;
    background: rgba(204, 218, 239, 0.14);
  }

  .content-scene {
    display: grid;
    grid-template-columns: 0.34fr 0.66fr;
    gap: 0.85rem;
  }

  .content-side,
  .content-main,
  .data-rows div {
    padding: 1rem;
    border-radius: 1.15rem;
    background: rgba(255, 255, 255, 0.03);
  }

  .map-scene {
    border-radius: 1.25rem;
    background: rgba(255, 255, 255, 0.02);
  }

  .map-grid,
  .map-path,
  .map-dot {
    position: absolute;
  }

  .map-grid {
    inset: 0;
    border-radius: inherit;
    background:
      linear-gradient(rgba(142, 165, 191, 0.12) 1px, transparent 1px),
      linear-gradient(90deg, rgba(142, 165, 191, 0.12) 1px, transparent 1px);
    background-size: 46px 46px;
  }

  .map-path {
    border: 1px solid rgba(45, 212, 255, 0.34);
    border-radius: 999px;
  }

  .path-a {
    top: 18%;
    right: 12%;
    width: 58%;
    height: 28%;
  }

  .path-b {
    left: 12%;
    bottom: 16%;
    width: 46%;
    height: 34%;
    transform: rotate(16deg);
  }

  .map-dot {
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 999px;
    background: var(--accent);
    box-shadow: 0 0 22px rgba(45, 212, 255, 0.72);
  }

  .dot-a {
    top: 28%;
    left: 18%;
  }

  .dot-b {
    top: 20%;
    right: 28%;
  }

  .dot-c {
    bottom: 18%;
    left: 38%;
  }

  .data-toolbar {
    display: flex;
    gap: 0.65rem;
    padding: 0 1rem;
    align-items: center;
    height: 2.4rem;
    border-radius: 999px;
    background: rgba(45, 212, 255, 0.12);
    border: 1px solid rgba(45, 212, 255, 0.22);
  }

  .data-toolbar span {
    width: 0.65rem;
    height: 0.65rem;
    border-radius: 999px;
    background: rgba(45, 212, 255, 0.84);
  }

  .data-rows div {
    display: grid;
    grid-template-columns: 1.1fr 0.7fr 0.9fr;
    gap: 0.75rem;
  }

  .summary {
    margin: 0;
    font-size: 1.02rem;
  }

  .spec-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.15rem 1rem;
    margin-top: 1.4rem;
  }

  .spec-grid span {
    display: block;
    margin-bottom: 0.4rem;
  }

  .spec-grid p {
    margin: 0;
  }

  .pill-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    margin-top: 1.15rem;
  }

  .pill-row span {
    display: inline-flex;
    align-items: center;
    min-height: 2rem;
    padding: 0 0.8rem;
    border-radius: 999px;
    border: 1px solid var(--border);
    color: var(--muted);
    background: rgba(255, 255, 255, 0.03);
    font-size: 0.82rem;
  }

  .pill-row-strong span {
    color: var(--text);
    border-color: rgba(45, 212, 255, 0.2);
  }

  .method-list {
    display: grid;
    gap: 1.2rem;
    margin-top: 2.4rem;
  }

  .method-item {
    display: grid;
    grid-template-columns: auto minmax(0, 0.82fr) minmax(260px, 0.74fr);
    gap: 1.6rem;
    align-items: start;
  }

  .method-item p {
    margin: 0.7rem 0 0;
  }

  .method-item ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 0.7rem;
  }

  .method-item li {
    position: relative;
    padding-left: 1rem;
    color: var(--muted);
    line-height: 1.7;
  }

  .journey-block {
    margin-top: 4rem;
    padding-top: 1.4rem;
    border-top: 1px solid var(--border);
  }

  .journey-stage {
    display: grid;
    grid-template-columns: minmax(240px, 0.34fr) minmax(0, 0.66fr);
    gap: 2rem;
    align-items: start;
  }

  .journey-copy {
    position: sticky;
    top: 7rem;
    max-width: 22rem;
  }

  .journey-track {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1rem;
    margin-top: 0;
    align-items: stretch;
    overflow: visible;
  }

  .journey-card {
    min-height: 12rem;
    padding: 1.2rem;
    border: 1px solid var(--border);
    border-radius: 1.5rem;
    background: linear-gradient(180deg, rgba(10, 18, 33, 0.88), rgba(4, 9, 19, 0.66));
    transform: translate3d(
      0,
      calc((0.5 - var(--journey-progress)) * var(--journey-depth, 0px)),
      0
    );
    transition:
      transform 260ms ease,
      border-color 220ms ease;
    will-change: transform;
  }

  .journey-card:hover {
    border-color: rgba(45, 212, 255, 0.24);
  }

  .journey-card h4 {
    margin: 0.65rem 0 0;
    font-family: var(--font-heading);
    font-size: 1.22rem;
    line-height: 1.1;
  }

  .journey-card small {
    display: inline-block;
    margin-top: 0.85rem;
    color: var(--dim);
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  .contact-section {
    position: relative;
    padding-bottom: 6rem;
  }

  .contact-section::after {
    content: 'BUILD';
    position: absolute;
    right: 0;
    bottom: 0;
    font-family: var(--font-heading);
    font-size: clamp(5rem, 18vw, 15rem);
    line-height: 0.78;
    letter-spacing: -0.1em;
    color: rgba(238, 245, 255, 0.03);
    pointer-events: none;
  }

  .contact-heading {
    align-items: start;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    gap: 1rem;
    margin-top: 2.4rem;
  }

  .contact-grid a {
    display: grid;
    gap: 0.45rem;
    min-height: 9.5rem;
    padding: 1.3rem;
    border: 1px solid var(--border);
    border-radius: 1.5rem;
    background: rgba(10, 18, 33, 0.62);
    text-decoration: none;
    color: var(--text);
  }

  .contact-grid a:hover,
  .contact-grid a:focus-visible {
    transform: translateY(-3px);
    border-color: rgba(45, 212, 255, 0.34);
  }

  .contact-grid span {
    font-family: var(--font-heading);
    font-size: 1.35rem;
    line-height: 1.08;
  }

  .contact-grid small {
    color: var(--muted);
    line-height: 1.7;
  }

  .contact-grid strong {
    margin-top: auto;
    font-size: 1.2rem;
    color: var(--accent);
  }

  :global(a:focus-visible),
  :global(button:focus-visible) {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 0.72;
    }
    50% {
      transform: scale(1.18);
      opacity: 1;
    }
  }

  @media (max-width: 1024px) {
    .hero,
    .section-heading,
    .story-grid,
    .work-layout,
    .method-item {
      grid-template-columns: 1fr;
    }

    .hero {
      min-height: auto;
      padding-top: 4rem;
    }

    .hero-copy h1 {
      max-width: 12rem;
    }

    .metrics,
    .proof-grid {
      grid-template-columns: 1fr 1fr;
    }

    .work-shell,
    .journey-stage {
      grid-template-columns: 1fr;
    }

    .work-intro,
    .journey-copy {
      position: static;
      max-width: none;
    }

    .work-list {
      margin-top: 2.4rem;
    }

    .work-item,
    .journey-card {
      transform: none;
    }

    .journey-track {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (max-width: 720px) {
    .topbar,
    .hero,
    .metrics,
    .section {
      width: min(100vw - 2rem, 100%);
    }

    .topbar {
      top: 0.8rem;
      margin-top: 0.8rem;
      grid-template-columns: auto auto;
      justify-content: space-between;
      padding: 0.85rem 1rem;
      border-radius: 1.5rem;
    }

    .topbar nav {
      display: none;
    }

    .brand span {
      font-size: 0.88rem;
    }

    .hero {
      gap: 1.6rem;
      padding-top: 2.4rem;
    }

    .hero-copy h1,
    .section-heading h2 {
      text-wrap: initial;
    }

    .hero-copy h1 {
      max-width: none;
      font-size: clamp(3.7rem, 22vw, 5.6rem);
    }

    .visual-frame {
      min-height: 23rem;
    }

    .metrics,
    .proof-grid,
    .spec-grid {
      grid-template-columns: 1fr;
    }

    .journey-track {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .metrics article {
      border-right: none;
      border-bottom: 1px solid var(--border);
      padding-left: 0;
      padding-right: 0;
      padding-bottom: 1rem;
    }

    .metrics article:last-child {
      border-bottom: none;
    }

    .contact-grid a {
      min-height: auto;
    }
  }

  @media (max-width: 560px) {
    .journey-track {
      grid-template-columns: 1fr;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .button,
    .contact-grid a,
    .topbar nav a,
    .locale-switch button {
      transition: none;
    }

    .visual-pulse {
      animation: none;
    }

    .work-intro,
    .journey-copy {
      position: static;
    }

    .work-item,
    .journey-card {
      transform: none;
      transition: none;
    }
  }
</style>
