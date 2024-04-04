<script lang="ts">
	import type { BrowserCoverage } from "$lib/types/BrowserSupport.types";
	import SupportLabel from "$lib/components/ui/BrowserSupport/SupportLabel.svelte";
	import Card from "$lib/components/ui/Card.svelte";
	import Checkbox from "$lib/components/ui/Checkbox.svelte";
	import Spacing from "$lib/components/ui/Spacing.svelte";

	export let option: string;
	export let support: BrowserCoverage | undefined = undefined;
	export let hideFullSupport: boolean | undefined = false;
	export let checked: boolean | undefined = true;
	export let onChange: (event: Event) => void;
</script>

<Card>
	<div class="heading">
		<div>
			<Checkbox
				label="{option} active"
				name="{option}_active"
				id="{option}_active"
				srOnlyLabel
				{checked}
				{onChange}
			/>
			<label for={option}>{option}</label>
		</div>
		<SupportLabel {hideFullSupport} {support} />
	</div>
	<Spacing size={2} />
	<div class="content">
		<slot />
	</div>
</Card>

<style>
	label {
		font-weight: bold;
	}
	.heading {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
