<script lang="ts">
	import type { BrowserSupportDataForMethod } from "$types/BrowserSupport.types";

	import oceanicNext from "svelte-highlight/styles/oceanicnext";
	import github from "svelte-highlight/styles/github";

	import Playground from "$pages/Playground/Playground.svelte";

	import { settings } from "$store/settings";
	import { loadJson } from "$utils/load-json";

	let browserSupport = $settings.showBrowserSupport
		? loadJson<{ [key: string]: BrowserSupportDataForMethod }>("Playground")
		: Promise.resolve(undefined);
</script>

<svelte:head>
	{#if $settings.codeTheme === "light"}
		{@html github}
	{:else}
		{@html oceanicNext}
	{/if}
</svelte:head>

{#await browserSupport}
	<Playground isLoading />
{:then data}
	<Playground {data} />
{/await}
