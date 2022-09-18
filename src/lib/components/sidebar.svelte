<script lang="ts">
	import Select from './ui/Select.svelte';
	import { formatMethods } from '$lib/format-methods';
	import { languageByLocale } from '$lib/locale-data/locales';
	import { page } from '$app/stores';
  import type { Page } from '@sveltejs/kit';
  import { getLocaleFromParams } from '$lib/utils/get-locale';

	export let open: boolean;
	export let locale: string;

	let path: string;

	const getPath = (page: Page<Record<string, string>>) => {
		path = page.url.pathname;
	};

	$: getPath($page);
</script>

<div class="sidebar" class:open={open}>
	<nav>
		<ul>
			<li><strong><a href="/">About</a></strong></li>
			<li><strong>Intl.</strong></li>
			<li><a class:active={path.includes("NumberFormat")} href="/NumberFormat/Currency?locale={getLocaleFromParams()}">NumberFormat</a></li>
			<li><a class:active={path.includes("Currency")} class="sublink" href="/NumberFormat/Currency?locale={getLocaleFromParams()}">Currency</a></li>
			<li><a class:active={path.includes("Unit")} class="sublink" href="/NumberFormat/Unit?locale={getLocaleFromParams()}">Unit</a></li>
			{#each formatMethods.filter((method) => method !== "NumberFormat") as method}
				<li><a class:active={path.includes(method)} href={`/${method}?locale=${getLocaleFromParams()}`}>{method}</a></li>
			{/each}
		</ul>
	</nav>
	<Select
		name="locale"
		placeholder="Select a locale"
		label="Locale"
		items={Object.entries(languageByLocale)}
		bind:value={locale}
	/>
	<a class="github" href="https://github.com/jesperorb/intl-explorer" target="_blank" rel="noopener noreferrer"
		>GitHub</a
	>
</div>

<style>
	.sidebar {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2;
		width: 15rem;
		padding: 2.5rem 1.5rem 1.5rem 1.5rem;
		display: flex;
		flex-direction: column;
		background-color: var(--light-purple);
		transform: translateX(-20rem);
		transition: transform 300ms;
		box-shadow: 2px 2px 8px 2px hsla(276, 100%, 10%, 0.03);
	}

	@media (min-width: 900px) {
		.sidebar {
			position: sticky;
			left: unset;
			transform: translateX(0);
			box-shadow: none;
		}
	}
	.open {
			transform: translateX(0);
			box-shadow: none;
	}
	a {
		text-decoration: none;
		border-bottom: 2px solid var(--purple);
	}
	.active {
		font-weight: bold;
	}
	li {
		margin-bottom: 0.5rem;
	}
	li:first-of-type {
		margin-bottom: 1rem;
	}
	li:last-of-type {
		margin-bottom: 2rem;
	}
	.github {
		margin-top: 1rem;
	}
	.sublink {
		margin-left: 1rem;
	}
</style>
