<script lang="ts">
  import { getSelectedArticle } from "@/components/Articles/controllers/selected-article.svelte";
  import Icon from "@iconify/svelte";
  const selectedArticle = getSelectedArticle();
</script>

<div class="header">
  <div class="header-info">
    <span class="info-title">{selectedArticle}</span>
    <span class="info-savetime"></span>
    <span class="info-count">字数:0</span>
  </div>
  <div class="header-action">
    <div class="action-item">
      <Icon icon="mdi-light:presentation-play" style="font-size: var(--icon-size);color: var(--font-color);" />
    </div>
    <div class="action-item">
      <Icon icon="mdi-light:crop-free" style="font-size: var(--icon-size);color: var(--font-color);" />
    </div>
    <div class="action-item">
      <Icon icon="mdi-light:logout" style="font-size: var(--icon-size);color: var(--font-color);" />
    </div>
    <div class="action-item">
      <Icon icon="mdi-light:delete" style="font-size: var(--icon-size);color: var(--font-color);" />
    </div>
  </div>
</div>

<style>
  .header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 52px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  font-size: 14px;
  padding-left: 16px;
  padding-right: 16px;
}
.header-info {
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: center;
}
.info-title {
  font-size: 14px;
  color: #585a5a;
  max-width: 400px;
  min-width: 100px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 5px;
}
.info-savetime {
  font-size: 12px;
  color: #8a8f8d;
  margin-right: 5px;
}
.info-count {
  font-size: 12px;
  color: #8a8f8d;
  margin-right: 5px;
}
.header-action {
  display: flex;
  height: 100%;
  align-items: center;
}
.action-item {
  margin-left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  cursor: pointer;
}
</style>
