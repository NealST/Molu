<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { IArticleItem } from "./types";
  import { selectedCate } from "@/components/Cates/controllers/selected-cate.svelte";
  import {
    selectedArticle,
    setSelectedArticle,
  } from "./controllers/selected-article.svelte";
  import getArticles from "./controllers/get-articles";
  import createArticle from "./controllers/create-article";
  let dataSource = $state([] as IArticleItem[]);
  let newArticleName = "";

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
    <Icon icon="mdi-light:file-plus" onclick={handleAddFile} />
  </div>
  <div class="articles-list">
    {#each dataSource as articleItem}
      {@const isSelected = articleItem.name === selectedArticle}
      <div class={`article-item ${isSelected ? "article-item-selected" : ""}`}>
        <Icon icon="mdi-light:file" />
        {#if articleItem.type === "input"}
          <input
            class="item-input"
            bind:value={newArticleName}
            onblur={handleNameBlur}
          />
        {:else}
          <span class="item-name">{articleItem.name}</span>
        {/if}
      </div>
    {/each}
  </div>
</div>
