<script lang="ts">
	import type { BrowserReleaseData } from "$types/BrowserSupport.types";
	import SrOnly from "$ui/SrOnly.svelte";
	import { m } from "$paraglide/messages";
	import type { VersionValue } from "@mdn/browser-compat-data";

	type Props = {
		data: Record<string, BrowserReleaseData> | undefined;
	};

	let { data }: Props = $props();

	const getAriaLabel = (browserName: string, versionAdded: VersionValue): string => {
		if (!versionAdded) return m.notAvailableInBrowser({ browserName });
		return m.availableInBrowser({ browserName, versionAdded });
	};
</script>

{#if data}
	<div class="compat-data-grid">
		{#each Object.entries(data) as [browserName, browserData]}
			<div class="browser">
				<div class="browser-name">
					<span aria-hidden="true" title={browserData.browserName}>
						<img
							height="16"
							width="16"
							src="/icons/{browserName
								.replace('_android', '')
								.replace('_ios', '')}_{browserData.versionAdded ? 'supported' : 'unsupported'}.svg"
							alt={browserName}
						/>
					</span>
					<SrOnly>{getAriaLabel(browserData.browserName, browserData.versionAdded)}</SrOnly>
					<span>{browserData.browserName}</span>
				</div>
				<span class="browser-version" aria-hidden="true">
					{!browserData.versionAdded ? m.no() : browserData.versionAdded}
				</span>
			</div>
		{/each}
	</div>
{/if}

<style>
	.browser {
		display: flex;
		padding: var(--spacing-1);
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		text-align: center;
		color: var(--text-color);
		border-bottom: 1px solid var(--border-color);
	}
	.browser:last-of-type {
		border-bottom: 0px;
	}
	.browser-version {
		font-size: 0.85rem;
	}
</style>
