<script lang="ts">
	import ChevronUp from "./icons/ChevronUp.svelte";

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
</script>

<div>
	{#if label}
		<label for={`${name}Select`}>{label}</label>
	{/if}
	<div class="wrapper">
	<select {name} bind:value id={`${name}Select`} on:change={onChange} class:fullWidth>
		{#if !removeEmpty}
			<option value="">{placeholder ?? 'undefined'}</option>
		{/if}
		{#each items as [key, value]}
			{#if value !== undefined}
				<option value={key}>{value}</option>
			{/if}
		{/each}
	</select>
	<div class="icon"><ChevronUp /></div>
	</div>
</div>

<style>
	.wrapper {
		position: relative;
	}
	select {
		border: 1px solid var(--lightgray);
		border-radius: 4px;
		background-color: white;
		padding: 0.5rem;
		-webkit-appearance: none;
		appearance: none;
	}
	.icon {
		font-size: 0.85rem;
		color: var(--gray);
		top: 5px;
		right: 0.5rem;
		position: absolute;
	}
	.fullWidth {
		width: 100%;
	}
</style>
