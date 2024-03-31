<script lang="ts">
  import { page } from "$app/stores";
  import { browser } from "$app/environment";
	
	import {
    settings,
    settingsConfiguration,
    settingsKeys,
    type Settings
  } from '$lib/store/settings';
	
  import { availableLanguageTags, languageTag } from "$paraglide/runtime";
  import { i18n } from "$lib/i18n/i18n";
  
  import Dialog from "./Dialog.svelte";
  import Radio from "./Radio.svelte"
	import Fieldset from "./Fieldset.svelte";
	import Spacing from "./Spacing.svelte";
	import Card from "./Card.svelte";
	import { getMessages } from "$lib/i18n/util";
	import Select from "./Select.svelte";
	import { selectedLocale } from "$lib/store/selected-locale";
	import { getLocaleForSSR } from "$lib/utils/get-locale";
	import Button from "./Button.svelte";

  export let show: boolean;

  const m = getMessages();
  const locale = browser ? $selectedLocale : getLocaleForSSR($page);

  export let language = languageTag();

  const onChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    settings.update((s) => ({
      ...s,
      [target.name]: target.value,
    }))
  }

  const getHint = (key: keyof Settings) => {
    const hintKey = settingsConfiguration[key].hint;
    if(!hintKey) return "";
    return m[hintKey]()
  }

  const formatTag = (tag: string) => {
    try {
      return  new Intl.DisplayNames(tag, { type: "language" }).of(tag)
    } catch(_e: unknown) {
      return tag;
    }
  }

  const formatLanguages = () => {
    return availableLanguageTags.map(tag => [
      tag,
      formatTag(tag)
    ])
  }

</script>

<Dialog header={m.settingsHeading()} bind:show={show}>
  <div class="grid">
    {#each settingsKeys as key}
      <Card>
        {#if settingsConfiguration[key].type === "radio"}
          <Fieldset role="radiogroup" capitalize legend={m[key]()}>
            {#each settingsConfiguration[key].values as option}
              <Radio
                onChange={onChange}
                label={m[option]()}
                id={key + option}
                name={key}
                value={option}
                bind:group={$settings[key]}
              />
            {/each}
          </Fieldset>
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
    <Button href={`${i18n.route($page.url.pathname)}?locale=${locale}`} hrefLang={language}>
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
    min-width: 20rem;
	}
</style>