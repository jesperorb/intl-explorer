<script lang="ts">
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import Grid from '$lib/components/ui/Grid.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import DisplayNamesHighlight from '$lib/components/ui/DisplayNamesHighlight.svelte';
	import Spacing from '$lib/components/ui/Spacing.svelte';
	import PageLayout from '$lib/components/pages/PageLayout.svelte';

	export let locale: string;

	let code = 'US';
	let language = 'en-US';
	let script = 'Latn';
	let currency = 'USD';
	let calendar = 'gregory';
	let dateTimeField = 'month';
</script>

<PageLayout>
	<Grid slot="output">
		<OptionSection header={'region'}>
			<Spacing size={1} />
			<Input id="region" label="region" bind:value={code} />
			<Spacing size={2} />
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
			<Spacing size={1} />
			<Input id="language" label="language" bind:value={language} />
			<Spacing size={2} />
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
			<Spacing size={1} />
			<Input id="currency" label="currency" bind:value={currency} />
			<Spacing size={2} />
			<DisplayNamesHighlight
				bind:locale
				bind:value={currency}
				options={{
					type: 'currency'
				}}
			/>
		</OptionSection>
		<OptionSection header={'script'}>
			<Spacing size={1} />
			<Input id="script" label="script" bind:value={script} />
			<Spacing size={2} />
			<DisplayNamesHighlight
				bind:locale
				bind:value={script}
				options={{
					type: 'script'
				}}
			/>
		</OptionSection>
		<OptionSection header={'calendar'}>
			<Spacing size={1} />
			<Input id="calendar" label="calendar" bind:value={calendar} />
			<Spacing size={2} />
			<DisplayNamesHighlight
				bind:locale
				bind:value={calendar}
				options={{
					type: 'calendar'
				}}
			/>
		</OptionSection>
		<OptionSection header={'dateTimeField'}>
			<Spacing size={1} />
			<Input id="dateTimeField" label="dateTimeField" bind:value={dateTimeField} />
			<Spacing size={2} />
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
</PageLayout>
