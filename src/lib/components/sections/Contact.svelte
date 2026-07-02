<script lang="ts">
  import { localeStore } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';
  import { socials } from '$lib/data/socials';
  import { reveal } from '$lib/actions/reveal';

  const t = $derived(uiCopy[localeStore.value]);

  const email = socials.find((s) => s.name === 'Email');
  const contactLinks = socials;
</script>

<section id="contact" class="section contact">
  <div class="sec-head" use:reveal>
    <p class="mono idx">SYS/04 — {t.contactKicker}</p>
    <h2 class="contact-h">{t.contactHeading}</h2>
    <p class="lead">{t.contactBody}</p>
  </div>

  <ul class="contact-links" use:reveal>
    {#each contactLinks as social, i (social.name)}
      <li>
        <a
          href={social.url}
          target={social.url.startsWith('mailto:') ? undefined : '_blank'}
          rel={social.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
        >
          <span class="cl-idx mono">0{i + 1}</span>
          <span class="cl-name">{social.name}</span>
          <span class="cl-val mono">{social.label}</span>
          <span class="cl-arrow" aria-hidden="true">↗</span>
        </a>
      </li>
    {/each}
  </ul>

  <div class="cta contact-cta" use:reveal>
    <a class="btn primary" href={email?.url}>{t.sendEmail} <span>→</span></a>
    <a class="btn" href="/cv/cv-en.pdf" download>CV (EN)</a>
    <a class="btn" href="/cv/cv-id.pdf" download>CV (ID)</a>
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
  .lead {
    color: var(--color-greige);
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    line-height: 1.55;
    max-width: 38ch;
  }
  .sec-head .idx {
    color: var(--color-ember);
  }
  .sec-head {
    margin-bottom: clamp(2.5rem, 6vw, 4.5rem);
  }
  .contact-h {
    margin: 0.8rem 0 1rem;
    font-family: var(--font-display);
    max-width: 12ch;
    font-size: clamp(2.2rem, 7vw, 5rem);
    font-weight: 600;
    line-height: 1;
    letter-spacing: -0.03em;
    color: var(--color-bone);
  }
  .contact-links {
    list-style: none;
    margin: 0;
    padding: 0;
    border-top: 1px solid var(--color-bone);
  }
  .contact-links a {
    display: grid;
    grid-template-columns: 2.5rem minmax(0, 0.3fr) minmax(0, 1fr) 1.5rem;
    gap: 1rem;
    align-items: baseline;
    padding: 1.3rem 0;
    border-bottom: 1px solid color-mix(in srgb, var(--color-slate) 55%, transparent);
    text-decoration: none;
    color: var(--color-bone);
    transition: padding-left 0.22s, background-color 0.22s;
  }
  .contact-links a:hover {
    padding-left: 0.9rem;
    background: color-mix(in srgb, var(--color-navy) 60%, transparent);
  }
  .cl-idx {
    color: var(--color-greige);
  }
  .cl-name {
    font-family: var(--font-display);
    font-size: clamp(1.2rem, 2.4vw, 1.8rem);
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  .cl-val {
    color: var(--color-greige);
    align-self: center;
    text-transform: none;
  }
  .cl-arrow {
    justify-self: end;
    color: var(--color-ember);
  }
  .contact-cta {
    margin-top: 2.2rem;
  }
  .cta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
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
  @media (max-width: 760px) {
    .contact-links a {
      grid-template-columns: 2rem 1fr;
    }
    .cl-val {
      grid-column: 2;
    }
    .cl-arrow {
      display: none;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .contact-links a,
    .btn,
    .btn span {
      transition: none;
    }
  }
</style>
