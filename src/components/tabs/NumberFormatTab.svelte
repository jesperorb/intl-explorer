<script lang="ts">
  import Select from "../Select.svelte";
  import Grid from "../Grid.svelte";
  import OptionSection from "../OptionSection.svelte";
  import Highlight from "../Highlight.svelte";

  import { currenciesAsEntries } from "../../locale-data/currencies";
  import { numberFormatOptionsCurrency } from "../../options/number-format-options";

  export let selectedLocale: string;

  let selectedCurrency = "EUR";
  let number = 123456.789;
</script>

<div class="options">
  <Select
    name="currencies"
    placeholder="Select a currency"
    label="Currency"
    bind:value={selectedCurrency}
    items={currenciesAsEntries}
  />
  <label for="amount">Amount</label>
  <input type="text" bind:value={number} id="amount" />
</div>

<Grid>
  {#each [...numberFormatOptionsCurrency] as [option, values]}
    <OptionSection header={option}>
      {#each values as value}
        {#if value !== undefined}
          <Highlight
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
</Grid>

<style>
  .options {
    padding-bottom: 1rem;
  }
</style>
