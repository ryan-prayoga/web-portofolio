<script lang="ts">
  import { onMount } from 'svelte';
  import { stats } from '$lib/data/stats';

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

  function getIcon(icon: string): string {
    switch (icon) {
      case 'briefcase':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="2" y1="13" x2="22" y2="13"/></svg>`;
      case 'users':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
      case 'team':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><circle cx="4" cy="9" r="2.5"/><circle cx="20" cy="9" r="2.5"/><path d="M4 11.5a3 3 0 0 0-3 3V17h6v-2.5a3 3 0 0 0-3-3z"/><path d="M20 11.5a3 3 0 0 0-3 3V17h6v-2.5a3 3 0 0 0-3-3z"/><path d="M12 8a4 4 0 0 0-4 4v5h8v-5a4 4 0 0 0-4-4z"/></svg>`;
      case 'layers':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`;
      case 'rocket':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`;
      case 'cpu':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`;
      default:
        return '';
    }
  }
</script>

<section
  id="experience"
  class="relative py-24 spotlight-cyan overflow-hidden"
  bind:this={sectionEl}
>
  <!-- Section header -->
  <div class="max-w-6xl mx-auto px-6">
    <div class="reveal text-center mb-16">
      <div class="inline-flex items-center gap-2 mb-4">
        <span class="h-px w-8 bg-accent-cyan"></span>
        <span class="text-accent-cyan font-heading text-sm tracking-widest uppercase">
          Stats & Metrics
        </span>
        <span class="h-px w-8 bg-accent-cyan"></span>
      </div>
      <h2 class="text-3xl md:text-4xl font-heading font-bold text-primary">
        Experience
        <span class="text-accent-cyan">Highlights</span>
      </h2>
    </div>

    <!-- Stats grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {#each stats as stat, i}
        <div
          class="reveal reveal-delay-{(i % 5) + 1} group relative glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-glow-cyan hover:glow-cyan cursor-default"
        >
          <!-- Icon -->
          <div class="mb-4 text-accent-cyan/60 group-hover:text-accent-cyan transition-colors duration-300">
            {@html getIcon(stat.icon)}
          </div>

          <!-- Value -->
          <div class="flex items-baseline gap-2 mb-1">
            <span class="text-4xl font-heading font-bold text-accent-cyan leading-none">
              {stat.value}
            </span>
            <span class="text-lg font-heading font-semibold text-primary">
              {stat.label}
            </span>
          </div>

          <!-- Caption -->
          <p class="text-sm text-secondary leading-relaxed mt-3">
            {stat.caption}
          </p>

          <!-- Subtle accent line at bottom -->
          <div class="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent group-hover:via-accent-cyan/40 transition-all duration-300"></div>
        </div>
      {/each}
    </div>
  </div>
</section>
