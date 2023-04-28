<script lang="ts">
	import Highlight from '$lib/components/ui/Highlight.svelte';
	import { copyToClipboard } from '$lib/utils/copy-to-clipboard';
	import { selectedLocale } from '$lib/store/selected-locale';
	import type { OptionValues } from '$lib/types/OptionValues.types';
  import ProgressBar from '$lib/components/ui/ProgressBar.svelte';
  import { navigating } from '$app/stores';
	let onClick = async (options: OptionValues) => {
		await copyToClipboard(
			`new Intl.DateTimeFormat("${$selectedLocale}", ${JSON.stringify(
				options
			)}).format(new Date("2022-09-22"))`
		);
	};
</script>

<svelte:head>
	<title>Intl Explorer</title>
</svelte:head>

{#if $navigating }
	<ProgressBar />
{/if}

<header>
	<h1>Welcome to Intl Explorer! 👋🏽</h1>
</header>

<div>
	<p>
		<strong>Intl Explorer</strong> is a tool for experimenting and trying out the
		<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl" target="_blank" rel="noopener noreferrer"
			>ECMAScript Internationalization API</a
		>. The API is available under the namespace <strong><code>Intl</code></strong> in JavaScript and
		provides language sensitive string comparison, number formatting, and date and time formatting.
	</p>
	<p>
		To get started either visit <strong><a href="/Playground">The Playground</a></strong> or choose <strong>formatter</strong> you are interested in from the navigation menu.
	</p>

	<p>
		The source code for this tool can be found at <a
			href="https://github.com/jesperorb/intl-explorer"
			target="_blank"
			rel="noopener noreferrer">GitHub</a
		>. The creator of this tool is
		<a href="https://jesperorb.com/" target="_blank" rel="noopener noreferrer">Jesper Orb</a>.
	</p>
	<p>
		If you like this tool consider giving the repository a <strong>star</strong> at GitHub. If you have found a bug
		or like to request an improvement please open an <em>issue</em> or <em>Pull Request</em> at the GitHub repository.
	</p>
</div>

<style>
	div {
		max-width: 700px;
	}
	h1 {
		margin: 0;
	}
</style>
