<script lang="ts">
  import type { IBlockProps, IBlockStateItem } from "./types";
  import {
    md2htmlRules,
    html2mdRules,
    type RuleKeys,
    debounce,
    getNodeOffsetInParagraph,
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
      const { beginReg, reg, matchCb } = md2htmlRules[item];
      // if text matches the start rule, then end the execution.
      // in case that em is prior to strong when matching.
      if (beginReg.test(content)) {
        if (reg.test(content)) {
          resultContent = resultContent.replace(reg, matchCb);
        }
        return true;
      }
      return false;
    });
    return resultContent;
  }

  function transform2Md(html: string) {
    const ruleKeys: Array<RuleKeys> = Object.keys(
      md2htmlRules
    ) as Array<RuleKeys>;
    let resultContent = html;
    ruleKeys.forEach((item) => {
      const rule = html2mdRules[item];
      const ruleReg = rule.reg;
      if (!ruleReg.test(resultContent)) {
        return;
      }
      resultContent = resultContent.replace(ruleReg, rule.matchCb);
    });
    return resultContent;
  }

  function handleInput() {
    contentHtml = transform2Html(contentHtml || "");
    
  }

  function handleKeydown(event: KeyboardEvent) {
    const pressKey = getKeyboardKey(event);
    const textContent = contentDom.textContent;
    const { anchorNode, anchorOffset } = document.getSelection() as Selection;
    if (!anchorNode) {
      return;
    }
    const curContentLen = textContent?.length;
    const anchorOffsetInParagraph =
      getNodeOffsetInParagraph(anchorNode, contentDom) + anchorOffset;
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
  >
  </span>
</p>
