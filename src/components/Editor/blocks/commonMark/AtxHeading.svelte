<script lang="ts">
  import type { IBlockProps } from "../types";
  import { EVENT_KEYS } from "../../controllers/config";
  import { getKeyboardKey } from "../../controllers/utils";
  import {
    createParagraph,
    createHeading,
  } from "../../controllers/state/create-block";
  import updateBlock from "../../controllers/state/update-block";
  const { data, index: blockIndex }: IBlockProps = $props();
  let level = $state(data.meta.level);
  let tag = $derived(`h${level}`);
  let contentDom: HTMLSpanElement;
  let theTitle = $derived(data.text?.replace(/^(\#*)/, "").trim());
  const MODE_REG = /^(\#+)(\s+)([^\#]*)/;

  function handleInput() {
    const textContent = contentDom.textContent;
    const modeMatch = textContent?.match(MODE_REG);
    if (!modeMatch) {
      return;
    }
    const theLevel = modeMatch[1].length;
    if (theLevel !== level) {
      level = theLevel;
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    const pressKey = getKeyboardKey(event);
    const textContent = contentDom.textContent;
    const { anchorOffset } = document.getSelection() as Selection;
    const curContentLen = textContent?.length;
    if (pressKey === EVENT_KEYS["Enter"]) {
      if (anchorOffset === 0) {
        createParagraph(blockIndex);
        return;
      }
      if (anchorOffset === curContentLen) {
        createParagraph(blockIndex + 1);
        return;
      }
      const preAnchorText = textContent?.slice(0, anchorOffset);
      const afterAnchorText = textContent?.slice(anchorOffset);
      updateBlock(
        {
          name: "atx-heading",
          meta: {
            level,
          },
          text: preAnchorText,
        },
        blockIndex
      );
      createHeading(blockIndex + 1, level, afterAnchorText);
    }
  }

  function handleClick() {
    console.log("cur selection", document.getSelection());
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
    onclick={handleClick}
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
