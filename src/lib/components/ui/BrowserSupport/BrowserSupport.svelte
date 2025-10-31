<script lang="ts">
	import BrowserSupportGrid from "$ui/BrowserSupport/BrowserSupportGrid.svelte";
	import SupportLabel from "$ui/BrowserSupport/SupportLabel.svelte";
	import Details from "$ui/details/Details.svelte";

	import type { BrowserSupportForOption } from "$types/BrowserSupport.types";
	import { m } from "$paraglide/messages";
	import { settings } from "$store/settings";
	import Skeleton from "$ui/Skeleton.svelte";

	type Props = {
		data?: BrowserSupportForOption | undefined;
		hideFullSupport?: boolean | undefined;
		zIndex?: number;
		isLoading?: boolean;
	};

	let { data = undefined, hideFullSupport = undefined, zIndex = 1, isLoading = false }: Props = $props();
</script>

{#if data && $settings.showBrowserSupport}
	<div class="browser-support-wrapper">
		<div class="browser-support-inner-wrapper" style="z-index: {zIndex};">
			<Details>
				{#snippet summary()}
					<div class="header">
						<p>{m.browserSupport()}</p>
						<SupportLabel support={data.coverage} {hideFullSupport} />
					</div>
				{/snippet}
				<BrowserSupportGrid data={data.support} />
			</Details>
		</div>
	</div>
{:else if $settings.showBrowserSupport && isLoading}
	<Skeleton />
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
