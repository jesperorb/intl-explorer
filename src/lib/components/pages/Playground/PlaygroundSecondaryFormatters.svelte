<script lang="ts">
	import { Highlight } from "svelte-highlight";
	import typescript from "svelte-highlight/languages/typescript";
	import Spacing from "$ui/Spacing.svelte";
	import OptionSection from "$ui/OptionSection.svelte";
	import type { BrowserSupportDataForOptions } from "$types/BrowserSupport.types";
	import Card from "$ui/Card.svelte";
	import { m } from "$paraglide/messages";
	import { settings } from "$store/settings";

	type Props = {
		secondaryFormatters: { name: string; output: string }[];
		support?: BrowserSupportDataForOptions | undefined;
	}

	let { secondaryFormatters, support = undefined }: Props = $props();
</script>

{#if secondaryFormatters.length}
	<h2>{m.secondaryFormatters()}</h2>
	<Spacing />
	{#each secondaryFormatters as formatter, index}
		<Card>
			<OptionSection
				header={formatter.name}
				zIndex={secondaryFormatters.length - index}
				support={$settings.showBrowserSupport ? support?.[formatter.name] : undefined}
				hideFullSupport={false}
			>
				<Spacing />
				<Highlight language={typescript} code={formatter.output} />
			</OptionSection>
		</Card>
		<Spacing />
	{/each}
{/if}
