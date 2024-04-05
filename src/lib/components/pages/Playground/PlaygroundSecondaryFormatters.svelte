<script lang="ts">
	import { Highlight } from "svelte-highlight";
	import typescript from "svelte-highlight/languages/typescript";
	import Spacing from "$ui/Spacing.svelte";
	import OptionSection from "$ui/OptionSection.svelte";
	import type { BrowserSupportDataForOptions } from "$types/BrowserSupport.types";
	import Card from "$ui/Card.svelte";
	import { getMessages } from "$i18n/util";
	import { settings } from "$store/settings";

	export let secondaryFormatters: { name: string; output: string }[];
	export let support: BrowserSupportDataForOptions | undefined = undefined;
	const m = getMessages();
</script>

{#if secondaryFormatters.length}
	<h2>{m.secondaryFormatters()}</h2>
	<Spacing />
	{#each secondaryFormatters as formatter}
		<Card>
			<OptionSection
				header={formatter.name}
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
