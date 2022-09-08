<script lang="ts">
  import RelativeTimeFormat from "$lib/components/pages/RelativeTimeFormat.svelte";
  import CompatData from "$lib/components/ui/CompatData.svelte";
  import Header from '$lib/components/ui/Header.svelte';
  import type { PageData } from './$types';
	export let data: PageData;
</script>

<Header header="RelativeTimeFormat" />

<CompatData {data} />

<RelativeTimeFormat />