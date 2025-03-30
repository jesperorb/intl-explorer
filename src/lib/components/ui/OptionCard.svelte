<script lang="ts">
	import SupportLabel from "$ui/BrowserSupport/SupportLabel.svelte";
	import Card from "$ui/Card.svelte";
	import Checkbox from "$ui/Checkbox.svelte";
	import Spacing from "$ui/Spacing.svelte";

	import type { BrowserCoverage } from "$types/BrowserSupport.types";

	type Props = {
		option: string;
		support?: BrowserCoverage | undefined;
		hideFullSupport?: boolean | undefined;
		checked?: boolean | undefined;
		onChange: (event: Event) => void;
		children?: import('svelte').Snippet;
	}

	let {
		option,
		support = undefined,
		hideFullSupport = false,
		checked = true,
		onChange,
		children
	}: Props = $props();
</script>

<Card>
	<div class="heading">
		<div class="checkbox">
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
		{@render children?.()}
	</div>
</Card>

<style>
	label {
		font-weight: bold;
		cursor: pointer;
	}
	.heading {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.checkbox {
		display: flex;
		gap: 0.25rem;
		align-items: center;
	}
</style>
