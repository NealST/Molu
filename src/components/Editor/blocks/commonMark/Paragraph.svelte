<script lang="ts">
    import type { IBlockProps } from "../types";
    import { commonMarkRules } from '../../controllers/rules';
    const { data, index }: IBlockProps = $props();
    const { text } = data;
    let contentDom: HTMLSpanElement;
    let contentHtml: string = $state(processText(text))

    function processText(content: string | undefined, mode = 'all') {
      if (!content) {
        return '';
      }
      const ruleKeys = Object.keys(commonMarkRules);
      if (mode === 'all') {
        
      }
      return '';
    }

    function handleInput() {
      
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
    oninput={handleInput}
    onkeydown={handleKeydown}
  >
  </span>
</p>
