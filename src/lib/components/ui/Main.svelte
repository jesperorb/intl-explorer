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
			margin-top: var(--spacing-4);
		}
	}
	.wrapper {
		position: relative;
		padding: var(--spacing-4);
		background-color: var(--white);
		border: 1px solid var(--lightergray);
		overflow-x: auto;
	}
</style>
