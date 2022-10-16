<script lang="ts">
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
		routeId = page.routeId as FormatMethodsKeys;
	};
	$: getRouteId($page);
</script>

<svelte:head>
	<title>{routeId ?? 'Intl Explorer'}</title>
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
	**::before {
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
	code {
		margin: 0;
	}
	pre {
		line-height: 1.5;
		padding: var(--spacing-1);
		background-color: #1b2b34;
		font-size: 0.85rem;
		border-radius: 0.5rem;
		overflow-x: auto;
		margin-bottom: var(--spacing-1);
		color: var(--white);
		font-family: var(--font-family);
	}

	.token.comment {
		color: var(--gray);
	}

	.token.punctuation {
		color: var(--purple);
	}

	.token.operator {
		color: var(--teal);
	}

	.token.key {
		color: var(--white);
	}

	.token.function {
		color: var(--light-blue);
	}

	.token.boolean {
		color: var(--red);
	}

	.token.number {
		color: var(--orange);
	}

	.token.string {
		color: var(--green);
	}
	span.hljs-comment {
		color: var(--gray);
	}
	code.hljs {
		color: var(--white);
	}
	a {
		text-decoration: none;
		border-bottom: 2px solid var(--purple);
	}
</style>
