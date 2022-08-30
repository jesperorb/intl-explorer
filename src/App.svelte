<script lang="ts">
  import Header from "@components/Header.svelte";
  import Select from "@components/Select.svelte";

  import DateTimeFormatTab from "@components/tabs/DateTimeFormatTab.svelte";
  import NumberFormatCurrencyTab from "@components/tabs/NumberFormatTabCurrency.svelte";
  import NumberFormatTabUnit from "@components/tabs/NumberFormatTabUnit.svelte";
  import ListFormatTab from "@components/tabs/ListFormatTab.svelte";
  import RelativeTimeFormatTab from "@components/tabs/RelativeTimeFormatTab.svelte";
  import PluralRules from "@components/tabs/PluralRulesTab.svelte";
  import CollatorTab from "@components/tabs/CollatorTab.svelte";

  import { languageByLocale } from "@locale-data/locales";

  import { selectedTab } from "@store/selected-tab";
  import { selectedLocale } from "@store/selected-locale";
  import { tabEntries, Tabs } from "@tabs";
  import SegmenterTab from "@components/tabs/SegmenterTab.svelte";
</script>

<header>
  <Header header={$selectedTab} />
</header>
<main>
  <Select
    name="intl-formatter"
    placeholder="Select a formatter"
    label="Formatter"
    bind:value={$selectedTab}
    items={tabEntries}
  />
  <hr />
  <div>
    <Select
      name="locale"
      placeholder="Select a locale"
      label="Locale"
      items={Object.entries(languageByLocale)}
      bind:value={$selectedLocale}
    />
    {#if $selectedTab === Tabs.DateTimeFormat}
      <DateTimeFormatTab selectedLocale={$selectedLocale} />
    {/if}
    {#if $selectedTab === Tabs.NumberFormatCurrency}
      <NumberFormatCurrencyTab selectedLocale={$selectedLocale} />
    {/if}
    {#if $selectedTab === Tabs.NumberFormatUnit}
      <NumberFormatTabUnit selectedLocale={$selectedLocale} />
    {/if}
    {#if $selectedTab === Tabs.ListFormat}
      <ListFormatTab selectedLocale={$selectedLocale} />
    {/if}
    {#if $selectedTab === Tabs.RelativeTimeFormat}
      <RelativeTimeFormatTab selectedLocale={$selectedLocale} />
    {/if}
    {#if $selectedTab === Tabs.PluralRules}
      <PluralRules selectedLocale={$selectedLocale} />
    {/if}
    {#if $selectedTab === Tabs.Collator}
      <CollatorTab selectedLocale={$selectedLocale} />
    {/if}
    {#if $selectedTab === Tabs.Segmenter}
      <SegmenterTab selectedLocale={$selectedLocale} />
    {/if}
  </div>
</main>
