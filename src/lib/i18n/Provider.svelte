<script lang="ts">
  import { ParaglideJS } from '@inlang/paraglide-js-adapter-sveltekit'
	import { i18n } from '$lib/i18n/i18n'
	import MessagesContext from './MessagesContext.svelte';
</script>

<ParaglideJS {i18n}>
  <MessagesContext>
    <slot />
  </MessagesContext>
</ParaglideJS>  