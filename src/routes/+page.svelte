<script lang="ts">
	import { navigating } from "$app/state";

	import ProgressBar from "$ui/ProgressBar.svelte";
	import Spacing from "$ui/Spacing.svelte";

	import { m } from "$paraglide/messages";
</script>

<svelte:head>
	<title>Intl Explorer</title>
</svelte:head>

{#if navigating}
	<ProgressBar />
{/if}

<header>
	<h1>{m.blurbWelcome()} 👋🏽</h1>
</header>
<Spacing />
<div>
	<p>
		<strong>Intl Explorer</strong>
		{m.blurbPart1()}
		<a
			href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl"
			target="_blank"
			rel="noopener noreferrer">ECMAScript Internationalization API</a
		>. {m.blurbPart2()} <strong><code>Intl</code></strong>
		{m.blurbPart3()}
	</p>
	<Spacing />
	<p>
		{m.blurbPart4()} <a href="/Playground">The Playground</a>
		{m.blurbPart5()}
	</p>
	<Spacing />
	<p>
		{m.blurbPart6()}
		<a href="https://github.com/jesperorb/intl-explorer" target="_blank" rel="noopener noreferrer"
			>GitHub</a
		>. {m.blurbPart7()}
		<a href="https://jesperorb.com/" target="_blank" rel="noopener noreferrer">Jesper Orb</a>.
	</p>
</div>

<style>
	div {
		max-width: 700px;
	}
</style>
