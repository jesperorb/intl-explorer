<script lang="ts">
	import type { Page } from '@sveltejs/kit';

	import { page } from '$app/stores';

	import Select from '$lib/components/ui/Select.svelte';
	import HamburgerMenu from '$lib/components/ui/HamburgerMenu.svelte';

	import { languageByLocale } from '$lib/locale-data/locales';
	import { routes } from '$lib/routes';
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let locale: string;

	const matchMedia = browser ? window.matchMedia('(min-width: 900px)') : null;

	const isDesktop = Boolean(matchMedia?.matches);

	let open = isDesktop;
	const onClick = () => (open = !open);

	let path: string;

	const getPath = (page: Page<Record<string, string>>): void => {
		path = page.url.pathname;
	};

	$: getPath($page);

	const onClickMenu = (event: MouseEvent) => {
		const eventTarget = event.target as HTMLElement;
		const clickedLink = eventTarget.tagName === 'A';
		if (!clickedLink) return;
		onClick();
	};

	const onMatchMediaChange = (event: MediaQueryListEventMap['change']) => {
		open = event.matches;
	};

	onMount(() => {
		if (browser && !isDesktop) {
			window.addEventListener('click', onClickMenu);
			matchMedia?.addEventListener('change', onMatchMediaChange);
		}
		if (browser && matchMedia) {
			matchMedia.addEventListener('change', onMatchMediaChange);
		}
	});

	onDestroy(() => {
		if (browser && !isDesktop) {
			window.removeEventListener('click', onClickMenu);
		}
		if (browser && matchMedia) {
			matchMedia.removeEventListener('change', onMatchMediaChange);
		}
	});
</script>

<div class="sidebar" class:open>
	<nav aria-label="Main Menu" aria-hidden={!open} data-testid="navigation">
		<HamburgerMenu {onClick} {open} />
		<ul>
			<li><strong><a href="/">About</a></strong></li>
			<li aria-hidden="true" class="menu-heading"><strong>Intl.</strong></li>
			{#each routes as route}
				<li aria-hidden={route.ariaHidden}>
					<a
						aria-label={route.ariaLabel}
						class:sublink={route.sublink}
						class:active={path.includes(route.path)}
						href={`/${route.path}?locale=${locale}`}
					>
						{route.name}
					</a>
				</li>
			{/each}
			<li aria-hidden="true" class="menu-heading"><strong>Meta</strong></li>
			<li>
				<a
					class="github"
					href="https://github.com/jesperorb/intl-explorer"
					target="_blank"
					rel="noopener noreferrer">GitHub</a
				>
			</li>
		</ul>
	</nav>
	<Select
		name="locale"
		placeholder="Select a locale"
		label="Locale"
		items={Object.entries(languageByLocale)}
		bind:value={locale}
	/>
</div>

<style>
	.sidebar {
		position: fixed;
		top: 0;
		left: 0;
		height: calc(100vh - 4rem);
		z-index: 2;
		width: 15rem;
		padding: 2.5rem 1.5rem 1.5rem 1.5rem;
		display: flex;
		flex-direction: column;
		background-color: var(--light-purple);
		transform: translateX(-20rem);
		transition: transform 300ms;
		box-shadow: 4px 4px 8px 2px hsla(276, 100%, 10%, 0.1);
	}

	.open {
		transform: translateX(0);
		box-shadow: none;
	}

	@media (min-width: 900px) {
		.sidebar {
			position: sticky;
			left: unset;
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
	.menu-heading {
		margin-top: 2rem;
	}
</style>
