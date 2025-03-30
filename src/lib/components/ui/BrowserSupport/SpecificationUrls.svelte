<script lang="ts">
	import { m } from "$paraglide/messages";
	import type { BrowserSupportDataForMethod } from "$types/BrowserSupport.types";
	import { getSpecUrls } from "$utils/browser-support";
	type Props = {
		data: BrowserSupportDataForMethod | null;
	}

	let { data }: Props = $props();
</script>

<div>
	{#each getSpecUrls(data) as url}
		<a href={url} target="_blank" rel="noopener noreferrer">{m.specification()}</a>
	{/each}
</div>
