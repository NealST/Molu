<script lang="ts">
    import type { IBlockStateItem } from "../types";
    const { text = '' }: IBlockStateItem = $props();

    function handleInput() {}

    function handleKeydown() {}
</script>

<p class="paragraph">
  <span
    class="paragraph-text"
    role="button"
    tabindex="0"
    contenteditable="true"
    oninput={handleInput}
    onkeydown={handleKeydown}
  >
  </span>
</p>
