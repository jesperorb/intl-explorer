<script lang="ts">
	import CopyToClipboard from './icons/CopyToClipboard.svelte';
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
		padding: 1rem 1.5rem;
		cursor: pointer;
		color: var(--white);
		position: absolute;
		z-index: 1;
		top: 0;
		right: 0;
	}
	.copy:hover {
		background-color: var(--purple);
	}
</style>
