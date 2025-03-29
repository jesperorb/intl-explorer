<script lang="ts">
	import { m } from "$paraglide/messages";
	import type { BrowserCoverage } from "$types/BrowserSupport.types";

	export let support: BrowserCoverage | undefined = undefined;
	export let hideFullSupport: boolean | undefined = false;
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
		color: var(--green-1);
	}
	.partial {
		color: var(--partial-support-color);
	}
	.none {
		color: var(--red-1);
	}
	.missing {
		color: var(--gray);
	}
</style>
