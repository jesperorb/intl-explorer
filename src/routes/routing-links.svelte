<script>
	import { page } from "$app/state";
	import { locales, localizeHref } from "$paraglide/runtime";
</script>

<div style="display:none">
	{#each locales as locale}
		<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
	{/each}
</div>
