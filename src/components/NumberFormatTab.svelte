<script>
  import Select from "./Select.svelte";
  import Grid from "./Grid.svelte";
  import OptionSection from "./OptionSection.svelte";
  import Highlight from "./Highlight.svelte";

  import { currenciesAsEntries } from "../locale-data/currencies";
  import { numberFormatOptionsCurrency } from "../options/number-format-options";

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
            output={new Intl.NumberFormat(selectedCurrency, {
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
    margin-bottom: 1rem;
    padding-bottom: 1rem;
  }
</style>
