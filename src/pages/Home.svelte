<script lang="ts">
  import Articles from '@/components/Articles/Index.svelte';
  import Editor from '@/components/Editor/Index.svelte';
</script>

<div class="home-panel">
  <Articles />
  <Editor />
</div>

<style>
  .home-panel {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
</style>
