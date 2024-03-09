<script lang="ts">
	export let label: string | undefined = undefined;
	export let value: string | number;
	export let id: string;
	export let name: string | undefined = undefined;
	export let fullWidth: boolean | undefined = undefined;
	export let onInput: ((event: Event) => void) | undefined = undefined;
	export let pattern: string | undefined = undefined;
	export let max: number | undefined = undefined;
	export let min: number | undefined = undefined;
</script>

<div class:fullWidth>
	{#if label}
		<label for={id}>{label}</label>
	{/if}
	{#if onInput}
		<input {name} {max} {min} type="text" on:input={onInput} {value} {id} class:fullWidth {pattern} />
	{:else}
		<input {name} {max} {min} type="text" bind:value {id} class:fullWidth {pattern} />
	{/if}
</div>

<style>
	input {
		border: 1px solid var(--lightgray);
		border-radius: 4px;
		background-color: white;
		padding: 0.5rem;
	}
	.fullWidth {
		width: 100%;
	}
</style>
