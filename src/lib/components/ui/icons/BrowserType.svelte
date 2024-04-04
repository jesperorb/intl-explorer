<script lang="ts">
	import type { BrowserType } from "@mdn/browser-compat-data";
	import Desktop from "$lib/components/ui/icons/Desktop.svelte";
	import Mobile from "$lib/components/ui/icons/Mobile.svelte";
	import Server from "$lib/components/ui/icons/Server.svelte";
	export let browserType: BrowserType;
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
