<script lang="ts">
  import { t } from '$lib/v3/i18n';
  import { socials } from '$lib/data/socials';
  import { reveal } from '$lib/v4/actions/reveal';

  const email = socials.find((s) => s.name === 'Email');
  const others = socials.filter((s) => s.name !== 'Email');
  const year = new Date().getFullYear();
</script>

<section id="contact" class="border-t border-[var(--color-rule)]">
  <div class="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-40">
    <div use:reveal={{ selector: '[data-r]', stagger: 0.1 }}>
      <p data-r class="v4-mono mb-8 text-[0.7rem] tracking-[0.22em] text-[var(--color-clay)] uppercase">
        (04) &mdash; {$t.contact.heading}
      </p>

      <a
        data-r
        href={email?.url}
        class="group block max-w-[15ch]"
      >
        <h2 class="v4-display text-[clamp(3rem,12vw,11rem)] leading-[0.88] text-[var(--color-ink)]">
          Let's
          <span class="italic text-[var(--color-clay)] v4-link-underline">talk</span>
        </h2>
      </a>

      <p data-r class="mt-10 max-w-[44ch] text-lg leading-relaxed text-[var(--color-ink-soft)]">
        {$t.contact.subtitle}
      </p>
    </div>

    <div
      class="mt-16 grid gap-px border-t border-[var(--color-ink)] bg-[var(--color-rule)] md:grid-cols-3"
      use:reveal={{ selector: '[data-c]', stagger: 0.1, y: 18 }}
    >
      {#each [email, ...others] as social, i (social?.name)}
        {#if social}
          <a
            data-c
            href={social.url}
            target={social.name === 'Email' ? undefined : '_blank'}
            rel={social.name === 'Email' ? undefined : 'noopener noreferrer'}
            class="group flex flex-col gap-6 bg-[var(--color-paper)] px-1 pt-7 transition-colors hover:bg-[var(--color-paper-raised)] md:px-6"
          >
            <span class="v4-mono text-[0.65rem] tracking-[0.16em] text-[var(--color-ink-faint)] uppercase">
              0{i + 1} / {social.name}
            </span>
            <span class="flex items-center justify-between gap-3">
              <span class="text-base text-[var(--color-ink)] md:text-lg">{social.label}</span>
              <span class="text-lg text-[var(--color-clay)] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                &#8599;
              </span>
            </span>
          </a>
        {/if}
      {/each}
    </div>
  </div>

  <footer class="border-t border-[var(--color-rule)]">
    <div class="mx-auto flex max-w-[1400px] flex-col gap-3 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-10">
      <p class="v4-mono text-[0.7rem] tracking-[0.12em] text-[var(--color-ink-faint)] uppercase">
        &copy; {year} Ryan Prayoga
      </p>
      <p class="v4-mono text-[0.7rem] tracking-[0.12em] text-[var(--color-ink-faint)] uppercase">
        SvelteKit &middot; Tailwind &middot; GSAP
      </p>
    </div>
  </footer>
</section>
