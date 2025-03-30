<script lang="ts">
	import Spacing from "$ui/Spacing.svelte";
	import BrowserSupport from "$ui/BrowserSupport/BrowserSupport.svelte";

	import type { BrowserSupportForOption } from "$types/BrowserSupport.types";
	import { testIds } from "$utils/dom-utils";

	type Props = {
		header: string;
		labelId?: string | undefined;
		support?: BrowserSupportForOption | undefined;
		hideFullSupport?: boolean | undefined;
		zIndex?: number;
		children?: import('svelte').Snippet;
	}

	let {
		header,
		labelId = undefined,
		support = $bindable(undefined),
		hideFullSupport = true,
		zIndex = 1,
		children
	}: Props = $props();
</script>

<section data-testid={`${testIds.optionSectionPrefix}${header}`}>
	<div class="header">
		{#if labelId}
			<label for={labelId}>{header}</label>
		{:else}
			<h3>{header}</h3>
		{/if}
		{#if support?.support}
			<BrowserSupport bind:data={support} {hideFullSupport} {zIndex} />
		{/if}
	</div>
	<Spacing size={2} />
	{@render children?.()}
	<Spacing size={2} />
</section>

<style>
	.header {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	@media screen and (min-width: 900px) {
		.header {
			flex-direction: row;
			align-items: center;
			gap: 4rem;
		}
	}
</style>
