<script lang="ts">
	import OptionSection from "$ui/OptionSection.svelte";
	import Grid from "$ui/Grid.svelte";
	import Input from "$ui/Input.svelte";
	import DisplayNamesHighlight from "$ui/DisplayNamesHighlight.svelte";
	import Spacing from "$ui/Spacing.svelte";
	import PageLayout from "$pages/PageLayout.svelte";

	let code = "US";
	let language = "en-US";
	let script = "Latn";
	let currency = "USD";
	let calendar = "gregory";
	let dateTimeField = "month";
</script>

<PageLayout>
	<Grid slot="output">
		<OptionSection header={"region"} zIndex={10}>
			<Spacing size={1} />
			<Input id="region" label="region" bind:value={code} />
			<Spacing size={2} />
			<DisplayNamesHighlight
				bind:value={code}
				options={{
					style: "long",
					type: "region"
				}}
			/>
			<DisplayNamesHighlight
				bind:value={code}
				options={{
					style: "short",
					type: "region"
				}}
			/>
			<DisplayNamesHighlight
				bind:value={code}
				options={{
					style: "narrow",
					type: "region"
				}}
			/>
		</OptionSection>
		<OptionSection header={"language"} zIndex={9}>
			<Spacing size={1} />
			<Input id="language" label="language" bind:value={language} />
			<Spacing size={2} />
			<DisplayNamesHighlight
				bind:value={language}
				options={{
					languageDisplay: "dialect",
					type: "language"
				}}
			/>
			<DisplayNamesHighlight
				bind:value={language}
				options={{
					languageDisplay: "standard",
					type: "language"
				}}
			/>
		</OptionSection>
		<OptionSection header={"currency"} zIndex={8}>
			<Spacing size={1} />
			<Input id="currency" label="currency" bind:value={currency} />
			<Spacing size={2} />
			<DisplayNamesHighlight
				bind:value={currency}
				options={{
					type: "currency"
				}}
			/>
		</OptionSection>
		<OptionSection header={"script"} zIndex={7}>
			<Spacing size={1} />
			<Input id="script" label="script" bind:value={script} />
			<Spacing size={2} />
			<DisplayNamesHighlight
				bind:value={script}
				options={{
					type: "script"
				}}
			/>
		</OptionSection>
		<OptionSection header={"calendar"} zIndex={6}>
			<Spacing size={1} />
			<Input id="calendar" label="calendar" bind:value={calendar} />
			<Spacing size={2} />
			<DisplayNamesHighlight
				bind:value={calendar}
				options={{
					type: "calendar"
				}}
			/>
		</OptionSection>
		<OptionSection header={"dateTimeField"} zIndex={5}>
			<Spacing size={1} />
			<Input id="dateTimeField" label="dateTimeField" bind:value={dateTimeField} />
			<Spacing size={2} />
			<DisplayNamesHighlight
				bind:value={dateTimeField}
				options={{
					style: "short",
					type: "dateTimeField"
				}}
			/>
			<DisplayNamesHighlight
				bind:value={dateTimeField}
				options={{
					style: "long",
					type: "dateTimeField"
				}}
			/>
			<DisplayNamesHighlight
				bind:value={dateTimeField}
				options={{
					style: "narrow",
					type: "dateTimeField"
				}}
			/>
		</OptionSection>
	</Grid>
</PageLayout>
