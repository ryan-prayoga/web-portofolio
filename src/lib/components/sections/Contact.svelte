<script lang="ts">
  import { localeStore } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';
  import { socials } from '$lib/data/socials';
  import { reveal } from '$lib/actions/reveal';

  const t = $derived(uiCopy[localeStore.value]);
  const locale = $derived(localeStore.value);

  const email = socials.find((s) => s.name === 'Email');
  const github = socials.find((s) => s.name === 'GitHub');
  const linkedin = socials.find((s) => s.name === 'LinkedIn');
</script>

<section id="contact" class="mx-auto max-w-5xl px-6 py-14 pb-20" aria-labelledby="contact-heading">
  <div use:reveal>
    <p class="text-accent font-mono text-xs tracking-wider uppercase">{t.contact.label}</p>
    <h2 id="contact-heading" class="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{t.contact.heading}</h2>
    <p class="text-muted mt-3 max-w-prose leading-relaxed">{t.contact.body}</p>
  </div>

  <a href={email?.url} class="group border-rule mt-8 block border-t pt-8 pb-6" use:reveal>
    <span class="text-accent font-mono text-xs tracking-wide uppercase"
      >{t.contact.emailCta} <span aria-hidden="true">↗</span></span
    >
    <span
      class="group-hover:text-accent mt-2 block text-2xl font-semibold tracking-tight break-all transition-colors sm:text-4xl"
    >
      {email?.label}
    </span>
  </a>

  <div class="no-print border-rule flex flex-wrap items-center gap-4 border-t pt-6" use:reveal>
    <a
      href={github?.url}
      target="_blank"
      rel="noopener noreferrer"
      class="text-muted hover:text-accent font-mono text-xs uppercase underline-offset-4 hover:underline"
      >GitHub <span aria-hidden="true">↗</span></a
    >
    <a
      href={linkedin?.url}
      target="_blank"
      rel="noopener noreferrer"
      class="text-muted hover:text-accent font-mono text-xs uppercase underline-offset-4 hover:underline"
      >LinkedIn <span aria-hidden="true">↗</span></a
    >
    <a
      href={locale === 'id' ? '/cv/cv-id.pdf' : '/cv/cv-en.pdf'}
      download
      class="text-muted hover:text-accent font-mono text-xs uppercase underline-offset-4 hover:underline">CV (PDF)</a
    >
    <span class="text-muted ml-auto font-mono text-xs uppercase">Tangerang, ID · UTC+7</span>
  </div>
</section>
