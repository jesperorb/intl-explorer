<script lang="ts">
	import BrowserSupportGrid from "$ui/BrowserSupport/BrowserSupportGrid.svelte";
	import SupportLabel from "$ui/BrowserSupport/SupportLabel.svelte";
	import Details from "$ui/details/Details.svelte";

	import type { BrowserSupportForOption } from "$types/BrowserSupport.types";
	import { getMessages } from "$i18n/util";

	export let data: BrowserSupportForOption | undefined;
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
