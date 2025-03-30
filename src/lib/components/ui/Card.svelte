<script lang="ts">
	type Props = {
		children?: import("svelte").Snippet;
	};

	let { children }: Props = $props();
</script>

<div class="card">
	{@render children?.()}
</div>

<style>
	.card {
		padding: var(--spacing-4);
		border-radius: 4px;
		background-color: var(--background-secondary-color);
		border: 1px solid var(--border-color);
	}
</style>
