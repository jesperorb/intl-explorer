<script lang="ts">
	import Highlight from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';
	import nightowl from 'svelte-highlight/styles/oceanicnext';

	import Select from '$lib/components/ui/Select.svelte';
	import Input from '$lib/components/ui/Input.svelte';

	import {
		getItemsFromOption,
		schemaToCode,
		schemaToPrimaryFormatterOutput,
		schemaToResolvedOptions,
		schemaToSecondaryFormattersOutput
	} from '$lib/playground/format.utils';
	import { getLocaleForSSR } from '$lib/utils/get-locale';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { selectedLocale } from '$lib/store/selected-locale';
	import { parseSchemaFromURL, setSchemaInURL } from '$lib/playground/url.utils';
	import { formatMethods, type FormatMethodsKeys } from '$lib/format-methods';
	import { listFormatSchema } from '$lib/playground/schemas/listFormat.schema';
	import { schemas } from '$lib/playground/schemas';
	import type { PlaygroundSchema } from '$lib/playground/playground.schema';
	import { validateAndUpdateSchema } from '$lib/playground/schemas/validate';
	import { copyToClipboard } from '$lib/utils/copy-to-clipboard';
	import { languageByLocale } from '$lib/locale-data/locales';
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import type { BrowserCompatData } from '$lib/types/BrowserSupport.types';
	import DateTime from '$lib/components/ui/DateTime.svelte';
  import MdnLink from '$lib/components/ui/MDNLink.svelte';

	export const prerender = false;
	export const ssr = false;

	export let data: Record<string, BrowserCompatData>;

	const locale = getLocaleForSSR($page);

	let schema = parseSchemaFromURL<'ListFormat'>();

	if (!schema && browser) {
		setSchemaInURL(listFormatSchema);
		schema = listFormatSchema;
	}

	const onChange = (event: any) => {
		if (!schema) return;
		const isRadioEvent = event.target.type === 'radio';
		const optionName = event.target.name;
		const optionValue = isRadioEvent
			? event.target.attributes.getNamedItem('group')?.nodeValue
			: event.target.value;
		const radioValue = optionValue === 'true' ? true : optionValue === 'false' ? false : undefined;
		const value = isRadioEvent ? radioValue : optionValue;
		const schemaOptions = schema.options.map((option) =>
			option.name === optionName
				? {
						...option,
						value
				  }
				: option
		);
		const newSchema: PlaygroundSchema<'ListFormat'> = {
			...schema,
			options: schemaOptions
		};
		const isRelativeTimeUnit =
			(schema.method as FormatMethodsKeys) === 'RelativeTimeFormat' && optionName === 'unit';
		if (isRelativeTimeUnit) {
			newSchema.inputValues[1] = optionValue;
		}
		schema = validateAndUpdateSchema(newSchema);
		setSchemaInURL(schema);
	};

	const onInput = (event: Event) => {
		const value = (event.target as HTMLInputElement).value;
		if (schema?.inputValueType === 'array') {
			const parsedValue = value.split(',');
			schema.inputValues[0] = parsedValue;
		}
		if (schema?.inputValueType === 'number') {
			const parsed = parseInt(value, 10);
			schema.inputValues[0] = isNaN(parsed) ? 0 : parsed;
		}
	};

	const onChangeDate = (datetime: string) => {
		if (schema?.inputValueType === 'date') {
			schema.inputValues[0] = datetime;
		}
	};

	const onChangeSchema = (event: Event) => {
		const value = (event.target as HTMLInputElement).value;
		const newSchema = schemas[value as keyof typeof schemas] as PlaygroundSchema<'ListFormat'>;
		schema = { ...validateAndUpdateSchema(newSchema) };
		setSchemaInURL(schema);
	};

	const copy = async () => {
		if (!schema) return;
		await copyToClipboard(schemaToCode(schema, $selectedLocale));
	};
</script>

<svelte:head>
	<title>Playground</title>
	{@html nightowl}
</svelte:head>

<h1>Playground</h1>

{#if schema}
	<p>
		<MdnLink header={schema.method} />
	</p>
{/if}

{#if schema}
	<div class="top">
		<Select
			name="method"
			label="Method"
			onChange={onChangeSchema}
			value={schema.method}
			items={formatMethods.map((method) => [method, method])}
			fullWidth
			removeEmpty
		/>
		{#if schema.inputValueType === 'number' || schema.inputValueType === 'array'}
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
		{#if browser}
			<Select
				name="locale"
				placeholder="Select a locale"
				label="Locale"
				removeEmpty
				items={Object.entries(languageByLocale)}
				bind:value={$selectedLocale}
			/>
		{:else}
			<Select
				name="locale"
				placeholder="Select a locale"
				label="Locale"
				removeEmpty
				items={Object.entries(languageByLocale)}
				value={locale}
			/>
		{/if}
	</div>
	<details open>
		<summary><h2>Options</h2></summary>
		<div class="grid">
			{#each schema.options as option}
				{#if option.inputType === 'select'}
					<OptionSection
						labelId={option.name + 'Select'}
						header={option.name}
						browserCompatData={data[schema.method]}
						stackedCompatView
					>
						<Select
							{onChange}
							name={option.name}
							value={option.value ?? option.defaultValue ?? ''}
							items={getItemsFromOption(schema.method, option)}
							fullWidth
							removeEmpty={option.removeUndefined}
						/>
					</OptionSection>
				{/if}
				{#if option.inputType === 'text'}
					<OptionSection
						labelId={option.name}
						header={option.name}
						browserCompatData={data[schema.method]}
						stackedCompatView
					>
						<Input
							id={option.name}
							onInput={onChange}
							name={option.name}
							value={option.defaultValue ?? ''}
							fullWidth
						/>
					</OptionSection>
				{/if}
				{#if option.inputType === 'radio'}
					<OptionSection
						labelId={option.name}
						header={option.name}
						browserCompatData={data[schema.method]}
						stackedCompatView
					>
						<fieldset>
							{#each getItemsFromOption(schema.method, option) as [name, value]}
								<div class="radio">
									<input
										type="radio"
										on:input={onChange}
										id={option.name}
										name={option.name}
										group={value}
									/>
									<label for={option.name}>{value}</label>
								</div>
							{/each}
						</fieldset>
					</OptionSection>
				{/if}
			{/each}
		</div>
	</details>
	<details open id="output">
		<summary>
			<h2>Output</h2>
		</summary>
		{#if browser}
			<Highlight code={schemaToPrimaryFormatterOutput(schema, $selectedLocale)} />
		{:else}
			<Highlight code={schemaToPrimaryFormatterOutput(schema, locale)} />
		{/if}
	</details>
	<details open id="code">
		<summary>
			<h2>Code</h2>
		</summary>
		<div>
			{#if browser}
				<Highlight language={typescript} code={schemaToCode(schema, $selectedLocale)} />
			{:else}
				<Highlight language={typescript} code={schemaToCode(schema, locale)} />
			{/if}
			<button on:click={copy}> Copy code </button>
		</div>
	</details>
	<details open id="resolvedOptions">
		<summary>
			<h2>Resolved Options</h2>
		</summary>
		<div class="resolved">
			{#if browser}
				<Highlight language={typescript} code={schemaToResolvedOptions(schema, $selectedLocale)} />
			{:else}
				<Highlight language={typescript} code={schemaToResolvedOptions(schema, locale)} />
			{/if}
		</div>
	</details>

	{#if schema.secondaryFormatters}
		<details open id="secondaryFormatters">
			<summary>
				<h2>Secondary Formatters</h2>
			</summary>
			{#each schemaToSecondaryFormattersOutput(schema, $selectedLocale) as formatter}
				<h3>{formatter.name}</h3>
				<div>
					{#if browser}
						<Highlight language={typescript} code={formatter.output} />
					{:else}
						<Highlight language={typescript} code={formatter.output} />
					{/if}
				</div>
			{/each}
		</details>
	{/if}
{/if}

<style>
	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}
	@media (min-width: 600px) {
		.grid {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (min-width: 900px) {
		.grid {
			grid-template-columns: 1fr 1fr 1fr;
		}
		.top {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 1rem;
			margin-bottom: 1rem;
		}
	}
	h1 {
		margin: 0 0 1rem 0;
	}
	h2 {
		font-size: 1.25rem;
		display: inline-block;
		margin: 0.5rem 0;
	}

	button {
		margin: 1rem 0 0 auto;
		background-color: var(--white);
		border-radius: 4px;
		border: 1px solid var(--purple);
		padding: 0.75rem 1.25rem;
		cursor: pointer;
		box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.1);
	}
	button:hover {
		background-color: var(--light-purple);
	}
	fieldset {
		display: flex;
		gap: 0.5rem;
		border: none;
	}
	fieldset label {
		font-weight: normal;
		margin: 0;
	}
	fieldset input {
		margin: 0;
		margin-right: 0.5rem;
	}
	.radio {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
