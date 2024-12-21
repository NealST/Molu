<script lang="ts">
  import type { IBlockProps, IBlockStateItem } from "./types";
  import {
    md2StateRules,
    type RuleKeys,
    debounce,
    getChildIndexInParagraph,
    getKeyboardKey,
    transfromChild2Html,
    getNewChildren,
  } from "../controllers/utils";
  import { EVENT_KEYS } from "../controllers/config";
  import { createParagraph } from "../controllers/state/create-block";
  import updateBlock from "../controllers/state/update-block";
  const { data, index }: IBlockProps = $props();
  let blockIndex = $derived(index);
  let contentDom: HTMLSpanElement;
  let children = $derived(data.children || []);
  let contentHtml: string = $state(transformChildren2Html(children));
  let cursorInfo = {
    // the child index in the children of this paragraph
    childIndex: 0,
    // the offset in this child
    childOffset: 0,
  };

  $effect(() => {
    contentHtml = transformChildren2Html(children);
  });
 
  function transformChildren2Html(children: IBlockStateItem[]) {
    if (children.length === 0) {
      return "";
    }
    return children
      .map((item) => {
        return transfromChild2Html(item);
      })
      .join("");
  }

  function checkForUpdate(content: string | undefined) {
    if (!content) {
      return "";
    }
    const ruleKeys: Array<RuleKeys> = Object.keys(
      md2StateRules
    ) as Array<RuleKeys>;
    ruleKeys.some((item) => {
      const { beginReg, reg, toState } = md2StateRules[item];
      // if text matches the start rule, then end the execution.
      // in case that em is prior to strong when matching.
      if (beginReg.test(content)) {
        if (reg.test(content)) {
          const matches = content.match(reg);
          if (matches) {
            const stateItem = toState(matches);
            updateBlock({
              ...data,
              children: getNewChildren(children, cursorInfo, stateItem)
            }, blockIndex);
          }
        }
        return true;
      }
      return false;
    });
  }

  function handleInput() {
    checkForUpdate(contentHtml);
  }

  function handleKeydown(event: KeyboardEvent) {
    const pressKey = getKeyboardKey(event);
    if (pressKey === EVENT_KEYS["Enter"]) {
      event.preventDefault();
      const { childIndex, childOffset } = cursorInfo;
      const childState = children[childIndex];
      const { text } = childState;
      if (childOffset === text?.length) {
        if (childIndex === (children.length - 1)) {
          createParagraph(blockIndex + 1);
          return;
        }
        const splitIndex = childIndex + 1;
        updateBlock({
          ...data,
          children: children.slice(0, splitIndex)
        }, blockIndex);
        createParagraph(blockIndex + 1, children.slice(splitIndex));
        return;
      }
      
      if (childOffset === 0) {
        if (childIndex === 0) {
          createParagraph(blockIndex);
          return;
        }
        updateBlock({
          ...data,
          children: children.slice(0, childIndex)
        }, blockIndex);
        createParagraph(blockIndex + 1, children.slice(childIndex));
        return;
      }

      const preAnchorText = text?.slice(0, childOffset);
      const afterAnchorText = text?.slice(childOffset);
      updateBlock({
        ...data,
        children: children.slice(0, childIndex).concat({
          ...childState,
          text: preAnchorText,
        }),
      }, blockIndex);
      createParagraph(blockIndex + 1, ([{
        ...childState,
        text: afterAnchorText,
      }] as IBlockStateItem[]).concat(children.slice(childIndex + 1)));
    }
  }

  function getCursorInfo() {
    const { anchorNode, anchorOffset } = document.getSelection() as Selection;
    if (!anchorNode) {
      return;
    }
    cursorInfo = {
      childIndex: getChildIndexInParagraph(anchorNode, contentDom),
      childOffset: anchorOffset,
    };
  }
</script>

<p class="paragraph">
  <span
    class="paragraph-content"
    role="doc-part"
    contenteditable="true"
    bind:this={contentDom}
    bind:innerHTML={contentHtml}
    oninput={debounce(handleInput)}
    onkeydown={handleKeydown}
    onclick={getCursorInfo}
  >
  </span>
</p>

<style>
  .paragraph-content {
    outline: none;
  }
</style>
