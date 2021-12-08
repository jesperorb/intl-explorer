<script lang="ts">
  import type { OptionValues } from "../types/option-values";

  import HighlightValue from "./HighlightValue.svelte";

  export let values: OptionValues;
  export let output: string;
  export let onClick: (values: OptionValues) => void = () => ({});
  let internalOnClick = () => {
    onClick(values);
  };
</script>

<div class="highlight">
  <button class="copy" on:click={internalOnClick}>Copy</button>
  <code>
    <pre>
          <span class="token punctuation">{"{"}</span> {#each Object.entries(values) as [key, value]}<span class="token key">{key}</span><span class="token operator">{":"}</span> <HighlightValue value={value}/>{#if Object.keys(values).length > 1}<span class="token punctuation">,</span>{/if} {/each}<span class="token punctuation">{"}"}</span>
<span class="token comment">
// {output}
</span>
    </pre>
  </code>
</div>

<style>
  .highlight {
    position: relative;
  }
  .copy {
    background-color: transparent;
    border: 1px solid white;
    border-radius: 0.25rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    color: white;
    position: absolute;
    z-index: 1;
    top: 0.5rem;
    right: 0.5rem;
  }
  .copy:hover,
  .copy:focus {
    background-color: rgb(14, 73, 121);
  }
</style>
