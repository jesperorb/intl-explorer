<script lang="ts">
	import Highlight from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';
	import nightowl from 'svelte-highlight/styles/oceanicnext';

	import Select from '$lib/components/ui/Select.svelte';
	import Input from '$lib/components/ui/Input.svelte';

	import {
		getItemsFromOption,
		schemaToCode,
		schemaToPrimaryFormatterOutput
	} from '$lib/playground/format.utils';
	import { getLocaleForSSR } from '$lib/utils/get-locale';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { selectedLocale } from '$lib/store/selected-locale';
	import { parseSchemaFromURL, setSchemaInURL } from '$lib/playground/url.utils';
	import { formatMethods } from '$lib/format-methods';
	import { listFormatSchema } from '$lib/playground/schemas/listFormat.schema';
	import { schemas } from '$lib/playground/schemas';
	import type { PlaygroundSchema } from '$lib/playground/playground.schema';
	import { validateAndUpdateSchema } from '$lib/playground/schemas/validate';
	import { copyToClipboard } from '$lib/utils/copy-to-clipboard';

	export const prerender = false;
	export const ssr = false;

	const locale = getLocaleForSSR($page);

	let schema = parseSchemaFromURL<'ListFormat'>();

	if (!schema && browser) {
		setSchemaInURL(listFormatSchema);
		schema = listFormatSchema;
	}

	const onChange = (event: any) => {
		const isRadioEvent = event.target.type === "radio";
		const optionName = event.target.name;
		const optionValue = isRadioEvent
			? event.target.attributes.getNamedItem("group")?.nodeValue
			: event.target.value;
		const radioValue = optionValue === "true"
			? true
			: optionValue === "false"
				? false
				: undefined;
		const value = isRadioEvent ? radioValue : optionValue;
		if (!schema) return;
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
		schema = validateAndUpdateSchema(newSchema);
		setSchemaInURL(schema);
	};

	const onInput = (event: any) => {
		const value = event.target.value;
		console.log(value);
		if (schema?.inputValueType === 'date') {
			schema.inputValue = value;
		}
		if (schema?.inputValueType === 'array') {
			const parsedValue = value.split(',');
			schema.inputValue = parsedValue;
		}
		if (schema?.inputValueType === 'number') {
			schema.inputValue = parseInt(value, 10);
		}
	};

	const onChangeSchema = (event: any) => {
		const value = event.target.value;
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
				value={schema.inputValue.toString()}
				{onInput}
				fullWidth
			/>
		{/if}
		{#if schema.inputValueType === 'date'}
			<div>
				<label for="datetime">Input value</label>
				<input
					type="datetime-local"
					id="datetime"
					step="1"
					on:input={onInput}
					value={schema.inputValue}
				/>
			</div>
		{/if}
	</div>
	<details open>
		<summary><h2>Options</h2></summary>
		<div class="grid">
			{#each schema.options as option}
				{#if option.inputType === 'select'}
					<Select
						{onChange}
						name={option.name}
						label={option.name}
						value={option.value ?? option.defaultValue ?? ''}
						items={getItemsFromOption(schema.method, option)}
						fullWidth
						removeEmpty={option.removeUndefined}
					/>
				{/if}
				{#if option.inputType === 'text'}
					<Input
						id={option.name}
						onInput={onChange}
						label={option.name}
						name={option.name}
						value={option.defaultValue ?? ''}
						fullWidth
					/>
				{/if}
				{#if option.inputType === 'radio'}
					<fieldset>
						<legend>{option.name}</legend>
						{#each getItemsFromOption(schema.method, option) as [name, value]}
							<div class="radio">
								<input
									type="radio"
									on:input={onChange}
									id={option.name}
									name={option.name}
									group={value}
								/>
								<label for={option.name}>{name}</label>
							</div>
						{/each}
					</fieldset>
				{/if}
			{/each}
		</div>
	</details>
	<details open>
		<summary>
			<h2>Output</h2>
		</summary>
		{#if browser}
			<Highlight code={schemaToPrimaryFormatterOutput(schema, $selectedLocale)} />
		{:else}
			<Highlight code={schemaToPrimaryFormatterOutput(schema, locale)} />
		{/if}
	</details>
	<details open>
		<summary>
			<h2>Code</h2>
		</summary>
		<div class="code">
			{#if browser}
				<Highlight language={typescript} code={schemaToCode(schema, $selectedLocale)} />
			{:else}
				<Highlight language={typescript} code={schemaToCode(schema, locale)} />
			{/if}
			<button on:click={copy}> Copy code </button>
		</div>
	</details>
{/if}

<style>
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
	@media (min-width: 600px) {
		.grid {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
	h1 {
		margin: 0 0 1rem 0;
	}
	h2 {
		font-size: 1.25rem;
		display: inline-block;
	}
	.top {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin-bottom: 1rem;
	}
	.code {
		margin-bottom: 4rem;
	}
	input[type='datetime-local'] {
		padding: 0.5rem;
		border: 1px solid var(--gray);
		border-radius: 4px;
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
	legend {
		font-weight: bold;
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
