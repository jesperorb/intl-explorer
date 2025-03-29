<script lang="ts">
	import type { Page } from "@sveltejs/kit";
	import { dev, browser } from "$app/environment";
	import type { FormatMethodsKeys } from "$lib/format-methods";
	import { page, navigating } from "$app/stores";

	import Navigation from "$ui/Navigation.svelte";
	import Main from "$ui/Main.svelte";
	import SkipLink from "$ui/SkipLink.svelte";
	import ProgressBar from "$ui/ProgressBar.svelte";
	import Header from "$ui/Header.svelte";
	import { getLocaleFromParams } from "$utils/get-locale";
	import { locales } from "$store/locales";
	import { description, tags, title, imageUrl, author } from "$lib/constants";
	import {
		liveAnnouncerRegionIdAssertive,
		liveAnnouncerRegionIdPolite
	} from "$lib/live-announcer/constants";
	import LiveAnnouncer from "$lib/live-announcer/live-announcer.svelte";

	let routeId: FormatMethodsKeys | "Playground" | "/";
	$: isHomePage = false;
	const getRouteId = (page: Page<Record<string, string>>): void => {
		isHomePage = page.route.id === "/";
		routeId = page.route.id?.replace("/", "") as FormatMethodsKeys;
		if (browser) {
			document.querySelector("h1")?.setAttribute("tabIndex", "-1");
			document.querySelector("h1")?.focus();
		}
	};
	const getLocale = () => {
		locales.set(getLocaleFromParams());
	};
	$: getRouteId($page);
	$: getLocale();
</script>

<svelte:head>
	<title>{routeId ?? title}</title>
	<meta name="robots" content="index, follow" />
	<meta name="author" content={author} />
	<meta name="keywords" content={tags.join(", ")} />
	<meta name="description" content={description} />
	<meta property="og:description" content={description} />
	<meta property="og:site_name" content={title} />
	<meta property="og:url" content={$page.url.host} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:image" content={imageUrl} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content={$page.url.host} />
	<meta property="twitter:url" content={$page.url.host} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	{#if !dev}
		<script
			defer
			src="https://umami-xi-eosin.vercel.app/script.js"
			data-website-id="a1ca3232-d4d8-44ac-92f0-656a91ceb36c"
		></script>
	{/if}
</svelte:head>

<div id={liveAnnouncerRegionIdPolite} aria-live="polite"></div>
<div id={liveAnnouncerRegionIdAssertive} aria-live="assertive"></div>

<LiveAnnouncer>
	<SkipLink />

	<Navigation />

	<Main bind:center={isHomePage}>
		{#if $navigating}
			<ProgressBar />
		{/if}
		{#if routeId && routeId !== "Playground"}
			<Header header={routeId} />
		{/if}
		<slot />
	</Main>
</LiveAnnouncer>

<!-- Ignore -->
<style global>
	:root {
		--font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji",
			"Segoe UI Emoji", "Segoe UI Symbol";
		--code-font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;

		--spacing-1: 0.25rem;
		--spacing-2: 0.5rem;
		--spacing-3: 0.75rem;
		--spacing-4: 1rem;
		--spacing-5: 1.25rem;
		--spacing-6: 1.5rem;
		--spacing-7: 1.75rem;
		--spacing-8: 2rem;
		--spacing-9: 2.25rem;
		--spacing-10: 2.5rem;
		--spacing-11: 2.75rem;
		--spacing-12: 3rem;

		--white-1: rgb(255, 255, 255);

		--gray-1: rgb(250, 250, 250);
		--gray-2: rgb(240, 240, 240);
		--gray-3: rgb(220, 220, 220);
		--gray-4: rgb(100, 100, 100);
		--gray-5: rgb(150, 150, 150);

		--black-1: rgb(0, 0, 0);
		--black-2: rgb(20, 20, 20);
		--black-3: rgb(30, 30, 30);

		--blue-1: hsl(200, 30%, 10%);
		--blue-2: hsl(200, 100%, 75%);
		--blue-3: hsl(216, 100%, 50%);
		--blue-4: hsl(200, 30%, 15%);

		--teal-1: hsl(169, 56%, 68%);

		--green-1: hsl(114, 31%, 39%);
		--green-2: hsl(114, 31%, 68%);

		--red-1: hsl(350, 100%, 46%);
		--red-2: hsl(350, 100%, 67%);
		--red-3: hsl(354, 66%, 54%);

		--orange-1: hsl(14, 90%, 70%);

		--yellow-1: hsl(40, 94%, 30%);
		--yellow-2: hsl(40, 94%, 50%);
		--yellow-3: hsl(40, 94%, 80%);

		--purple-1: hsl(276, 65%, 75%);
		--purple-2: hsl(276, 65%, 70%);

		--accent-hue: 275;
		--accent-1: hsl(var(--accent-hue), 100%, 98%);
		--accent-2: hsl(var(--accent-hue), 100%, 90%);
		--accent-3: hsl(var(--accent-hue), 100%, 75%);
		--accent-4: hsl(var(--accent-hue), 100%, 60%);
		--accent-5: hsl(var(--accent-hue), 100%, 50%);

		--text-color: var(--black-1);
		--background-color: var(--white-1);
		--background-secondary-color: var(--gray-1);
		--divider-color: var(--gray-3);
		--border-color: var(--gray-5);
		--disabled-color: var(--gray-2);
		--focus-color: var(--blue-3);
		--body-background-color: var(--accent-1);
		--partial-support-color: var(--yellow-1);

		--code-key: var(--white-1);
		--code-comment: var(--gray-5);
		--code-text-color: var(--white-1);
		--code-background-color: var(--blue-4);
		--code-punctuation: var(--purple-2);
		--code-operator: var(--teal-1);
		--code-function: var(--blue-2);
		--code-boolean: var(--red-2);
		--code-number: var(--orange-1);
		--code-string: var(--green-2);
		--code-class: var(--yellow-2);
	}

	@media (prefers-color-scheme: dark) {
		:root {
			--text-color: var(--white-1);
			--background-color: var(--black-1);
			--background-secondary-color: var(--black-2);
			--body-background-color: var(--black-2);
			--border-color: var(--gray-4);
			--divider-color: var(--gray-4);
			--disabled-color: var(--gray-2);
			--partial-support-color: var(--yellow-2);
		}
	}
	[data-dark-mode] {
		--text-color: var(--white-1);
		--background-color: var(--black-1);
		--background-secondary-color: var(--black-2);
		--body-background-color: var(--black-2);
		--border-color: var(--gray-4);
		--divider-color: var(--gray-4);
		--disabled-color: var(--gray-2);
		--partial-support-color: var(--yellow-2);
	}
	[data-light-mode] {
		--text-color: var(--black-1);
		--background-color: var(--white-1);
		--background-secondary-color: var(--gray-1);
		--body-background-color: var(--accent-1);
		--border-color: var(--gray-5);
		--divider-color: var(--gray-3);
		--disabled-color: var(--gray-2);
	}
	[data-code-light-mode] {
		--code-text-color: var(--black-1);
		--code-background-color: var(--white-1);
		--code-comment: var(--gray-4);
		--code-punctuation: var(--red-2);
		--code-operator: var(--black-1);
		--code-key: var(--black-1);
		--code-function: var(--purple-2);
		--code-boolean: var(--blue-4);
		--code-number: var(--blue-4);
		--code-string: var(--blue-4);
		--code-class: var(--purple-2);
	}
	*,
	*::after,
	*::before {
		box-sizing: border-box;
	}

	body,
	html {
		font-size: 100%;
		background-color: var(--body-background-color);
		color: var(--text-color);
		font-family: var(--font-family);
		line-height: 1.5;
		width: 100%;
	}
	pre,
	ul,
	body,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p {
		margin: 0;
		padding: 0;
	}
	a,
	a:visited {
		color: var(--text-color);
	}

	ul {
		list-style: none;
	}
	pre,
	code,
	pre *,
	code * {
		font-family: var(--code-font-family);
	}

	code.hljs {
		border-radius: 4px;
		border: 1px solid var(--border-color);
		font-size: 0.85rem;
	}

	a {
		text-decoration: none;
		border-bottom: 2px solid var(--accent-3);
	}

	select {
		border: 1px solid var(--border-color);
		color: var(--text-color);
		border-radius: 4px;
		padding: var(--spacing-3);
		appearance: none;
		--webkit-appearance: none;
		background-color: var(--background-color);
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' aria-hidden='true' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='gray' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right var(--spacing-2) center;
		cursor: pointer;
	}

	input {
		background-color: var(--background-color);
		border: 1px solid var(--border-color);
		color: var(--text-color);
		border-radius: 4px;
		padding: var(--spacing-3);
		font-family: var(--font-family);
	}

	hr {
		margin: 0;
		border-width: 0px 0px thin;
		border-style: solid;
		border-color: var(--divider-color);
		background-color: initial;
	}
	.sr-only {
		border: 0 !important;
		clip: rect(1px, 1px, 1px, 1px) !important;
		-webkit-clip-path: inset(50%) !important;
		clip-path: inset(50%) !important;
		height: 1px !important;
		margin: -1px !important;
		overflow: hidden !important;
		padding: 0 !important;
		position: absolute !important;
		width: 1px !important;
		white-space: nowrap !important;
	}
</style>
