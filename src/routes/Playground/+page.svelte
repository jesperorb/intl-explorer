<script lang="ts">
	import type { BrowserCompatData } from '$lib/types/BrowserSupport.types';

	import nightowl from 'svelte-highlight/styles/oceanicnext';

	import Playground from '$lib/components/pages/Playground/Playground.svelte';

	import { selectedLocale } from '$lib/store/selected-locale';

	export const prerender = false;
	export const ssr = false;

	export let data: Record<string, BrowserCompatData>;
</script>

<svelte:head>
	{@html nightowl}
</svelte:head>

<Playground {data} bind:locale={$selectedLocale} />
