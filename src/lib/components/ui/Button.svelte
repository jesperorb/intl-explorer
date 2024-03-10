<script lang="ts">
	export let onClick: () => void;
</script>

<button on:click={onClick}><slot></slot></button>

<style>
	button {
		background-color: var(--white);
		border: 1px solid var(--gray);
    border-radius: 4px;
		padding: var(--spacing-1) var(--spacing-2);
		cursor: pointer;
		color: var(--black);
    text-align: center;
    display: inline-flex;
    justify-content: center;
    align-items: center;
	}
  button:hover {
    background-color: var(--lightergray);
    border: 1px solid var(--black);
  }
</style>