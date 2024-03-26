<script lang="ts">
	import type { Page } from '@sveltejs/kit';

	import { page } from '$app/stores';

	import { routes } from '$lib/routes';
	import { browser } from '$app/environment';
	import { getLocaleForSSR } from '$lib/utils/get-locale';
	import { selectedLocale } from '$lib/store/selected-locale';
	import { testIds } from '$lib/utils/dom-utils';
	import OpenInNewTab from '$lib/components/ui/icons/OpenInNewTab.svelte';
	import DarkModeToggle from './DarkModeToggle.svelte';
	import Spacing from './Spacing.svelte';

	const locale = browser ? $selectedLocale : getLocaleForSSR($page);

	let path: string;
	let open = false;
	let closeButton: HTMLButtonElement;
	let openButton: HTMLButtonElement;
	let lastItem: HTMLAnchorElement;

	const getPath = (page: Page<Record<string, string>>): void => {
		path = page.url.pathname;
	};

	$: getPath($page);

	const onCloseButtonShiftTab = (event: KeyboardEvent) => {
		if(event.key === "Tab" && event.shiftKey) {
			event.preventDefault();
			lastItem.focus();
		}
	}

	const onLastItemKeyPress = (event: KeyboardEvent) => {
		if(event.key === "Tab") {
			event.preventDefault();
			closeButton.focus();
		}
	}

	const onKeyDown = (event: KeyboardEvent) => {
		if(event.key === "Escape") {
			event.preventDefault();
			closeDrawer();
		}
		if(event.key === "Enter" && (event.target as HTMLElement).nodeName === "A") {
			closeDrawer();
		}
	}

	const onClick = (event: MouseEvent) => {
		if((event.target as HTMLElement).nodeName === "A") {
			closeDrawer();
		}
	}

	const openDrawer = () => {
		open = true;
		setTimeout(() => {
			closeButton.focus();
		}, 0);
	}

	const closeDrawer = () => {
		open = false;
		setTimeout(() => {
			openButton.focus();
		}, 0);
	}
</script>

<nav aria-label="Main Menu" data-testid={testIds.navigation}>
	<div class="actions">
		<button
			type="button"
			id="openMenuButton"
			class="nav-button"
			aria-label="Open navigation"
			aria-controls="links"
			aria-expanded="false"
			on:click={openDrawer}
			bind:this={openButton}
		>
			Menu
		</button>
		<div class="settings">
			<DarkModeToggle />
		</div>
	</div>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="drawer" class:drawer--open={open} on:keydown={onKeyDown} on:click={onClick}>
		<div class="drawer__top">
			<button
				type="button"
				id="closeMenuButton"
				class="close-button"
				aria-label="Close navigation"
				on:click={closeDrawer}
				bind:this={closeButton}
				on:keydown={onCloseButtonShiftTab}
			>
				&times;
			</button>
		</div>
		<Spacing />
		<ul id="links">
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
					rel="noopener noreferrer"
					on:keydown={onLastItemKeyPress}
					bind:this={lastItem}
				>GitHub <OpenInNewTab /></a>
			</li>
		</ul>
	</div>
</nav>

<style>
	.drawer {
		visibility: hidden;
		position: fixed;
		top: 0;
		left: -250px;
		width: 250px;
		background-color: var(--card-color);
		height: 100%;
		padding: var(--spacing-4);
		z-index: 1;
		overflow-x: hidden;
		transition: transform 0.3s;
		box-shadow: 4px 4px 8px 2px hsla(276, 100%, 20%, 0.1);
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
	}
	.drawer--open {
		visibility: visible;
		transform: translateX(250px);
	}
	.drawer__top {
		display: flex;
		justify-content: end;
	}
	.actions {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--spacing-2);
	}
	.settings {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
	}
	.nav-button {
		border: none;
		padding: var(--spacing-2) var(--spacing-3);
		background: none;
		text-transform: uppercase;
		font-weight: bold;
		cursor: pointer;
		font-size: 1.25rem;
		color: var(--text-color);
	}
	.nav-button:hover, .close-button:hover {
		border-radius: 4px;
    outline: 1px solid var(--text-color);
	}
	.close-button {
		border: none;
		background: none;
		text-transform: uppercase;
		font-weight: bold;
		cursor: pointer;
		margin-left: auto;
		padding: var(--spacing-2) var(--spacing-3);
		border-radius: 4px;
		color: var(--text-color);
	}
	.menu-heading, .route {
		margin-bottom: var(--spacing-1);
	}
	.menu-heading {
		font-size: 1.25rem;
	}
	.last-item {
		margin-bottom: var(--spacing-4);
	}
	.active {
		font-weight: bold;
	}
</style>
