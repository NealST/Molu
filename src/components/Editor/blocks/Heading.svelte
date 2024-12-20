<script lang="ts">
  import type { IBlockProps } from "./types";
  import { EVENT_KEYS } from "../controllers/config";
  import { getKeyboardKey } from "../controllers/utils";
  import {
    createParagraph,
    createHeading,
  } from "../controllers/state/create-block";
  import updateBlock from "../controllers/state/update-block";
  const { data, index }: IBlockProps = $props();
  const prefixReg = /^(\#*)/;
  const modeReg = /^(\#+)(\s+)([^\#]*)/;
  let blockIndex = $derived(index);
  let level = $derived(data.meta.level);
  let tag = $derived(`h${level}`);
  let contentDom: HTMLSpanElement;
  let theTitle = $derived(data.text?.trim() || "");

  function handleInput() {
    const textContent = contentDom.textContent;
    const modeMatch = textContent?.match(modeReg);
    if (!modeMatch) {
      return;
    }
    const theLevel = modeMatch[1].length;
    if (theLevel !== level) {
      updateBlock(
        {
          name: "atx-heading",
          meta: {
            level: theLevel,
          },
          text: textContent || "",
        },
        blockIndex
      );
      return;
    }
    // in case that place equal # before the title
    contentDom.innerHTML = contentDom.innerHTML.replace(prefixReg, "").trim();
  }

  function handleKeydown(event: KeyboardEvent) {
    const pressKey = getKeyboardKey(event);
    const textContent = contentDom.textContent;
    const { anchorOffset } = document.getSelection() as Selection;
    const curContentLen = textContent?.length;
    if (pressKey === EVENT_KEYS["Enter"]) {
      event.preventDefault();
      if (anchorOffset === 0) {
        console.log('start blockIndex', blockIndex);
        createParagraph(blockIndex);
        return;
      }
      if (anchorOffset === curContentLen) {
        console.log('end blockIndex', blockIndex);
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
