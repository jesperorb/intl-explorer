<script lang="ts">
	import type { BrowserSupportDataForMethod } from '$lib/types/BrowserSupport.types';

	import nightowl from 'svelte-highlight/styles/oceanicnext';

	import Playground from '$lib/components/pages/Playground/Playground.svelte';

	import { selectedLocale } from '$lib/store/selected-locale';

	export let data: Record<string, BrowserSupportDataForMethod>;
</script>

<svelte:head>
	<!-- eslint-disable -->
	{@html nightowl}
</svelte:head>

<Playground {data} bind:locale={$selectedLocale} />
