<script lang="ts">
	import type { ChangeEventHandler } from "svelte/elements";

	export let id: string;
	export let name: string;
	export let checked: boolean = false;
	export let label: string;
	export let srOnlyLabel: boolean | undefined = undefined;
	export let onChange: ChangeEventHandler<HTMLInputElement>;
</script>

<div class="wrapper">
	<input class="checkbox" type="checkbox" {name} {id} {checked} on:change={onChange} />
	<label for={id} class:sr-only={srOnlyLabel}>{label}</label>
</div>

<style>
	.wrapper {
		display: inline;
	}
	input[type="checkbox"] {
		width: var(--spacing-4);
		height: var(--spacing-4);
		color: var(--text-color);
		accent-color: var(--accent-2);
	}
</style>
