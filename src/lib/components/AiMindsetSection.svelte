<script lang="ts">
  import { onMount } from 'svelte';

  let sectionEl = $state<HTMLElement | null>(null);

  const mindsetCards = [
    {
      title: 'Brainstorming',
      description: 'Menggunakan AI untuk eksplorasi ide, arsitektur sistem, dan solusi teknis sebelum implementasi.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 18h6"/>
        <path d="M10 22h4"/>
        <path d="M12 2a7 7 0 0 1 4 12.7V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.3A7 7 0 0 1 12 2z"/>
      </svg>`,
    },
    {
      title: 'Research',
      description: 'Mempercepat proses riset teknologi, library, dan best practices untuk pengambilan keputusan.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
      </svg>`,
    },
    {
      title: 'Problem Solving',
      description: 'AI membantu menganalisis bug, memahami error pattern, dan menemukan solusi yang lebih efektif.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.969a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.968 1.02z"/>
      </svg>`,
    },
    {
      title: 'Productivity',
      description: 'Mengoptimalkan workflow harian — dari code generation hingga dokumentasi dan review.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>`,
    },
    {
      title: 'Learning',
      description: 'Mempercepat proses belajar teknologi baru dengan AI sebagai learning companion.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
        <path d="M8 7h6"/>
        <path d="M8 11h4"/>
      </svg>`,
    },
    {
      title: 'Eksplorasi Solusi',
      description: 'Mengevaluasi berbagai pendekatan teknis dan trade-off sebelum menentukan arsitektur final.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
      </svg>`,
    },
  ];

  onMount(() => {
    if (!sectionEl) return;

    const revealElements = sectionEl.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });
</script>

<section
  id="ai-mindset"
  bind:this={sectionEl}
  class="relative py-28 spotlight-violet overflow-hidden"
>
  <div class="max-w-6xl mx-auto px-6 lg:px-8">

    <!-- Section Heading -->
    <div class="reveal text-center mb-6">
      <div class="inline-flex items-center gap-3 mb-4">
        <span class="inline-block w-1.5 h-8 rounded-full bg-accent-violet glow-violet"></span>
        <h2 class="font-heading text-3xl md:text-4xl lg:text-5xl text-primary font-bold tracking-tight">
          AI Mindset
        </h2>
      </div>
    </div>

    <!-- Subtitle -->
    <div class="reveal reveal-delay-1 text-center mb-16 md:mb-20 max-w-3xl mx-auto">
      <p class="font-body text-lg text-secondary leading-relaxed">
        Saya mengikuti perkembangan AI sejak awal — bukan sekadar tren, tapi sebagai tools nyata yang memperkuat cara kerja saya setiap hari.
      </p>
    </div>

    <!-- Card Grid: 3x2 desktop, 2x3 tablet, 1x6 mobile -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
      {#each mindsetCards as card, i}
        <div
          class="reveal glass rounded-2xl p-6 border border-border-light/30 hover:border-accent-violet/40 hover:-translate-y-1 transition-all duration-300 group"
          style="transition-delay: {(i + 1) * 100}ms;"
        >
          <!-- Icon -->
          <div class="w-12 h-12 rounded-xl bg-accent-violet/10 border border-accent-violet/20 flex items-center justify-center text-accent-violet mb-5 group-hover:bg-accent-violet/15 group-hover:border-accent-violet/30 transition-colors duration-300">
            {@html card.icon}
          </div>

          <!-- Title -->
          <h3 class="font-heading text-lg text-primary font-semibold mb-2 group-hover:text-accent-violet transition-colors duration-300">
            {card.title}
          </h3>

          <!-- Description -->
          <p class="font-body text-secondary text-sm leading-relaxed">
            {card.description}
          </p>
        </div>
      {/each}
    </div>

    <!-- Bottom Quote -->
    <div class="reveal reveal-delay-5 mt-14 md:mt-16 text-center max-w-2xl mx-auto">
      <blockquote class="relative">
        <p class="font-body text-accent-violet/80 italic text-base md:text-lg leading-relaxed">
          "AI adalah alat bantu yang memperkuat keputusan — bukan pengganti critical thinking."
        </p>
      </blockquote>
    </div>

  </div>
</section>
