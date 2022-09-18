<script lang="ts">
	export let onClick: () => void;
</script>

<button on:click={onClick} class="sidebar-toggle">
	<span/>
	<span/>
	<span/>
</button>

<style>
	.sidebar-toggle {
		position: fixed;
		bottom: 0;
		left: 0.5rem;
		width: 5rem;
		height: 3rem;
		padding: 0.5rem 1rem;
		z-index: 3;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		cursor: pointer;
		background-color: white;
		border-radius: 4px;
		border: 1px solid var(--light-purple);
		box-shadow: 4px 4px 8px 2px hsla(276, 100%, 10%, 0.2);
	}
	.sidebar-toggle span {
		height: 0.125rem;
		width: 100%;
		background-color: var(--black);
	}
	@media (min-width: 900px) {
		.sidebar-toggle {
			display: none;
		}
	}
</style>
