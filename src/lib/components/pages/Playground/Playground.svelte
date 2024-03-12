<script lang="ts">
	import type { PlaygroundOption, PlaygroundSchema } from '$lib/playground/playground.schema';
	import type { FormatMethodsKeys } from '$lib/format-methods';
	import type { BrowserCompatData } from '$lib/types/BrowserSupport.types';

	import Highlight from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';

	import Spacing from '$lib/components/ui/Spacing.svelte';
	import CopyButton from '$lib/components/ui/CopyButton.svelte';
	import CompatData from '$lib/components/ui/CompatData.svelte';
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
		schemaToSecondaryFormattersOutput
	} from '$lib/playground/format.utils';
	import { createSchemaUrl, getSchemaParam, parseSchemaFromURL } from '$lib/playground/url.utils';
	import { validateAndUpdateSchema } from '$lib/playground/schemas/validate';
	import { copyToClipboard } from '$lib/utils/copy-to-clipboard';
	import { clampValue, fallbackDisplayNames } from '$lib/utils/format-utils';
	import { schemas, type SchemaKeys } from '$lib/playground/schemas';
	import { onMount } from 'svelte';
	import { numberFormatSchema } from '$lib/playground/schemas/numberFormat.schema';
	import { trackEvent } from '$lib/utils/analytics';

	export let data: { [key: string]: BrowserCompatData };
	export let locale: string;

	$: schema = validateAndUpdateSchema(numberFormatSchema);
	$: browserCompatData = schema ? { ...data[schema.method] } : null;

	onMount(() => {
		if (getSchemaParam()) {
			const parsedSchema = parseSchemaFromURL<'NumberFormat'>();
			if (parsedSchema) {
				schema = validateAndUpdateSchema(parsedSchema);
			}
		}
	});

	const onChangeOption = (event: Event) => {
		const target = event.target as HTMLInputElement;
		if (!schema) return;
		const isRadioEvent = target.type === 'radio';
		const optionName = target.name;
		const optionValue = isRadioEvent
			? target.attributes.getNamedItem('group')?.nodeValue
			: target.value;
		const radioValue = optionValue === 'true' ? true : optionValue === 'false' ? false : undefined;
		const value = isRadioEvent ? radioValue : optionValue;
		const schemaOptions = schema.options.map((option) =>
			option.name === optionName
				? {
						...option,
						value: clampValue(option, value)
					}
				: { ...option }
		);
		const newSchema: PlaygroundSchema<'NumberFormat'> = {
			...schema,
			options: schemaOptions as unknown as PlaygroundOption<'NumberFormat'>[]
		};
		const isRelativeTimeUnit =
			(schema.method as FormatMethodsKeys) === 'RelativeTimeFormat' && optionName === 'unit';
		const isDisplayNamesType =
			(schema.method as FormatMethodsKeys) === 'DisplayNames' && optionName === 'type';
		if (isRelativeTimeUnit) {
			newSchema.inputValues[1] = optionValue;
		}
		if (isDisplayNamesType) {
			newSchema.inputValues[0] = fallbackDisplayNames[value as unknown as Intl.DisplayNamesType];
		}
		schema = validateAndUpdateSchema(newSchema);
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
		await copyToClipboard(code);
		trackEvent('Copy Code', {
			code
		});
	};
</script>

{#if schema}
	<Header header="Playground" link={schema.method}>
		<Button
			onClick={() => {
				if (!schema) return;
				copyToClipboard(createSchemaUrl(schema));
				trackEvent('Copy Schema', {
					method: schema.method,
				});
			}}>Copy Schema URL <CopyToClipboard /></Button
		>
	</Header>
	<CompatData data={browserCompatData} />
	<Spacing />
	<PlaygroundInput bind:locale {schema} {onChangeSchema} {onChangeDate} {onInput} />
	<Spacing />
	<PlaygroundOptions bind:browserCompatData {schema} {onChangeOption} />
	<Spacing />
	<h2>Output</h2>
	<Spacing size={2} />
	<Highlight language={typescript} code={schemaToPrimaryFormatterOutput(schema, locale)} />
	<Spacing />
	<h2>Code</h2>
	<Spacing size={2} />
	<div class="highlight">
		<Highlight language={typescript} code={schemaToCode(schema, locale)} />
		<CopyButton onClick={copy} label="Copy code" />
	</div>
	<Spacing />
	<h2>Resolved Options</h2>
	<Spacing size={2} />
	<div>
		<Highlight language={typescript} code={schemaToResolvedOptions(schema, locale)} />
	</div>
	<Spacing />
	<PlaygroundSecondaryFormatters
		bind:browserCompatData
		secondaryFormatters={schemaToSecondaryFormattersOutput(schema, locale) ?? []}
	/>
{/if}

<style>
	h2 {
		font-size: 1.25rem;
		display: inline-block;
	}
	.highlight {
		position: relative;
		min-height: 4rem;
	}
</style>
