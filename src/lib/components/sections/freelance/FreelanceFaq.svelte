<script lang="ts">
  import Icon from '$lib/components/Icon.svelte';
  import { localeStore } from '$lib/stores/locale.svelte';
  import { freelanceCopy } from '$lib/data/freelanceCopy';
  import { faqItems, getWhatsAppUrl } from '$lib/data/freelanceData';
  import { drawCard, drawBadge } from '$lib/actions/drawably';
  import SketchRule from '$lib/components/ui/SketchRule.svelte';

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

<section id="faq" class="relative mx-auto max-w-5xl px-6 py-16 sm:py-24">
  <SketchRule seed={128} class="text-ink/40 absolute inset-x-6 -top-1" />
  <div class="inline-block">
    <span
      use:drawBadge={{ variant: 'outline', resketchOnHover: true }}
      class="cursor-default px-3 py-1 font-display text-sm text-accent"
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
      <div
        use:drawCard={{ resketchOnHover: true }}
        class="t-acc bg-paper transition-all overflow-hidden"
        data-open={openIndex === index}
      >
        <button
          type="button"
          class="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
          onclick={() => toggle(index)}
          aria-expanded={openIndex === index}
        >
          <span class="font-display text-base sm:text-lg font-semibold text-ink tracking-tight">
            {item.question[locale]}
          </span>
          <span
            class="text-accent shrink-0 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] {openIndex ===
            index
              ? 'rotate-45'
              : ''}"
          >
            <Icon name="plus" size={18} strokeWidth={2} />
          </span>
        </button>

        <div class="t-acc-panel">
          <div class="t-acc-panel-inner">
            <div class="relative px-6 pt-4 pb-6 text-sm sm:text-base leading-relaxed text-muted">
              <SketchRule seed={135} class="text-ink/35 absolute inset-x-6 -top-1" />
              {item.answer[locale]}
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <div class="mt-10 text-center">
    <p class="font-display text-sm sm:text-base text-muted">
      {t.faq.helpText}
    </p>
    <a
      href={getWhatsAppUrl(faqWaMessage)}
      target="_blank"
      rel="noopener noreferrer"
      class="text-accent mt-2 inline-flex items-center gap-1 font-display text-sm font-semibold hover:underline"
    >
      {t.faq.helpCta}
      <Icon name="arrowUpRight" size={13} />
    </a>
  </div>
</section>
