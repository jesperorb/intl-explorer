<main id="main" tabindex="-1">
	<div class="wrapper">
		<slot />
	</div>
</main>

<style>
	main {
		flex: 1;
	}
	@media (min-width: 900px) {
		main {
			z-index: 2;
			max-width: 100%;
		}
		.wrapper {
			margin-top: 1rem;
			margin-bottom: 1rem;
			border-radius: 6px 0 0 6px;
		}
	}
	.wrapper {
		position: relative;
		background-color: var(--white);
		border: 1px solid hsl(0, 0%, 90%);
		padding: 1rem;
		overflow-x: auto;
	}
</style>
