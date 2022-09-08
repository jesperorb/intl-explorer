<script lang="ts">
	import AndroidWebView from './AndroidWebView.svelte';
	import Chrome from './chrome.svelte';
	import Deno from './Deno.svelte';
	import Edge from './Edge.svelte';
	import Firefox from './Firefox.svelte';
	import Node from './Node.svelte';
	import Opera from './Opera.svelte';
	import Safari from './Safari.svelte';
	import Samsung from './Samsung.svelte';
	export let browserName: string;
</script>

{#if browserName.includes('chrome')}
	<Chrome />
{/if}
{#if browserName.includes('firefox')}
	<Firefox />
{/if}
{#if browserName.includes('safari')}
	<Safari />
{/if}
{#if browserName.includes('opera')}
	<Opera />
{/if}
{#if browserName.includes('edge')}
	<Edge />
{/if}
{#if browserName.includes('deno')}
	<Deno />
{/if}
{#if browserName.includes('webview')}
	<AndroidWebView />
{/if}
{#if browserName.includes('node')}
	<Node />
{/if}
{#if browserName.includes('samsung')}
	<Samsung />
{/if}
