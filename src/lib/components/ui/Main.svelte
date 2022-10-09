<main id="main" tabindex="-1">
	<slot />
</main>

<style>
	main {
		flex: 1;
		background-color: var(--white);
		padding: 1rem;
		padding-top: 1.5rem;
		margin-top: 1rem;
		box-shadow: -2px -2px 8px 2px hsla(276, 100%, 10%, 0.03);
		overflow-x: auto;
	}
	@media (min-width: 900px) {
		main {
			border-radius: 6px;
			z-index: 2;
			max-width: 100%;
		}
	}
</style>
