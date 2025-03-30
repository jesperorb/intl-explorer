<script lang="ts">
	import type { ChangeEventHandler } from "svelte/elements";

	type Props = {
		id: string;
		name: string;
		checked?: boolean;
		label: string;
		srOnlyLabel?: boolean | undefined;
		onChange: ChangeEventHandler<HTMLInputElement>;
	}

	let {
		id,
		name,
		checked = false,
		label,
		srOnlyLabel = undefined,
		onChange
	}: Props = $props();
</script>

<div class="wrapper">
	<input class="checkbox" type="checkbox" {name} {id} {checked} onchange={onChange} />
	<label for={id} class:sr-only={srOnlyLabel}>{label}</label>
</div>

<style>
	.wrapper {
		display: inline-flex;
	}
	.wrapper,
	input {
		cursor: pointer;
	}
	input[type="checkbox"] {
		width: var(--spacing-4);
		height: var(--spacing-4);
		color: var(--text-color);
		accent-color: var(--accent-2);
	}
</style>
