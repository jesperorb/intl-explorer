<script lang="ts">
	import Spacing from '$lib/components/ui/Spacing.svelte';

	// eslint-disable-next-line no-undef
	type Type = $$Generic;
	interface $$Slots {
		default: {
			item: Type;
			index: number;
		};
	}
	export let label: string | undefined = undefined;
	export let name: string;
	export let placeholder: string | undefined = undefined;
	export let items: Type[][];
	export let value: string | number;
	export let fullWidth: boolean | undefined = undefined;
	export let removeEmpty: boolean | undefined = undefined;
	export let onChange: ((event: Event) => void) | undefined = undefined;
	const getValue = (value: Type) => (value as string | number).toString();
</script>

<div>
	{#if label}
		<label for={name}>{label}</label>
	{/if}
	<Spacing size={1} /> 
	<select {name} bind:value id={name} on:change={onChange} class:fullWidth>
		{#if !removeEmpty}
			<option value="">{placeholder ?? 'undefined'}</option>
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
