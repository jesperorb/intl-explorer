<script lang="ts">
	import type { FormatMethodsKeys } from '$lib/format-methods';
  import SkipLink from './SkipLink.svelte';
	export let header: FormatMethodsKeys;
</script>

<header>
	<h1>
		Intl.{header}
	</h1>
	<a
			href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/{String(
				header
			)}"
			target="_blank"
			rel="noopener noreferrer">MDN Link for Intl.{header}</a>
</header>

<style>
	header {
		margin-bottom: 1rem;
	}
	a {
		text-decoration: none;
		border-bottom: 2px solid var(--purple);
	}
</style>
