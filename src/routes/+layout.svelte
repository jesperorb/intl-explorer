<script lang="ts">
	/* eslint svelte/valid-compile: ["error", { ignoreWarnings: true }] */
	import type { Page } from '@sveltejs/kit';
	import type { FormatMethodsKeys } from '$lib/format-methods';
	import { page, navigating } from '$app/stores';

	import Sidebar from '$lib/components/Sidebar.svelte';
	import Main from '$lib/components/ui/Main.svelte';
	import SkipLink from '$lib/components/ui/SkipLink.svelte';
	import ProgressBar from '$lib/components/ui/ProgressBar.svelte';
	import Header from '$lib/components/ui/Header.svelte';

	let routeId: FormatMethodsKeys;
	const getRouteId = (page: Page<Record<string, string>>): void => {
		routeId = page.route.id?.replace('/', '') as FormatMethodsKeys;
	};
	$: getRouteId($page);
</script>

<svelte:head>
	<title>{routeId ?? 'Intl Explorer'}</title>
	<script async src="https://umami-jesperorb.vercel.app/script.js" data-website-id="1a2d166c-93b7-4f2b-b61f-ae3e221cf760" data-do-not-track="true"></script>
</svelte:head>

<SkipLink />

<Sidebar />

<Main>
	{#if $navigating}
		<ProgressBar />
	{/if}
	{#if routeId}
		<Header header={routeId} />
	{/if}
	<slot />
</Main>

<!-- Ignore -->
<style global>
	:root {
		--black: hsl(276, 100%, 10%);
		--white: hsl(0, 100%, 100%);
		--dark-blue: hsl(207, 95%, 8%);
		--light-blue: hsl(221, 100%, 75%);
		--gray: hsl(0, 0%, 60%);
		--purple: hsl(276, 67%, 74%);
		--teal: hsl(169, 56%, 68%);
		--green: hsl(114, 31%, 68%);
		--red: hsl(350, 100%, 67%);
		--orange: hsl(14, 90%, 70%);
		--light-purple: hsl(276, 100%, 98%);

		--font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
			'Segoe UI Emoji', 'Segoe UI Symbol';
		--code-font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;

		--spacing-1: 1rem;
		--spacing-1-5: 1.5rem;
	}

	*,
	*::after,
	*::before {
		box-sizing: border-box;
	}

	body,
	html {
		font-size: 100%;
		background-color: var(--light-purple);
		color: var(--black);
		font-family: var(--font-family);
		line-height: 1.5;
		width: 100%;
	}
	h1,
	h2,
	h3 {
		margin-bottom: 1rem;
		margin-top: 0;
	}
	body {
		margin: 0;
	}
	@media (min-width: 900px) {
		body {
			display: grid;
			grid-template-columns: 18rem 1fr;
		}
	}
	a,
	a:visited {
		color: var(--black);
	}
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: bold;
	}
	input,
	select,
	button {
		margin-bottom: var(--spacing-1);
	}
	select {
		max-width: 100%;
	}
	fieldset {
		border-radius: 4px;
		padding-bottom: 1.1rem;
	}
	pre,
	code,
	pre *,
	code * {
		font-family: var(--code-font-family);
	}
	span.hljs-comment {
		color: var(--gray);
	}
	code.hljs {
		color: var(--white);
		border-radius: 8px;
		font-size: 0.85rem;
	}
	a {
		text-decoration: none;
		border-bottom: 2px solid var(--purple);
	}
</style>
