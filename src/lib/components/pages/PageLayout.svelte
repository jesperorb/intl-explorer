<script lang="ts">
	import Spacing from "$lib/components/ui/Spacing.svelte";
	import ComboBox from "$lib/components/ui/ComboBox/ComboBox.svelte";
	import ComboBoxContext from "$lib/components/ui/ComboBox/ComboBoxContext.svelte";
	import { languageByLocaleAsComboBoxOptions } from "$lib/locale-data/locales";
  import { selectedLocale } from '$lib/store/selected-locale';
</script>

<h2>Input</h2>
<Spacing />
<ComboBoxContext>
	<ComboBox
		label="Locale"
		name="locale"
		bind:value={$selectedLocale}
		options={languageByLocaleAsComboBoxOptions}
	/>
</ComboBoxContext>
{#if $$slots.input}
	<Spacing />
	<slot name="input" />
	<Spacing />
{:else}
	<Spacing />
{/if} 
{#if $$slots.alternativeUse}
  <h2>Alternative use</h2>
  <slot name="alternativeUse" />
  <Spacing size={2} />
  <slot name="alternativeCode" />
  <Spacing size={2} />
{/if}
<h2>Output</h2>
<Spacing />
<slot name="output" />