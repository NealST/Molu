<script lang="ts">
  import type { IBlockStateItem } from "../types";
  const { meta, text = '' }: IBlockStateItem = $props();
  const level = meta.level;
  const tag = `h${level}`;
  const prefixStr = new Array(level).fill("#").join("");
  let theTitle = text.replace(prefixStr, "").trim();

  function handleInput() {}

  function handleKeydown() {}
</script>

<svelte:element this={tag} class="content-atx-heading">
  <span
    class="content-text"
    role="button"
    tabindex="0"
    contenteditable="true"
    oninput={handleInput}
    onkeydown={handleKeydown}
  >
    <span class="text-prefix text-hide">{prefixStr}</span>
    <span class="text-space text-hide"> </span>
    <span class="text-value">{theTitle}</span>
  </span>
</svelte:element>

<style>
  .text-hide {
    display: none;
  }
</style>
