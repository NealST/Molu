<script lang="ts">
  import 'github-markdown-css/github-markdown.css';
  import { DEFAULT_STATE } from "@/mock/data";
  import blockMap from "./blocks";
  type BlockKey = keyof typeof blockMap;

  $effect(() => {});
</script>

<div class="content">
  <div class="content-container markdown-body">
    {#each DEFAULT_STATE as stateItem}
      {@const itemName: BlockKey = (stateItem.name as BlockKey)}
      {@const Block = blockMap[itemName]}
      <Block {...stateItem} />
    {/each}
  </div>
</div>

<style>
  .content {
    flex: 1;
  }
  .content-container {
    outline: none;
    width: 100%;
  }
</style>
