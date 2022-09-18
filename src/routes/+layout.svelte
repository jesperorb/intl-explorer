<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import HamburgerMenu from '$lib/components/ui/HamburgerMenu.svelte';
  import Header from '$lib/components/ui/Header.svelte';
	import Main from '$lib/components/ui/Main.svelte';
	import { selectedLocale } from '$lib/store/selected-locale';

	let menuOpen = false;
	const toggleMenuOpen = () => (menuOpen = !menuOpen);
</script>

<HamburgerMenu onClick={toggleMenuOpen} />

<Sidebar bind:open={menuOpen} bind:selectedLocale={$selectedLocale} />

<Main>
	<slot />
</Main>
