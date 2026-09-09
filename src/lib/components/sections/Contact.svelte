<script lang="ts">
  import { localeStore } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';
  import { socials } from '$lib/data/socials';
  import { reveal } from '$lib/actions/reveal';
  import { drawCard, drawBadge } from '$lib/actions/drawably';

  const t = $derived(uiCopy[localeStore.value]);
  const locale = $derived(localeStore.value);

  const email = socials.find((s) => s.name === 'Email');
  const github = socials.find((s) => s.name === 'GitHub');
  const linkedin = socials.find((s) => s.name === 'LinkedIn');
</script>

<section id="contact" class="mx-auto max-w-5xl px-6 py-14 pb-20" aria-labelledby="contact-heading">
  <div use:reveal>
    <span use:drawBadge={{ variant: 'outline' }} class="px-2.5 py-0.5 font-mono text-xs tracking-wider uppercase">
      {t.contact.label}
    </span>
    <h2 id="contact-heading" class="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{t.contact.heading}</h2>
    <p class="text-muted mt-2.5 max-w-prose leading-relaxed">{t.contact.body}</p>
  </div>

  <a
    href={email?.url}
    use:reveal
    use:drawCard={{ resketchOnHover: true }}
    class="group mt-8 block cursor-pointer p-8 transition-transform hover:-translate-y-0.5 sm:p-10"
  >
    <span class="text-accent font-mono text-xs tracking-wide uppercase">
      {t.contact.emailCta} <span aria-hidden="true">↗</span>
    </span>
    <span
      class="group-hover:text-accent mt-3 block text-2xl font-display font-bold tracking-tight break-all transition-colors sm:text-4xl"
    >
      {email?.label}
    </span>
    <p class="text-muted/70 mt-2 text-xs font-mono">Fastest response time · Open for direct conversation</p>
  </a>

  <div class="no-print mt-8 flex flex-wrap items-center gap-5 pt-2" use:reveal>
    <a
      href={github?.url}
      target="_blank"
      rel="noopener noreferrer"
      class="text-muted hover:text-accent font-mono text-xs uppercase underline-offset-4 hover:underline"
    >
      GitHub <span aria-hidden="true">↗</span>
    </a>
    <a
      href={linkedin?.url}
      target="_blank"
      rel="noopener noreferrer"
      class="text-muted hover:text-accent font-mono text-xs uppercase underline-offset-4 hover:underline"
    >
      LinkedIn <span aria-hidden="true">↗</span>
    </a>
    <a
      href={locale === 'id' ? '/cv/cv-id.pdf' : '/cv/cv-en.pdf'}
      download
      class="text-muted hover:text-accent font-mono text-xs uppercase underline-offset-4 hover:underline"
    >
      CV (PDF) <span aria-hidden="true">↓</span>
    </a>
    <span class="text-muted w-full sm:w-auto sm:ml-auto font-mono text-xs uppercase">Tangerang, ID · UTC+7</span>
  </div>
</section>
