<script lang="ts">
	import Collator from '$lib/components/pages/Collator.svelte';
	import CompatData from '$lib/components/ui/CompatData.svelte';
	import Header from '$lib/components/ui/Header.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	export const prerender = false;
</script>

<Header header="Collator" />

<CompatData {data} />

<Collator />
