<script lang="ts">
	import AndroidWebView from "$ui/icons/AndroidWebView.svelte";
	import Chrome from "$ui/icons/chrome.svelte";
	import Deno from "$ui/icons/Deno.svelte";
	import Edge from "$ui/icons/Edge.svelte";
	import Firefox from "$ui/icons/Firefox.svelte";
	import Node from "$ui/icons/Node.svelte";
	import Opera from "$ui/icons/Opera.svelte";
	import Safari from "$ui/icons/Safari.svelte";
	import Samsung from "$ui/icons/Samsung.svelte";
	type Props = {
		browserName: string;
	};

	let { browserName }: Props = $props();
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
