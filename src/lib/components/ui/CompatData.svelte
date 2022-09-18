<script lang="ts">
	import type { BrowserCompatData } from '$lib/types/BrowserSupport.types';
	import Icon from '$lib/components/ui/icons/Icon.svelte';
	import BrowserType from './icons/BrowserType.svelte';
	import type { VersionValue } from '@mdn/browser-compat-data';

	export let data: BrowserCompatData | null;
	const specUrl = data && Array.isArray(data.specUrl)
		? data.specUrl
		: typeof data?.specUrl === "string"
			? [data.specUrl]
			: [];
	const compatData = Object.entries(data?.support ?? {});
	const headers = data?.browserTypeHeaders ?? [];
	const desktopBrowsers = compatData.filter(([, data]) => data.browserType === 'desktop');

	const getAriaLabel = (browserName: string, versionAdded: VersionValue): string => {
		if (!versionAdded) return `Not available in ${browserName}`;
		return `Available in ${browserName} from version ${versionAdded}`;
	};
</script>

{#if compatData.length}
	<details>
		<summary>
			<h2>Browser support</h2>
			<div
				class="desktop-compat-data-summary"
				style="grid-template-columns: repeat({desktopBrowsers.length}, 20px)"
			>
				{#each desktopBrowsers as [browserName, browserData]}
					<div>
						<span
							class="browser-name browser-supported"
							class:browser-partial-support={browserData.hasMobileEquivalent &&
								!browserData.mobileVersionAdded}
							aria-hidden="true"
							class:browser-unsupported={!browserData.versionAdded}
						>
							<Icon {browserName} />
						</span>
						<span aria-label={getAriaLabel(browserData.browserName, browserData.versionAdded)} />
					</div>
				{/each}
			</div>
		</summary>
		<div class="compat-data-grid" style="grid-template-columns: repeat({compatData.length}, 50px)">
			{#each headers as header, i}
				<div
					class="browser-type"
					class:browser-type-last={i === headers.length - 1}
					style="grid-column: {header.start} / {header.end}"
					aria-hidden="true"
					title={header.name}
				>
					<span>
						<BrowserType browserType={header.name} />
					</span>
				</div>
			{/each}
			{#each compatData as [browserName, browserData]}
				<div class="browser">
					<span class="browser-name" aria-hidden="true" title={browserData.browserName}>
						<Icon {browserName} />
					</span>
					<span aria-label={getAriaLabel(browserData.browserName, browserData.versionAdded)} />
					<span
						class="browser-version browser-supported"
						class:browser-unsupported={!browserData.versionAdded}
						aria-hidden="true"
					>
						{!browserData.versionAdded ? 'No' : browserData.versionAdded}
					</span>
				</div>
			{/each}
		</div>
		<div>
			{#each specUrl as url}
				<a href={url} target="_blank" rel="noopener noreferrer">Specification</a>
			{/each}
		</div>
	</details>
{/if}

<style>
	:root {
		--unsupported: hsl(344, 100%, 40%);
		--supported: hsl(147, 100%, 24%);
		--partial: hsl(46, 100%, 40%);
		--border-color: hsl(0, 0%, 80%);
		--icon-color: hsl(0, 0%, 50%);
	}
	h2 {
		display: inline;
	}
	.desktop-compat-data-summary {
		display: inline-grid;
		margin-left: 1rem;
	}
	.compat-data-grid {
		display: inline-grid;
		border: 1px solid var(--border-color);
		border-radius: 4px;
		margin-top: 8px;
	}
	.browser {
		display: grid;
		justify-content: center;
		align-items: center;
		text-align: center;
		border-top: 1px solid var(--border-color);
		border-right: 1px solid var(--border-color);
		color: hsl(0, 0%, 50%);
	}
	.browser-name {
		margin-top: 2px;
	}
	.browser:last-of-type {
		border-right: none;
	}
	.browser-type {
		display: grid;
		justify-content: center;
		align-items: center;
		color: var(--icon-color);
	}
	.browser-type-last {
		border:none;
	}
	.browser-version {
		border-top: 1px solid var(--border-color);
		font-size: 0.85rem;
	}
	.browser-supported {
		color: var(--supported);
	}
	.browser-partial-support {
		color: var(--partial);
	}
	.browser-unsupported {
		color: var(--unsupported);
	}
</style>
