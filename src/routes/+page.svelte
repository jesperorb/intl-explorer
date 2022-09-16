<script lang="ts">
	import Highlight from '$lib/components/ui/Highlight.svelte';
	import { copyToClipboard } from '$lib/utils/copy-to-clipboard';
	import { selectedLocale } from '$lib/store/selected-locale';
	import type { OptionValues } from '$lib/types/OptionValues.types';
	let onClick = async (options: OptionValues) => {
		await copyToClipboard(
			`new Intl.DateTimeFormat("${$selectedLocale}", ${JSON.stringify(
				options
			)}).format(new Date("2022-09-22"))`
		);
	};
</script>

<h1>Welcome to Intl Explorer! 👋🏽</h1>

<div>
	<p>
		<strong>Intl Explorer</strong> is a tool for experimenting and trying out the
		<a href="ECMAScript Internationalization AP" target="_blank" rel="noopener noreferrer"
			>ECMAScript Internationalization API</a
		>. The API is available under the namespace <code>Intl</code> in JavaScript and provides language
		sensitive string comparison, number formatting, and date and time formatting.
	</p>
	<p>
		An example of a function under the <code>Intl</code>-namespace is
		<strong>Intl.DateTimeFormat </strong> which enables language-sensitive date and time formatting.
		You can find more example and play with DateTimeFormat under the page
		<strong><a href="/DateTimeFormat">DateTimeFormat</a></strong>. Below is an example on how this
		tool works. You will see a higlighted code snippet where the first row is which options you can
		send to the function. And the second row displayed as a comment is the output these options will
		produce. If you want to see the whole code that produces the output you can press the
		"Copy"-button and the code will be copied to your clipboard.
	</p>

	<Highlight
		{onClick}
		values={{ dateStyle: 'short' }}
		output={new Intl.DateTimeFormat($selectedLocale, { dateStyle: 'long' }).format(
			new Date('2022-09-22')
		)}
	/>

	<p>
		In the sidebar menu you can choose a different locale to display output in and this
		locale will be used on all pages for the code snippets.
	</p>

	<p>
		The source code for this page can be found at <a
			href="https://github.com/jesperorb/intl-explorer"
			target="_blank"
			rel="noopener noreferrer">GitHub</a
		>. The page is best viewed in desktop.
	</p>
</div>

<style>
	div {
		max-width: 700px;
	}
</style>
