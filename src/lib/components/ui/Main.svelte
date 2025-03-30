<script lang="ts">

	type Props = {
		center?: boolean | undefined;
		children?: import('svelte').Snippet;
	}

	let { center = undefined, children }: Props = $props();
</script>

<main id="main" class:center tabindex="-1">
	<div class="wrapper">
		{@render children?.()}
	</div>
</main>

<style>
	.center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.wrapper {
		border-radius: 4px;
		background-color: var(--background-color);
		border: 1px solid var(--border-color);
		padding: var(--spacing-4);
	}
</style>
