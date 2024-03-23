<script lang="ts">
	import Spacing from '$lib/components/ui/Spacing.svelte';
	import type { BrowserSupportForOption } from '$lib/types/BrowserSupport.types';
	import BrowserSupport from './BrowserSupport/BrowserSupport.svelte';

	export let header: string;
	export let labelId: string | undefined = undefined;
	export let support: BrowserSupportForOption | undefined = undefined;
	export let hideFullSupport: boolean | undefined = true;
</script>

<section data-testid={`option-section-${header}`}>
	<div class="header">
		{#if labelId}
			<label for={labelId}>{header}</label>
		{:else}
			<h3>{header}</h3>
		{/if}
		{#if support?.support}
			<BrowserSupport data={support} {hideFullSupport} />
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
	@media screen and (min-width: 500px) {
    .header {
			flex-direction: row;
			align-items: center;
    }
  }
</style>
