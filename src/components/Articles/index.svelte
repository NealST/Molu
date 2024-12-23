<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { IArticleItem } from "./types";
  import selectedCate from "@/components/Cates/controllers/selected-cate.svelte";
  import selectedArticle from "./controllers/selected-article.svelte";
  import getArticles from "./controllers/get-articles";
  import createArticle from "./controllers/create-article";
  const selectedCateName = $derived(selectedCate.cate);
  const selectedArticleName = $derived(selectedArticle.article);
  let dataSource = $state([] as IArticleItem[]);
  let newArticleName = $state("");

  $effect(() => {
    getArticles(selectedCateName).then((ret) => {
      console.log("articles ret", ret);
      if (ret.length === 0) {
        return;
      }
      dataSource = ret.map((item) => ({
        name: item.name,
        type: "article",
      }));

      selectedArticle.setArticle(ret[0].name);
    });
  });

  function handleAddFile() {
    dataSource = [
      {
        type: "input",
        name: "",
      },
    ].concat(dataSource);
    selectedArticle.setArticle("");
  }

  function handleNameBlur() {
    const newArticles = ([] as IArticleItem[]).concat(dataSource);
    if (!newArticleName) {
      newArticles.shift();
      dataSource = newArticles;
      selectedArticle.setArticle(newArticles[0]?.name || '');
      return;
    }
    createArticle(selectedCate.cate, newArticleName)
      .then(() => {
        newArticles[0] = {
          type: "article",
          name: newArticleName,
        };
        dataSource = newArticles;
        selectedArticle.setArticle(newArticleName);
      })
      .catch(() => {
        newArticles.shift();
        dataSource = newArticles;
        selectedArticle.setArticle(newArticles[0]?.name || '');
      });
  }
</script>

<div class="articles">
  <div class="articles-action">
    <input class="action-input" />
    <Icon icon="mdi-light:file-plus" style="font-size: var(--icon-size);color: var(--font-color);cursor:pointer;" onclick={handleAddFile} />
  </div>
  <div class="articles-list">
    {#each dataSource as articleItem}
      {@const articleName = articleItem.name}
      {@const isSelected = articleName === selectedArticleName}
      <button class={`article-item ${isSelected ? "article-item-selected" : ""}`} onclick={() => selectedArticle.setArticle(articleName)}>
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
    background-color: var(--nav-bg-color);
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
    background-color: #111;
    margin-bottom: 8px;
  }
  .item-name {
    font-size: 16px;
    color: #fff;
  }
</style>
