<script lang="ts">
	import type { BrowserCompatData } from '$lib/types/BrowserSupport.types';
	import Icon from '$lib/components/ui/icons/Icon.svelte';
	import BrowserType from './icons/BrowserType.svelte';
	import type { VersionValue } from '@mdn/browser-compat-data';
	export let data: BrowserCompatData | null;
	const compatData = Object.entries(data?.support ?? {});

	const getAriaLabel = (browserName: string, versionAdded: VersionValue): string => {
		if(!versionAdded) return `Not available in ${browserName}`;
		return `Available in ${browserName} from version ${versionAdded}`;
	}
</script>

{#if compatData.length}
	<h2>Browser compatibility</h2>
	<div class="compat-data" style="grid-template-columns: repeat({compatData.length}, 50px)">
		{#each compatData as [,data]}
			<div class="browser-type">
				<span aria-hidden="true">
					<BrowserType browserType={data.browserType} />
				</span>
			</div>
		{/each}
		{#each compatData as [browserName, data]}
			<div class="browser">
				<span class="browser-name" aria-hidden="true">
					<Icon {browserName} />
				</span>
				<span aria-label="{getAriaLabel(browserName, data.versionAdded)}" />
				<span class="browser-version" class:unsupported={!data.versionAdded} aria-hidden="true">
					{!data.versionAdded ? 'No' : data.versionAdded}
				</span>
			</div>
		{/each}
	</div>
{/if}

<style>
	.compat-data {
		display: inline-grid;
		grid-template-rows: 26px 52px;
		border: 1px solid var(--gray);
		border-radius: 4px;
	}
	.browser {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		border-top: 1px solid var(--gray);
		border-right: 1px solid var(--gray);
	}
	.browser:last-of-type {
		border-right: none;
	}
	.browser-type {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.browser-version {
		border-top: 1px solid var(--gray);
		color: rgb(0, 121, 54);
		font-size: 0.85rem;
	}
	.unsupported {
		color: rgb(211, 0, 56);
	}
</style>
