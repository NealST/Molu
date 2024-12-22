<script lang="ts">
  import Icon from "@iconify/svelte";
</script>

<div class="toolbar">
  <div class="first">
    <Icon icon="mdi-light:plus-box" width="24" height="24" />
  </div>
  <div class="divider"></div>
  <div class="action">
    <Icon icon="mdi-light:undo-variant" width="24" height="24" />
    <Icon icon="mdi-light:redo-variant" width="24" height="24" />
    <Icon icon="ant-design:format-painter-outlined" width="22" height="22" />
    <Icon icon="fluent:text-clear-formatting-20-regular" width="24" height="24" />
  </div>
  <div class="divider"></div>
  <div class="text">
    <Icon icon="mdi-light:format-bold" width="24" height="24" />
    <Icon icon="mdi-light:format-italic" width="24" height="24" />
    <Icon icon="heroicons:strikethrough-solid" width="22" height="22" />
    <Icon icon="mdi-light:format-underline" width="24" height="24" />
  </div>
  <div class="divider"></div>
  <div class="color"></div>
  <div class="divider"></div>
  <div class="space">
    <Icon icon="mdi-light:format-align-left" width="24" height="24" />
    <Icon icon="mdi-light:format-list-bulleted" width="24" height="24" />
    <Icon icon="mdi-light:format-list-numbered" width="24" height="24" />
    <Icon icon="mdi-light:format-indent-increase" width="24" height="24" />
    <Icon icon="mdi-light:format-line-spacing" width="24" height="24" />
  </div>
  <div class="divider"></div>
  <div class="inserts">
    <Icon icon="mdi-light:link-variant" width="24" height="24" />
    <Icon icon="mdi-light:format-quote-open" width="24" height="24" />
    <Icon icon="mdi-light:minus" width="24" height="24" />
  </div>
  <div class="divider"></div>
  <div class="others"></div>
</div>

<style>
  .toolbar {
    display: flex;
    flex-direction: row;
    position: absolute;
    top: 52px;
    height: 42px;
    width: auto;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
    font-size: 14px;
    padding-left: 16px;
    padding-right: 16px;
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
