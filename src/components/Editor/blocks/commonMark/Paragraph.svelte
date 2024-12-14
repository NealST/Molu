<script lang="ts">
    import type { IBlockProps } from "../types";
    import { commonMarkRules, type CommonMarkRules } from '../../controllers/rules';
    import debounce from '../../controllers/utils/debounce';
    const { data, index }: IBlockProps = $props();
    const { text } = data;
    let contentDom: HTMLSpanElement;
    let contentHtml: string = $state(processText(text, 'all'));

    function processText(content: string | undefined, mode = 'some') {
      if (!content) {
        return '';
      }
      let resultContent = content;
      const ruleKeys: Array<keyof CommonMarkRules> = Object.keys(commonMarkRules) as Array<keyof CommonMarkRules>;
      if (mode === 'all') {
        ruleKeys.forEach(item => {
          const rule = commonMarkRules[item];
          const ruleReg = rule.reg;
          if (!ruleReg.test(resultContent)) {
            return;
          }
          resultContent = resultContent.replace(ruleReg, rule.matchCb);
          console.log("resultContent", resultContent);
        });
      } else {
        ruleKeys.some(item => {
          const { beginReg, reg, matchCb } = commonMarkRules[item];
          // if text matches the start rule, then end the execution.
          if (beginReg.test(content)) {
            if (reg.test(content)) {
              resultContent = resultContent.replace(reg, matchCb);
            }
            return true;
          }
          return false;
        });
      }
      return resultContent;
    }

    function handleInput() {
      contentHtml = processText(contentHtml || '');
    }

    function handleKeydown() {}
</script>

<p class="paragraph">
  <span
    class="paragraph-text"
    role="doc-part"
    contenteditable="true"
    bind:this={contentDom}
    bind:innerHTML={contentHtml}
    oninput={debounce(handleInput)}
    onkeydown={handleKeydown}
  >
  </span>
</p>
