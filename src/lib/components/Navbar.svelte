<script lang="ts">
  import { navLinks } from '$lib/data/socials';

  let scrolled = $state(false);
  let activeSection = $state('');
  let mobileOpen = $state(false);

  $effect(() => {
    const onScroll = () => {
      scrolled = window.scrollY > 20;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });

  // IntersectionObserver to track which section is active
  $effect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace('#', ''));
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeSection = `#${entry.target.id}`;
          }
        }
      },
      {
        rootMargin: '-20% 0px -75% 0px',
        threshold: 0,
      }
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  });

  function handleNavClick(href: string) {
    activeSection = href;
    mobileOpen = false;
  }

  function toggleMobile() {
    mobileOpen = !mobileOpen;
  }

  function closeMobile() {
    mobileOpen = false;
  }
</script>

<!-- Navbar -->
<nav
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-300
    {scrolled
    ? 'bg-surface/70 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-base/50'
    : 'bg-transparent border-b border-transparent'}"
>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex h-16 items-center justify-between">
      <!-- Logo -->
      <a
        href="/"
        class="font-heading text-xl font-bold tracking-tight text-accent-cyan transition-opacity duration-200 hover:opacity-80"
      >
        RP
      </a>

      <!-- Desktop Navigation -->
      <div class="hidden items-center gap-1 md:flex">
        {#each navLinks as link}
          <a
            href={link.href}
            onclick={() => handleNavClick(link.href)}
            class="font-body relative rounded-md px-3 py-2 text-sm transition-colors duration-200
              {activeSection === link.href
              ? 'text-accent-cyan'
              : 'text-secondary hover:text-primary'}"
          >
            {link.label}
            {#if activeSection === link.href}
              <span
                class="absolute bottom-0 left-1/2 h-px w-4 -translate-x-1/2 bg-accent-cyan transition-all duration-300"
              ></span>
            {/if}
          </a>
        {/each}
      </div>

      <!-- Mobile Hamburger Button -->
      <button
        onclick={toggleMobile}
        class="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg text-secondary transition-colors duration-200 hover:text-primary md:hidden"
        aria-label="Toggle menu"
      >
        <div class="relative h-5 w-5">
          <span
            class="absolute left-0 block h-0.5 w-full rounded bg-current transition-all duration-300
              {mobileOpen ? 'top-[9px] rotate-45' : 'top-0.5'}"
          ></span>
          <span
            class="absolute left-0 top-[9px] block h-0.5 w-full rounded bg-current transition-all duration-300
              {mobileOpen ? 'scale-x-0 opacity-0' : ''}"
          ></span>
          <span
            class="absolute left-0 block h-0.5 w-full rounded bg-current transition-all duration-300
              {mobileOpen ? 'top-[9px] -rotate-45' : 'top-[17px]'}"
          ></span>
        </div>
      </button>
    </div>
  </div>
</nav>

<!-- Mobile Overlay -->
{#if mobileOpen}
  <button
    class="fixed inset-0 z-40 bg-base/60 backdrop-blur-sm transition-opacity duration-300"
    onclick={closeMobile}
    aria-label="Close menu"
    tabindex="-1"
  ></button>
{/if}

<!-- Mobile Slide-in Panel -->
<div
  class="fixed top-0 right-0 z-40 flex h-full w-72 flex-col border-l border-border/50 bg-surface/95 backdrop-blur-xl transition-transform duration-300 ease-out md:hidden
    {mobileOpen ? 'translate-x-0' : 'translate-x-full'}"
>
  <div class="flex flex-col gap-1 px-6 pt-24 pb-8">
    {#each navLinks as link, i}
      <a
        href={link.href}
        onclick={() => handleNavClick(link.href)}
        class="font-body rounded-lg px-4 py-3 text-base transition-all duration-200
          {activeSection === link.href
          ? 'bg-accent-cyan/10 text-accent-cyan'
          : 'text-secondary hover:bg-surface-elevated hover:text-primary'}"
        style="transition-delay: {mobileOpen ? i * 50 : 0}ms;"
      >
        {link.label}
      </a>
    {/each}
  </div>
</div>
