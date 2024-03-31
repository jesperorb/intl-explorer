<script lang="ts">
	import type { Page } from '@sveltejs/kit';
	import * as m from "$paraglide/messages"

	import { page } from '$app/stores';

	import { routes } from '$lib/routes';
	import { browser } from '$app/environment';
	import { getLocaleForSSR } from '$lib/utils/get-locale';
	import { selectedLocale } from '$lib/store/selected-locale';
	import { testIds } from '$lib/utils/dom-utils';
	import OpenInNewTab from '$lib/components/ui/icons/OpenInNewTab.svelte';
	import Spacing from './Spacing.svelte';
	import Settings from './icons/Settings.svelte';
	import SettingsDialog from './SettingsDialog.svelte';
	import Button from './Button.svelte';

	const locale = browser ? $selectedLocale : getLocaleForSSR($page);

	let path: string;
	let open = false;
	let showSettings = false;
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

<SettingsDialog bind:show={showSettings} />

<nav aria-label="Main Menu" data-testid={testIds.navigation}>
	<div class="actions">
		<Button
			type="button"
			id="openMenuButton"
			ariaLabel="Open navigation"
			ariaControls="links"
			ariaExpanded="false"
			onClick={openDrawer}
			bind:ref={openButton}
			textTransform="uppercase"
		>
			{m.menu()}
		</Button>
		<div class="settings">
			<Button onClick={() => (showSettings = true)} ariaLabel="Settings" textTransform="uppercase">
				<span class="mr-2">{m.settingsButton()}</span> <Settings />
			</Button>
		</div>
	</div>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="drawer" class:drawer--open={open} on:keydown={onKeyDown} on:click={onClick}>
		<div class="drawer__top">
			<Button
				type="button"
				id="closeMenuButton"
				onClick={closeDrawer}
				bind:ref={closeButton}
				onKeyDown={onCloseButtonShiftTab}
				textTransform="uppercase"
			>
				{m.close()}
			</Button>
		</div>
		<Spacing />
		<ul id="links">
			<li
				class="last-item"
				class:active={path === '/'}
			>
				<a href="/?locale={locale}">{ m.about()}</a>
			</li>
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
			<li class="menu-heading">{m.meta()}</li>
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
		background-color: var(--background-color);
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
	.mr-2 {
		margin-right: var(--spacing-2);
	}
</style>
