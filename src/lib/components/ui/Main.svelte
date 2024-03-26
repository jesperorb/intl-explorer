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
			border-radius: 6px 0 0 6px;
		}
	}
	.wrapper {
		background-color: var(--background-color);
		border: 1px solid var(--border-color);
		border-right: 0;
		padding: var(--spacing-4);
	}
</style>
