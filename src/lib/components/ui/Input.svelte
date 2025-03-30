<script lang="ts">
	import Spacing from "$ui/Spacing.svelte";

	type Props = {
		label?: string | undefined;
		value: string | number;
		id: string;
		name?: string | undefined;
		fullWidth?: boolean | undefined;
		onInput?: ((event: Event) => void) | undefined;
		pattern?: string | undefined;
		max?: number | undefined;
		min?: number | undefined;
	}

	let {
		label = undefined,
		value = $bindable(),
		id,
		name = undefined,
		fullWidth = undefined,
		onInput = undefined,
		pattern = undefined,
		max = undefined,
		min = undefined
	}: Props = $props();
</script>

<div class:fullWidth>
	{#if label}
		<label for={id}>{label}</label>
	{/if}
	<Spacing size={2} />
	{#if onInput}
		<input
			{name}
			{max}
			{min}
			type="text"
			oninput={onInput}
			{value}
			{id}
			class:fullWidth
			{pattern}
		/>
	{:else}
		<input {name} {max} {min} type="text" bind:value {id} class:fullWidth {pattern} />
	{/if}
</div>

<style>
	.fullWidth {
		width: 100%;
	}
</style>
