<script lang="ts">
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
	export let onChange: ((event: any) => void) | undefined = undefined;
</script>

<div>
	{#if label}
		<label for={`${name}Select`}>{label}</label>
	{/if}
	<select {name} bind:value id={`${name}Select`} on:change={onChange} class:fullWidth={fullWidth}>
		{#if !removeEmpty}
			<option value="">{placeholder ?? "undefined"}</option>
		{/if}
		{#each items as [key, value]}
			{#if value !== undefined}
				<option value={key}>{value}</option>
			{/if}
		{/each}
	</select>
</div>

<style>
	select {
		border: 1px solid grey;
		border-radius: 4px;
		background-color: white;
		padding: 0.5rem;
	}
	.fullWidth {
		width: 100%;
	}
</style>
