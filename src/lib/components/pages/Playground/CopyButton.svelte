<script lang="ts">
	export let copy: () => void;
</script>

<button on:click={copy}> Copy code </button>

<style>

button {
		margin: 1rem 0 0 auto;
		background-color: var(--white);
		border-radius: 4px;
		border: 1px solid var(--purple);
		padding: 0.75rem 1.25rem;
		cursor: pointer;
		box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.1);
	}
	button:hover {
		background-color: var(--light-purple);
	}
</style>
