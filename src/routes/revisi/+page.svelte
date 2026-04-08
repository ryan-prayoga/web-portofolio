<script lang="ts">
  import logo from '$lib/assets/logo.png';
  import { profile } from '$lib/data/profile';
  import { projects } from '$lib/data/projects';
  import { socials } from '$lib/data/socials';
  import { techJourney } from '$lib/data/techJourney';

  const proofItems = [
    {
      value: profile.experience,
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
  ];

  const caseStudies = projects.map((project, index) => ({
    ...project,
    number: `${index + 1}`.padStart(2, '0'),
    status:
      index === 0
        ? 'Operational at national scale'
        : index === 1
          ? 'Structured learning delivery'
          : index === 2
            ? 'Real-time coordination workflow'
            : 'Secure public-facing registry'
  }));

  const methods = [
    {
      title: 'Lead the cadence',
      body: 'Memimpin tim secara aktif, menjaga prioritas, kapasitas, dan tempo delivery agar tetap sehat.',
      points: [
        `Tim aktif ${profile.teamSize} orang`,
        'Distribusi task berbasis konteks dan urgensi',
        'Tetap hands-on ketika keputusan teknis perlu dipercepat'
      ]
    },
    {
      title: 'Review with rigor',
      body: 'Code review dipakai untuk menjaga kualitas sistem, bukan sekadar formalitas pull request.',
      points: [
        'Menjaga konsistensi arsitektur dan maintainability',
        'Mencegah technical debt menumpuk tanpa arah',
        'Membaca implementasi dengan konteks product dan operasional'
      ]
    },
    {
      title: 'Ship with operations in mind',
      body: 'Bergerak dari development ke staging lalu production dengan proses yang tenang dan bisa dipercaya.',
      points: [
        'Validasi sebelum release dan monitoring setelahnya',
        'Terbiasa dengan Ubuntu Server, PM2, Supervisor, Nginx, dan SSH',
        'Fokus pada stabilitas, bukan cuma launch'
      ]
    }
  ];

  const journey = techJourney.map((item, index) => ({
    ...item,
    number: `${index + 1}`.padStart(2, '0')
  }));
</script>

<svelte:head>
  <title>Ryan Prayoga — Revisi</title>
  <meta
    name="description"
    content="Versi revisi portfolio Ryan Prayoga dengan art direction yang lebih editorial dan fokus pada delivery, leadership, dan selected work."
  />
</svelte:head>

<div class="revisi-page">
  <a class="skip-link" href="#content">Skip to content</a>

  <header class="topbar">
    <a class="brand" href="/revisi#top" aria-label="Ryan Prayoga home">
      <img src={logo} alt="RP Logo" />
      <span>Ryan Prayoga</span>
    </a>

    <nav aria-label="Section navigation">
      <a href="#proof">Proof</a>
      <a href="#work">Work</a>
      <a href="#method">Method</a>
      <a href="#contact">Contact</a>
    </nav>

    <a class="topbar-link" href="/">Original</a>
  </header>

  <main id="content">
    <section class="hero" id="top">
      <div class="hero-copy">
        <p class="eyebrow">Portfolio Revision / 2026</p>
        <h1>{profile.name}</h1>
        <p class="hero-deck">
          Enterprise systems builder, team leader, and operator who keeps delivery
          calm under pressure.
        </p>
        <p class="hero-body">{profile.intro}</p>

        <div class="hero-actions">
          <a class="button button-solid" href="#work">See selected work</a>
          <a class="button button-ghost" href="#contact">Start a conversation</a>
        </div>

        <div class="hero-signals" aria-label="Core strengths">
          <span>Enterprise delivery</span>
          <span>Team leadership</span>
          <span>AI-assisted workflow</span>
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
              <span>Role</span>
              <strong>Team Leader</strong>
            </div>
            <div>
              <span>Mode</span>
              <strong>Hands-on</strong>
            </div>
            <div>
              <span>Base</span>
              <strong>{profile.location}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="metrics">
      <article>
        <strong>4+</strong>
        <h2>Tahun</h2>
        <p>Pengalaman profesional membangun aplikasi web dan mobile berskala enterprise.</p>
      </article>
      <article>
        <strong>1+</strong>
        <h2>Tahun Leadership</h2>
        <p>Memimpin ritme kerja, task management, dan delivery tim secara konsisten.</p>
      </article>
      <article>
        <strong>Staging</strong>
        <h2>→ Production</h2>
        <p>Terbiasa menangani deployment workflow dari development hingga production.</p>
      </article>
    </section>

    <section class="section" id="proof">
      <div class="section-heading">
        <p class="eyebrow">Proof</p>
        <div>
          <h2>Delivery yang melampaui fase prototype.</h2>
          <p>
            Nilai utamanya bukan hanya kemampuan menulis kode, tapi menjaga sistem tetap
            bergerak saat scope membesar, stakeholder bertambah, dan kualitas harus tetap naik.
          </p>
        </div>
      </div>

      <div class="proof-grid">
        {#each proofItems as item}
          <article class="proof-card">
            <strong>{item.value}</strong>
            <h3>{item.label}</h3>
            <p>{item.note}</p>
          </article>
        {/each}
      </div>

      <div class="story-grid">
        <div class="story-copy">
          <p class="eyebrow">Context</p>
          <h3>Berangkat dari coding, lalu tumbuh ke delivery dan leadership.</h3>
          <p>{profile.bio[1]}</p>
          <p>{profile.bio[2]}</p>
        </div>

        <dl class="story-meta">
          <div>
            <dt>Current Base</dt>
            <dd>{profile.company}</dd>
          </div>
          <div>
            <dt>Education</dt>
            <dd>{profile.education.university}</dd>
          </div>
          <div>
            <dt>Foundation</dt>
            <dd>{profile.education.smk}</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{profile.location}</dd>
          </div>
        </dl>
      </div>
    </section>

    <section class="section work-section" id="work">
      <div class="section-heading">
        <p class="eyebrow">Selected Work</p>
        <div>
          <h2>Project besar, kompleks, dan dibangun untuk dipakai sungguhan.</h2>
          <p>
            Mayoritas work di bawah ini adalah enterprise delivery, institutional system,
            atau public-facing platform dengan constraint operasional yang nyata.
          </p>
        </div>
      </div>

      <div class="work-list">
        {#each caseStudies as item}
          <article class="work-item" id={`case-${item.slug}`}>
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
                    <span>Role</span>
                    <p>{item.role}</p>
                  </div>
                  <div>
                    <span>Focus</span>
                    <p>{item.focus}</p>
                  </div>
                  <div>
                    <span>Impact</span>
                    <p>{item.impact}</p>
                  </div>
                  <div>
                    <span>Status</span>
                    <p>{item.status}</p>
                  </div>
                </div>

                <div class="pill-row pill-row-strong">
                  {#each item.stack as stack}
                    <span>{stack}</span>
                  {/each}
                </div>

                <div class="pill-row">
                  <span>Private delivery</span>
                  {#each item.tags as tag}
                    <span>{tag}</span>
                  {/each}
                </div>
              </div>
            </div>
          </article>
        {/each}
      </div>
    </section>

    <section class="section" id="method">
      <div class="section-heading">
        <p class="eyebrow">Operating Method</p>
        <div>
          <h2>Lead, review, deploy, adapt.</h2>
          <p>
            Cara kerja saya dibentuk oleh project yang harus stabil, tim yang perlu ritme,
            dan kebutuhan untuk tetap relevan terhadap stack yang terus berubah.
          </p>
        </div>
      </div>

      <div class="method-list">
        {#each methods as item, index}
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

      <div class="journey-block">
        <div class="journey-copy">
          <p class="eyebrow">Stack Arc</p>
          <h3>Teknologi berubah, standar kerja tidak.</h3>
          <p>
            Dari Laravel sampai SvelteKit, dari web sampai mobile, dan kini workflow
            berbasis AI. Adaptasi bergerak mengikuti kebutuhan nyata project.
          </p>
        </div>

        <div class="journey-track">
          {#each journey as item}
            <article class="journey-card">
              <strong>{item.number}</strong>
              <p>{item.period}</p>
              <h4>{item.tech}</h4>
              <small>{item.category}</small>
            </article>
          {/each}
        </div>
      </div>
    </section>

    <section class="section contact-section" id="contact">
      <div class="section-heading contact-heading">
        <p class="eyebrow">Contact</p>
        <div>
          <h2>Kalau brief-nya kompleks, biasanya itu justru menarik.</h2>
          <p>
            Terbuka untuk kolaborasi, diskusi engineering, atau peran yang butuh kombinasi
            antara teknis, delivery, dan leadership.
          </p>
        </div>
      </div>

      <div class="contact-grid">
        {#each socials as social}
          <a href={social.url} target="_blank" rel="noopener noreferrer">
            <span>{social.name}</span>
            <small>{social.label}</small>
            <strong>&#8599;</strong>
          </a>
        {/each}

        <a href="/">
          <span>Open original version</span>
          <small>Bandingkan dengan halaman lama</small>
          <strong>&#8599;</strong>
        </a>
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

  .revisi-page {
    --bg: #040913;
    --panel: rgba(10, 18, 33, 0.76);
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
  .topbar-link,
  .button,
  .contact-grid a {
    transition:
      color 220ms ease,
      border-color 220ms ease,
      background-color 220ms ease,
      transform 220ms ease,
      box-shadow 220ms ease;
  }

  .topbar nav a,
  .topbar-link {
    color: var(--dim);
    text-decoration: none;
    font-size: 0.92rem;
  }

  .topbar nav a:hover,
  .topbar nav a:focus-visible,
  .topbar-link:hover,
  .topbar-link:focus-visible {
    color: var(--text);
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
  .section-heading h2 {
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
    margin-top: 2.4rem;
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

  .journey-copy {
    max-width: 38rem;
  }

  .journey-track {
    display: grid;
    grid-template-columns: repeat(7, minmax(14rem, 1fr));
    gap: 1rem;
    overflow-x: auto;
    margin-top: 2rem;
    padding-bottom: 0.25rem;
  }

  .journey-card {
    min-height: 12rem;
    padding: 1.2rem;
    border: 1px solid var(--border);
    border-radius: 1.5rem;
    background: linear-gradient(180deg, rgba(10, 18, 33, 0.88), rgba(4, 9, 19, 0.66));
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
    grid-template-columns: repeat(3, minmax(0, 1fr));
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
    .topbar {
      grid-template-columns: auto auto;
    }

    .topbar nav {
      display: none;
    }

    .hero,
    .section-heading,
    .story-grid,
    .work-layout,
    .method-item,
    .contact-grid {
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
      padding: 0.85rem 1rem;
      border-radius: 1.5rem;
    }

    .brand span,
    .topbar-link {
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

    .journey-track {
      grid-template-columns: repeat(7, minmax(11.8rem, 1fr));
    }

    .contact-grid a {
      min-height: auto;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .button,
    .contact-grid a,
    .topbar nav a,
    .topbar-link {
      transition: none;
    }

    .visual-pulse {
      animation: none;
    }
  }
</style>
