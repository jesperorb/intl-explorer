<script lang="ts">
	import NumberFormat from '$lib/components/pages/NumberFormat.Unit.svelte';
	import CompatData from '$lib/components/ui/CompatData.svelte';
	import Header from '$lib/components/ui/Header.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<Header header="NumberFormat" />

<CompatData {data} />

<NumberFormat />
