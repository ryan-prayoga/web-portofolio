<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from '../i18n';
  import { scrollReveal } from '../actions/scrollReveal';
  import type { HeroScene } from '../three/HeroScene';

  let canvasEl: HTMLCanvasElement;
  let sectionEl: HTMLElement;
  let scene: HeroScene;

  onMount(async () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const { HeroScene: HS } = await import('../three/HeroScene');
    scene = new HS();
    scene.init(canvasEl);

    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(
      { progress: 0 },
      {
        progress: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        onUpdate: function (this: { progress: number }) {
          scene?.updateProgress(this.progress);
        },
      }
    );
  });

  $effect(() => {
    return () => scene?.dispose();
  });
</script>

<!-- Persistent backdrop: fixed canvas + radial halo, lives behind everything
     (z<0) so it stays as atmospheric layer through every section. Pointer
     events disabled so it never blocks UI. Opacity is constant — no
     scroll-fade — to match nooma/DRIP/Terminal-style persistent 3D scenes. -->
<div
  class="hero-backdrop pointer-events-none fixed inset-0 -z-10"
  aria-hidden="true"
>
  <div class="hero-halo absolute inset-0"></div>
  <canvas bind:this={canvasEl} class="absolute inset-0 h-full w-full"></canvas>
</div>

<section
  bind:this={sectionEl}
  class="relative flex min-h-screen items-center justify-center overflow-hidden"
  id="hero"
>
  <div class="relative z-10 mx-auto max-w-3xl px-6 text-center">
    <p class="mb-3 text-sm tracking-widest text-secondary uppercase" use:scrollReveal={{ delay: 0 }}>
      {$t.hero.greeting}
    </p>
    <h1
      class="mb-2 font-heading text-4xl leading-tight font-bold tracking-tight text-primary md:text-7xl"
      use:scrollReveal={{ delay: 0.1 }}
    >
      {$t.hero.name}
    </h1>
    <p class="mb-6 text-xl text-secondary md:text-2xl" use:scrollReveal={{ delay: 0.2 }}>
      {$t.hero.role}
    </p>
    <span
      class="mb-8 inline-flex items-center gap-2 rounded-full border border-accent-success/30 bg-accent-success/10 px-4 py-1.5 text-sm font-medium text-accent-success"
      use:scrollReveal={{ delay: 0.3 }}
    >
      <span class="inline-block h-2 w-2 animate-pulse rounded-full bg-accent-success"></span>
      {$t.hero.openToWork}
    </span>
    <div class="mt-4" use:scrollReveal={{ delay: 0.4 }}>
      <a
        href="#projects"
        class="inline-block rounded-lg border border-border bg-surface-elevated px-6 py-3 text-sm font-medium text-primary transition hover:border-accent-cyan hover:text-accent-cyan"
      >
        {$t.hero.cta} ↓
      </a>
    </div>
  </div>
</section>

<style>
  /* The backdrop sits at z-index:-10. A fixed negative-z layer is painted
     BEHIND an opaque <body> background, which made the canvas vanish on
     scroll repaint. We give the backdrop its own base color and make the
     body transparent (see +page.svelte) so this layer is what shows through. */
  .hero-backdrop {
    background-color: #07090d;
  }

  /* Soft radial halo behind the particle field; cyan core, indigo mid,
     pink accent edge. Sits between page bg and the canvas, additively
     blended so the field reads as glowing rather than floating dots. */
  .hero-halo {
    background:
      radial-gradient(
        ellipse 60% 55% at 50% 45%,
        rgba(34, 211, 238, 0.18) 0%,
        rgba(99, 102, 241, 0.12) 35%,
        rgba(236, 72, 153, 0.06) 60%,
        transparent 80%
      );
    filter: blur(40px);
  }
</style>
