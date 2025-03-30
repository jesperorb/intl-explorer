<script lang="ts">
	type Props = {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div>
	{@render children?.()}
</div>

<style>
	div {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--spacing-2);
	}
	@media screen and (min-width: 900px) {
		div {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: var(--spacing-2);
		}
	}
</style>
