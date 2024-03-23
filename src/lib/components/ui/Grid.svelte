<div>
	<slot />
</div>

<style>
	div {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--spacing-2);
	}
	@media screen and (min-width: 900px) {
		div {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: var(--spacing-2);
		}
	}
</style>
