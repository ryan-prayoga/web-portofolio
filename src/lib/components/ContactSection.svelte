<script lang="ts">
  import { onMount } from 'svelte';
  import { socials } from '$lib/data/socials';

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
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const revealElements = sectionEl.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });
</script>

<section
  id="contact"
  class="relative py-32 spotlight-cyan overflow-hidden"
  bind:this={sectionEl}
>
  <div class="relative z-10 mx-auto max-w-2xl px-6 lg:px-8 text-center">

    <!-- Section heading -->
    <div class="reveal mb-6">
      <div class="flex items-center justify-center gap-3 mb-4">
        <span class="block h-px w-10 bg-accent-cyan"></span>
        <span class="font-body text-sm tracking-widest uppercase text-accent-cyan">Kontak</span>
        <span class="block h-px w-10 bg-accent-cyan"></span>
      </div>
      <h2 class="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
        Mari <span class="text-accent-cyan">Terhubung</span>
      </h2>
    </div>

    <!-- CTA paragraph -->
    <p class="reveal reveal-delay-1 text-lg leading-relaxed text-secondary font-body mb-14 max-w-xl mx-auto">
      Saya selalu terbuka untuk kolaborasi, diskusi teknologi, atau tantangan baru. Jika Anda memiliki project menarik, ingin berdiskusi tentang engineering, atau sekadar ingin berkenalan — jangan ragu untuk menghubungi saya.
    </p>

    <!-- Social link cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">

      <!-- GitHub card -->
      {#each socials as social, i}
        <a
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          class="reveal reveal-delay-{i + 2} group glass rounded-2xl p-6 flex flex-col items-center gap-4 transition-all duration-500 hover:-translate-y-2 {social.icon === 'github' ? 'hover:glow-cyan' : 'hover:glow-violet'} cursor-pointer no-underline"
        >
          <!-- Icon -->
          <div class="flex items-center justify-center w-14 h-14 rounded-2xl {social.icon === 'github' ? 'bg-accent-cyan/10' : 'bg-accent-blue/10'} transition-colors duration-300 {social.icon === 'github' ? 'group-hover:bg-accent-cyan/20' : 'group-hover:bg-accent-blue/20'}">
            {#if social.icon === 'github'}
              <svg class="w-7 h-7 text-accent-cyan transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            {:else if social.icon === 'linkedin'}
              <svg class="w-7 h-7 text-accent-blue transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            {/if}
          </div>

          <!-- Name -->
          <h3 class="font-heading text-lg font-semibold text-primary transition-colors duration-300 {social.icon === 'github' ? 'group-hover:text-accent-cyan' : 'group-hover:text-accent-blue'}">
            {social.name}
          </h3>

          <!-- Username / label -->
          <span class="text-sm text-muted font-body transition-colors duration-300 {social.icon === 'github' ? 'group-hover:text-accent-cyan/70' : 'group-hover:text-accent-blue/70'}">
            {social.label}
          </span>

          <!-- Subtle arrow indicator -->
          <div class="flex items-center gap-1.5 text-xs text-muted/60 transition-all duration-300 group-hover:gap-2.5 {social.icon === 'github' ? 'group-hover:text-accent-cyan/60' : 'group-hover:text-accent-blue/60'}">
            <span class="font-body">Kunjungi Profil</span>
            <svg class="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </div>

          <!-- Bottom accent line -->
          <div class="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent {social.icon === 'github' ? 'via-accent-cyan/15 group-hover:via-accent-cyan/40' : 'via-accent-blue/15 group-hover:via-accent-blue/40'} to-transparent transition-all duration-500"></div>
        </a>
      {/each}

    </div>

    <!-- Final engineer statement -->
    <p class="reveal reveal-delay-4 text-sm text-muted font-body leading-relaxed">
      Engineer yang siap untuk kolaborasi, diskusi, dan tantangan baru.
    </p>

  </div>
</section>
