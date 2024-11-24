<script lang="ts">
  import type { IProps, ICateItem } from "./types";
  import Icon from "@iconify/svelte";
  import getCates from "./controllers/get-cates";
  import createCate from "./controllers/create-cate";
  let props: IProps = $props();
  let dataSource = $state.raw([] as ICateItem[]);
  let selectedCateName = $state("");
  let newCateName = "";

  $effect(() => {
    getCates(props.navInfo.path).then((ret) => {
      console.log("cates ret", ret);
      if (ret.length === 0) {
        return;
      }
      dataSource = ret.map((item) => ({
        name: item.name,
        type: "cate",
      }));
      selectedCateName = ret[0].name;
    });

    props.navInfo.path;
  });

  function handleAddCate() {
    dataSource = [
      {
        type: "input",
        name: "",
      },
    ].concat(dataSource);
    selectedCateName = "";
  }

  function handleCateNameBlur() {
    const newCates = ([] as ICateItem[]).concat(dataSource);
    const currentFirstCateName = newCates[0].name;
    if (!newCateName) {
      newCates.shift();
      dataSource = newCates;
      selectedCateName = currentFirstCateName;
      return;
    }
    createCate(newCateName)
      .then(() => {
        newCates[0] = {
          type: "cate",
          name: newCateName,
        };
        dataSource = newCates;
        selectedCateName = newCateName;
      })
      .catch(() => {
        newCates.shift();
        dataSource = newCates;
        selectedCateName = currentFirstCateName;
      });
  }

  function handleCateSelect(cateName: string) {
    selectedCateName = cateName;
    props.onCateSelect(cateName);
  }
</script>

<div class="sidebar-cates">
  <div class="cates-header">
    <span class="header-label">{props.navInfo.label}</span>
    <Icon
      icon="mdi-light:folder-plus"
      style="font-size: 14px;color: var(--font-color)"
      on:click={handleAddCate}
    />
  </div>
  <ul class="cates-list">
    {#each dataSource as cateItem}
      {@const cateName = cateItem.name}
      {@const isSelected = cateName === selectedCateName}
      <li class={`cate-item ${isSelected ? "cate-item-selected" : ""}`}>
        <button class="cate-item-button" onclick={() => handleCateSelect(cateName)}>
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
