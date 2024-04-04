<script lang="ts">
	export let center: boolean | undefined = undefined;
</script>

<main id="main" class:center tabindex="-1">
	<div class="wrapper">
		<slot />
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
