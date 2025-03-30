<script lang="ts">
	import Spacing from "$ui/Spacing.svelte";

	// eslint-disable-next-line no-undef
	type Type = $$Generic;
	interface $$Slots {
		default: {
			item: Type;
			index: number;
		};
	}
	type Props = {
		label?: string | undefined;
		name: string;
		placeholder?: string | undefined;
		items: Type[][];
		value: string | number;
		fullWidth?: boolean | undefined;
		removeEmpty?: boolean | undefined;
		onChange?: ((event: Event) => void) | undefined;
	};

	let {
		label = undefined,
		name,
		placeholder = undefined,
		items,
		value = $bindable(),
		fullWidth = undefined,
		removeEmpty = undefined,
		onChange = undefined
	}: Props = $props();
	const getValue = (value: Type) => (value as string | number).toString();
</script>

<div>
	{#if label}
		<label for={name}>{label}</label>
	{/if}
	<Spacing size={2} />
	<select {name} bind:value id={name} onchange={onChange} class:fullWidth>
		{#if !removeEmpty}
			<option value="">{placeholder ?? "undefined"}</option>
		{/if}
		{#each items as [key, value]}
			{#if value !== undefined}
				<option value={getValue(key)}>{value}</option>
			{/if}
		{/each}
	</select>
</div>

<style>
	.fullWidth {
		width: 100%;
	}
</style>
