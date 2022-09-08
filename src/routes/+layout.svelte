<script lang="ts">
	import Sidebar from '$lib/components/sidebar.svelte';
</script>

<Sidebar />

<main>
	<slot />
</main>

<style>
	main {
		flex: 1;
		background-color: var(--white);
		border-radius: 6px;
		padding: 0 1.5rem;
		margin-top: 1rem;
		z-index: 1;
		box-shadow: -2px -2px 8px 2px hsla(276, 100%, 10%, 0.03);
	}
</style>