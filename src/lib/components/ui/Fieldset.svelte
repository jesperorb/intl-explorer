<script lang="ts">
	type Props = {
		legend: string;
		role?: string | undefined;
		name?: string | undefined;
		capitalize?: boolean;
		children?: import('svelte').Snippet;
	}

	let {
		legend,
		role = undefined,
		name = undefined,
		capitalize = false,
		children
	}: Props = $props();
</script>

<fieldset {role} {name}>
	<legend class:capitalize>{legend}</legend>
	{@render children?.()}
</fieldset>

<style>
	fieldset {
		display: inline-flex;
		align-items: center;
		margin: 0;
		padding: 0;
		gap: var(--spacing-4);
		border: none;
	}
	legend {
		margin-bottom: var(--spacing-2);
	}
	.capitalize {
		text-transform: capitalize;
	}
</style>
