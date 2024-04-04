<script lang="ts">
	import { locales } from "$lib/store/locales";
	import { getMessages } from "$lib/i18n/util";
	import { languageByLocaleAsComboBoxOptions } from "$lib/locale-data/locales";

	import ComboBoxContext from "$lib/components/ui/ComboBox/ComboBoxContext.svelte";
	import ComboBox from "$lib/components/ui/ComboBox/ComboBox.svelte";
	import Chip from "$lib/components/ui/Chip.svelte";
	import Button from "$lib/components/ui/Button.svelte";
	import Spacing from "$lib/components/ui/Spacing.svelte";
	import Input from "$lib/components/ui/Input.svelte";

	const m = getMessages();

	let locale: string = "";
	let edit = false;

	const onDelete = (locale: string) => {
		const index = $locales.lastIndexOf(locale);
		if (index !== -1) {
			const arr = [...$locales];
			arr.splice(index, 1);
			locales.set(arr);
		}
	};

	const onAdd = () => {
		if (locale) {
			locales.set([...$locales, locale]);
		}
	};

	const onSelect = (option: { value: string }) => {
		locale = option.value;
	};

	const onEdit = () => (edit = !edit);
</script>

<ComboBoxContext>
	<div class="input">
		{#if edit}
			<Input id="editableLocale" bind:value={locale} label={m.locale()} fullWidth />
		{:else}
			<ComboBox
				label={m.locale()}
				name="locale"
				bind:value={locale}
				placeholder="undefined"
				{onSelect}
				options={[...languageByLocaleAsComboBoxOptions, { label: "", value: "" }]}
			/>
		{/if}
		<div class="buttons">
			<Button ariaLabel={m.editLocale()} title={m.editLocale()} onClick={onEdit} noBackground>
				{#if edit}
					{m.selectLocaleButton()}
				{:else}
					{m.editLocaleButton()}
				{/if}
			</Button>
			<Button
				disabled={!locale}
				onClick={onAdd}
				ariaLabel={m.addLocale()}
				title={m.addLocale()}
				noBackground
			>
				{m.addLocaleButton()}
			</Button>
		</div>
	</div>
	<Spacing size={2} />
	<div class="chips">
		{#each $locales as locale}
			<Chip label={locale} onDelete={() => onDelete(locale)} />
		{/each}
	</div>
	{#if !$locales.length}
		<Spacing size={2} />
		<p>{m.localeHint()}</p>
	{/if}
</ComboBoxContext>

<style>
	.input {
		display: grid;
		gap: var(--spacing-2);
		grid-template-columns: 3fr 1fr;
		align-items: end;
	}
	.buttons {
		display: flex;
		align-items: center;
	}
	.chips {
		display: flex;
		gap: var(--spacing-2);
	}
</style>
