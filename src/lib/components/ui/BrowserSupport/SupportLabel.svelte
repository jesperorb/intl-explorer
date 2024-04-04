<script lang="ts">
	import { getMessages } from "$lib/i18n/util";
	import type { BrowserCoverage } from "$lib/types/BrowserSupport.types";

	export let support: BrowserCoverage | undefined = undefined;
	export let hideFullSupport: boolean | undefined = false;
	const m = getMessages();
</script>

<p class={support === "full" && hideFullSupport ? "" : support}>
	{#if support === "full" && !hideFullSupport}
		{m.fullSupport()}
	{:else if support === "none"}
		{m.noSupport()}
	{:else if support === "partial"}
		{m.partialSupport()}
	{/if}
</p>

<style>
	.full {
		color: var(--darkgreen);
	}
	.partial {
		color: var(--yellow);
	}
	.none {
		color: var(--darkred);
	}
	.missing {
		color: var(--gray);
	}
</style>
