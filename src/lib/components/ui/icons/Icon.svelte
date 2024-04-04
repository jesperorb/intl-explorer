<script lang="ts">
	import AndroidWebView from "$lib/components/ui/icons/AndroidWebView.svelte";
	import Chrome from "$lib/components/ui/icons/chrome.svelte";
	import Deno from "$lib/components/ui/icons/Deno.svelte";
	import Edge from "$lib/components/ui/icons/Edge.svelte";
	import Firefox from "$lib/components/ui/icons/Firefox.svelte";
	import Node from "$lib/components/ui/icons/Node.svelte";
	import Opera from "$lib/components/ui/icons/Opera.svelte";
	import Safari from "$lib/components/ui/icons/Safari.svelte";
	import Samsung from "$lib/components/ui/icons/Samsung.svelte";
	export let browserName: string;
</script>

{#if browserName.includes("chrome")}
	<Chrome />
{/if}
{#if browserName.includes("firefox")}
	<Firefox />
{/if}
{#if browserName.includes("safari")}
	<Safari />
{/if}
{#if browserName.includes("opera")}
	<Opera />
{/if}
{#if browserName.includes("edge")}
	<Edge />
{/if}
{#if browserName.includes("deno")}
	<Deno />
{/if}
{#if browserName.includes("webview")}
	<AndroidWebView />
{/if}
{#if browserName.includes("node")}
	<Node />
{/if}
{#if browserName.includes("samsung")}
	<Samsung />
{/if}
