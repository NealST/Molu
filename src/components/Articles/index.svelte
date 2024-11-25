<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { IArticleItem } from "./types";
  import { getSelectedCate } from "@/components/Cates/controllers/selected-cate.svelte";
  import {
    getSelectedArticle,
    setSelectedArticle,
  } from "./controllers/selected-article.svelte";
  import getArticles from "./controllers/get-articles";
  import createArticle from "./controllers/create-article";
  const selectedCate = getSelectedCate();
  const selectedArticle = getSelectedArticle();
  let dataSource = $state([] as IArticleItem[]);
  let newArticleName = $state("");

  $effect(() => {
    getArticles(selectedCate).then((ret) => {
      console.log("articles ret", ret);
      if (ret.length === 0) {
        return;
      }
      dataSource = ret.map((item) => ({
        name: item.name,
        type: "article",
      }));

      setSelectedArticle(ret[0].name);
    });

    selectedCate;
  });

  function handleAddFile() {
    dataSource = [
      {
        type: "input",
        name: "",
      },
    ].concat(dataSource);
    setSelectedArticle("");
  }

  function handleNameBlur() {
    const newArticles = ([] as IArticleItem[]).concat(dataSource);
    if (!newArticleName) {
      newArticles.shift();
      dataSource = newArticles;
      setSelectedArticle(newArticles[0].name);
      return;
    }
    createArticle(selectedCate, newArticleName)
      .then(() => {
        newArticles[0] = {
          type: "article",
          name: newArticleName,
        };
        dataSource = newArticles;
        setSelectedArticle(newArticleName);
      })
      .catch(() => {
        newArticles.shift();
        dataSource = newArticles;
        setSelectedArticle(newArticles[0].name);
      });
  }
</script>

<div class="articles">
  <div class="articles-action">
    <input class="action-input" />
    <Icon icon="mdi-light:file-plus" style="font-size: var(--icon-size);color: var(--font-color);" onclick={handleAddFile} />
  </div>
  <div class="articles-list">
    {#each dataSource as articleItem}
      {@const articleName = articleItem.name}
      {@const isSelected = articleName === selectedArticle}
      <button class={`article-item ${isSelected ? "article-item-selected" : ""}`} onclick={() => setSelectedArticle(articleName)}>
        <Icon icon="mdi-light:file" style="font-size: var(--icon-size);color: var(--font-color);" />
        {#if articleItem.type === "input"}
          <input
            class="item-input"
            bind:value={newArticleName}
            onblur={handleNameBlur}
          />
        {:else}
          <span class="item-name">{articleName}</span>
        {/if}
      </button>
    {/each}
  </div>
</div>

<style>
  .articles {
    padding-top: 10px;
    width: 200px;
    height: 100vh;
  }
  .articles-action {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
  }
  .action-input {
    width: 150px;
    height: 30px;
    border: none;
    outline: none;
  }
  .articles-list {
    margin-top: 20px;
    width: 100%;
  }
  .article-item {
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    flex-direction: row;
  }
</style>
