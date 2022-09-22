<script lang="ts">
	import Highlight from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';
	import nightowl from 'svelte-highlight/styles/night-owl';

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
	import type { PlaygroundSchema } from '$lib/playground/playground.types';
	import { validateAndUpdateSchema } from '$lib/playground/schemas/validate';

	export const prerender = false;
	export const ssr = false;

	const locale = getLocaleForSSR($page);

	let schema = parseSchemaFromURL<'ListFormat'>();

	if (!schema && browser) {
		setSchemaInURL(listFormatSchema);
		schema = listFormatSchema;
	}

	const onChange = (event: any) => {
		const optionName = event.target.name;
		const optionValue = event.target.value;
		if (!schema) return;
		const schemaOptions = schema.options.map((option) =>
			option.name === optionName
				? {
						...option,
						value: optionValue
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
						removeEmpty={!option.allowUndefined}
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
</style>
