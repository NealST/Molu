<script lang="ts">
  import config from './config.svelte';
  let editorEl;

  $effect(() => {
    
  });
  
  function handleInput(event: Event) {}
</script>

<div class="content">
  <div
    class="editable"
    bind:this={editorEl}
    contenteditable="true"
    oninput={handleInput}
    spellcheck="false"
  ></div>
</div>

<style>
  .content {
    flex: 1;
  }
  .editable {
    outline: none;
  }
</style>
