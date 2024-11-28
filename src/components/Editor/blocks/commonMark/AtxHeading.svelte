
<script lang="ts">
  import type { IBlockStateItem } from '../types';
  const { children, data } = $props();
  const tag = `h${data.meta.level}`;
</script>

<svelte:element this={tag} class="content-atx-heading">
  {@render children?.()}
</svelte:element>
