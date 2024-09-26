<script lang="ts">
	import { locales } from "$store/locales";
	import { getMessages } from "$i18n/util";
	import { languageByLocaleAsComboBoxOptions } from "$lib/locale-data/locales";

	import ComboBox, { type Option } from "$ui/ComboBox.svelte";

	const m = getMessages();

	const onDelete = (locale: string) => {
		const index = $locales.lastIndexOf(locale);
		if (index !== -1) {
			const arr = [...$locales];
			arr.splice(index, 1);
			locales.set(arr);
		}
	};

	const onSelect = (options?: Option[]) => {
		if (!options) return;
		locales.set(options.map((v) => v.value));
	};
</script>

<ComboBox
	labelText={m.locale()}
	placeholder={m.localePlaceHolder()}
	defaultValue={$locales.map((v) => ({ value: v, label: v }))}
	{onSelect}
	{onDelete}
	options={languageByLocaleAsComboBoxOptions}
/>
