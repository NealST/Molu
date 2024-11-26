<script lang="ts">
  function handleInput(event: Event) {
    
  }
</script>

<div class="content">
  <div class="editable" contenteditable="true" oninput={handleInput} spellcheck="false"></div>
</div>

<style>
  .content {
    flex: 1;
  }
  .editable {
    outline: none;
  }
</style>
