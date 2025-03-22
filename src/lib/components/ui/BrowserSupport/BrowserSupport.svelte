<script lang="ts">
	import BrowserSupportGrid from "$ui/BrowserSupport/BrowserSupportGrid.svelte";
	import SupportLabel from "$ui/BrowserSupport/SupportLabel.svelte";
	import Details from "$ui/details/Details.svelte";

	import type { BrowserSupportForOption } from "$types/BrowserSupport.types";
	import { getMessages } from "$i18n/util";

	export let data: BrowserSupportForOption | undefined;
	export let hideFullSupport: boolean | undefined = undefined;
	export let zIndex: number = 1;
	const m = getMessages();
</script>

{#if data}
	<div class="browser-support-wrapper">
		<div class="browser-support-inner-wrapper" style="z-index: {zIndex};">
			<Details>
				<svelte:fragment slot="summary">
					<div class="header">
						<p>{m.browserSupport()}</p>
						<SupportLabel bind:support={data.coverage} {hideFullSupport} />
					</div>
				</svelte:fragment>
				<BrowserSupportGrid bind:data={data.support} />
			</Details>
		</div>
	</div>
{/if}

<style>
	.browser-support-wrapper {
		position: relative;
		width: 100%;
		min-height: 2.5rem;
	}
	.browser-support-inner-wrapper {
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
	}
	.header {
		width: 100%;
		display: flex;
		gap: 1rem;
	}
</style>
