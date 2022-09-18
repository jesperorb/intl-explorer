<script lang="ts">
	import type { Page } from '@sveltejs/kit';

	import { page } from '$app/stores';

	import Select from '$lib/components/ui/Select.svelte';

	import { languageByLocale } from '$lib/locale-data/locales';
	import { routes } from '$lib/routes';

	export let open: boolean;
	export let locale: string;

	let path: string;

	const getPath = (page: Page<Record<string, string>>): void => {
		path = page.url.pathname;
	};

	$: getPath($page);

</script>

<div class="sidebar" class:open>
	<nav>
		<ul>
			<li><strong><a href="/">About</a></strong></li>
			<li><strong>Intl.</strong></li>
			{#each routes as route}
				<li>
					<a class:sublink={route.sublink} class:active={path.includes(route.path)} href={`/${route.path}?locale=${locale}`}>
						{route.name}
					</a>
				</li>
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
	<a
		class="github"
		href="https://github.com/jesperorb/intl-explorer"
		target="_blank"
		rel="noopener noreferrer">GitHub</a
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
		.open {
			transform: translateX(0);
			box-shadow: none;
		}
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
