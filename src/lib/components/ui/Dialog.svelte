<script lang="ts">
	export let show = false;
	export let showCloseButton: boolean = true;

	let dialog: HTMLDialogElement;

	$: if (dialog && show) dialog.show();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} on:close={() => (show = false)} on:click|self={() => dialog.close()}>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		{#if showCloseButton}
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<!-- svelte-ignore a11y-autofocus -->
			<button aria-label="Close dialog" autofocus on:click={() => dialog.close()}>X</button>
		{/if}
		<slot name="header" />
		<slot />
	</div>
</dialog>

<style>
	dialog {
		margin: var(--spacing-10) auto 0 auto;
		border-radius: 4px;
		border: 1px solid var(--border-color);
		background-color: var(--card-color);
		color: var(--text-color);
		padding: 0;
		z-index: 999999;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: var(--spacing-2);
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	button {
		background: none;
		background-color: var(--background-color);
		border: 1px solid var(--border-color);
		padding: 0.5rem 1rem;
		color: var(--text-color);
		font-weight: 700;
		border-radius: 4px;
		cursor: pointer;
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
