<script lang="ts">
  import Header from "./components/Header.svelte";
  import Select from "./components/Select.svelte";
  import DateTimeFormatTab from "./components/DateTimeFormatTab.svelte";
  import NumberFormatTab from "./components/NumberFormatTab.svelte";

  import { tabEntries, Tabs } from "./tabs";

  let selectedTab = Tabs.DateTimeFormat;
</script>

<header>
  <Header header={selectedTab} />
</header>
<main>
  <Select
    name="intl-formatter"
    placeholder="Select a formatter"
    label="Formatter"
    bind:value={selectedTab}
    items={tabEntries}
  />
  <div class="tabs">
    {#if selectedTab === Tabs.DateTimeFormat}
      <DateTimeFormatTab />
    {/if}
    {#if selectedTab === Tabs.NumberFormat}
      <NumberFormatTab />
    {/if}
  </div>
</main>

<style>
  .tabs {
    margin: 1rem 0;
    padding-top: 1rem;
    border-top: 1px solid gray;
  }
  main {
    margin: 0 1rem;
  }
</style>
