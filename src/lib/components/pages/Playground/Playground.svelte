<script lang="ts">
	import { browser } from "$app/environment";

	import type { PlaygroundSchema } from "$lib/playground/playground.schema";
	import type { BrowserSupportDataForMethod } from "$types/BrowserSupport.types";

	import Highlight from "svelte-highlight";
	import typescript from "svelte-highlight/languages/typescript";

	import Spacing from "$ui/Spacing.svelte";
	import Header from "$ui/Header.svelte";
	import CopyToClipboard from "$ui/icons/CopyToClipboard.svelte";
	import Button from "$ui/Button.svelte";

	import PlaygroundOptions from "$pages/Playground/PlaygroundOptions.svelte";
	import PlaygroundInput from "$pages/Playground/PlaygroundInput.svelte";
	import PlaygroundSecondaryFormatters from "$pages/Playground/PlaygroundSecondaryFormatters.svelte";

	import {
		schemaToCode,
		schemaToPrimaryFormatterOutput,
		schemaToResolvedOptions,
		schemaToSecondaryFormattersOutput,
		updateOptionOnSchema
	} from "$lib/playground/format.utils";
	import { createSchemaUrl, getSchemaParam, parseSchemaFromURL } from "$lib/playground/url.utils";
	import { validateAndUpdateSchema } from "$lib/playground/validate";
	import { copyCode, copyToClipboard } from "$utils/copy-to-clipboard";
	import { schemas, type SchemaKeys } from "$lib/playground/schemas";
	import { onDestroy, onMount } from "svelte";
	import { numberFormatSchema } from "$lib/playground/schemas/numberFormat.schema";
	import { trackEvent } from "$utils/analytics";
	import BrowserSupport from "$ui/BrowserSupport/BrowserSupport.svelte";
	import Grid from "$ui/Grid.svelte";
	import { getMessages } from "$i18n/util";
	import { settings } from "$store/settings";
	import { locales } from "$store/locales";
	import { testIds } from "$utils/dom-utils";
	import { getAnnouncer } from "$lib/live-announcer/util";

	export let data: { [key: string]: BrowserSupportDataForMethod };

	const m = getMessages();
	const announce = getAnnouncer();

	const matchMedia = browser ? window.matchMedia("(min-width: 630px)") : null;
	$: isDesktop = Boolean(matchMedia?.matches);

	$: schema = validateAndUpdateSchema(numberFormatSchema);
	$: browserSupportData = schema
		? { ...data[schema.method] }
		: { optionsSupport: undefined, formattersSupport: undefined };

	onMount(() => {
		if (getSchemaParam()) {
			const parsedSchema = parseSchemaFromURL<"NumberFormat">();
			if (parsedSchema) {
				schema = validateAndUpdateSchema(parsedSchema);
			}
		}
	});

	const onChangeOption = (event: Event) => {
		if (!schema) return;
		schema = validateAndUpdateSchema(updateOptionOnSchema(schema, event));
		if(!$settings.announceOutputToScreenreader) {
			return;
		}
		announce(`${m.output()}: ${schemaToPrimaryFormatterOutput(schema, $locales)}`);
	};

	const onInput = (event: Event) => {
		const value = (event.target as HTMLInputElement).value;
		if (schema?.inputValueType === "array") {
			const parsedValue = value.split(",");
			schema.inputValues[0] = parsedValue;
		}
		if (schema?.inputValueType === "number") {
			const parsed = parseFloat(value);
			schema.inputValues[0] = isNaN(parsed) ? 0 : parsed;
		}
		if (schema?.inputValueType === "string") {
			schema.inputValues[0] = value;
		}
		if(!$settings.announceOutputToScreenreader) {
			return;
		}
		announce(`${m.output()}: ${schemaToPrimaryFormatterOutput(schema, $locales)}`);
	};

	const onChangeDate = (datetime: string) => {
		if (schema?.inputValueType === "date") {
			schema.inputValues[0] = datetime;
		}
		if(!$settings.announceOutputToScreenreader) {
			return;
		}
		announce(`${m.output()}: ${schemaToPrimaryFormatterOutput(schema, $locales)}`);
	};

	const onChangeSchema = (event: Event) => {
		const value = (event.target as HTMLInputElement).value;
		const newSchema = validateAndUpdateSchema(
			schemas[value as SchemaKeys] as unknown as PlaygroundSchema<"NumberFormat">
		);
		schema = newSchema;
		if(!$settings.announceOutputToScreenreader) {
			return;
		}
		announce(`${m.output()}: ${schemaToPrimaryFormatterOutput(schema, $locales)}`);
	};

	const copy = async () => {
		if (!schema) return;
		const code = schemaToCode(schema, $locales);
		await copyCode(code);
		announce(m.copyCodeDone());
	};

	const copySchema = async () => {
		if (!schema) return;
		await copyToClipboard(createSchemaUrl(schema));
		announce(m.copySchemaUrlDone());
		trackEvent("Copy Schema", {
			method: schema.method
		});
	};

	const onMatchMediaChange = (event: MediaQueryListEventMap["change"]) => {
		isDesktop = event.matches;
	};

	onMount(() => {
		if (browser && matchMedia) {
			matchMedia.addEventListener("change", onMatchMediaChange);
		}
	});
	onDestroy(() => {
		if (browser && matchMedia) {
			matchMedia.removeEventListener("change", onMatchMediaChange);
		}
	});
</script>

{#if schema}
	<div class="columns">
		<div class="main">
			<Header header="Playground" link={schema.method} />
			<PlaygroundInput {schema} {onChangeSchema} {onChangeDate} {onInput} />
			<Spacing />
			<Grid>
				{#if $settings.showBrowserSupport}
					<BrowserSupport bind:data={browserSupportData} />
				{/if}
				<Button onClick={copySchema}>{m.copySchemaUrl()} <CopyToClipboard /></Button>
			</Grid>
			<Spacing />
			{#if !isDesktop}
				<h2>{m.output()}</h2>
				<Spacing size={2} />
				<Highlight
					language={typescript}
					code={`"${schemaToPrimaryFormatterOutput(schema, $locales)}"`}
				/>
				<Spacing />
				<h2>{m.code()}</h2>
				<Spacing size={2} />
				<div class="highlight">
					<Highlight language={typescript} code={schemaToCode(schema, $locales)} />
				</div>
				<Spacing size={2} />
				<div class="copy-code">
					<Button onClick={copy}>{m.copyCode()} <CopyToClipboard /></Button>
				</div>
			{/if}
			<PlaygroundOptions
				bind:support={browserSupportData.optionsSupport}
				{schema}
				{onChangeOption}
			/>
			<Spacing />
			{#if !isDesktop}
				<h2>{m.resolvedOptions()}</h2>
				<Spacing size={2} />
				<div>
					<Highlight language={typescript} code={schemaToResolvedOptions(schema, $locales)} />
				</div>
			{/if}
			<Spacing />
			<PlaygroundSecondaryFormatters
				bind:support={browserSupportData.formattersSupport}
				secondaryFormatters={schemaToSecondaryFormattersOutput(schema, $locales)}
			/>
		</div>
		{#if isDesktop}
			<div class="output">
				<div class="output-inner">
					<h2>{m.output()}</h2>
					<Spacing size={2} />
					<div data-testid={testIds.playground.output} id="output">
						<Highlight
							language={typescript}
							code={`"${schemaToPrimaryFormatterOutput(schema, $locales)}"`}
						/>
					</div>
					<Spacing />
					<h2>{m.code()}</h2>
					<Spacing size={2} />
					<div class="highlight" data-testid={testIds.playground.code}>
						<Highlight language={typescript} code={schemaToCode(schema, $locales)} />
					</div>
					<Spacing size={2} />
					<div class="copy-code">
						<Button onClick={copy}>{m.copyCode()} <CopyToClipboard /></Button>
					</div>
					<Spacing size={2} />
					<h2>{m.resolvedOptions()}</h2>
					<Spacing size={2} />
					<div data-testid={testIds.playground.resolvedOptions}>
						<Highlight language={typescript} code={schemaToResolvedOptions(schema, $locales)} />
					</div>
				</div>
			</div>
		{/if}
	</div>
{/if}

<style>
	.main {
		padding-right: 0;
	}
	.output {
		padding-top: var(--spacing-5);
		border-top-left-radius: 4px;
	}
	.output-inner {
		position: sticky;
		top: var(--spacing-4);
	}
	.columns {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--spacing-4);
		position: relative;
	}
	@media screen and (min-width: 630px) {
		.columns {
			grid-template-columns: 1fr 1fr;
		}
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
