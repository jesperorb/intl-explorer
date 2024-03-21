<script lang="ts">
	import BrowserSupportGrid from './BrowserSupportGrid.svelte';
	import type { BrowserSupportForOption } from '$lib/types/BrowserSupport.types';
	import Details from '../details/Details.svelte';
	import SupportLabel from './SupportLabel.svelte';

	export let data: BrowserSupportForOption | null;
	export let hideFullSupport: boolean | undefined = undefined;
</script>

{#if data}
	<Details fullWidth={false}>
		<div slot="summary" class="summary">
			<p>Browser Support</p>
			<SupportLabel bind:support={data.coverage} {hideFullSupport} />
		</div>
		<BrowserSupportGrid bind:data={data.support} />
	</Details>
{/if}

<style>
	.summary {
		display: flex;
		gap: var(--spacing-4);
		margin-right: var(--spacing-4);
	}
</style>
