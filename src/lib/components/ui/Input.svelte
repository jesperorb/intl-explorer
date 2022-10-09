<script lang="ts">
  export let label: string | undefined = undefined;
  export let value: string | number;
  export let id: string;
	export let name: string | undefined = undefined;
	export let fullWidth: boolean | undefined = undefined;
	export let onInput: ((event: any) => void) | undefined = undefined;
</script>

<div class:fullWidth={fullWidth}>
	{#if label}
		<label for={id}>{label}</label>
	{/if}
	<input {name} on:input={onInput} type="text" bind:value {id} class:fullWidth={fullWidth} />
</div>

<style>
  input {
    border: 1px solid var(--gray);
    border-radius: 4px;
    background-color: white;
    padding: 0.5rem;
  }
	.fullWidth {
		width: calc(100% - 0.5rem);
	}
</style>
