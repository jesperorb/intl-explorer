<script lang="ts">
	import type { Page } from '@sveltejs/kit';

	import { page } from '$app/stores';

	import { routes } from '$lib/routes';
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { getLocaleForSSR } from '$lib/utils/get-locale';
	import { selectedLocale } from '$lib/store/selected-locale';
	import { testIds } from '$lib/utils/dom-utils';
	import Spacing from '$lib/components/ui/Spacing.svelte';
	import OpenInNewTab from '$lib/components/ui/icons/OpenInNewTab.svelte';

	const matchMedia = browser ? window.matchMedia('(min-width: 900px)') : null;
	const locale = browser ? $selectedLocale : getLocaleForSSR($page);

	let isDesktop = Boolean(matchMedia?.matches);
	let open = isDesktop;

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
	</summary>
	<nav aria-label="Main Menu" data-testid={testIds.navigation}>
		<ul>
			<li><strong><a href="/?locale={locale}">About</a></strong></li>
			<Spacing />
			<li aria-hidden="true" class="menu-heading"><strong>Playground</strong></li>
			<Spacing size={1} />
			<li>
				<a href="/Playground?locale={locale}">Playground</a>
			</li>
			<Spacing />
			<li aria-hidden="true" class="menu-heading"><strong>Intl.</strong></li>
			<Spacing size={1} />
			{#each routes as route}
				<li aria-hidden={route.ariaHidden}>
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
				<Spacing size={1} />
			{/each}
			<Spacing />
			<li aria-hidden="true" class="menu-heading"><strong>Meta</strong></li>
			<Spacing size={1} />
			<li>
				<a
					class="github"
					href="https://github.com/jesperorb/intl-explorer"
					target="_blank"
					data-umami-event="GitHub Link"
					rel="noopener noreferrer">GitHub <OpenInNewTab /></a
				>
			</li>
		</ul>
	</nav>
</details>

<style>
	.sidebar {
		padding: var(--spacing-2) var(--spacing-4);
		display: flex;
		flex-direction: column;
		background-color: var(--light-purple);
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
	@media (min-width: 900px) {
		.sidebar {
			padding: var(--spacing-10) var(--spacing-6) var(--spacing-6) var(--spacing-6);
		}
		summary {
			margin-bottom: var(--spacing-4);
		}
		nav {
			padding-top: 0;
		}
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
