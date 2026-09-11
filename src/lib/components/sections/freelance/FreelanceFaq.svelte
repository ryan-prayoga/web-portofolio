<script lang="ts">
  import Icon from '$lib/components/Icon.svelte';
  import { localeStore } from '$lib/stores/locale.svelte';
  import { freelanceCopy } from '$lib/data/freelanceCopy';
  import { faqItems, getWhatsAppUrl } from '$lib/data/freelanceData';
  import { drawCard, drawBadge } from '$lib/actions/drawably';

  const t = $derived(freelanceCopy[localeStore.value]);
  const locale = $derived(localeStore.value);

  // State untuk accordion FAQ yang terbuka (default item pertama terbuka)
  let openIndex = $state<number | null>(0);

  function toggle(index: number) {
    openIndex = openIndex === index ? null : index;
  }

  const faqWaMessage = $derived(
    locale === 'id'
      ? 'Halo Ryan, saya mau tanya seputar pembuatan web portofolio...'
      : 'Hi Ryan, I have a question regarding web portfolio development...',
  );
</script>

<section id="faq" class="mx-auto max-w-5xl px-6 py-16 sm:py-24 border-t border-rule">
  <div class="inline-block">
    <span
      use:drawBadge={{ variant: 'outline', resketchOnHover: true }}
      class="cursor-default px-3 py-1 font-display text-sm tracking-wide uppercase text-accent"
    >
      // {t.faq.badge}
    </span>
  </div>

  <h2 class="mt-4 font-display text-2xl sm:text-4xl font-semibold tracking-tight text-balance">
    {t.faq.heading}
  </h2>
  <p class="mt-3 text-muted max-w-2xl text-sm sm:text-base leading-relaxed">
    {t.faq.subheading}
  </p>

  <div class="mt-12 flex flex-col gap-4">
    {#each faqItems as item, index (item.question.id)}
      <div use:drawCard={{ resketchOnHover: true }} class="bg-paper transition-all overflow-hidden">
        <button
          type="button"
          class="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
          onclick={() => toggle(index)}
          aria-expanded={openIndex === index}
        >
          <span class="font-display text-base sm:text-lg font-semibold text-ink tracking-tight">
            {item.question[locale]}
          </span>
          <span class="text-accent shrink-0 transition-transform duration-200 {openIndex === index ? 'rotate-45' : ''}">
            <Icon name="plus" size={18} strokeWidth={2} />
          </span>
        </button>

        {#if openIndex === index}
          <div class="px-6 pb-6 pt-1 text-xs sm:text-sm leading-relaxed text-muted border-t border-rule/50">
            {item.answer[locale]}
          </div>
        {/if}
      </div>
    {/each}
  </div>

  <div class="mt-10 text-center">
    <p class="font-display text-xs sm:text-sm text-muted">
      {t.faq.helpText}
    </p>
    <a
      href={getWhatsAppUrl(faqWaMessage)}
      target="_blank"
      rel="noopener noreferrer"
      class="text-accent mt-2 inline-flex items-center gap-1 font-display text-sm font-semibold tracking-wide uppercase hover:underline"
    >
      {t.faq.helpCta}
      <Icon name="arrowUpRight" size={13} />
    </a>
  </div>
</section>
