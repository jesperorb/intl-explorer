<script lang="ts">
	import Spacing from "$ui/Spacing.svelte";
	import BrowserSupport from "$ui/BrowserSupport/BrowserSupport.svelte";

	import type { BrowserSupportForOption } from "$types/BrowserSupport.types";
	import { testIds } from "$utils/dom-utils";

	export let header: string;
	export let labelId: string | undefined = undefined;
	export let support: BrowserSupportForOption | undefined = undefined;
	export let hideFullSupport: boolean | undefined = true;
</script>

<section data-testid={`${testIds.optionSectionPrefix}${header}`}>
	<div class="header">
		{#if labelId}
			<label for={labelId}>{header}</label>
		{:else}
			<h3>{header}</h3>
		{/if}
		{#if support?.support}
			<BrowserSupport bind:data={support} {hideFullSupport} />
		{/if}
	</div>
	<Spacing size={2} />
	<slot />
	<Spacing size={2} />
</section>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		gap: var(--spacing-2);
	}
	@media screen and (min-width: 900px) {
		.header {
			flex-direction: row;
		}
	}
</style>
