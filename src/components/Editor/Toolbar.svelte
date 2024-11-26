<script lang="ts">
  import Icon from "@iconify/svelte";
</script>

<div class="toolbar">
  <div class="first">
    <Icon icon="mdi-light:plus-box" />
    <Icon icon="mdi-light:xml" />
  </div>
  <div class="divider"></div>
  <div class="action"></div>
  <div class="divider"></div>
  <div class="text"></div>
  <div class="divider"></div>
  <div class="color"></div>
  <div class="divider"></div>
  <div class="space"></div>
  <div class="divider"></div>
  <div class="inserts"></div>
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
