<script lang="ts">
  import { link } from "svelte-spa-router";
  import { getSelectedNav, setSelectedNav } from "./selected-nav.svelte";
  const selectedNav = getSelectedNav();
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
    {@const isSelected = selectedNav === nav.name}
    <li class="nav-item">
      <a
        class={`nav-item-button ${isSelected ? "nav-item-selected" : ""}`}
        use:link={nav.path}
        href={nav.path}
        onclick={() => setSelectedNav(nav.name)}>{nav.name}</a
      >
    </li>
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
