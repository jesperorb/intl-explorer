<script lang="ts">
	import type { FormatMethodsKeys } from '$lib/format-methods';
	export let header: FormatMethodsKeys;
</script>

<header>
	<a class="skip-link" href="#main">Skip to content</a>
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
	.skip-link {
		position: fixed;
		top: 0;
		left: 0;
		height: 22px;
		transform: translateY(-24px);
		transition: transform 0.3s;
	}
	.skip-link:focus {
		transform: translateY(0);
	}
	a {
		text-decoration: none;
		border-bottom: 2px solid var(--purple);
	}
</style>
