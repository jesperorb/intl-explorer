<script lang="ts">
	import type { BrowserSupportDataForMethod } from "$types/BrowserSupport.types";

	import oceanicNext from "svelte-highlight/styles/oceanicnext";
	import github from "svelte-highlight/styles/github";

	import Playground from "$pages/Playground/Playground.svelte";

	import { settings } from "$store/settings";

	export let data: Record<string, BrowserSupportDataForMethod>;
</script>

<svelte:head>
	{#if $settings.codeTheme === "light"}
		{@html github}
	{:else}
		{@html oceanicNext}
	{/if}
</svelte:head>

<Playground {data} />
