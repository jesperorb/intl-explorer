<script lang="ts">
	import Sidebar from '$lib/components/sidebar.svelte';
	let open = false;
	const toggleOpen = () => (open = !open);
</script>

<button on:click={toggleOpen} class="sidebar-toggle">
	<span/>
	<span/>
	<span/>
</button>

<Sidebar bind:open={open} onClick={toggleOpen} />

<main>
	<slot />
</main>

<style>
	main {
		flex: 1;
		background-color: var(--white);
		padding: 0 1.5rem;
		padding-top: 1rem;
		margin-top: 1.5rem;
		box-shadow: -2px -2px 8px 2px hsla(276, 100%, 10%, 0.03);
		overflow-x: auto;
	}
	.sidebar-toggle {
		width: 54px;
		height: 40px;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		position: absolute;
		top: 12px;
		right: 12px;
		padding: 0.5rem 1rem;
		background: none;
		background-color: white;
		border-radius: 4px;
		border: none;
		z-index: 1;
		appearance: none;
		cursor: pointer;
		box-shadow: 2px 2px 8px 2px hsla(276, 100%, 10%, 0.1);
	}
	.sidebar-toggle span {
		height: 2px;
		width: 100%;
		background-color: var(--black);
	}
	@media (min-width: 900px) {
		main {
			border-radius: 6px;
			margin-top: 1.5rem;
			z-index: 2;
			max-width: 100%;
		}
		.sidebar-toggle {
			display: none;
		}
	}
</style>
