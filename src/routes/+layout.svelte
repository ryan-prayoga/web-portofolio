<script lang="ts">
  import '../app.css';
  import 'lenis/dist/lenis.css';
  import { onMount } from 'svelte';
  import { localeStore } from '$lib/stores/locale.svelte';
  import { page } from '$app/state';
  import { initLenis } from '$lib/utils/lenis';
  import { defaultLocaleFor, isFreelanceUrl } from '$lib/utils/routeLocale';
  import Nav from '$lib/components/layout/Nav.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import FreelanceNav from '$lib/components/layout/FreelanceNav.svelte';
  import FreelanceFooter from '$lib/components/layout/FreelanceFooter.svelte';
  import NotebookMargin from '$lib/components/ui/NotebookMargin.svelte';

  let { children } = $props();
  let appMounted = $state(true);

  const isFreelance = $derived(isFreelanceUrl(page.url));

  // Bahasa bawaan route harus terpasang SEBELUM child dirender: sinkron untuk
  // SSR/prerender + hidrasi, lalu $effect.pre untuk navigasi client-side.
  localeStore.setRouteDefault(defaultLocaleFor(page.url));
  $effect.pre(() => {
    localeStore.setRouteDefault(defaultLocaleFor(page.url));
  });

  onMount(() => {
    localeStore.init();
    document.documentElement.classList.add('hydrated');

    const cleanupLenis = initLenis();

    const enableTestTeardown = new URLSearchParams(window.location.search).has('test-teardown');
    const teardownApp = () => (appMounted = false);
    if (enableTestTeardown) window.addEventListener('portfolio:test-teardown', teardownApp, { once: true });

    return () => {
      cleanupLenis?.();
      if (enableTestTeardown) window.removeEventListener('portfolio:test-teardown', teardownApp);
    };
  });
</script>

{#if appMounted}
  <NotebookMargin />
  {#if isFreelance}
    <FreelanceNav />
    <div id="page-background">
      {@render children()}
      <FreelanceFooter />
    </div>
  {:else}
    <Nav />
    <div id="page-background">
      {@render children()}
      <Footer />
    </div>
  {/if}
{/if}
