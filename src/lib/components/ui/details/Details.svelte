<script lang="ts">
	import ChevronUp from "$ui/icons/ChevronUp.svelte";

	export let open: boolean | undefined = undefined;
	export let id: string | undefined = undefined;
	export let fullWidth: boolean | undefined = true;
</script>

<details {open} {id} class:fullWidth>
	<summary>
		<span class="summary-title">
			<slot name="summary" />
		</span>
		<div class="summary-icon" aria-hidden="true"><ChevronUp /></div>
	</summary>
	<div>
		<slot />
	</div>
</details>

<style>
	details {
		position: relative;
		border: 1px solid var(--border-color);
		padding: var(--spacing-2);
		border-radius: 4px;
		display: inline-block;
		background-color: var(--background-color);
	}

	.fullWidth {
		display: block;
		width: 100%;
	}

	details[open] > summary {
		padding-bottom: var(--spacing-4);
		margin-bottom: var(--spacing-4);
		border-bottom: 1px solid var(--border-color);
	}

	details[open] .summary-icon {
		transform: rotate(180deg);
	}

	.summary-title {
		user-select: none;
		width: 100%;
		margin-right: var(--spacing-2);
	}
	.summary-icon {
		pointer-events: none;
		opacity: 0.5;
		transition: all 300ms;
		width: 24px;
		height: 24px;
	}
	summary {
		list-style: none;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	summary::-webkit-details-marker {
		display: none;
	}
	summary:hover {
		cursor: pointer;
	}
	summary:hover > .summary-icon {
		opacity: 1;
	}
</style>
