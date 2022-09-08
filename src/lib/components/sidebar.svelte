<script lang="ts">
	import Select from './ui/Select.svelte';
	import { formatMethods } from '$lib/format-methods';
	import { languageByLocale } from '$lib/locale-data/locales';
	import { selectedLocale } from '$lib/store/selected-locale';
	import { page } from '$app/stores';

	let path: string;

	const getPath = (currentPath: string) => {
		path = currentPath;
	};

	$: getPath($page.url.pathname);
</script>

<div class="sidebar">
	<nav>
		<ul>
			<li><strong><a href="/">About</a></strong></li>
			<li><strong>Methods</strong></li>
			{#each formatMethods as method}
				<li><a class:active={path.includes(method)} href={`/${method}`}>{method}</a></li>
			{/each}
		</ul>
	</nav>
	<Select
		name="locale"
		placeholder="Select a locale"
		label="Locale"
		items={Object.entries(languageByLocale)}
		bind:value={$selectedLocale}
	/>
	<a class="github" href="https://github.com/jesperorb/intl-explorer" target="_blank" rel="noopener noreferrer"
		>GitHub</a
	>
</div>

<style>
	.sidebar {
		position: sticky;
		top: 0;
		width: 230px;
		display: flex;
		flex-direction: column;
		padding: 0 1.5rem;
		background-color: var(--light-purple);
	}
	a {
		text-decoration: none;
		border-bottom: 2px solid var(--purple);
	}
	.active {
		color: var(--purple);
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
</style>
