<script lang="ts">
  import type { IBlockStateItem } from "../types";
  const { meta, text = "" }: IBlockStateItem = $props();
  let level = $state(meta.level);
  let tag = $derived(`h${level}`);
  let contentDom: HTMLSpanElement;
  let theTitle = text.replace(/^(\#*)/, "").trim();
  const MODE_REG = /^(\#+)(\s+)([^\#]*)/;

  function handleInput() {
    const textContent = contentDom.textContent;
    console.log("textContent", textContent);
    const modeMatch = textContent?.match(MODE_REG);
    if (!modeMatch) {
      return;
    }
    const theLevel = modeMatch[1].length;
    if (theLevel !== level) {
      level = theLevel;
    }
  }

  function handleKeydown() {
    console.log('keydown fired');
  }
</script>

<svelte:element this={tag} class="atx-heading">
  <span
    class="heading-text"
    role="heading"
    aria-level={level}
    contenteditable="true"
    bind:this={contentDom}
    oninput={handleInput}
    onkeydown={handleKeydown}
  >
    {theTitle}
</span>
</svelte:element>

<style>
  .heading-text {
    display: block;
    word-break: break-word;
    outline: none;
  }
</style>
