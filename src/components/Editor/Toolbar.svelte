<script lang="ts">
  import Icon from "@iconify/svelte";
</script>

<div class="toolbar">
  <div class="tool-group first">
    <Icon icon="mdi-light:plus-box" width="24" height="24" style="color: var(--font-color);" />
  </div>
  <div class="divider"></div>
  <div class="tool-group action">
    <Icon icon="mdi-light:undo-variant" width="24" height="24" style="color: var(--font-color);" />
    <Icon icon="mdi-light:redo-variant" width="24" height="24" style="color: var(--font-color);" />
    <Icon icon="ant-design:format-painter-outlined" width="22" height="22" style="color: var(--font-color);" />
    <Icon icon="fluent:text-clear-formatting-20-regular" width="24" height="24" style="color: var(--font-color);" />
  </div>
  <div class="divider"></div>
  <div class="tool-group text">
    <Icon icon="mdi-light:format-bold" width="24" height="24" style="color: var(--font-color);" />
    <Icon icon="mdi-light:format-italic" width="24" height="24" style="color: var(--font-color);" />
    <Icon icon="heroicons:strikethrough-solid" width="22" height="22" style="color: var(--font-color);" />
    <Icon icon="mdi-light:format-underline" width="24" height="24" style="color: var(--font-color);" />
  </div>
  <div class="divider"></div>
  <div class="tool-group color"></div>
  <div class="divider"></div>
  <div class="tool-group space">
    <Icon icon="mdi-light:format-align-left" width="24" height="24" style="color: var(--font-color);" />
    <Icon icon="mdi-light:format-list-bulleted" width="24" height="24" style="color: var(--font-color);" />
    <Icon icon="mdi-light:format-list-numbered" width="24" height="24" style="color: var(--font-color);" />
    <Icon icon="mdi-light:format-indent-increase" width="24" height="24" style="color: var(--font-color);" />
    <Icon icon="mdi-light:format-line-spacing" width="24" height="24" style="color: var(--font-color);" />
  </div>
  <div class="divider"></div>
  <div class="tool-group inserts">
    <Icon icon="mdi-light:link-variant" width="24" height="24" style="color: var(--font-color);" />
    <Icon icon="mdi-light:format-quote-open" width="24" height="24" style="color: var(--font-color);" />
    <Icon icon="mdi-light:minus" width="24" height="24" style="color: var(--font-color);" />
  </div>
  <div class="divider"></div>
  <div class="tool-group others"></div>
</div>

<style>
  .toolbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    top: 52px;
    height: 42px;
    width: 100%;
    border: none;
    border-bottom: 1px solid var(--border-color);
    font-size: 14px;
    padding-left: 16px;
    padding-right: 16px;
  }

  .tool-group {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .divider {
    margin-left: 8px;
    color: #585a5a;
    flex-shrink: 0;
    display: inline-flex;
    width: 1px;
    height: 24px;
  }
</style>
