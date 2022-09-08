<script lang="ts">
	import ListFormat from '$lib/components/pages/ListFormat.svelte';
  import CompatData from '$lib/components/ui/CompatData.svelte';
	import Header from '$lib/components/ui/Header.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<Header header="ListFormat" />

<CompatData {data} />

<ListFormat />
