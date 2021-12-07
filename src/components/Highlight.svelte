<script lang="ts">
  import HighlightValue from "./HighlightValue.svelte";
  export let values: { [key: string]: number | boolean | string };
  export let output: string;
</script>

<code>
  <pre>
        <span class="token punctuation">{"{"}</span> {#each Object.entries(values) as [key, value]}<span class="token key">{key}</span><span class="token operator">{":"}</span> <HighlightValue value={value}/>{#if Object.keys(values).length > 1}<span class="token punctuation">,</span>{/if} {/each}<span class="token punctuation">{"}"}</span>
<span class="token comment">
// {output}
</span>
  </pre>
</code>

<style>
  pre {
    line-height: 1.5;
    padding: 1rem;
    background-color: #011627;
    font-size: 0.85rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin-bottom: 1.5rem;
  }
  .token.comment {
    color: hsl(0, 0%, 55%);
  }

  .token.punctuation {
    color: rgb(199, 146, 234);
  }

  .token.operator {
    color: rgb(127, 219, 202);
  }

  .token.key {
    color: rgb(255, 255, 255);
  }
</style>
