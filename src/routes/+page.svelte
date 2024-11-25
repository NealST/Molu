<script lang="ts">
  import Router from 'svelte-spa-router';
  import routes from './routes';
  import Navs from '@/components/Navs/index.svelte';
  import Cates from '@/components/Cates/index.svelte';
</script>

<main class="container">
  <section class="sidebar">
    <Navs />
    <Cates />
  </section>
  <section class="main">
    <Router {routes} />
  </section>
</main>

<style>
:root {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  background-color: #f6f6f6;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

:root {
  --font-color: #fff;
  --icon-size: 20px;
}

.container {
  display: flex;
  flex-direction: row;
}

.sidebar {
  width: 150px;
  height: 100vh;
}

.main {
  display: flex;
  flex: 1;
}

@media (prefers-color-scheme: dark) {
  :root {
    color: #f6f6f6;
    background-color: #2f2f2f;
  }
}

</style>
