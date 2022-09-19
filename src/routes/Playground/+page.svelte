<script lang="ts">
	import Highlight from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';
	import nightowl from 'svelte-highlight/styles/night-owl';

	import Select from '$lib/components/ui/Select.svelte';
	import Input from '$lib/components/ui/Input.svelte';

	import { formatOptions } from '$lib/format-options';
	import type { PlaygroundOption } from '$lib/playground/PlaygroundSchema.types';
	import { listFormatSchema } from '$lib/playground/schemas';

	export const prerender = false;
	export const ssr = false;

	const schema = { ...listFormatSchema };

	const getItems = (option: PlaygroundOption<'ListFormat'>) => {
		const options = formatOptions[schema.method][option.name] ?? [];
		return options.map((option) => [option, option]);
	};
</script>

<svelte:head>
	{@html nightowl}
</svelte:head>

{#each schema.options as option}
	{#if option.inputType === 'select'}
		<Select
			name={option.name}
			label={option.name}
			value={option.defaultValue ?? ''}
			items={getItems(option)}
		/>
	{/if}
	{#if option.inputType === 'text'}
		<Input id={option.name} label={option.name} value={option.defaultValue ?? ''} />
	{/if}
{/each}

<Highlight language={typescript} code={`new Intl.DateTimeFormat()`} />
