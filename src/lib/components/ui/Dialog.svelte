<script lang="ts">
	import { run, self, createBubbler, stopPropagation } from 'svelte/legacy';

	const bubble = createBubbler();
	import Spacing from "$ui/Spacing.svelte";
	import Button from "$ui/Button.svelte";
	import { m } from "$paraglide/messages";

	type Props = {
		show: boolean;
		header: string;
		children?: import('svelte').Snippet;
	}

	let { show = $bindable(), header, children }: Props = $props();

	let dialog: HTMLDialogElement | undefined = $state();

	run(() => {
		if (dialog && show) dialog.showModal();
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog bind:this={dialog} onclose={() => (show = false)} onclick={self(() => dialog?.close())}>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div onclick={stopPropagation(bubble('click'))}>
		<!-- svelte-ignore a11y_autofocus -->
		<h2 tabindex="-1" autofocus>{header}</h2>
		<Spacing />
		{@render children?.()}
		<Button onClick={() => dialog?.close()}>{m.close()}</Button>
	</div>
</dialog>

<style>
	dialog {
		border-radius: 8px;
		border: none;
		background: var(--background-color);
		border: 1px solid var(--border-color);
		height: 100%;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		padding: var(--spacing-2);
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
