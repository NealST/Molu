<script lang="ts">
  import Header from "./Header.svelte";
  import Toolbar from "./Toolbar.svelte";
  import Content from "./Content.svelte";
  import Outline from "./Outline.svelte";
</script>

<div class="editor">
  <Header />
  <Toolbar />
  <div class="editor-main">
    <Content />
    <Outline />
  </div>
</div>

<style>
  .editor {
    flex: 1;
    position: relative;
    background-color: var(--editor-bg-color);
  }
  .editor-main {
    width: 100%;
    height: 100vh;
    padding-top: 94px;
    display: flex;
    flex-direction: row;
    padding-left: 16px;
    padding-right: 16px;
  }
</style>
