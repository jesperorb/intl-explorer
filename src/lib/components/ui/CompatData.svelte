<script lang="ts">
	import type { BrowserCompatData } from '$lib/types/BrowserSupport.types';
	import type { VersionValue } from '@mdn/browser-compat-data';
	import { browser } from '$app/environment';
	import { onDestroy, onMount } from 'svelte';

	export let data: BrowserCompatData | null = null;
	export let title: string = 'Browser Support';
	export let optionsType: keyof Pick<BrowserCompatData, 'optionsSupport' | 'support' | "formattersSupport"> = 'support';
	export let option: string | undefined = undefined;
	export let labelId: string | undefined = undefined;
	export let stackedView: boolean | undefined = false;
	const specUrl =
		data && Array.isArray(data.specUrl)
			? data.specUrl
			: typeof data?.specUrl === 'string'
			? [data.specUrl]
			: [];

	const compatDataValue = data ? data[optionsType] : {};
	const compatData = Object.entries(
		(option && compatDataValue ? compatDataValue[option] : compatDataValue) ?? {}
	);
	const headers = data?.browserTypeHeaders ?? [];
	const desktopBrowsers = compatData?.filter(([, data]) => data.browserType === 'desktop');

	const getAriaLabel = (browserName: string, versionAdded: VersionValue): string => {
		if (!versionAdded) return `Not available in ${browserName}`;
		return `Available in ${browserName} from version ${versionAdded}`;
	};

	const matchMedia = browser && !stackedView ? window.matchMedia('(min-width: 900px)') : null;

	let isDesktop = Boolean(!stackedView && matchMedia?.matches);

	const onMatchMediaChange = (event: MediaQueryListEventMap['change']) => {
		if (stackedView) return;
		isDesktop = event.matches;
	};

	onMount(() => {
		if (browser && matchMedia && !stackedView) {
			matchMedia.addEventListener('change', onMatchMediaChange);
		}
	});

	onDestroy(() => {
		if (browser && matchMedia && !stackedView) {
			matchMedia.removeEventListener('change', onMatchMediaChange);
		}
	});
</script>

{#if !compatData.length}
	{#if labelId}
		<label for={labelId}>{title}</label>
	{:else}
		<h3>{title}</h3>
	{/if}
{:else}
	<details>
		<summary>
			{#if option}
				{#if labelId}
					<label for={labelId}>{title}</label>
				{:else}
					<h3>{title}</h3>
				{/if}
			{:else}
				<h2>{title}</h2>
			{/if}
			<div class="desktop-compat-data-summary">
				{#each desktopBrowsers as [browserName, browserData]}
					<div>
						<span
							aria-hidden="true"
						>
							<img
								height="16"
								width="16"
								src="/icons/{browserName}_{browserData.partialSupport
									? 'partial_support'
									: browserData.versionAdded
									? 'supported'
									: 'unsupported'}.svg"
								alt=""
							/>
						</span>
						<span class="sr-only"
							>{getAriaLabel(browserData.browserName, browserData.versionAdded)}</span
						>
					</div>
				{/each}
			</div>
		</summary>
		<div
			class="compat-data-grid"
			style={isDesktop ? `grid-template-columns: repeat(${compatData.length}, 1fr)` : undefined}
		>
			{#each headers as header, i}
				<div
					class="browser-type"
					class:browser-type-media-desktop={isDesktop}
					class:browser-type-last={i === headers.length - 1}
					class:browser-type-last-media-desktop={isDesktop}
					style="grid-{isDesktop ? 'column' : 'row'}: {header.start} / {header.end}"
					aria-hidden="true"
					title={header.name}
				>
					<span>
						<img height="16" width="16" src="/icons/{header.name}.svg" alt="" />
					</span>
				</div>
			{/each}
			{#each compatData as [browserName, browserData]}
				<div class="browser" class:browser-media-desktop={isDesktop}>
					<span class="browser-name" aria-hidden="true" title={browserData.browserName}>
						<img
							height="16"
							width="16"
							src="/icons/{browserName
								.replace('_android', '')
								.replace('_ios', '')}_{browserData.partialSupport
								? 'partial_support'
								: browserData.versionAdded
								? 'supported'
								: 'unsupported'}.svg"
							alt={browserName}
						/>
					</span>
					<span class="sr-only"
						>{getAriaLabel(browserData.browserName, browserData.versionAdded)}</span
					>
					{#if !isDesktop}
						<span>{browserData.browserName}</span>
					{/if}
					<span
						class="browser-version"
						class:browser-version-version-media-desktop={isDesktop}
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
		--border-color: hsl(0, 0%, 80%);
		--icon-color: hsl(0, 0%, 50%);
	}
	h2,
	h3,
	label {
		display: inline-block;
		margin: 0;
	}
	label {
		margin-bottom: 0.5rem;
	}

	.desktop-compat-data-summary {
		display: inline-flex;
	}

	.compat-data-grid {
		display: inline-grid;
		max-width: 600px;
		width: 100%;
		grid-template-columns: 1fr 4fr;
		grid-template-rows: auto;
		border: 1px solid var(--border-color);
		border-radius: 4px;
		margin-top: 8px;
	}

	.browser {
		display: flex;
		padding: 0 0.25rem;
		justify-content: space-between;
		gap: 1rem;
		text-align: center;
		color: hsl(0, 0%, 40%);
		border-bottom: 1px solid var(--border-color);
	}

	.browser:last-of-type {
		border-bottom: none;
		border-right: none;
	}
	.browser-type {
		display: grid;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid var(--border-color);
		border-right: 1px solid var(--border-color);
		color: var(--icon-color);
	}
	.browser-type-last {
		border-bottom: none;
	}
	.browser-version {
		font-size: 0.85rem;
	}
	.browser-media-desktop {
		display: grid;
		align-items: center;
		justify-content: center;
		gap: 0;
		border-right: 1px solid var(--border-color);
		border-bottom: none;
	}
	.browser-version-version-media-desktop {
		border-top: 1px solid var(--border-color);
	}
	.browser-type-media-desktop {
		border-right: 1px solid var(--border-color);
	}
	.browser-type-last-media-desktop {
		border-bottom: 1px solid var(--border-color);
		border-right: none;
	}
	.sr-only {
		border: 0 !important;
		clip: rect(1px, 1px, 1px, 1px) !important;
		-webkit-clip-path: inset(50%) !important;
		clip-path: inset(50%) !important;
		height: 1px !important;
		margin: -1px !important;
		overflow: hidden !important;
		padding: 0 !important;
		position: absolute !important;
		width: 1px !important;
		white-space: nowrap !important;
	}
</style>
