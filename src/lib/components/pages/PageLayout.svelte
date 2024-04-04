<script lang="ts">
	import Spacing from '$lib/components/ui/Spacing.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Grid from '$lib/components/ui/Grid.svelte';
	import LocalePicker from '$lib/components/ui/LocalePicker.svelte';

	import { getMessages } from '$lib/i18n/util';
	export let showLocalePicker: boolean = true;
	const m = getMessages();
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
		{#if $$slots.input}
			<slot name="input" />
		{/if}
	</Grid>
</Card>
<Spacing />
{#if $$slots.alternativeUse}
	<Card>
		<h2>{m.alternativeUseHeading()}</h2>
		<Spacing />
		<slot name="alternativeUse" />
		<Spacing />
		<slot name="alternativeCode" />
	</Card>
	<Spacing />
{/if}
<h2>{m.output()}</h2>
<Spacing size={2} />
<hr />
<Spacing />
<slot name="output" />
