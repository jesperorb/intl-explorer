<script lang="ts">
	import type { PlaygroundSchema } from '$lib/playground/playground.schema';

	import Select from '$lib/components/ui/Select.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import DateTime from '$lib/components/ui/DateTime.svelte';
  import ComboBoxContext from '$lib/components/ui/ComboBox/ComboBoxContext.svelte';
  import ComboBox from '$lib/components/ui/ComboBox/ComboBox.svelte';
	import Grid from '$lib/components/ui/Grid.svelte';

	import { formatMethods } from '$lib/format-methods';
	import { languageByLocaleAsComboBoxOptions } from '$lib/locale-data/locales';
	import Card from '$lib/components/ui/Card.svelte';

	export let schema: PlaygroundSchema<'NumberFormat'>;
	export let locale: string;
	export let onChangeSchema: (event: Event) => void;
	export let onInput: (event: Event) => void;
	export let onChangeDate: (datetime: string) => void;
</script>

<Card>
	<Grid>
		<Select
			name="method"
			label="Method"
			onChange={onChangeSchema}
			value={schema.method}
			items={formatMethods.map((method) => [method, method])}
			fullWidth
			removeEmpty
		/>
		{#if schema.inputValueType === 'number' || schema.inputValueType === 'array' || schema.inputValueType === 'string'}
			<Input
				id="inputValue"
				label="Input value"
				name="inputValue"
				value={schema.inputValues[0].toString()}
				{onInput}
				fullWidth
			/>
		{/if}
		{#if schema.inputValueType === 'date'}
			<DateTime defaultValue={schema.inputValues[0]} onChange={onChangeDate} />
		{/if}
		<ComboBoxContext>
			<ComboBox
				label="Locale"
				name="locale"
				bind:value={locale}
				options={languageByLocaleAsComboBoxOptions}
			/>
		</ComboBoxContext>
	</Grid>
</Card>