<script lang="ts">
	import { page } from "$app/state";
	import { browser } from "$app/environment";

	import Dialog from "$ui/Dialog.svelte";
	import Radio from "$ui/Radio.svelte";
	import Fieldset from "$ui/Fieldset.svelte";
	import Spacing from "$ui/Spacing.svelte";
	import Card from "$ui/Card.svelte";
	import Select from "$ui/Select.svelte";
	import Button from "$ui/Button.svelte";
	import Checkbox from "$ui/Checkbox.svelte";
	import Slider from "$ui/Slider.svelte";

	import {
		settings,
		settingsConfiguration,
		settingsKeys,
		type Settings,
		type DarkMode
	} from "$store/settings";
	import { locales } from "$store/locales";
	import { formatLocaleForUrl } from "$utils/format-utils";

	import { locales as paraglideLocales, getLocale, localizeHref } from "$paraglide/runtime";
	import { m } from "$paraglide/messages";

	type Props = {
		show: boolean;
		language?: any;
	};

	let { show = $bindable(), language = $bindable(getLocale()) }: Props = $props();

	const onChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const isCheckBox = target.type === "checkbox";
		const value = isCheckBox ? target.checked : target.value;
		settings.update((s) => ({
			...s,
			[target.name]: value
		}));
	};

	const onValueChange = (value: number[]) => {
		settings.update((s) => ({
			...s,
			accentColor: value[0].toString()
		}));
	};

	const getHint = (key: keyof Settings) => {
		const hintKey = settingsConfiguration[key].hint;
		if (!hintKey) return "";
		try {
			return m[hintKey]();
		} catch (e) {
			return "";
		}
	};

	const getLabel = (value: boolean | string | DarkMode) => {
		if (typeof value === "boolean") {
			return "";
		}
		return m[value as DarkMode]();
	};

	export const getValue = (value: boolean | string | DarkMode) => {
		if (typeof value === "boolean") {
			return "";
		}
		return value;
	};

	const formatTag = (tag: string) => {
		try {
			return new Intl.DisplayNames(tag, { type: "language" }).of(tag);
		} catch (_e: unknown) {
			return tag;
		}
	};

	const getDefaultValueForSlider = (key: keyof Settings) => {
		if ($settings[key]) return $settings[key] as unknown as number;
		return settingsConfiguration[key].values[0] as unknown as number;
	};

	const formatLanguages = () => {
		return paraglideLocales.map((tag) => [tag, formatTag(tag)]);
	};
</script>

<Dialog header={m.settingsHeading()} bind:show>
	<div class="grid">
		{#each settingsKeys as key}
			<Card>
				{#if settingsConfiguration[key].type === "radio"}
					<Fieldset role="radiogroup" capitalize legend={m[key]()}>
						{#each settingsConfiguration[key].values as option}
							<Radio
								{onChange}
								label={getLabel(option)}
								id={key + option}
								name={key}
								value={getValue(option)}
								bind:group={$settings[key]}
							/>
						{/each}
					</Fieldset>
				{/if}
				{#if settingsConfiguration[key].type === "checkbox"}
					<Checkbox
						id={key}
						{onChange}
						checked={Boolean($settings[key])}
						label={m[key]()}
						name={key}
					/>
				{/if}
				{#if settingsConfiguration[key].type === "color"}
					<Slider
						id="colorSlider"
						min={0}
						max={360}
						defaultValue={getDefaultValueForSlider(key)}
						step={5}
						label={m[key]()}
						{onValueChange}
					/>
				{/if}
				{#if settingsConfiguration[key].hint}
					<Spacing size={2} />
					<p>{getHint(key)}</p>
				{/if}
			</Card>
		{/each}
	</div>
	<Spacing size={2} />
	<Card>
		<Select
			name="languages"
			label={m.language()}
			removeEmpty
			fullWidth
			bind:value={language}
			items={formatLanguages()}
		/>
		<Spacing size={2} />
		<p>{m.languageHint()}</p>
		<Spacing />
		<Button
			href={`${localizeHref(page.url.href, {
				locale: language
			})}`}
			hrefLang={language}
		>
			{m.confirmLanguage()}
		</Button>
	</Card>
	<Spacing />
</Dialog>

<style>
	.grid {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2);
	}
</style>
