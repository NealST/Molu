<script lang="ts">
  import 'github-markdown-css/github-markdown.css';
  import contentState from './controllers/state/content.svelte';
  import blockMap from "./blocks";
  type BlockKey = keyof typeof blockMap;

  $effect(() => {});
</script>

<div class="content">
  <div class="content-container markdown-body">
    {#each contentState.data as contentItem, index (`${contentItem.name}-${index}`)}
      {@const itemName: BlockKey = (contentItem.name as BlockKey)}
      {@const Block = blockMap[itemName]}
      <Block data={contentItem} index={index} />
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
