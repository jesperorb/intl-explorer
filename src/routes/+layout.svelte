<script lang="ts">
	import type { Page } from '@sveltejs/kit';
	import { dev } from '$app/environment';
	import type { FormatMethodsKeys } from '$lib/format-methods';
	import { page, navigating } from '$app/stores';

	import Sidebar from '$lib/components/Sidebar.svelte';
	import Main from '$lib/components/ui/Main.svelte';
	import SkipLink from '$lib/components/ui/SkipLink.svelte';
	import ProgressBar from '$lib/components/ui/ProgressBar.svelte';
	import Header from '$lib/components/ui/Header.svelte';

	let routeId: FormatMethodsKeys | "Playground";
	const getRouteId = (page: Page<Record<string, string>>): void => {
		routeId = page.route.id?.replace('/', '') as FormatMethodsKeys;
	};
	$: getRouteId($page);
</script>

<svelte:head>
	<title>{routeId ?? 'Intl Explorer'}</title>
	{#if !dev}
	<script defer src="https://umami-xi-eosin.vercel.app/script.js" data-website-id="a1ca3232-d4d8-44ac-92f0-656a91ceb36c"></script>
	{/if}
</svelte:head>

<SkipLink />

<Sidebar />

<Main>
	{#if $navigating}
		<ProgressBar />
	{/if}
	{#if routeId && routeId !== "Playground"}
		<Header header={routeId} />
	{/if}
	<slot />
</Main>

<!-- Ignore -->
<style global>
	:root {
		--black: hsl(276, 100%, 12%);
		--white: hsl(0, 100%, 100%);
		--dark-blue: hsl(207, 95%, 8%);
		--light-blue: hsl(221, 100%, 75%);
		--gray: hsl(0, 0%, 60%);
		--lightgray: hsl(0, 0%, 80%);
		--lightergray: hsl(0, 0%, 90%);
		--purple: hsl(276, 67%, 74%);
		--teal: hsl(169, 56%, 68%);
		--green: hsl(114, 31%, 68%);
		--darkgreen: hsl(114, 31%, 39%);
		--red: hsl(350, 100%, 67%);
		--darkred:  hsl(350, 100%, 46%);
		--orange: hsl(14, 90%, 70%);
		--yellow: hsl(40, 94%, 32%);
		--light-purple: hsl(276, 100%, 98%);

		--font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
			'Segoe UI Emoji', 'Segoe UI Symbol';
		--code-font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;

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
	@media (min-width: 900px) {
		body {
			display: grid;
			grid-template-columns: 12rem 1fr;
		}
	}
	pre, ul, body, h1, h2, h3, h4, h5, h6, p {
		margin: 0;
		padding: 0;
	}
	a,
	a:visited {
		color: var(--black);
	}

	ul {
		list-style: none;
	}
	select {
		max-width: 100%;
	}
	fieldset {
		border-radius: 4px;
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

	select {
		border: 1px solid var(--lightgray);
		border-radius: 4px;
		padding: var(--spacing-2);
		appearance: none;
		--webkit-appearance: none;
		background: var(--white);
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='gray' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right var(--spacing-2) center;
	}

	input {
		border: 1px solid var(--lightgray);
		border-radius: 4px;
		background-color: var(--white);
		padding: var(--spacing-2);
		font-family: var(--font-family);	
	}

	hr {
		margin: 0;
		border-width: 0px 0px thin;
		border-style: solid;
		border-color: var(--lightergray);
		background-color: initial;
	}
</style>
