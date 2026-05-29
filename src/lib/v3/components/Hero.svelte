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

<section
  bind:this={sectionEl}
  class="relative flex min-h-screen items-center justify-center overflow-hidden"
  id="hero"
>
  <canvas
    bind:this={canvasEl}
    class="pointer-events-none absolute inset-0 h-full w-full"
    aria-hidden="true"
  ></canvas>

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
      class="mb-8 inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-4 py-1.5 text-sm font-medium text-success"
      use:scrollReveal={{ delay: 0.3 }}
    >
      <span class="inline-block h-2 w-2 animate-pulse rounded-full bg-success"></span>
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
