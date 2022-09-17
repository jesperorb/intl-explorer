<script lang="ts">
	import Select from './ui/Select.svelte';
	import { formatMethods } from '$lib/format-methods';
	import { languageByLocale } from '$lib/locale-data/locales';
	import { page } from '$app/stores';

	export let open: boolean;
	export let selectedLocale: string;

	let path: string;

	const getPath = (currentPath: string) => {
		path = currentPath;
	};

	$: getPath($page.url.pathname);
</script>

<div class="sidebar" class:open={open}>
	<nav>
		<ul>
			<li><strong><a href="/">About</a></strong></li>
			<li><strong>Methods</strong></li>
			<li><a class:active={path.includes("NumberFormat")} href={`/NumberFormat/Currency`}>NumberFormat</a></li>
			<li><a class:active={path.includes("Currency")} class="sublink" href={`/NumberFormat/Currency`}>Currency</a></li>
			<li><a class:active={path.includes("Unit")} class="sublink" href={`/NumberFormat/Unit`}>Unit</a></li>
			{#each formatMethods.filter((method) => method !== "NumberFormat") as method}
				<li><a class:active={path.includes(method)} href={`/${method}`}>{method}</a></li>
			{/each}
		</ul>
	</nav>
	<Select
		name="locale"
		placeholder="Select a locale"
		label="Locale"
		items={Object.entries(languageByLocale)}
		bind:value={selectedLocale}
	/>
	<a class="github" href="https://github.com/jesperorb/intl-explorer" target="_blank" rel="noopener noreferrer"
		>GitHub</a
	>
</div>

<style>
	.sidebar {
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		width: 230px;
		flex-direction: column;
		padding: 0 1.5rem;
		margin-top: 0.5rem;
		background-color: var(--light-purple);
		z-index: 1;
		height: 100%;
		transform: translateX(calc(-230px - 3rem));
		transition: transform 300ms;
		box-shadow: 2px 2px 8px 2px hsla(276, 100%, 10%, 0.03);
	}

	@media (min-width: 900px) {
		.sidebar {
			position: sticky;
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
