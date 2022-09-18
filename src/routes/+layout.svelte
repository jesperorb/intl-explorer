<script lang="ts">
	import Sidebar from '$lib/components/sidebar.svelte';
	import HamburgerMenu from '$lib/components/ui/HamburgerMenu.svelte';
	import Main from '$lib/components/ui/Main.svelte';
	import { selectedLocale } from '$lib/store/selected-locale';
	import { page } from '$app/stores';
	import { browser } from "$app/environment";
  import { getLocaleForSSR } from '$lib/utils/get-locale';

	const locale = getLocaleForSSR($page);

	let menuOpen = false;
	const toggleMenuOpen = () => (menuOpen = !menuOpen);
</script>

<HamburgerMenu onClick={toggleMenuOpen} />

{#if browser}
	<Sidebar bind:open={menuOpen} bind:locale={$selectedLocale} />
{:else}
	<Sidebar bind:open={menuOpen} locale={locale} />
{/if}

<Main>
	<slot />
</Main>
