<script lang="ts">
  import { onMount } from 'svelte';

  let sectionEl = $state<HTMLElement | null>(null);

  onMount(() => {
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const revealElements = sectionEl.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });

  const pipelineSteps = [
    {
      name: 'Code',
      description: 'Development dan implementation fitur',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`
    },
    {
      name: 'Review',
      description: 'Code review dan quality check',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`
    },
    {
      name: 'Staging',
      description: 'Deployment ke staging environment',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`
    },
    {
      name: 'Validation',
      description: 'Testing dan validasi oleh tim',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
    },
    {
      name: 'Production',
      description: 'Release ke production server',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`
    },
    {
      name: 'Monitoring',
      description: 'Monitoring performa dan stabilitas',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`
    }
  ];

  const tools = [
    {
      name: 'Ubuntu Server',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="22"/><line x1="2" y1="12" x2="8" y2="12"/><line x1="16" y1="12" x2="22" y2="12"/></svg>`
    },
    {
      name: 'PM2',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`
    },
    {
      name: 'Supervisor',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`
    },
    {
      name: 'Cronjob',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
    },
    {
      name: 'Nginx',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>`
    },
    {
      name: 'SSH',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 15l3-3-3-3"/><line x1="13" y1="15" x2="17" y2="15"/></svg>`
    }
  ];
</script>

<section
  id="operations"
  class="relative py-28 spotlight-cyan overflow-hidden"
  bind:this={sectionEl}
>
  <div class="max-w-6xl mx-auto px-6">

    <!-- Section header -->
    <div class="reveal text-center mb-20">
      <div class="inline-flex items-center gap-2 mb-4">
        <span class="h-px w-8 bg-accent-cyan"></span>
        <span class="text-accent-cyan font-heading text-sm tracking-widest uppercase">
          Deployment & Operations
        </span>
        <span class="h-px w-8 bg-accent-cyan"></span>
      </div>
      <h2 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-4">
        Deployment &
        <span class="text-accent-cyan">Operations</span>
      </h2>
      <p class="text-secondary font-body text-lg max-w-2xl mx-auto leading-relaxed">
        Dari development hingga production — setiap tahap dikelola dengan standar yang jelas.
      </p>
    </div>

    <!-- Deployment Pipeline -->
    <div class="reveal reveal-delay-1 mb-20">

      <!-- Desktop pipeline (horizontal) -->
      <div class="hidden lg:flex items-start justify-between relative">
        {#each pipelineSteps as step, i}
          <!-- Step node -->
          <div class="flex flex-col items-center relative z-10 flex-1">
            <!-- Node card -->
            <div class="group glass rounded-2xl p-5 w-full max-w-[160px] text-center transition-all duration-300 hover:-translate-y-2 hover:border-glow-cyan hover:glow-cyan border border-border-light/30 cursor-default">
              <!-- Step number -->
              <div class="text-[10px] font-heading font-bold text-accent-cyan/50 tracking-widest uppercase mb-3">
                0{i + 1}
              </div>
              <!-- Icon -->
              <div class="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-xl bg-accent-cyan/10 text-accent-cyan group-hover:bg-accent-cyan/20 transition-colors duration-300">
                {@html step.icon}
              </div>
              <!-- Name -->
              <h3 class="font-heading text-sm font-bold text-primary mb-1.5">
                {step.name}
              </h3>
              <!-- Description -->
              <p class="text-xs text-muted leading-relaxed font-body">
                {step.description}
              </p>
            </div>
          </div>

          <!-- Connector arrow between nodes (not after the last one) -->
          {#if i < pipelineSteps.length - 1}
            <div class="flex items-center self-center mt-[72px] -mx-1 flex-shrink-0">
              <div class="w-8 xl:w-12 h-px bg-gradient-to-r from-accent-cyan/60 to-accent-cyan/30 animate-flow relative">
                <!-- Animated glow dot -->
                <div class="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse-glow"></div>
              </div>
              <svg class="w-3 h-3 text-accent-cyan/60 -ml-0.5 flex-shrink-0" viewBox="0 0 12 12" fill="currentColor">
                <path d="M2 1l8 5-8 5V1z"/>
              </svg>
            </div>
          {/if}
        {/each}
      </div>

      <!-- Mobile/Tablet pipeline (vertical) -->
      <div class="lg:hidden flex flex-col items-center gap-0">
        {#each pipelineSteps as step, i}
          <!-- Step node -->
          <div class="reveal reveal-delay-{(i % 5) + 1} group glass rounded-2xl p-5 w-full max-w-sm text-left transition-all duration-300 hover:border-glow-cyan hover:glow-cyan border border-border-light/30 cursor-default relative z-10">
            <div class="flex items-center gap-4">
              <!-- Icon -->
              <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-accent-cyan/10 text-accent-cyan group-hover:bg-accent-cyan/20 transition-colors duration-300 flex-shrink-0">
                {@html step.icon}
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-0.5">
                  <span class="text-[10px] font-heading font-bold text-accent-cyan/50 tracking-widest uppercase">
                    0{i + 1}
                  </span>
                  <h3 class="font-heading text-sm font-bold text-primary">
                    {step.name}
                  </h3>
                </div>
                <p class="text-xs text-muted leading-relaxed font-body">
                  {step.description}
                </p>
              </div>
            </div>
          </div>

          <!-- Vertical connector (not after last) -->
          {#if i < pipelineSteps.length - 1}
            <div class="flex flex-col items-center py-1">
              <div class="w-px h-6 bg-gradient-to-b from-accent-cyan/60 to-accent-cyan/20 animate-flow-down relative">
                <div class="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse-glow"></div>
              </div>
              <svg class="w-3 h-3 text-accent-cyan/50 -mt-0.5" viewBox="0 0 12 12" fill="currentColor">
                <path d="M1 2l5 8 5-8H1z"/>
              </svg>
            </div>
          {/if}
        {/each}
      </div>

    </div>

    <!-- Tools Section -->
    <div class="reveal reveal-delay-3">
      <div class="text-center mb-8">
        <h3 class="font-heading text-lg font-semibold text-primary">
          Tools & Infrastructure
        </h3>
        <p class="text-sm text-muted font-body mt-1">
          Stack operasional yang digunakan sehari-hari
        </p>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-3">
        {#each tools as tool, i}
          <div
            class="reveal reveal-delay-{(i % 5) + 1} glass rounded-xl px-4 py-2.5 flex items-center gap-2.5 border border-border-light/20 hover:border-accent-cyan/30 transition-all duration-300 cursor-default group"
          >
            <span class="text-accent-cyan/60 group-hover:text-accent-cyan transition-colors duration-300">
              {@html tool.icon}
            </span>
            <span class="text-sm font-body text-secondary group-hover:text-primary transition-colors duration-300">
              {tool.name}
            </span>
          </div>
        {/each}
      </div>
    </div>

  </div>
</section>
