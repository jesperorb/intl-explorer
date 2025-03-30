<script lang="ts">
	import { m } from "$paraglide/messages";
	import type { BrowserCoverage } from "$types/BrowserSupport.types";

	type Props = {
		support?: BrowserCoverage | undefined;
		hideFullSupport?: boolean | undefined;
	};

	let { support = undefined, hideFullSupport = false }: Props = $props();
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
