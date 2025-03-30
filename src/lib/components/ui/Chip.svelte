<script lang="ts">
	import Times from "$ui/icons/Times.svelte";

	import { m } from "$paraglide/messages";

	type Props = {
		label: string;
		onDelete?: (() => void) | undefined;
	}

	let { label, onDelete = undefined }: Props = $props();
</script>

<div class="chip">
	<p>{label}</p>
	{#if onDelete}
		<button
			type="button"
			class="delete"
			onclick={onDelete}
			aria-label={m.remove({ value: label })}
		>
			<Times />
		</button>
	{/if}
</div>

<style>
	.chip {
		border-radius: 20px;
		padding: var(--spacing-1) var(--spacing-2);
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-1);
		background-color: var(--background-color);
		border: 1px solid var(--border-color);
	}
	.delete {
		border: none;
		background: none;
		padding: 0;
		margin: 0;
		height: 24px;
		width: 24px;
		cursor: pointer;
		border-radius: 50%;
		color: var(--text-color);
	}
	.delete:hover {
		filter: brightness(80%);
	}
</style>
