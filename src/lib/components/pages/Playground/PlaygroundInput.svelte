<script lang="ts">
	import type { PlaygroundSchema } from "$lib/playground/playground.schema";

	import Select from "$ui/Select.svelte";
	import Input from "$ui/Input.svelte";
	import DateTime from "$ui/DateTime.svelte";
	import Grid from "$ui/Grid.svelte";

	import { formatMethods } from "$lib/format-methods";
	import Card from "$ui/Card.svelte";
	import { m } from "$paraglide/messages";
	import LocalePicker from "$ui/LocalePicker.svelte";

	export let schema: PlaygroundSchema<"NumberFormat">;
	export let onChangeSchema: (event: Event) => void;
	export let onInput: (event: Event) => void;
	export let onChangeDate: (datetime: string) => void;
</script>

<Card>
	<Grid>
		<Select
			name="method"
			label={m.method()}
			onChange={onChangeSchema}
			value={schema.method}
			items={formatMethods.map((method) => [method, method])}
			fullWidth
			removeEmpty
		/>
		{#if schema.inputValueType === "number" || schema.inputValueType === "array" || schema.inputValueType === "string"}
			<Input
				id="inputValue"
				label={m.value()}
				name="inputValue"
				value={schema.inputValues[0].toString()}
				{onInput}
				fullWidth
			/>
		{/if}
		{#if schema.inputValueType === "date"}
			<DateTime defaultValue={schema.inputValues[0]} onChange={onChangeDate} />
		{/if}
		<LocalePicker />
	</Grid>
</Card>
