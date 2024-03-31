<script lang="ts">
	import BrowserSupportGrid from './BrowserSupportGrid.svelte';
	import type { BrowserSupportForOption } from '$lib/types/BrowserSupport.types';
	import Details from '../details/Details.svelte';
	import SupportLabel from './SupportLabel.svelte';
	import { getMessages } from '$lib/i18n/util';

	export let data: BrowserSupportForOption | null;
	export let hideFullSupport: boolean | undefined = undefined;
	const m = getMessages();
</script>

{#if data}
	<Details fullWidth={false}>
		<svelte:fragment slot="summary">
			<div class="header">
				<p>{m.browserSupport()}</p>
				<SupportLabel bind:support={data.coverage} {hideFullSupport} />
			</div>
		</svelte:fragment>
		<BrowserSupportGrid bind:data={data.support} />
	</Details>
{/if}

<style>
	.header {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	@media screen and (min-width: 500px) {
    .header {
			flex-direction: row;
			align-items: center;
			gap: var(--spacing-2);
    }
  }
</style>
