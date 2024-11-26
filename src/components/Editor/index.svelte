<script lang="ts">
  import Header from "./Header.svelte";
  import Toolbar from "./Toolbar.svelte";
  import Wysiwyg from "./Wysiwyg.svelte";
  import Outline from "./Outline.svelte";
</script>

<div class="editor">
  <Header />
  <Toolbar />
  <div class="content">
    <Wysiwyg />
    <Outline />
  </div>
</div>

<style>
  .editor {
    flex: 1;
    position: relative;
  }
  .content {
    width: 100%;
    height: 100vh;
    padding-top: 94px;
    display: flex;
    flex-direction: row;
  }
</style>
