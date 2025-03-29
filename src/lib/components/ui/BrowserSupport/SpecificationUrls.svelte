<script lang="ts">
	import { m } from "$paraglide/messages";
	import type { BrowserSupportDataForMethod } from "$types/BrowserSupport.types";
	import { getSpecUrls } from "$utils/browser-support";
	export let data: BrowserSupportDataForMethod | null;
</script>

<div>
	{#each getSpecUrls(data) as url}
		<a href={url} target="_blank" rel="noopener noreferrer">{m.specification()}</a>
	{/each}
</div>
