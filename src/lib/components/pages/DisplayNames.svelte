<script lang="ts">
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import Grid from '$lib/components/ui/Grid.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import { languageByLocaleAsComboBoxOptions } from '$lib/locale-data/locales';
	import DisplayNamesHighlight from '../ui/DisplayNamesHighlight.svelte';
	import Spacer from '../ui/Spacer.svelte';
  import ComboBoxContext from '../ui/ComboBox/ComboBoxContext.svelte';
  import ComboBox from '../ui/ComboBox/ComboBox.svelte';
  import { selectedLocale } from '$lib/store/selected-locale';

	export let locale: string;

	let code = 'US';
	let language = 'en-US';
	let script = 'Latn';
	let currency = 'USD';
	let calendar = 'gregory';
	let dateTimeField = 'month';
</script>

<h2>Input values</h2>

<ComboBoxContext>
	<ComboBox
		label="Locale"
		name="locale"
		bind:value={$selectedLocale}
		options={languageByLocaleAsComboBoxOptions}
	/>
</ComboBoxContext>

<h2>Output</h2>

<Grid>
	<OptionSection header={'region'}>
		<Spacer />
		<Input id="region" label="region" bind:value={code} />
		<DisplayNamesHighlight
			bind:locale
			bind:value={code}
			options={{
				style: 'long',
				type: 'region'
			}}
		/>
		<DisplayNamesHighlight
			bind:locale
			bind:value={code}
			options={{
				style: 'short',
				type: 'region'
			}}
		/>
		<DisplayNamesHighlight
			bind:locale
			bind:value={code}
			options={{
				style: 'narrow',
				type: 'region'
			}}
		/>
	</OptionSection>
	<OptionSection header={'language'}>
		<Spacer />
		<Input id="language" label="language" bind:value={language} />
		<DisplayNamesHighlight
			bind:locale
			bind:value={language}
			options={{
				languageDisplay: 'dialect',
				type: 'language'
			}}
		/>
		<DisplayNamesHighlight
			bind:locale
			bind:value={language}
			options={{
				languageDisplay: 'standard',
				type: 'language'
			}}
		/>
	</OptionSection>
	<OptionSection header={'currency'}>
		<Spacer />
		<Input id="currency" label="currency" bind:value={currency} />
		<DisplayNamesHighlight
			bind:locale
			bind:value={currency}
			options={{
				type: 'currency'
			}}
		/>
	</OptionSection>
	<OptionSection header={'script'}>
		<Spacer />
		<Input id="script" label="script" bind:value={script} />
		<DisplayNamesHighlight
			bind:locale
			bind:value={script}
			options={{
				type: 'script'
			}}
		/>
	</OptionSection>
	<OptionSection header={'calendar'}>
		<Spacer />
		<Input id="calendar" label="calendar" bind:value={calendar} />
		<DisplayNamesHighlight
			bind:locale
			bind:value={calendar}
			options={{
				type: 'calendar'
			}}
		/>
	</OptionSection>
	<OptionSection header={'dateTimeField'}>
		<Spacer />
		<Input id="dateTimeField" label="dateTimeField" bind:value={dateTimeField} />
		<DisplayNamesHighlight
			bind:locale
			bind:value={dateTimeField}
			options={{
				style: 'short',
				type: 'dateTimeField'
			}}
		/>
		<DisplayNamesHighlight
			bind:locale
			bind:value={dateTimeField}
			options={{
				style: 'long',
				type: 'dateTimeField'
			}}
		/>
		<DisplayNamesHighlight
			bind:locale
			bind:value={dateTimeField}
			options={{
				style: 'narrow',
				type: 'dateTimeField'
			}}
		/>
	</OptionSection>
</Grid>
