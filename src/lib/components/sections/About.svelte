<script lang="ts">
  import { localeStore } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';
  import { profile } from '$lib/data/profile';
  import { reveal } from '$lib/actions/reveal';
  import { scrubWords } from '$lib/motion/splitReveal';
  import { scramble } from '$lib/motion/scramble';
  import PhotoBadge from '$lib/components/hero/PhotoBadge.svelte';

  const t = $derived(uiCopy[localeStore.value]);
  const locale = $derived(localeStore.value);
  const academic = 'S1 Informatika — Universitas Pasundan';

  const aboutRows = $derived([
    { kicker: t.aboutRows[0].kicker, title: profile.role, body: t.aboutRows[0].body },
    { kicker: t.aboutRows[1].kicker, title: academic, body: t.aboutRows[1].body },
    {
      kicker: t.aboutRows[2].kicker,
      title: 'Backend · Frontend · Mobile · Deploy',
      body: t.aboutRows[2].body,
    },
  ]);
</script>

<section id="about" class="section">
  <div class="sec-head" use:reveal>
    {#key locale}
      <p class="mono idx" use:scramble>SYS/02 — {t.aboutKicker}</p>
    {/key}
    <h2>{t.aboutHeading}</h2>
  </div>

  <div class="statement-row">
    {#key locale}
      <p class="statement" use:scrubWords>{t.aboutStatement}</p>
    {/key}
    <div class="photo" use:reveal>
      <PhotoBadge />
    </div>
  </div>

  <div class="about" use:reveal>
    {#each aboutRows as row (row.kicker)}
      <article class="about-row">
        <p class="mono ar-k">{row.kicker}</p>
        <h3 class="ar-t">{row.title}</h3>
        <p class="ar-b">{row.body}</p>
      </article>
    {/each}
  </div>
</section>

<style>
  .mono {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .section {
    padding: clamp(4rem, 10vw, 8.5rem) clamp(1.25rem, 5vw, 4rem);
    border-top: 1px solid color-mix(in srgb, var(--color-slate) 55%, transparent);
  }
  .sec-head {
    margin-bottom: clamp(2rem, 5vw, 3.5rem);
  }
  .sec-head .idx {
    color: var(--color-ember);
  }
  .sec-head h2 {
    margin: 0.8rem 0 0;
    font-family: var(--font-display);
    font-size: clamp(1.9rem, 4.5vw, 3.6rem);
    font-weight: 600;
    line-height: 1;
    letter-spacing: -0.03em;
    max-width: 16ch;
    color: var(--color-bone);
  }
  .statement-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: clamp(1.5rem, 4vw, 4rem);
    align-items: start;
    margin-bottom: clamp(2.5rem, 6vw, 4rem);
  }
  .photo {
    width: min(15rem, 100%);
    justify-self: end;
  }
  .statement {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(1.4rem, 3.2vw, 2.6rem);
    font-weight: 500;
    line-height: 1.25;
    letter-spacing: -0.02em;
    max-width: 30ch;
    color: var(--color-bone);
  }
  .about {
    border-top: 1px solid var(--color-bone);
  }
  .about-row {
    display: grid;
    grid-template-columns: minmax(0, 0.22fr) minmax(0, 0.36fr) minmax(0, 0.42fr);
    gap: clamp(1rem, 3vw, 2.5rem);
    padding: clamp(1.6rem, 3vw, 2.4rem) 0;
    border-bottom: 1px solid color-mix(in srgb, var(--color-slate) 55%, transparent);
  }
  .ar-k {
    color: var(--color-ember);
  }
  .ar-t {
    margin: 0;
    font-size: clamp(1.2rem, 2.2vw, 1.7rem);
    font-weight: 600;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--color-bone);
  }
  .ar-b {
    margin: 0;
    color: var(--color-greige);
    line-height: 1.6;
  }
  @media (max-width: 760px) {
    .statement-row {
      grid-template-columns: 1fr;
    }
    .photo {
      justify-self: start;
    }
    .about-row {
      grid-template-columns: 1fr;
      gap: 0.6rem;
    }
  }
</style>
