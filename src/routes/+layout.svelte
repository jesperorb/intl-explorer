<script lang="ts">
	import type { Page } from '@sveltejs/kit';
	import { dev, browser } from '$app/environment';
	import type { FormatMethodsKeys } from '$lib/format-methods';
	import { page, navigating } from '$app/stores';

	import Navigation from '$lib/components/ui/Navigation.svelte';
	import Main from '$lib/components/ui/Main.svelte';
	import SkipLink from '$lib/components/ui/SkipLink.svelte';
	import ProgressBar from '$lib/components/ui/ProgressBar.svelte';
	import Header from '$lib/components/ui/Header.svelte';

	let routeId: FormatMethodsKeys | 'Playground';
	const getRouteId = (page: Page<Record<string, string>>): void => {
		routeId = page.route.id?.replace('/', '') as FormatMethodsKeys;
		if(browser) {
			document.querySelector("h1")?.setAttribute("tabIndex", "-1");
			document.querySelector("h1")?.focus();
		}
	};
	$: getRouteId($page);
</script>

<svelte:head>
	<title>{routeId ?? 'Intl Explorer'}</title>
	{#if !dev}
		<script
			defer
			src="https://umami-xi-eosin.vercel.app/script.js"
			data-website-id="a1ca3232-d4d8-44ac-92f0-656a91ceb36c"
		></script>
	{/if}
</svelte:head>

<SkipLink />

<Navigation />

<Main>
	{#if $navigating}
		<ProgressBar />
	{/if}
	{#if routeId && routeId !== 'Playground'}
		<Header header={routeId} />
	{/if}
	<slot />
</Main>

<!-- Ignore -->
<style global>
	:root {
		--dark-black: hsl(0, 100%, 2%);
		--black: hsl(276, 100%, 12%);
		--white: hsl(0, 100%, 100%);
		--dark-blue: hsl(207, 95%, 8%);
		--light-blue: hsl(221, 100%, 75%);
		--darkergray: hsl(0, 0%, 10%);
		--darkgray: hsl(0, 0%, 25%);
		--gray: hsl(0, 0%, 60%);
		--lightgray: hsl(0, 0%, 80%);
		--lightergray: hsl(0, 0%, 90%);
		--purple: hsl(276, 67%, 74%);
		--teal: hsl(169, 56%, 68%);
		--green: hsl(114, 31%, 68%);
		--darkgreen: hsl(114, 31%, 39%);
		--red: hsl(350, 100%, 67%);
		--darkred: hsl(350, 100%, 46%);
		--orange: hsl(14, 90%, 70%);
		--lighteryellow: #fac863;
		--lightyellow: hsl(40, 94%, 50%);
		--yellow: hsl(40, 94%, 32%);
		--light-purple: hsl(276, 100%, 98%);
		--highlight: #0066ff;

		--text-color: var(--black);
		--accent-background-color: var(--light-purple);
		--background-color: var(--white);
		--link-underline-color: var(--purple);
		--border-color: var(--lightgray);
		--divider-color: var(--lightergray);
		--card-color: var(--background-color);

		--code-comment-color: var(--gray);
		--code-text-color: var(--white);
		--code-block-background: #1b2b34;

		--comment: var(--gray);
		--punctuation: var(--purple);
		--operator: var(--teal);
		--key: var(--white);
		--function: var(--light-blue);
		--boolean: var(--red);
		--number: var(--orange);
		--string: var(--green);
		--class: var(--lightyellow);

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

	@media (prefers-color-scheme: dark) {
		:root {
			--text-color: var(--white);
			--accent-background-color: var(--darkergray);
			--background-color: var(--dark-black);
			--link-underline-color: var(--white);
			--border-color: var(--darkgray);
			--divider-color: var(--darkgray);
			--card-color: var(--darkergray);
			--yellow: var(--lightyellow);
			--darkgreen: var(--green);
		}
	}
	[data-dark-mode] {
		--text-color: var(--white);
		--accent-background-color: var(--dark-black);
		--background-color: hsl(0, 0%, 6%);
		--link-underline-color: var(--white);
		--border-color: hsl(0, 0%, 17%);
		--divider-color: var(--darkgray);
		--card-color: var(--dark-black);
		--yellow: var(--lightyellow);
		--darkgreen: var(--green);
	}
	[data-code-light-mode] {
		--code-text-color: var(--black);
		--code-block-background: var(--white);
		--comment: var(--darkgray);
		--punctuation: var(--black);
		--operator: var(--black);
		--key: #d73a49;
		--function: #6f42c1;
		--boolean: #005cc5;
		--number: #032f62;
		--string: #032f62;
		--class: #6f42c1;
	}
	*,
	*::after,
	*::before {
		box-sizing: border-box;
	}

	body,
	html {
		font-size: 100%;
		background-color: var(--accent-background-color);
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
	select {
		max-width: 100%;
		color: var(--text-color);
	}
	fieldset {
		border-radius: 4px;
		color: var(--text-color);
		border-color: var(--border-color);
	}
	pre,
	code,
	pre *,
	code * {
		font-family: var(--code-font-family);
	}
	span.hljs-comment {
		color: var(--code-comment-color);
	}
	code.hljs {
		border-radius: 4px;
		border: 1px solid var(--border-color);
		font-size: 0.85rem;
	}
	a {
		text-decoration: none;
		border-bottom: 2px solid var(--link-underline-color);
	}

	select {
		border: 1px solid var(--border-color);
		color: var(--text-color);
		border-radius: 4px;
		padding: var(--spacing-2);
		appearance: none;
		--webkit-appearance: none;
		background-color: inherit;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' aria-hidden='true' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='gray' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right var(--spacing-2) center;
	}

	input {
		border: 1px solid var(--border-color);
		color: var(--text-color);
		border-radius: 4px;
		background-color: inherit;
		padding: var(--spacing-2);
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
