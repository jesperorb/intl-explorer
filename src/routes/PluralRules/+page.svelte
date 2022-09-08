<script lang="ts">
	import PluralRules from '$lib/components/pages/PluralRules.svelte';
	import CompatData from '$lib/components/ui/CompatData.svelte';
	import Header from '$lib/components/ui/Header.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<Header header="PluralRules" />

<CompatData {data} />

<PluralRules />
