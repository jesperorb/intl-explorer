<script lang="ts">
	export let size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 = 4;
</script>

<div class="spacing-{size}"></div>

<style>
	.spacing-1 {
		padding-bottom: var(--spacing-1);
	}
	.spacing-2 {
		padding-bottom: var(--spacing-2);
	}
	.spacing-3 {
		padding-bottom: var(--spacing-3);
	}
	.spacing-4 {
		padding-bottom: var(--spacing-4);
	}
	.spacing-5 {
		padding-bottom: var(--spacing-5);
	}
	.spacing-6 {
		padding-bottom: var(--spacing-6);
	}
	.spacing-7 {
		padding-bottom: var(--spacing-7);
	}
	.spacing-8 {
		padding-bottom: var(--spacing-8);
	}
	.spacing-9 {
		padding-bottom: var(--spacing-9);
	}
	.spacing-10 {
		padding-bottom: var(--spacing-10);
	}
	.spacing-11 {
		padding-bottom: var(--spacing-11);
	}
	.spacing-12 {
		padding-bottom: var(--spacing-12);
	}
</style>
