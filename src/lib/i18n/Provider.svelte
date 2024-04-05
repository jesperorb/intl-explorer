<script lang="ts">
	import { ParaglideJS } from "@inlang/paraglide-js-adapter-sveltekit";
	import { i18n } from "$i18n/i18n";
	import MessagesContext from "$i18n/MessagesContext.svelte";
</script>

<ParaglideJS {i18n}>
	<MessagesContext>
		<slot />
	</MessagesContext>
</ParaglideJS>
