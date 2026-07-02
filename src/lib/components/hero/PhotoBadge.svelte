<script lang="ts">
  import { localeStore } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';
  import WibClock from '$lib/components/ui/WibClock.svelte';

  const t = $derived(uiCopy[localeStore.value]);

  let card: HTMLElement | undefined = $state();
  let tiltReady = $state(false);

  $effect(() => {
    if (!card) return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    tiltReady = true;
    const el = card;
    const MAX = 9;
    let raf = 0;

    function onMove(e: PointerEvent) {
      const rect = el.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `rotateX(${(-ny * MAX).toFixed(2)}deg) rotateY(${(nx * MAX).toFixed(2)}deg)`;
        el.style.setProperty('--glare-x', `${(nx * 50 + 50).toFixed(1)}%`);
        el.style.setProperty('--glare-y', `${(ny * 50 + 50).toFixed(1)}%`);
      });
    }
    function onLeave() {
      cancelAnimationFrame(raf);
      el.style.transform = '';
    }

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  });
</script>

<div class="badge-wrap">
  <figure class="badge" class:tilt={tiltReady} bind:this={card}>
    <span class="punch" aria-hidden="true"></span>
    <picture>
      <source
        type="image/avif"
        srcset="/photo/ryan-480.avif 480w, /photo/ryan-700.avif 708w"
        sizes="(max-width: 760px) 60vw, 22rem"
      />
      <source
        type="image/webp"
        srcset="/photo/ryan-480.webp 480w, /photo/ryan-700.webp 708w"
        sizes="(max-width: 760px) 60vw, 22rem"
      />
      <img
        src="/photo/ryan-700.jpg"
        alt="Ryan Prayoga"
        width="708"
        height="886"
        loading="lazy"
        decoding="async"
      />
    </picture>
    <span class="glare" aria-hidden="true"></span>
    <figcaption class="chrome mono">
      <span class="name">RYAN PRAYOGA</span>
      <span>{t.badge.role}</span>
      <span>{t.badge.loc} · <WibClock /></span>
    </figcaption>
  </figure>
</div>

<style>
  .mono {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .badge-wrap {
    perspective: 900px;
    width: min(22rem, 100%);
  }
  .badge {
    position: relative;
    margin: 0;
    background: var(--color-navy);
    border: 1px solid var(--color-slate);
    box-shadow:
      inset 0 0 0 1px color-mix(in srgb, var(--color-ember) 12%, transparent),
      0 24px 60px -24px rgba(0, 0, 0, 0.7);
    transform-style: preserve-3d;
    will-change: transform;
    transition: transform 0.35s ease;
    --glare-x: 50%;
    --glare-y: 50%;
  }
  .badge.tilt {
    transition: transform 0.12s ease-out;
  }
  .punch {
    position: absolute;
    top: 0.7rem;
    left: 50%;
    transform: translateX(-50%);
    width: 2.4rem;
    height: 0.45rem;
    border-radius: 999px;
    background: var(--color-night);
    border: 1px solid var(--color-slate);
    z-index: 2;
  }
  picture,
  img {
    display: block;
    width: 100%;
    height: auto;
  }
  picture {
    padding: 1.6rem 1rem 0;
  }
  img {
    border: 1px solid color-mix(in srgb, var(--color-slate) 60%, transparent);
  }
  .chrome {
    display: grid;
    gap: 0.25rem;
    padding: 0.9rem 1rem 1rem;
    color: var(--color-greige);
  }
  .chrome .name {
    color: var(--color-bone);
    font-weight: 700;
    font-size: 0.72rem;
  }
  .glare {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(
      circle at var(--glare-x) var(--glare-y),
      color-mix(in srgb, var(--color-bone) 10%, transparent),
      transparent 55%
    );
    opacity: 0;
    transition: opacity 0.3s;
  }
  .badge.tilt:hover .glare {
    opacity: 1;
  }
</style>
