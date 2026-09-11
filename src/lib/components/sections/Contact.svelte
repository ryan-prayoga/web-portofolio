<script lang="ts">
  import { onMount } from 'svelte';
  import { localeStore } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';
  import { socials } from '$lib/data/socials';
  import { reveal } from '$lib/actions/reveal';
  import { drawCard, drawBadge, drawButton } from '$lib/actions/drawably';
  import Icon from '$lib/components/Icon.svelte';

  const t = $derived(uiCopy[localeStore.value]);
  const locale = $derived(localeStore.value);

  const email = socials.find((s) => s.name === 'Email');
  const github = socials.find((s) => s.name === 'GitHub');
  const linkedin = socials.find((s) => s.name === 'LinkedIn');

  let now = $state<Date | null>(null);
  let diffMinutes = $state(0);
  let userTzName = $state('');

  onMount(() => {
    const updateTime = () => {
      now = new Date();
    };
    updateTime();

    if (now) {
      // Tangerang (WIB) is permanently UTC+7 (420 minutes, zero DST)
      const visitorOffset = -now.getTimezoneOffset();
      const tangerangOffset = 7 * 60;
      diffMinutes = visitorOffset - tangerangOffset;

      try {
        const parts = new Intl.DateTimeFormat(undefined, { timeZoneName: 'short' }).formatToParts(now);
        userTzName = parts.find((p) => p.type === 'timeZoneName')?.value ?? '';
      } catch {
        userTzName = '';
      }
    }

    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  });

  const tangerangTime = $derived.by(() => {
    if (!now) return '';
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(now);
  });

  const visitorTime = $derived.by(() => {
    if (!now) return '';
    return new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(now);
  });

  const isDifferentTz = $derived(diffMinutes !== 0);

  const diffText = $derived.by(() => {
    if (diffMinutes === 0) return '';
    const isAhead = diffMinutes > 0;
    const absMinutes = Math.abs(diffMinutes);
    const hours = Math.floor(absMinutes / 60);
    const mins = absMinutes % 60;

    let timeStr: string;
    if (hours > 0 && mins > 0) {
      timeStr = locale === 'id' ? `${hours}j ${mins}m` : `${hours}h ${mins}m`;
    } else if (hours > 0) {
      timeStr = locale === 'id' ? `${hours} jam` : `${hours}h`;
    } else {
      timeStr = locale === 'id' ? `${mins} menit` : `${mins}m`;
    }

    if (locale === 'id') {
      return isAhead ? `${timeStr} lebih cepat` : `${timeStr} lebih lambat`;
    } else {
      return isAhead ? `${timeStr} ahead` : `${timeStr} behind`;
    }
  });
</script>

<section id="contact" class="mx-auto max-w-5xl px-6 py-14 pb-20" aria-labelledby="contact-heading">
  <div use:reveal>
    <span use:drawBadge={{ variant: 'outline' }} class="px-3 py-1 font-display text-sm tracking-wide uppercase">
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
    <span class="text-accent inline-flex items-center gap-1 font-display text-sm font-semibold tracking-wide uppercase">
      {t.contact.emailCta}
      <Icon name="arrowUpRight" size={13} />
    </span>
    <span
      class="group-hover:text-accent mt-3 block text-2xl font-display font-bold tracking-tight break-all transition-colors sm:text-4xl"
    >
      {email?.label}
    </span>
    <p class="text-muted/70 mt-2 text-sm font-display">Fastest response time · Open for direct conversation</p>
  </a>

  <div class="no-print mt-8 flex flex-wrap items-center gap-3.5 pt-2" use:reveal>
    <a
      href={github?.url}
      target="_blank"
      rel="noopener noreferrer"
      use:drawButton={{ variant: 'outline', resketchOnHover: true }}
      class="text-ink hover:text-accent inline-flex items-center gap-1.5 px-4 py-2 font-display text-base uppercase transition-colors active:scale-95"
    >
      GitHub <Icon name="arrowUpRight" size={13} />
    </a>
    <a
      href={linkedin?.url}
      target="_blank"
      rel="noopener noreferrer"
      use:drawButton={{ variant: 'outline', resketchOnHover: true }}
      class="text-ink hover:text-accent inline-flex items-center gap-1.5 px-4 py-2 font-display text-base uppercase transition-colors active:scale-95"
    >
      LinkedIn <Icon name="arrowUpRight" size={13} />
    </a>
    <a
      href={locale === 'id' ? '/cv/cv-id.pdf' : '/cv/cv-en.pdf'}
      download
      use:drawButton={{ variant: 'outline', resketchOnHover: true }}
      class="text-ink hover:text-accent inline-flex items-center gap-1.5 px-4 py-2 font-display text-base uppercase transition-colors active:scale-95"
    >
      CV (PDF) <Icon name="arrowDown" size={13} />
    </a>
    <div class="mt-4 flex w-full flex-col font-display text-sm uppercase sm:mt-0 sm:w-auto sm:ml-auto sm:items-end">
      <span class="text-muted">Tangerang, ID · UTC+7</span>
      {#if now}
        <div class="mt-1 flex items-center gap-1.5 tabular-nums text-ink">
          <span class="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true"></span>
          <span>{tangerangTime} WIB</span>
        </div>
        {#if isDifferentTz}
          <span class="mt-0.5 text-muted/75 font-mono text-[0.7rem] tabular-nums tracking-wide">
            {locale === 'id' ? 'Waktu Anda' : 'Your time'}: {visitorTime}{userTzName ? ` ${userTzName}` : ''} ({diffText})
          </span>
        {/if}
      {/if}
    </div>
  </div>
</section>
