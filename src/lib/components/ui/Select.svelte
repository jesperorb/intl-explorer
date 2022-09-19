<script lang="ts">
	type Type = $$Generic;
	interface $$Slots {
		default: {
			item: Type;
			index: number;
		};
	}
	export let label: string;
	export let name: string;
	export let placeholder: string | undefined = undefined;
	export let items: Type[][];
	export let value: string | number;
</script>

<label for={`${name}-select`}>{label}</label>
<select {name} bind:value id={`${name}-select`}>
	<option value="">{placeholder ?? "undefined"}</option>
	{#each items as [key, value]}
		{#if value !== undefined}
			<option value={key}>{value}</option>
		{/if}
	{/each}
</select>

<style>
	label {
		margin-bottom: 0.5rem;
	}
	select {
		border: 1px solid grey;
		border-radius: 4px;
		background-color: white;
		padding: 0.5rem;
	}
</style>
