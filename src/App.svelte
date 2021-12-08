<script lang="ts">
  import Header from "./components/Header.svelte";
  import Select from "./components/Select.svelte";
  import DateTimeFormatTab from "./components/tabs/DateTimeFormatTab.svelte";
  import NumberFormatTab from "./components/tabs/NumberFormatTab.svelte";
  import ListFormatTab from "./components/tabs/ListFormatTab.svelte";
  import RelativeTimeFormatTab from "./components/tabs/RelativeTimeFormatTab.svelte";
  import PluralRules from "./components/tabs/PluralRulesTab.svelte";

  import { languageByLocaleAsEntries } from "./locale-data/locales";

  import { selectedTab } from "./store/selectedTab";
  import { selectedLocale } from "./store/selectedLocale";
  import { tabEntries, Tabs } from "./tabs";
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
  <div class="tabs">
    <Select
      name="locale"
      placeholder="Select a locale"
      label="Locale"
      items={languageByLocaleAsEntries}
      bind:value={$selectedLocale}
    />
    {#if $selectedTab === Tabs.DateTimeFormat}
      <DateTimeFormatTab selectedLocale={$selectedLocale} />
    {/if}
    {#if $selectedTab === Tabs.NumberFormat}
      <NumberFormatTab selectedLocale={$selectedLocale} />
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
  </div>
</main>

<style>
  .tabs {
    padding-top: 1rem;
    border-top: 1px solid gray;
  }
  main {
    margin: 0 1rem;
  }
</style>
