<script lang="ts">
	import type { FormatMethodsKeys } from '$lib/format-methods';
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
	@media (min-width: 900px) {
		h1 {
			margin: 0;
		}
	}
	header {
		margin-bottom: 16px;
	}
</style>
