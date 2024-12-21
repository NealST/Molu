<script lang="ts">
  import type { IBlockProps, IBlockStateItem } from "./types";
  import {
    md2htmlRules,
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
            updateBlock({
              ...data,
              children: getNewChildren(children, cursorInfo, stateItem)
            }, blockIndex);
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
      createParagraph(blockIndex, ([{
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
