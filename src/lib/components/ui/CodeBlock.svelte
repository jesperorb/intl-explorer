<script>
	import Spacing from "$lib/components/ui/Spacing.svelte";

</script>
<code><pre><slot /></pre></code>
<Spacing size={2} />

<style>
	code {
		tab-size: 2;
		display: block;
		padding: var(--spacing-4);
		background-color: #1b2b34;
		font-size: 0.85rem;
		border-radius: 0.5rem;
		overflow-x: auto;
		color: var(--code-text-color);
		font-family: var(--font-family);
	}
</style>
