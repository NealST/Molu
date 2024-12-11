<script lang="ts">
    import type { IBlockProps } from "../types";
    const { data }: IBlockProps = $props();

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
