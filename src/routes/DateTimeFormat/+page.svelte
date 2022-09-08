<script lang="ts">
	import DateTimeFormat from '$lib/components/pages/DateTimeFormat.svelte';
	import CompatData from '$lib/components/ui/CompatData.svelte';
	import Header from '$lib/components/ui/Header.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<Header header="DateTimeFormat" />

<CompatData {data} />

<DateTimeFormat />
