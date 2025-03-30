<script lang="ts">
	import Spacing from "$ui/Spacing.svelte";
	type Props = {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

</script>
<code><pre>{@render children?.()}</pre></code>
<Spacing size={2} />

<style>
	code {
		tab-size: 2;
		display: block;
		padding: var(--spacing-4);
		background-color: var(--code-background-color);
		font-size: 0.85rem;
		border-radius: 4px;
		overflow-x: auto;
		color: var(--code-text-color);
		font-family: var(--font-family);
		border: 1px solid var(--border-color);
	}
</style>
