<script lang="ts">
  import { link } from "svelte-spa-router";
  import selectedNav from "./selected-nav.svelte";
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

<div class="sidebar-navs">
  {#each navs as nav}
    {@const isSelected = selectedNav.nav === nav.name}
    <div class="nav-item">
      <a
        class={`nav-item-button ${isSelected ? "nav-item-selected" : ""}`}
        use:link={nav.path}
        href={nav.path}
        onclick={() => selectedNav.setNav(nav.name)}>{nav.name}</a
      >
    </div>
  {/each}
</div>

<style>
  .sidebar-navs {
    list-style: none;
    padding-left: 10px;
    margin-bottom: 20px;
  }
  .nav-item {
    list-style: none;
  }
  .nav-item-button {
    color: #fff;
    text-decoration: none;
    cursor: pointer;
  }
</style>
