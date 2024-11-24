<script lang="ts">
  import { link } from "svelte-spa-router";
  const navs = [
    {
      path: "/",
      name: "Notes",
    },
    {
      path: "/read",
      name: "Read",
    },
    {
      path: "/collection",
      name: "Collection",
    },
  ];
</script>

<ul class="sidebar-navs">
  {#each navs as nav}
    <li class="nav-item"><a use:link={nav.path}>{nav.name}</a></li>
  {/each}
</ul>

<style>
  .sidebar-navs {
    list-style: none;
  }
  .nav-item {
    list-style: none;
  }
</style>
