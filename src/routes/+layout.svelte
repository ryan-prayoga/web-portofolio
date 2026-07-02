<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { localeStore } from '$lib/stores/locale.svelte';
  import Nav from '$lib/components/layout/Nav.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';

  let { children } = $props();

  onMount(() => {
    localeStore.init();
  });
</script>

<Nav />
{@render children()}
<Footer />
