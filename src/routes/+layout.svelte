<script lang="ts">
  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" type="image/png" sizes="120x120" href="/swarrow/icon.png">
</svelte:head>

{@render children()}
