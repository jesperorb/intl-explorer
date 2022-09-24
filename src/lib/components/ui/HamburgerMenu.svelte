<script lang="ts">
	export let open: boolean;
	export let onClick: () => void;
</script>

<button
	aria-expanded={open}
	aria-haspopup="true"
	class:open
	aria-label={open ? 'Close menu' : 'Open Menu'}
	on:click={onClick}
	data-testid="menu-button"
	class="sidebar-toggle"
>
	<span />
	<span />
	<span />
</button>

<style>
	.sidebar-toggle {
		position: fixed;
		top: 0.5rem;
		left: -5rem;
		width: 4rem;
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
		box-shadow: 4px 4px 8px 2px hsla(276, 100%, 20%, 0.1);
	}
	.sidebar-toggle span {
		height: 0.125rem;
		width: 100%;
		background-color: var(--black);
	}
	@media screen and (min-width: 900px) {
		.sidebar-toggle {
			display: none;
		}
	}
</style>
