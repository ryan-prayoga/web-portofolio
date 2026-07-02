<script lang="ts">
  import { onMount } from 'svelte';
  import { localeStore } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';
  import { profile } from '$lib/data/profile';
  import { socials } from '$lib/data/socials';
  import PhotoBadge from './PhotoBadge.svelte';
  import HeroCanvas from './HeroCanvas.svelte';

  const t = $derived(uiCopy[localeStore.value]);
  const locale = $derived(localeStore.value);
  const email = socials.find((s) => s.name === 'Email');

  const proof = $derived([
    { value: '4+', label: t.proof[0] },
    { value: '5', label: t.proof[1] },
    { value: '11+', label: t.proof[2] },
  ]);

  function goTo(id: string) {
    return (event: Event) => {
      event.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };
  }

  let heroEl: HTMLElement | undefined = $state();
  let intro = $state(false); // true = elemen disembunyikan menunggu timeline

  onMount(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!heroEl) return;

    intro = true;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      try {
        const { gsap, SplitText } = await import('$lib/motion/gsap');
        if (cancelled || !heroEl) return;
        ctx = gsap.context(() => {
          const split = SplitText.create('.hero-title', { type: 'chars' });
          gsap
            .timeline({
              defaults: { ease: 'power4.out' },
              onStart: () => (intro = false),
            })
            .fromTo(
              split.chars,
              { yPercent: 115, autoAlpha: 0 },
              { yPercent: 0, autoAlpha: 1, duration: 0.9, stagger: 0.03 },
              0.1
            )
            .fromTo(
              ['.role', '.lead', '.cta'],
              { y: 26, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1 },
              0.5
            )
            .fromTo(
              '.hero-badge',
              { y: 34, autoAlpha: 0, scale: 0.96, rotate: 2.5 },
              { y: 0, autoAlpha: 1, scale: 1, rotate: 0, duration: 0.9, ease: 'power3.out' },
              0.55
            )
            .fromTo(
              ['.hero-top', '.ticker', '.proof'],
              { y: 14, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out', stagger: 0.08 },
              0.7
            );
        }, heroEl);
      } catch {
        intro = false;
      }
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  });
</script>

<header class="hero" class:intro id="hero" bind:this={heroEl}>
  <HeroCanvas />

  <div class="hero-inner">
    <div class="hero-top mono">
      <span>PORTFOLIO © 2026</span>
      <span class="coords">-6.17°S · 106.63°E · TANGERANG</span>
    </div>

    <div class="hero-main">
      <div class="hero-text">
        <h1 class="hero-title">Ryan<br />Prayoga<span class="accent">.</span></h1>
        <p class="role">{t.heroRole}</p>
        <p class="lead">{t.heroBody}</p>
        <div class="cta">
          <a class="btn primary" href="#work" onclick={goTo('work')}>{t.viewWork} <span>→</span></a>
          <a class="btn" href={locale === 'id' ? '/cv/cv-id.pdf' : '/cv/cv-en.pdf'} download>{t.downloadCv}</a>
          <a class="btn" href={email?.url}>{t.contact}</a>
        </div>
      </div>

      <div class="hero-badge">
        <PhotoBadge />
      </div>
    </div>

    <div class="hero-foot">
      <p class="ticker mono">{t.ticker}</p>
      <div class="proof">
        {#each proof as item, i (item.label)}
          <div class="proof-cell">
            <span class="mono pn">0{i + 1}</span>
            <strong>{item.value}</strong>
            <span class="mono pl">{item.label}</span>
          </div>
        {/each}
        <div class="proof-cell loc">
          <span class="mono pn">04</span>
          <strong class="sm">{profile.location}</strong>
          <span class="mono pl">Based in</span>
        </div>
      </div>
    </div>
  </div>
</header>

<style>
  .mono {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .hero {
    position: relative;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: clip;
  }
  /* Sembunyikan target animasi selagi chunk GSAP dimuat, hindari flash */
  .hero.intro .hero-title,
  .hero.intro .role,
  .hero.intro .lead,
  .hero.intro .cta,
  .hero.intro .hero-badge,
  .hero.intro .hero-top,
  .hero.intro .ticker,
  .hero.intro .proof {
    visibility: hidden;
  }
  .hero-inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: clamp(1.6rem, 4vh, 3rem);
    padding: clamp(6rem, 12vh, 8rem) clamp(1.25rem, 5vw, 4rem) clamp(1.5rem, 4vh, 2.5rem);
    flex: 1;
    justify-content: flex-end;
  }
  .hero-top {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid color-mix(in srgb, var(--color-slate) 55%, transparent);
    color: var(--color-greige);
  }
  .hero-top .coords {
    color: var(--color-ember);
  }
  .hero-main {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: clamp(1.5rem, 4vw, 4rem);
    align-items: end;
  }
  .hero-title {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(3rem, 13vw, 12.5rem);
    font-weight: 800;
    line-height: 0.85;
    letter-spacing: -0.04em;
    color: var(--color-bone);
    overflow-wrap: anywhere;
  }
  .hero-title .accent {
    color: var(--color-ember);
  }
  .role {
    margin: clamp(1rem, 2.5vh, 1.8rem) 0 0;
    font-size: clamp(1.2rem, 2.4vw, 1.9rem);
    font-weight: 600;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--color-bone);
  }
  .lead {
    margin: 0.9rem 0 0;
    color: var(--color-greige);
    font-size: clamp(1rem, 1.4vw, 1.15rem);
    line-height: 1.55;
    max-width: 44ch;
  }
  .cta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
    margin-top: 1.6rem;
  }
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.7rem 1.1rem;
    border: 1px solid var(--color-slate);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--color-bone);
    text-decoration: none;
    transition: background-color 0.18s, color 0.18s, border-color 0.18s, transform 0.18s;
  }
  .btn span {
    transition: transform 0.18s;
  }
  .btn:hover {
    transform: translateY(-2px);
    border-color: var(--color-bone);
  }
  .btn:hover span {
    transform: translateX(3px);
  }
  .btn.primary {
    background: var(--color-ember);
    border-color: var(--color-ember);
    color: var(--color-night);
    font-weight: 600;
  }
  .btn.primary:hover {
    background: var(--color-bone);
    border-color: var(--color-bone);
  }
  .hero-badge {
    justify-self: end;
  }
  .hero-foot {
    display: grid;
    gap: 0;
  }
  .ticker {
    margin: 0;
    padding: 0.7rem 0;
    border-top: 1px solid color-mix(in srgb, var(--color-slate) 55%, transparent);
    color: var(--color-ember);
  }
  .proof {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    border-top: 1px solid var(--color-bone);
  }
  .proof-cell {
    min-width: 0;
    padding: 1.2rem 1.2rem 1.2rem 0;
    border-right: 1px solid color-mix(in srgb, var(--color-slate) 55%, transparent);
  }
  .proof-cell:last-child {
    border-right: 0;
  }
  .proof-cell .pn {
    display: block;
    color: var(--color-ember);
    margin-bottom: 0.7rem;
  }
  .proof-cell strong {
    display: block;
    font-family: var(--font-display);
    font-size: clamp(2rem, 4.5vw, 3.1rem);
    font-weight: 700;
    line-height: 0.95;
    letter-spacing: -0.03em;
    color: var(--color-bone);
  }
  .proof-cell strong.sm {
    font-size: clamp(1.05rem, 2.2vw, 1.55rem);
    font-weight: 600;
    overflow-wrap: anywhere;
  }
  .proof-cell .pl {
    display: block;
    margin-top: 0.55rem;
    color: var(--color-greige);
  }

  @media (max-width: 1080px) {
    .hero-main {
      grid-template-columns: 1fr;
      align-items: start;
    }
    .hero-badge {
      justify-self: start;
    }
  }
  @media (max-width: 760px) {
    .hero {
      min-height: auto;
    }
    .proof {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .proof-cell:nth-child(2) {
      border-right: 0;
    }
    .proof-cell:nth-child(1),
    .proof-cell:nth-child(2) {
      border-bottom: 1px solid color-mix(in srgb, var(--color-slate) 55%, transparent);
    }
    .proof-cell.loc {
      grid-column: 1 / -1;
      border-right: 0;
      border-top: 1px solid color-mix(in srgb, var(--color-slate) 55%, transparent);
    }
    .proof-cell.loc strong.sm {
      white-space: nowrap;
    }
  }
</style>
