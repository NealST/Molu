<script lang="ts">
  import type { ICateItem } from "./types";
  import Icon from "@iconify/svelte";
  import getCates from "./controllers/get-cates";
  import createCate from "./controllers/create-cate";
  import { getSelectedNav } from "@/components/Navs/selected-nav.svelte";
  import {
    getSelectedCate,
    setSelectedCate,
  } from "./controllers/selected-cate.svelte";
  const selectedNav = getSelectedNav();
  const selectedCate = getSelectedCate();
  let dataSource = $state.raw([] as ICateItem[]);
  let newCateName = $state("");

  $effect(() => {
    getCates(selectedNav).then((ret) => {
      console.log("cates ret", ret);
      if (ret.length === 0) {
        return;
      }
      dataSource = ret.map((item) => ({
        name: item.name,
        type: "cate",
      }));
      setSelectedCate(ret[0].name);
    });

    selectedNav;
  });

  function handleAddCate() {
    dataSource = [
      {
        type: "input",
        name: "",
      },
    ].concat(dataSource);
    setSelectedCate("");
  }

  function handleCateNameBlur() {
    const newCates = ([] as ICateItem[]).concat(dataSource);
    if (!newCateName) {
      newCates.shift();
      dataSource = newCates;
      setSelectedCate(newCates[0].name);
      return;
    }
    createCate(newCateName)
      .then(() => {
        newCates[0] = {
          type: "cate",
          name: newCateName,
        };
        dataSource = newCates;
        setSelectedCate(newCateName);
      })
      .catch(() => {
        newCates.shift();
        dataSource = newCates;
        setSelectedCate(newCates[0].name);
      });
  }
</script>

<div class="sidebar-cates">
  <div class="cates-header">
    <span class="header-label">{selectedNav}</span>
    <Icon
      icon="mdi-light:folder-plus"
      style="font-size: var(--icon-size);color: var(--font-color);"
      on:click={handleAddCate}
    />
  </div>
  <ul class="cates-list">
    {#each dataSource as cateItem}
      {@const cateName = cateItem.name}
      {@const isSelected = cateName === selectedCate}
      <li class={`cate-item ${isSelected ? "cate-item-selected" : ""}`}>
        <button
          class="cate-item-button"
          onclick={() => setSelectedCate(cateName)}
        >
          <Icon
            icon="mdi-light:folder"
            style="font-size: 12px;color: var(--font-color);margin-right: 6px;"
          />
          {#if cateItem.type === "input"}
            <input
              class="item-input"
              type="text"
              bind:value={newCateName}
              onblur={handleCateNameBlur}
            />
          {:else}
            <span class="item-name">{cateItem.name}</span>
          {/if}
        </button>
      </li>
    {/each}
  </ul>
</div>

<style>
  .sidebar-cates {
    width: 100%;
  }
  .cates-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
  }
  .header-label {
    color: var(--font-color);
    font-size: 14px;
  }
  .cates-list {
    padding-left: 15px;
  }
  .cate-item {
    list-style: none;
    margin-bottom: 8px;
  }
  .cate-item-button {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .item-name {
    font-size: 12px;
    color: var(--font-color);
  }
</style>
