<script lang="ts">
	import type { PlaygroundSchema } from '$lib/playground/playground.schema';
	import type { BrowserSupportDataForMethod } from '$lib/types/BrowserSupport.types';

	import Highlight from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';

	import Spacing from '$lib/components/ui/Spacing.svelte';
	import Header from '$lib/components/ui/Header.svelte';
	import CopyToClipboard from '$lib/components/ui/icons/CopyToClipboard.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	import PlaygroundOptions from './PlaygroundOptions.svelte';
	import PlaygroundInput from './PlaygroundInput.svelte';
	import PlaygroundSecondaryFormatters from './PlaygroundSecondaryFormatters.svelte';

	import {
		schemaToCode,
		schemaToPrimaryFormatterOutput,
		schemaToResolvedOptions,
		schemaToSecondaryFormattersOutput,
		updateOptionOnSchema
	} from '$lib/playground/format.utils';
	import { createSchemaUrl, getSchemaParam, parseSchemaFromURL } from '$lib/playground/url.utils';
	import { validateAndUpdateSchema } from '$lib/playground/validate';
	import { copyCode, copyToClipboard } from '$lib/utils/copy-to-clipboard';
	import { schemas, type SchemaKeys } from '$lib/playground/schemas';
	import { onMount } from 'svelte';
	import { numberFormatSchema } from '$lib/playground/schemas/numberFormat.schema';
	import { trackEvent } from '$lib/utils/analytics';
	import BrowserSupport from '$lib/components/ui/BrowserSupport/BrowserSupport.svelte';
	import Grid from '$lib/components/ui/Grid.svelte';

	export let data: { [key: string]: BrowserSupportDataForMethod };
	export let locale: string;

	$: schema = validateAndUpdateSchema(numberFormatSchema);
	$: browserSupportData = schema ? { ...data[schema.method] } : { ...data.NumberFormat };

	onMount(() => {
		if (getSchemaParam()) {
			const parsedSchema = parseSchemaFromURL<'NumberFormat'>();
			if (parsedSchema) {
				schema = validateAndUpdateSchema(parsedSchema);
			}
		}
	});

	const onChangeOption = (event: Event) => {
		if (!schema) return;
		schema = validateAndUpdateSchema(updateOptionOnSchema(schema, event));
	};

	const onInput = (event: Event) => {
		const value = (event.target as HTMLInputElement).value;
		if (schema?.inputValueType === 'array') {
			const parsedValue = value.split(',');
			schema.inputValues[0] = parsedValue;
		}
		if (schema?.inputValueType === 'number') {
			const parsed = parseFloat(value);
			schema.inputValues[0] = isNaN(parsed) ? 0 : parsed;
		}
		if (schema?.inputValueType === 'string') {
			schema.inputValues[0] = value;
		}
	};

	const onChangeDate = (datetime: string) => {
		if (schema?.inputValueType === 'date') {
			schema.inputValues[0] = datetime;
		}
	};

	const onChangeSchema = (event: Event) => {
		const value = (event.target as HTMLInputElement).value;
		const newSchema = validateAndUpdateSchema(
			schemas[value as SchemaKeys] as unknown as PlaygroundSchema<'NumberFormat'>
		);
		schema = newSchema;
	};

	const copy = async () => {
		if (!schema) return;
		const code = schemaToCode(schema, locale);
		await copyCode(code);
	};

	const copySchema = async () => {
		if (!schema) return;
		await copyToClipboard(createSchemaUrl(schema));
		trackEvent('Copy Schema', {
			method: schema.method
		});
	};
</script>

{#if schema}
	<div class="columns">
		<div class="main">
			<Header header="Playground" link={schema.method} />
			<Grid>
				<BrowserSupport bind:data={browserSupportData} />
				<Button onClick={copySchema}>Copy Schema URL <CopyToClipboard /></Button>
			</Grid>
			<Spacing />
			<PlaygroundInput bind:locale {schema} {onChangeSchema} {onChangeDate} {onInput} />
			<Spacing />
			<PlaygroundOptions
				bind:support={browserSupportData.optionsSupport}
				{schema}
				{onChangeOption}
			/>
			<Spacing />
			<PlaygroundSecondaryFormatters
				bind:support={browserSupportData.formattersSupport}
				secondaryFormatters={schemaToSecondaryFormattersOutput(schema, locale)}
			/>
		</div>
		<div class="output">
			<div class="output-inner">
				<h2>Output</h2>
				<Spacing size={2} />
				<Highlight language={typescript} code={schemaToPrimaryFormatterOutput(schema, locale)} />
				<Spacing />
				<h2>Code</h2>
				<Spacing size={2} />
				<div class="highlight">
					<Highlight language={typescript} code={schemaToCode(schema, locale)} />
				</div>
				<Spacing size={2} />
				<div class="copy-code">
					<Button onClick={copy}>Copy Code <CopyToClipboard /></Button>
				</div>
				<Spacing size={2} />
				<h2>Resolved Options</h2>
				<Spacing size={2} />
				<div>
					<Highlight language={typescript} code={schemaToResolvedOptions(schema, locale)} />
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.main {
		padding-right: 0;
	}
	.output {
		padding: var(--spacing-4);
		padding-top: var(--spacing-5);
		border-top-left-radius: 4px;
	}
	.output-inner {
		position: sticky;
		top: var(--spacing-4);
	}
	.columns {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-4);
		position: relative;
	}
	@media screen and (min-width: 900px) {
		.columns {
			grid-template-columns: 2fr 1fr;
		}
	}
	.copy-code {
		display: flex;
		justify-content: end;
	}
</style>
