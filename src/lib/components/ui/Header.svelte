<script lang="ts">
	import type { FormatMethodsKeys } from '$lib/format-methods';
  import MdnLink from './MDNLink.svelte';
	export let header: FormatMethodsKeys;
</script>

<header>
	<h1>
		Intl.{header}
	</h1>
	<MdnLink header={header} />
</header>

<style>
	header {
		margin-bottom: 1rem;
	}
</style>
