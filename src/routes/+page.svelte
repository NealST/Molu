<script lang="ts">
  import Router from 'svelte-spa-router';
  import routes from './routes';
  import Navs from '@/components/Navs/Index.svelte';
  import Cates from '@/components/Cates/Index.svelte';
  import { invoke } from "@tauri-apps/api/core";
  import { TEST_MARKDOWN } from '@/mock/data';

  $effect(() => {
    async function test() {
      const startTime = Date.now();
      // const result = await invoke("greet", {name: 'test'});
      const costTime = Date.now() - startTime;
      console.log('costTime', costTime);
    }
    test();
  });

  async function handleTest() {
    const result = await invoke("get_md_ast", {input: TEST_MARKDOWN});
    console.log('ast result', result);
  }
</script>

<main class="container">
  <section class="sidebar">
    <Navs />
    <Cates />
    <button onclick={handleTest}>测试</button>
  </section>
  <section class="main">
    <Router {routes} />
  </section>
</main>

<style>
@import 'normalize.css';

:root {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

:root {
  --font-color: #111;
  --icon-size: 20px;
  --theme-color: #3dd988;
  --editor-bg-color: #fff;
  --nav-bg-color: #fff;
}

@media (prefers-color-scheme: dark) {
  :root {
    --font-color: #fff;
    --editor-bg-color: #0d1117;
    --border-color: #3d444d;
    --nav-bg-color: #272727;
  }
}

:global(*) {
  box-sizing: border-box !important;
}

:global(button) {
  outline: none;
  border: none;
}

:global(body) {
  margin: 0;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.sidebar {
  width: 150px;
  height: 100vh;
  background-color: var(--nav-bg-color);
}

.main {
  display: flex;
  flex: 1;
}

</style>
