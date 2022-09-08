<script lang="ts">
	import Segmenter from '$lib/components/pages/Segmenter.svelte';
	import CompatData from '$lib/components/ui/CompatData.svelte';
	import Header from '$lib/components/ui/Header.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<Header header="Segmenter" />

<CompatData {data} />

<Segmenter  />
