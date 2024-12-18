<script lang="ts">
  import type { IBlockProps } from "../types";
  const { data }: IBlockProps = $props();
  const {meta, text = ''} = data;
  const tag = `h${meta.level}`;
  const textStrs = text.split("\n");

  function handleInput() {}

  function handleKeydown() {}
</script>

<svelte:element this={tag} class="setex-heading">
  <span
    class="heading-text"
    role="button"
    tabindex="0"
    contenteditable="true"
    oninput={handleInput}
    onkeydown={handleKeydown}
  >
    {#each textStrs as textItem, index}
      {@const isLast = index === textStrs.length - 1}
      <span class="text-value">{textItem}</span>
      {#if !isLast}
        <span class="text-splitline"></span>
      {/if}
    {/each}
  </span>
</svelte:element>

<style>
  .heading-text {
    display: block;
    word-break: break-word;
    outline: none;
  }
  .text-value {
    display: block;
  }
</style>
