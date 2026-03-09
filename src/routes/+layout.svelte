<script lang="ts">
  import '../app.css';
  let { children } = $props();
</script>

<svelte:head>
  <title>Ryan Prayoga - Full Stack Engineer</title>
</svelte:head>

{@render children()}
