<script lang="ts">
  import 'github-markdown-css/github-markdown.css';
  import { DEFAULT_STATE } from "@/mock/data";
  import blockMap from "./blocks";
  type BlockKey = keyof typeof blockMap;
  let editorEl;

  $effect(() => {});

  function handleInput(event: Event) {}
</script>

<div class="content">
  <div
    class="editable"
    bind:this={editorEl}
    contenteditable="true"
    oninput={handleInput}
    spellcheck="false"
  >
   <div class="content-container markdown-body">
     {#each DEFAULT_STATE as stateItem}
       {@const itemName: BlockKey = (stateItem.name as BlockKey)}
       {@const Block = blockMap[itemName]}
       <Block {...stateItem} />
     {/each}
   </div>
</div>
</div>

<style>
  .content {
    flex: 1;
  }
  .editable {
    outline: none;
  }
  .content-container {
    width: 100%;
  }
</style>
