<script lang="ts">
  import { localeStore } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';
  import { socials } from '$lib/data/socials';
  import { reveal } from '$lib/actions/reveal';
  import { magnetic } from '$lib/motion/magnetic';
  import { scramble } from '$lib/motion/scramble';

  const t = $derived(uiCopy[localeStore.value]);
  const locale = $derived(localeStore.value);

  const email = socials.find((s) => s.name === 'Email');
  const github = socials.find((s) => s.name === 'GitHub');
  const linkedin = socials.find((s) => s.name === 'LinkedIn');
</script>

<section id="contact" class="section contact">
  <div class="sec-head" use:reveal>
    {#key locale}
      <p class="mono idx" use:scramble>SYS/04 — {t.contactKicker}</p>
    {/key}
    <p class="intro">{t.contactHeading} <span class="dim">{t.contactBody}</span></p>
  </div>

  <a class="email" href={email?.url} use:reveal use:magnetic={0.08} data-cursor>
    <span class="email-label mono">{t.sendEmail} ↗</span>
    <span class="email-addr">developer@<wbr />ryanprayoga.dev</span>
  </a>

  <div class="channels mono" use:reveal>
    <a href={github?.url} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
    <a href={linkedin?.url} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
    <a href="/cv/cv-en.pdf" download>CV (EN)</a>
    <a href="/cv/cv-id.pdf" download>CV (ID)</a>
    <span class="loc">-6.17, 106.63 · WIB</span>
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
  .intro {
    margin: 0.9rem 0 0;
    font-size: clamp(1.05rem, 1.6vw, 1.3rem);
    line-height: 1.5;
    color: var(--color-bone);
    max-width: 52ch;
  }
  .intro .dim {
    color: var(--color-greige);
  }

  .email {
    display: block;
    text-decoration: none;
    padding: clamp(1.6rem, 4vw, 3rem) 0;
    border-top: 1px solid var(--color-bone);
    border-bottom: 1px solid color-mix(in srgb, var(--color-slate) 55%, transparent);
  }
  .email-label {
    display: block;
    color: var(--color-ember);
    margin-bottom: 0.9rem;
  }
  .email-addr {
    display: block;
    font-family: var(--font-display);
    font-size: clamp(1.9rem, 6.4vw, 6rem);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.03em;
    color: var(--color-bone);
    overflow-wrap: anywhere;
    background-image: linear-gradient(var(--color-ember), var(--color-ember));
    background-size: 0% 3px;
    background-position: 0 100%;
    background-repeat: no-repeat;
    transition: background-size 0.5s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s;
    padding-bottom: 0.08em;
  }
  .email:hover .email-addr,
  .email:focus-visible .email-addr {
    background-size: 100% 3px;
    color: var(--color-ember);
  }

  .channels {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.6rem;
    margin-top: 1.6rem;
  }
  .channels a {
    padding: 0.55rem 0.9rem;
    border: 1px solid var(--color-slate);
    color: var(--color-bone);
    text-decoration: none;
    transition: border-color 0.18s, color 0.18s, transform 0.18s;
  }
  .channels a:hover {
    border-color: var(--color-ember);
    color: var(--color-ember);
    transform: translateY(-2px);
  }
  .channels .loc {
    margin-left: auto;
    color: var(--color-greige);
  }

  @media (max-width: 760px) {
    .channels .loc {
      margin-left: 0;
      width: 100%;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .email-addr,
    .channels a {
      transition: none;
    }
  }
</style>
