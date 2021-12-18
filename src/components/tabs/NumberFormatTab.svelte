<script lang="ts">
  import Select from "../Select.svelte";
  import Grid from "../Grid.svelte";
  import OptionSection from "../OptionSection.svelte";
  import Highlight from "../Highlight.svelte";

  import { currencies } from "../../locale-data/currencies";
  import {
    numberFormatOptionsCurrency,
    numberFormatOptionsUnit,
  } from "../../options/number-format-options";
  import type { OptionValues } from "../../types/option-values";
  import { copyToClipboard } from "../../utils/copyToClipboard";
  import { unitsAsEntries } from "../../locale-data/units";

  export let selectedLocale: string;

  let selectedFormatter: "currency" | "unit" = "unit";
  let selectedCurrency = "EUR";
  let selectedUnit = "degree";
  let number = 123456.789;

  let setDisplayUnit = () => (selectedFormatter = "unit");
  let setDisplayCurrency = () => (selectedFormatter = "currency");

  let onClick = async (options: OptionValues) => {
    await copyToClipboard(
      `new Intl.NumberFormat("${selectedLocale}", ${JSON.stringify(
        options
      )}).format(${number})`
    );
  };
</script>

<div>
  <button on:click={setDisplayUnit}>Unit</button>
  <button on:click={setDisplayCurrency}>Currency</button>
  {#if selectedFormatter === "currency"}
    <Select
      name="currencies"
      placeholder="Select a currency"
      label="Currency"
      bind:value={selectedCurrency}
      items={Object.entries(currencies)}
    />
  {/if}
  {#if selectedFormatter === "unit"}
    <Select
      name="unit"
      placeholder="Select a unit"
      label="Unit"
      bind:value={selectedUnit}
      items={unitsAsEntries}
    />
  {/if}
  <label for="amount">Amount</label>
  <input type="text" bind:value={number} id="amount" />
</div>

<Grid>
  {#if selectedFormatter === "currency"}
    {#each [...numberFormatOptionsCurrency] as [option, values]}
      <OptionSection header={option}>
        {#each values as value}
          {#if value !== undefined}
            <Highlight
              {onClick}
              values={{
                [option]: value,
                style: "currency",
                currency: selectedCurrency,
              }}
              output={new Intl.NumberFormat(selectedLocale, {
                style: "currency",
                currency: selectedCurrency,
                [option]: value,
              }).format(number)}
            />
          {/if}
        {/each}
      </OptionSection>
    {/each}
  {/if}
  {#if selectedFormatter === "unit"}
    {#each [...numberFormatOptionsUnit] as [option, values]}
      <OptionSection header={option}>
        {#each values as value}
          {#if value !== undefined}
            <Highlight
              {onClick}
              values={{
                style: "unit",
                unit: selectedUnit,
                [option]: value,
              }}
              output={new Intl.NumberFormat(selectedLocale, {
                style: "unit",
                unit: selectedUnit,
                [option]: value,
              }).format(number)}
            />
          {/if}
        {/each}
      </OptionSection>
    {/each}
  {/if}
</Grid>

<style>
  button {
    padding: 0.5rem 1rem;
  }
</style>
