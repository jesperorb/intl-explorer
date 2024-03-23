<script lang="ts">
	import CopyToClipboard from '$lib/components/ui/icons/CopyToClipboard.svelte';
	export let label: string;
	export let onClick: () => void;
</script>

<button class="copy" aria-label={label} on:click={onClick}><CopyToClipboard /></button>

<style>
	.copy {
		background-color: transparent;
		border: none;
		border-top-right-radius: 0.5rem;
		border-bottom-left-radius: 0.5rem;
		padding: var(--spacing-4);
		cursor: pointer;
		color: var(--backround-color);
		position: absolute;
		z-index: 1;
		top: 0;
		right: 0;
	}
	.copy:hover {
		background-color: var(--purple);
	}
</style>
