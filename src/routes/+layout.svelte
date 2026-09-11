<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { localeStore } from '$lib/stores/locale.svelte';
  import { page } from '$app/state';
  import Nav from '$lib/components/layout/Nav.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import FreelanceNav from '$lib/components/layout/FreelanceNav.svelte';
  import FreelanceFooter from '$lib/components/layout/FreelanceFooter.svelte';

  let { children } = $props();
  let appMounted = $state(true);

  const isFreelance = $derived(
    page.url.pathname.startsWith('/freelance') ||
      page.url.hostname === 'freelance.ryanprayoga.dev' ||
      page.url.hostname.startsWith('freelance.'),
  );

  onMount(() => {
    localeStore.init();
    document.documentElement.classList.add('hydrated');

    const enableTestTeardown = new URLSearchParams(window.location.search).has('test-teardown');
    const teardownApp = () => (appMounted = false);
    if (enableTestTeardown) window.addEventListener('portfolio:test-teardown', teardownApp, { once: true });

    return () => {
      if (enableTestTeardown) window.removeEventListener('portfolio:test-teardown', teardownApp);
    };
  });
</script>

{#if appMounted}
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
