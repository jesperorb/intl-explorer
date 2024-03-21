<script lang="ts">
	import type { BrowserSupportDataForMethod } from "$lib/types/BrowserSupport.types";
	import { getSpecUrls } from "$lib/utils/browser-support";
  export let data: BrowserSupportDataForMethod | null;
</script>

<div>
  {#each getSpecUrls(data) as url}
    <a href={url} target="_blank" rel="noopener noreferrer">Specification</a>
  {/each}
</div>