<script lang="ts">
	import type { Page } from '@sveltejs/kit';

	import { page } from '$app/stores';

	import { routes } from '$lib/routes';
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { getLocaleForSSR } from '$lib/utils/get-locale';
	import { selectedLocale } from '$lib/store/selected-locale';
	import { testIds } from '$lib/utils/dom-utils';
	import OpenInNewTab from '$lib/components/ui/icons/OpenInNewTab.svelte';
	import DarkModeToggle from './ui/DarkModeToggle.svelte';

	const matchMedia = browser ? window.matchMedia('(min-width: 900px)') : null;
	const locale = browser ? $selectedLocale : getLocaleForSSR($page);

	$: isDesktop = Boolean(matchMedia?.matches);
	$: open = isDesktop;

	let path: string;

	const getPath = (page: Page<Record<string, string>>): void => {
		path = page.url.pathname;
	};

	$: getPath($page);

	const onClickMenu = (event: MouseEvent) => {
		if (isDesktop) return;
		const eventTarget = event.target as HTMLElement;
		const clickedLink = eventTarget.tagName === 'A';
		if (!clickedLink) return;
		const menu = document.getElementById('sidebar');
		if (!menu?.contains(eventTarget)) return;
		open = false;
	};

	// eslint-disable-next-line no-undef
	const onMatchMediaChange = (event: MediaQueryListEventMap['change']) => {
		isDesktop = event.matches;
		open = event.matches;
	};

	onMount(() => {
		if (browser) {
			window.addEventListener('click', onClickMenu);
		}
		if (browser && matchMedia) {
			matchMedia.addEventListener('change', onMatchMediaChange);
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('click', onClickMenu);
		}
		if (browser && matchMedia) {
			matchMedia.removeEventListener('change', onMatchMediaChange);
		}
	});
</script>

<details class="sidebar" id="sidebar" bind:open>
	<summary>
		<p class="menu-button">Menu</p>
		{#if !isDesktop}
			<div class="dark-mode-toggle">
				<DarkModeToggle />
			</div>
		{/if}
	</summary>
	<nav aria-label="Main Menu" data-testid={testIds.navigation}>
		<ul>
			<li class="last-item" class:active={path === '/'}><a href="/?locale={locale}">About</a></li>
			<li class="last-item">
				<a href="/Playground?locale={locale}" class:active={path.includes('Playground')}
					>Playground</a
				>
			</li>
			<li class="menu-heading">Intl.</li>
			{#each routes as route, i}
				<li class="route" class:last-item={i === routes.length - 1}>
					<a
						aria-label={route.ariaLabel}
						class:sublink={route.sublink}
						class:active={path.includes(route.path)}
						href={`/${route.path}?locale=${locale}`}
					>
						{route.name}
						{#if route.experimental}
							<img height="16" width="16" src="/icons/experimental.svg" alt="Experimental" />
						{/if}
					</a>
				</li>
			{/each}
			<li class="menu-heading">Meta</li>
			<li>
				<a
					class="github"
					href="https://github.com/jesperorb/intl-explorer"
					target="_blank"
					rel="noopener noreferrer">GitHub <OpenInNewTab /></a
				>
			</li>
		</ul>
	</nav>
	{#if isDesktop}
		<div class="dark-mode-toggle-desktop">
			<DarkModeToggle />
		</div>
	{/if}
</details>

<style>
	.menu-heading,
	.route {
		margin-bottom: var(--spacing-1);
	}
	.dark-mode-toggle {
		position: fixed;
		top: var(--spacing-2);
		right: var(--spacing-4);
	}
	.dark-mode-toggle-desktop {
		position: fixed;
		bottom: var(--spacing-4);
		left: var(--spacing-4);
	}

	.menu-heading {
		font-size: 1.25rem;
	}
	.last-item {
		margin-bottom: var(--spacing-4);
	}
	.sidebar {
		padding: var(--spacing-2) var(--spacing-4);
		display: flex;
		flex-direction: column;
		background-color: var(--accent-background-color);
	}
	nav {
		padding-top: var(--spacing-4);
	}
	.menu-button {
		text-transform: uppercase;
		letter-spacing: 0.1rem;
		font-weight: bold;
		font-size: 1.25rem;
		user-select: none;
		display: inline-block;
	}
	summary {
		list-style: none;
	}
	summary::marker,
	summary::-webkit-details-mark {
		display: none;
	}
	.active {
		font-weight: bold;
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
			transform: translateX(-10px);
		}
		100% {
			opacity: 1;
			transform: translateX(0);
		}
	}

	details[open] summary ~ * {
		animation: fadeIn 0.3s;
	}
</style>
