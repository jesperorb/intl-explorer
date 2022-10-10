<script lang="ts">
	import type { Page } from '@sveltejs/kit';

	import { page } from '$app/stores';

	import { routes } from '$lib/routes';
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let locale: string;

	const matchMedia = browser ? window.matchMedia('(min-width: 900px)') : null;

	let isDesktop = Boolean(matchMedia?.matches);
	let open = isDesktop;

	let path: string;

	const getPath = (page: Page<Record<string, string>>): void => {
		path = page.url.pathname;
	};

	$: getPath($page);

	const onClickMenu = (event: MouseEvent) => {
		if(isDesktop) return;
		const eventTarget = event.target as HTMLElement;
		const clickedLink = eventTarget.tagName === 'A';
		if (!clickedLink) return;
		const menu = document.getElementById("sidebar");
		if(!menu?.contains(eventTarget)) return;
		open = false;
	};

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

<details class="sidebar" id="sidebar" bind:open={open}>
	<summary>
		<p class="menu-button">Menu</p>
	</summary>
	<nav aria-label="Main Menu" data-testid="navigation">
		<ul>
			<li><strong><a href="/?locale={locale}">About</a></strong></li>
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
			<li aria-hidden="true" class="menu-heading"><strong>Playground</strong></li>
			<li>
				<a href="/Playground?locale={locale}">Playground</a>
			</li>
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
</details>

<style>
	.sidebar {
		padding: 0.5rem 1rem;
		display: flex;
		flex-direction: column;
		background-color: var(--light-purple);
	}
	nav {
		padding-top: 1rem;
	}
	.menu-button {
		text-transform: uppercase;
		letter-spacing: 0.1rem;
		font-weight: bold;
		font-size: 1.25rem;
		margin: 0;
		user-select: none;
		display: inline-block;
	}
	@media (min-width: 900px) {
		.sidebar {
			padding: 2.5rem 1.5rem 1.5rem 1.5rem;
		}
		nav {
			padding-top: 0;
		}
		.menu-button {
			margin-bottom: 1rem;
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

	@keyframes fadeIn {
		0%    {opacity: 0; }
		100%  {opacity: 1;}
	}

	@media (max-width: 900px) {
		details[open] summary ~ * {
  		animation: fadeIn .3s;
		}
	}
</style>
