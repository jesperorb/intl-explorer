<script lang="ts">
	export let id: string;
	export let name: string;
	export let checked: boolean = false;
	export let label: string;
	export let onChange: (event: Event) => void;
</script>

<div class="wrapper">
	<input
		class="checkbox"
		type="checkbox"
		{name}
		{id}
		{checked}
		on:change={onChange}
	/>
	<label for={id} class="sr-only">{label}</label>
</div>

<style>
	.wrapper {
		display: inline;
	}
	input[type='checkbox'] {
		width: var(--spacing-4);
		height: var(--spacing-4);
    color: var(--white);
		accent-color: var(--purple);
	}
</style>
