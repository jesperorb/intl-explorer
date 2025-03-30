<script lang="ts">
	import type { BrowserType } from "@mdn/browser-compat-data";
	import Desktop from "$ui/icons/Desktop.svelte";
	import Mobile from "$ui/icons/Mobile.svelte";
	import Server from "$ui/icons/Server.svelte";
	type Props = {
		browserType: BrowserType;
	}

	let { browserType }: Props = $props();
</script>

{#if browserType === "desktop"}
	<Desktop />
{/if}
{#if browserType === "mobile"}
	<Mobile />
{/if}
{#if browserType === "server"}
	<Server />
{/if}
