<script lang="ts">
  import type { IBlockProps, IBlockStateItem } from "./types";
  import {
    md2htmlRules,
    type RuleKeys,
    debounce,
    getChildIndexInParagraph,
    getKeyboardKey,
    transfromChild2Html,
  } from "../controllers/utils";
  import { EVENT_KEYS } from "../controllers/config";
  import { createParagraph } from "../controllers/state/create-block";
  import updateBlock from "../controllers/state/update-block";
  const { data, index }: IBlockProps = $props();
  let blockIndex = $derived(index);
  let contentDom: HTMLSpanElement;
  let contentHtml: string = $state(transformChildren2Html(data.children || []));
  let cursorInfo = {
    // the child index in the children of this paragraph
    childIndex: 0,
    // the offset in this child
    childOffset: 0,
  };

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

  function transform2Html(content: string | undefined) {
    if (!content) {
      return "";
    }
    let resultContent = content;
    const ruleKeys: Array<RuleKeys> = Object.keys(
      md2htmlRules
    ) as Array<RuleKeys>;
    ruleKeys.some((item) => {
      const { beginReg, reg, matchCb, toState } = md2htmlRules[item];
      // if text matches the start rule, then end the execution.
      // in case that em is prior to strong when matching.
      if (beginReg.test(content)) {
        if (reg.test(content)) {
          resultContent = resultContent.replace(reg, (match: string, p1: string, p2: string, p3: string, p4: string) => {
            const stateItem = toState(match, p1, p2, p3, p4);
            
            return matchCb(match, p1, p2, p3, p4);
          });
        }
        return true;
      }
      return false;
    });
    return resultContent;
  }

  function handleInput() {
    contentHtml = transform2Html(contentHtml || "");

  }

  function handleKeydown(event: KeyboardEvent) {
    const pressKey = getKeyboardKey(event);
    if (pressKey === EVENT_KEYS["Enter"]) {
      event.preventDefault();
      if (anchorOffsetInParagraph === 0) {
        createParagraph(blockIndex);
        return;
      }
      if (anchorOffsetInParagraph === curContentLen) {
        createParagraph(blockIndex + 1);
        return;
      }
      
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
