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
	class="sidebar-toggle"
>
	<span />
	<span />
	<span />
</button>

<style>
	.sidebar-toggle {
		position: fixed;
		bottom: 0;
		left: 1rem;
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
		will-change: transform;
		transform: translateX(20rem);
		transition: transform 300ms;
		border: 1px solid var(--light-purple);
		box-shadow: 4px 4px 8px 2px hsla(276, 100%, 20%, 0.1);
	}
	.open {
		transform: translateX(0);
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
