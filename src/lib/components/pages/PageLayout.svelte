<script lang="ts">
	import Spacing from "$ui/Spacing.svelte";
	import Card from "$ui/Card.svelte";
	import Grid from "$ui/Grid.svelte";
	import LocalePicker from "$ui/LocalePicker.svelte";

	import { m } from "$paraglide/messages";
	type Props = {
		showLocalePicker?: boolean;
		input?: import("svelte").Snippet;
		alternativeUse?: import("svelte").Snippet;
		alternativeCode?: import("svelte").Snippet;
		output?: import("svelte").Snippet;
	};

	let { showLocalePicker = true, input, alternativeUse, alternativeCode, output }: Props = $props();
</script>

<Card>
	<h2>{m.input()}</h2>
	<Spacing size={2} />
	<hr />
	<Spacing />
	<Grid>
		{#if showLocalePicker}
			<LocalePicker />
		{/if}
		{#if input}
			{@render input?.()}
		{/if}
	</Grid>
</Card>
<Spacing />
{#if alternativeUse}
	<Card>
		<h2>{m.alternativeUseHeading()}</h2>
		<Spacing />
		{@render alternativeUse?.()}
		<Spacing />
		{@render alternativeCode?.()}
	</Card>
	<Spacing />
{/if}
<h2>{m.output()}</h2>
<Spacing size={2} />
<hr />
<Spacing />
{@render output?.()}
