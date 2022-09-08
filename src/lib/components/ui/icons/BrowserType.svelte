<script lang="ts">
	import type { BrowserType } from '@mdn/browser-compat-data';
	import Desktop from './Desktop.svelte';
	import Mobile from './Mobile.svelte';
	import Server from './Server.svelte';
	export let browserType: BrowserType;
</script>

{#if browserType === 'desktop'}
	<Desktop />
{/if}
{#if browserType === 'mobile'}
	<Mobile />
{/if}
{#if browserType === 'server'}
	<Server />
{/if}
