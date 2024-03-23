<script lang="ts">
	export let onClick: () => void;
</script>

<button on:click={onClick}><slot></slot></button>

<style>
	button {
    background-color: var(--card-color);
		border: 1px solid var(--border-color);
    border-radius: 4px;
		padding: var(--spacing-2) var(--spacing-3);
		cursor: pointer;
		color: var(--text-color);
    text-align: center;
    display: inline-flex;
    justify-content: center;
    align-items: center;
	}
  button:hover {
    background-color: var(--accent-background-color);
    border: 1px solid var(--text-color);
  }
</style>