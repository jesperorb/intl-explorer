<script lang="ts">
	import Spacing from "$lib/components/ui/Spacing.svelte";
	import Button from "$lib/components/ui/Button.svelte";
	import { getMessages } from "$lib/i18n/util";

	export let show: boolean;
	export let header: string;

	let dialog: HTMLDialogElement;

	const m = getMessages();

	$: if (dialog && show) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (show = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<!-- svelte-ignore a11y-autofocus -->
		<h2 tabindex="-1" autofocus>{header}</h2>
		<Spacing />
		<slot />
		<Button onClick={() => dialog.close()}>{m.close()}</Button>
	</div>
</dialog>

<style>
	dialog {
		border-radius: 8px;
		border: none;
		background: var(--background-color);
		border: 1px solid var(--border-color);
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		padding: var(--spacing-4);
		background: var(--background-color);
		color: var(--text-color);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}

	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
</style>
