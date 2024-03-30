<script lang="ts">
	import Spacing from '$lib/components/ui/Spacing.svelte';
	import ComboBox from '$lib/components/ui/ComboBox/ComboBox.svelte';
	import ComboBoxContext from '$lib/components/ui/ComboBox/ComboBoxContext.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Grid from '$lib/components/ui/Grid.svelte';
	import { languageByLocaleAsComboBoxOptions } from '$lib/locale-data/locales';
	import { selectedLocale } from '$lib/store/selected-locale';
	import { getMessages } from '$lib/i18n/util';
  const m = getMessages();
</script>

<Card>
	<h2>{m.input()}</h2>
	<Spacing size={2} />
	<hr />
	<Spacing />
	<Grid>
		<ComboBoxContext>
			<ComboBox
				label={m.locale()}
				name="locale"
				bind:value={$selectedLocale}
				options={languageByLocaleAsComboBoxOptions}
			/>
		</ComboBoxContext>
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
