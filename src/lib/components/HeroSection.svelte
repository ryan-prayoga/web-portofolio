<script lang="ts">
  import { profile } from '$lib/data/profile';
  import { socials } from '$lib/data/socials';

  let isVisible = $state(false);

  const proof = [
    { value: '4+', label: 'tahun membangun enterprise & government systems' },
    { value: '4', label: 'engineer dipimpin dalam active delivery' },
    { value: '6', label: 'public projects dengan bukti teknis' },
    { value: 'End-to-end', label: 'backend, frontend, mobile, deploy' },
  ];

  const lanes = [
    'Full-stack product delivery',
    'Enterprise & government domain',
    'Technical leadership',
    'Developer tooling & deployment',
  ];

  const hiringHighlights = [
    'Target: Full-Stack, Backend, or Team Lead roles',
    'Ready for interview and technical discussion',
    'Comfortable from discovery to production delivery',
  ];

  const githubSocial = socials.find((social) => social.name === 'GitHub');
  const linkedinSocial = socials.find((social) => social.name === 'LinkedIn');
  const emailSocial = socials.find((social) => social.name === 'Email');

  $effect(() => {
    const timeout = setTimeout(() => {
      isVisible = true;
    }, 80);

    return () => clearTimeout(timeout);
  });
</script>

<section id="hero" class="relative min-h-[100svh] overflow-hidden bg-base pt-16">
  <div class="absolute inset-0 bg-grid opacity-30"></div>
  <div class="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(34,211,238,0.12),transparent_28%),radial-gradient(circle_at_85%_30%,rgba(52,211,153,0.09),transparent_26%)]"></div>

  <div class="relative z-10 mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_460px] lg:px-8">
    <div
      class="max-w-4xl transition-all duration-700 {isVisible
        ? 'translate-y-0 opacity-100'
        : 'translate-y-8 opacity-0'}"
    >
      <div class="mb-7 flex flex-wrap items-center gap-3 text-sm text-secondary">
        <span class="inline-flex items-center gap-2 rounded-full border border-accent-success/30 bg-accent-success/10 px-3 py-1.5 text-accent-success">
          <span class="h-2 w-2 rounded-full bg-accent-success"></span>
          Available for opportunities
        </span>
        <span class="hidden h-px w-10 bg-border-light sm:block"></span>
        <span>{profile.location}</span>
      </div>

      <p class="mb-3 font-heading text-sm font-semibold uppercase tracking-[0.18em] text-accent-cyan">
        {profile.role}
      </p>
      <h1 class="max-w-4xl font-heading text-5xl font-bold leading-[0.98] tracking-tight text-primary sm:text-7xl lg:text-8xl">
        {profile.name}
      </h1>
      <p class="mt-7 max-w-3xl font-body text-xl leading-relaxed text-primary/90 sm:text-2xl">
        {profile.tagline}
      </p>
      <p class="mt-5 max-w-2xl text-base leading-relaxed text-secondary sm:text-lg">
        {profile.intro}
      </p>

      <div class="mt-9 flex flex-wrap items-center gap-3">
        <a
          href="#projects"
          class="inline-flex items-center justify-center rounded-lg bg-accent-cyan px-6 py-3 font-heading text-sm font-bold text-[#07111f] transition hover:bg-accent-blue"
        >
          Lihat bukti project
        </a>
        <a
          href="/cv/Ryan-Prayoga-CV.pdf"
          download
          class="inline-flex items-center justify-center gap-2 rounded-lg border border-accent-success/40 bg-accent-success/10 px-6 py-3 font-heading text-sm font-semibold text-accent-success transition hover:border-accent-success hover:bg-accent-success/15"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v12m0 0 4-4m-4 4-4-4" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 21h14" />
          </svg>
          Download CV
        </a>
        <a
          href="#contact"
          class="inline-flex items-center justify-center rounded-lg border border-border-light px-6 py-3 font-heading text-sm font-semibold text-primary transition hover:border-accent-cyan hover:text-accent-cyan"
        >
          Hubungi Saya
        </a>
        <div class="flex items-center gap-2 pl-1">
          {#if emailSocial}
            <a
              href={emailSocial.url}
              aria-label="Email"
              class="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-secondary transition hover:border-accent-cyan hover:text-accent-cyan"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16v12H4z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="m4 7 8 6 8-6" />
              </svg>
            </a>
          {/if}
          {#if githubSocial}
            <a
              href={githubSocial.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              class="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-secondary transition hover:border-accent-cyan hover:text-accent-cyan"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          {/if}
          {#if linkedinSocial}
            <a
              href={linkedinSocial.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              class="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-secondary transition hover:border-accent-cyan hover:text-accent-cyan"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          {/if}
        </div>
      </div>
    </div>

    <aside
      class="transition-all delay-150 duration-700 {isVisible
        ? 'translate-y-0 opacity-100'
        : 'translate-y-8 opacity-0'}"
      aria-label="Portfolio proof summary"
    >
      <div class="relative overflow-hidden rounded-2xl border border-border bg-surface/70 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div class="mb-6 flex items-center justify-between border-b border-border pb-4">
          <div>
            <p class="font-heading text-sm font-semibold text-primary">Proof Board</p>
            <p class="mt-1 text-xs text-secondary">What a hiring manager should notice first.</p>
          </div>
          <span class="rounded-full border border-accent-success/30 bg-accent-success/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-success">
            Active
          </span>
        </div>

        <div id="proof" class="grid grid-cols-2 gap-3">
          {#each proof as item}
            <div class="rounded-xl border border-border bg-surface-secondary/70 p-4">
              <p class="font-heading text-3xl font-bold text-accent-cyan">{item.value}</p>
              <p class="mt-2 text-xs leading-relaxed text-secondary">{item.label}</p>
            </div>
          {/each}
        </div>

        <div class="mt-6 space-y-3">
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Hiring signal</p>
          {#each hiringHighlights as item}
            <div class="rounded-lg border border-accent-success/15 bg-accent-success/5 px-3 py-2 text-sm leading-relaxed text-primary">
              {item}
            </div>
          {/each}
        </div>

        <div class="mt-6 border-t border-border pt-5">
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Core strengths</p>
          <div class="mt-3 flex flex-wrap gap-2">
            {#each lanes as lane}
              <span class="rounded-md border border-border bg-surface-secondary/80 px-3 py-2 text-xs leading-tight text-primary">
                {lane}
              </span>
            {/each}
          </div>
        </div>
      </div>
    </aside>
  </div>
</section>
