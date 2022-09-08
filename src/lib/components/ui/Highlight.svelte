<script lang="ts">
  import HighlightValue from "$lib/components/ui/HighlightValue.svelte";
  type OptionValues = { [key: string]: number | boolean | string };

  export let values: OptionValues;
  export let output: string;
  export let onClick: (values: OptionValues) => void = () => ({});
  let internalOnClick = () => {
    onClick(values);
  };
</script>

<div class="highlight">
  <button class="copy" aria-label="Copy values for options: {JSON.stringify(values)}" on:click={internalOnClick}>Copy</button>
  <code>
    <pre><span class="token punctuation">{"{"}</span> {#each Object.entries(values) as [key, value]}<span class="token key">{key}</span><span class="token operator">{":"}</span> <HighlightValue value={value}/>{#if Object.keys(values).length > 1}<span class="token punctuation">,</span>{/if} {/each}<span class="token punctuation">{"}"}</span>
<span class="token comment">// {output}</span></pre></code>
</div>

<style>
  .highlight {
    position: relative;
    margin-bottom: 1.5rem;
  }
  .copy {
    background-color: #011627;;
    border: 1px solid var(--white);
    border-radius: 0.25rem;
    padding: 0.25rem .75rem;
    cursor: pointer;
    color: var(--white);
    position: absolute;
    z-index: 1;
    bottom: -2rem;
    right: 0.5rem;
  }
  .copy:hover {
    background-color: rgb(14, 73, 121);
  }
</style>
