<script lang="ts">
	import Sidebar from '$lib/components/sidebar.svelte';
	import Main from '$lib/components/ui/Main.svelte';
	import { selectedLocale } from '$lib/store/selected-locale';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { getLocaleForSSR } from '$lib/utils/get-locale';

	const locale = getLocaleForSSR($page);
</script>

{#if browser}
	<Sidebar bind:locale={$selectedLocale} />
{:else}
	<Sidebar {locale} />
{/if}

<Main>
	<slot />
</Main>

<style global>
	:root {
		--black: hsl(276, 100%, 10%);
		--white: hsl(0, 100%, 100%);
		--dark-blue: hsl(207, 95%, 8%);
		--light-blue: hsl(221, 100%, 75%);
		--gray: hsl(0, 0%, 55%);
		--purple: hsl(276, 67%, 74%);
		--teal: hsl(169, 56%, 68%);
		--green: hsl(84, 62%, 63%);
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
		margin: 0;
		padding: 0;
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
	body {
		display: grid;
		grid-template-columns: 1fr;
		margin: 0;
	}
	@media (min-width: 900px) {
		body {
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
		margin-bottom: 4px;
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
	pre {
		line-height: 1.5;
		padding: var(--spacing-1);
		background-color: var(--dark-blue);
		font-size: 0.85rem;
		border-radius: 0.5rem;
		overflow-x: auto;
		margin-bottom: var(--margin-1);
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
</style>
