<script lang="ts">
  import { onMount } from 'svelte';
  import { techJourney } from '$lib/data/techJourney';
  import type { TechStep } from '$lib/data/techJourney';

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

  const colorMap: Record<TechStep['color'], {
    text: string;
    bg: string;
    bgFaint: string;
    border: string;
    shadow: string;
  }> = {
    cyan: {
      text: 'text-accent-cyan',
      bg: 'bg-accent-cyan',
      bgFaint: 'bg-accent-cyan/10',
      border: 'border-accent-cyan/30',
      shadow: 'shadow-accent-cyan/20',
    },
    blue: {
      text: 'text-accent-blue',
      bg: 'bg-accent-blue',
      bgFaint: 'bg-accent-blue/10',
      border: 'border-accent-blue/30',
      shadow: 'shadow-accent-blue/20',
    },
    violet: {
      text: 'text-accent-violet',
      bg: 'bg-accent-violet',
      bgFaint: 'bg-accent-violet/10',
      border: 'border-accent-violet/30',
      shadow: 'shadow-accent-violet/20',
    },
    success: {
      text: 'text-accent-success',
      bg: 'bg-accent-success',
      bgFaint: 'bg-accent-success/10',
      border: 'border-accent-success/30',
      shadow: 'shadow-accent-success/20',
    },
  };

  function getCategoryIcon(category: TechStep['category']): string {
    switch (category) {
      case 'backend':
        return `<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7"/></svg>`;
      case 'frontend':
        return `<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"/></svg>`;
      case 'mobile':
        return `<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"/></svg>`;
      case 'workflow':
        return `<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z"/></svg>`;
    }
  }
</script>

<section
  id="tech-journey"
  class="relative py-28 md:py-32 spotlight-violet overflow-hidden"
  bind:this={sectionEl}
>
  <!-- Subtle grid overlay -->
  <div class="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>

  <div class="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">

    <!-- Section heading -->
    <div class="reveal mb-16 md:mb-20 text-center">
      <div class="inline-flex items-center gap-3 mb-4">
        <span class="block h-px w-10 bg-accent-violet"></span>
        <span class="font-body text-sm tracking-widest uppercase text-accent-violet">
          Stack Evolution
        </span>
        <span class="block h-px w-10 bg-accent-violet"></span>
      </div>
      <h2 class="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
        Tech <span class="text-accent-violet">Journey</span>
      </h2>
    </div>

    <!-- Timeline container -->
    <div class="relative">

      <!-- Central timeline line — desktop: centered, mobile: left-aligned -->
      <div
        class="timeline-line absolute top-0 bottom-0 w-px left-6 md:left-1/2 md:-translate-x-px"
      ></div>

      <!-- Timeline steps -->
      <div class="relative space-y-12 md:space-y-16">
        {#each techJourney as step, i}
          {@const colors = colorMap[step.color]}
          {@const isEven = i % 2 === 0}
          {@const delay = (i % 5) + 1}

          <div
            class="reveal reveal-delay-{delay} relative flex items-start md:items-center"
          >
            <!-- ============================================
                 DESKTOP LAYOUT: alternating left / right
                 ============================================ -->

            <!-- LEFT content area (desktop) -->
            <div
              class="hidden md:flex w-1/2 {isEven
                ? 'justify-end pr-12'
                : 'justify-end pr-12 opacity-0 pointer-events-none'}"
            >
              {#if isEven}
                <!-- Card: left side -->
                <div
                  class="glass rounded-2xl p-6 max-w-md w-full transition-all duration-300 hover:-translate-y-1 hover:border-border-light group"
                >
                  <!-- Period badge -->
                  <div class="mb-3">
                    <span
                      class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide {colors.bgFaint} {colors.text}"
                    >
                      {step.period}
                    </span>
                  </div>

                  <!-- Tech name -->
                  <h3
                    class="font-heading text-xl lg:text-2xl font-bold {colors.text} mb-2 leading-tight"
                  >
                    {step.tech}
                  </h3>

                  <!-- Category tag -->
                  <div class="flex items-center gap-1.5 mb-3">
                    <span class="{colors.text} opacity-60">
                      {@html getCategoryIcon(step.category)}
                    </span>
                    <span
                      class="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted"
                    >
                      {step.category}
                    </span>
                  </div>

                  <!-- Description -->
                  <p class="text-sm text-secondary leading-relaxed font-body">
                    {step.description}
                  </p>

                  <!-- Accent bottom line -->
                  <div
                    class="mt-5 h-px w-full bg-gradient-to-r from-transparent {isEven
                      ? 'via-border-light to-border'
                      : 'via-border to-transparent'} opacity-50"
                  ></div>
                </div>
              {/if}
            </div>

            <!-- TIMELINE NODE (desktop) -->
            <div
              class="hidden md:flex absolute left-1/2 -translate-x-1/2 z-20 items-center justify-center"
            >
              <!-- Outer glow ring -->
              <div
                class="absolute w-8 h-8 rounded-full {colors.bgFaint} animate-pulse-glow"
              ></div>
              <!-- Dot -->
              <div
                class="relative w-4 h-4 rounded-full {colors.bg} ring-4 ring-base shadow-lg {colors.shadow}"
              ></div>
            </div>

            <!-- Connector arrow: dot to card (desktop) -->
            <div class="hidden md:block absolute left-1/2 z-10 top-1/2 -translate-y-px">
              {#if isEven}
                <!-- Arrow going left -->
                <div
                  class="w-12 h-px {colors.bg} opacity-30 -translate-x-full translate-x-0"
                  style="transform: translateX(calc(-100% - 1rem)); width: 3rem;"
                ></div>
              {:else}
                <!-- Arrow going right -->
                <div
                  class="h-px {colors.bg} opacity-30"
                  style="transform: translateX(1rem); width: 3rem;"
                ></div>
              {/if}
            </div>

            <!-- RIGHT content area (desktop) -->
            <div
              class="hidden md:flex w-1/2 {isEven
                ? 'justify-start pl-12 opacity-0 pointer-events-none'
                : 'justify-start pl-12'}"
            >
              {#if !isEven}
                <!-- Card: right side -->
                <div
                  class="glass rounded-2xl p-6 max-w-md w-full transition-all duration-300 hover:-translate-y-1 hover:border-border-light group"
                >
                  <!-- Period badge -->
                  <div class="mb-3">
                    <span
                      class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide {colors.bgFaint} {colors.text}"
                    >
                      {step.period}
                    </span>
                  </div>

                  <!-- Tech name -->
                  <h3
                    class="font-heading text-xl lg:text-2xl font-bold {colors.text} mb-2 leading-tight"
                  >
                    {step.tech}
                  </h3>

                  <!-- Category tag -->
                  <div class="flex items-center gap-1.5 mb-3">
                    <span class="{colors.text} opacity-60">
                      {@html getCategoryIcon(step.category)}
                    </span>
                    <span
                      class="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted"
                    >
                      {step.category}
                    </span>
                  </div>

                  <!-- Description -->
                  <p class="text-sm text-secondary leading-relaxed font-body">
                    {step.description}
                  </p>

                  <!-- Accent bottom line -->
                  <div
                    class="mt-5 h-px w-full bg-gradient-to-r from-border via-border-light to-transparent opacity-50"
                  ></div>
                </div>
              {/if}
            </div>

            <!-- ============================================
                 MOBILE LAYOUT: all stacked, line on left
                 ============================================ -->
            <div class="md:hidden flex items-start gap-5 w-full">

              <!-- Timeline node (mobile) — on the left line -->
              <div class="relative flex-shrink-0 flex items-center justify-center w-12">
                <!-- Outer glow ring -->
                <div
                  class="absolute w-7 h-7 rounded-full {colors.bgFaint} animate-pulse-glow"
                ></div>
                <!-- Dot -->
                <div
                  class="relative w-3.5 h-3.5 rounded-full {colors.bg} ring-4 ring-base shadow-lg {colors.shadow}"
                ></div>
              </div>

              <!-- Card (mobile) -->
              <div
                class="glass rounded-2xl p-5 flex-1 min-w-0 transition-all duration-300 hover:border-border-light group"
              >
                <!-- Period badge -->
                <div class="mb-3">
                  <span
                    class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide {colors.bgFaint} {colors.text}"
                  >
                    {step.period}
                  </span>
                </div>

                <!-- Tech name -->
                <h3
                  class="font-heading text-lg font-bold {colors.text} mb-1.5 leading-tight"
                >
                  {step.tech}
                </h3>

                <!-- Category tag -->
                <div class="flex items-center gap-1.5 mb-2.5">
                  <span class="{colors.text} opacity-60">
                    {@html getCategoryIcon(step.category)}
                  </span>
                  <span
                    class="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted"
                  >
                    {step.category}
                  </span>
                </div>

                <!-- Description -->
                <p class="text-sm text-secondary leading-relaxed font-body">
                  {step.description}
                </p>
              </div>
            </div>

          </div>
        {/each}
      </div>

      <!-- Timeline end cap -->
      <div class="absolute bottom-0 left-6 md:left-1/2 md:-translate-x-1/2 -translate-x-1/2 translate-y-4">
        <div class="w-2.5 h-2.5 rounded-full bg-accent-violet/40 ring-4 ring-base"></div>
      </div>

    </div>
  </div>
</section>
