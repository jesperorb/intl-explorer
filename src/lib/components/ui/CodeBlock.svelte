<script>
	import Spacing from "$ui/Spacing.svelte";

</script>
<code><pre><slot /></pre></code>
<Spacing size={2} />

<style>
	code {
		tab-size: 2;
		display: block;
		padding: var(--spacing-4);
		background-color: var(--code-block-background);
		font-size: 0.85rem;
		border-radius: 4px;
		overflow-x: auto;
		color: var(--code-text-color);
		font-family: var(--font-family);
		border: 1px solid var(--border-color);
	}
</style>
