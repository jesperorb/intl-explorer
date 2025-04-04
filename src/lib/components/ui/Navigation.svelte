<script lang="ts">
	import { page } from "$app/state";

	import OpenInNewTab from "$ui/icons/OpenInNewTab.svelte";
	import Spacing from "$ui/Spacing.svelte";
	import Settings from "$ui/icons/Settings.svelte";
	import SettingsDialog from "$ui/SettingsDialog.svelte";
	import Button from "$ui/Button.svelte";

	import { routes } from "$lib/routes";
	import { testIds } from "$utils/dom-utils";
	import { formatLocaleForUrl } from "$utils/format-utils";
	import { locales } from "$store/locales";

	import { m } from "$paraglide/messages";
	import { localizeHref } from "$paraglide/runtime";

	let open = $state(false);
	let showSettings = $state(false);
	let closeButton: HTMLButtonElement | undefined = $state();
	let openButton: HTMLButtonElement | undefined = $state();
	let lastItem: HTMLAnchorElement | undefined = $state();
	let path: string | undefined = $derived(page.url.pathname);

	const onCloseButtonShiftTab = (event: KeyboardEvent) => {
		if (event.key === "Tab" && event.shiftKey) {
			event.preventDefault();
			lastItem?.focus();
		}
	};

	const onLastItemKeyPress = (event: KeyboardEvent) => {
		if (event.key === "Tab") {
			event.preventDefault();
			closeButton?.focus();
		}
	};

	const onKeyDown = (event: KeyboardEvent) => {
		if (event.key === "Escape") {
			event.preventDefault();
			closeDrawer();
		}
		if (event.key === "Enter" && (event.target as HTMLElement).nodeName === "A") {
			closeDrawer();
		}
	};

	const onClick = (event: MouseEvent) => {
		if ((event.target as HTMLElement).nodeName === "A") {
			closeDrawer();
		}
	};

	const openDrawer = () => {
		open = true;
		setTimeout(() => {
			closeButton?.focus();
		}, 0);
	};

	const closeDrawer = () => {
		open = false;
		setTimeout(() => {
			openButton?.focus();
		}, 0);
	};
</script>

<SettingsDialog bind:show={showSettings} />

<nav aria-label="Main Menu" data-testid={testIds.navigation}>
	<div class="actions">
		<Button
			type="button"
			id="openMenuButton"
			ariaControls="links"
			ariaExpanded="false"
			onClick={openDrawer}
			bind:ref={openButton}
			textTransform="uppercase"
			noBackground
			testId={testIds.openNavigation}
		>
			{m.menu()}
		</Button>
		<div class="settings">
			<Button onClick={() => (showSettings = true)} textTransform="uppercase" noBackground>
				<span class="mr-2">{m.settingsButton()}</span>
				<Settings />
			</Button>
		</div>
	</div>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="drawer" class:drawer--open={open} onkeydown={onKeyDown} onclick={onClick}>
		<div class="drawer__top">
			<Button
				type="button"
				id="closeMenuButton"
				onClick={closeDrawer}
				bind:ref={closeButton}
				onKeyDown={onCloseButtonShiftTab}
				textTransform="uppercase"
				noBackground
			>
				{m.close()}
			</Button>
		</div>
		<Spacing />
		<ul id="links">
			<li class="last-item" class:active={path === "/"}>
				<a href="{localizeHref('/')}{formatLocaleForUrl($locales)}">{m.about()}</a>
			</li>
			<li class="last-item">
				<a
					href="{localizeHref('/Playground')}{formatLocaleForUrl($locales)}"
					class:active={path?.includes("Playground")}>Playground</a
				>
			</li>
			<li class="menu-heading">Intl.</li>
			{#each routes as route, i}
				<li class="route" class:last-item={i === routes.length - 1}>
					<a
						aria-label={route.ariaLabel}
						class:sublink={route.sublink}
						class:active={path?.includes(route.path)}
						href={`${localizeHref(route.path)}${formatLocaleForUrl($locales)}`}
					>
						{route.name}
					</a>
					{#if route.experimental}
						<img height="16" width="16" src="/icons/experimental.svg" alt="Experimental" />
					{/if}
				</li>
			{/each}
			<li class="menu-heading">{m.meta()}</li>
			<li>
				<a
					class="github"
					href="https://github.com/jesperorb/intl-explorer"
					target="_blank"
					rel="noopener noreferrer"
					onkeydown={onLastItemKeyPress}
					bind:this={lastItem}>GitHub <OpenInNewTab /></a
				>
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
		z-index: 999;
		overflow-x: hidden;
		transition: transform 0.3s;
		box-shadow: 1px 1px 8px 2px rgba(0, 0, 0, 0.1);
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
		border: 1px solid var(--border-color);
		border-left: none;
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
	.menu-heading,
	.route {
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
	.sublink {
		margin-left: 1rem;
	}
</style>
