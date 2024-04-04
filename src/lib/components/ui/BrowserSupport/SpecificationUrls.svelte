<script lang="ts">
	import { getMessages } from "$lib/i18n/util";
	import type { BrowserSupportDataForMethod } from "$lib/types/BrowserSupport.types";
	import { getSpecUrls } from "$lib/utils/browser-support";
	export let data: BrowserSupportDataForMethod | null;
	const m = getMessages();
</script>

<div>
	{#each getSpecUrls(data) as url}
		<a href={url} target="_blank" rel="noopener noreferrer">{m.specification()}</a>
	{/each}
</div>
