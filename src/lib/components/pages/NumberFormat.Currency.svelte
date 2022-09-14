<script lang="ts">
  import Select from "$lib/components/ui/Select.svelte";
  import Grid from "$lib/components/ui/Grid.svelte";
  import OptionSection from "$lib/components/ui/OptionSection.svelte";
  import Highlight from "$lib/components/ui/Highlight.svelte";
  import Input from "$lib/components/ui/Input.svelte";

  import { currencies } from "$lib/locale-data/currencies";
  import { numberFormatOptionsCurrency } from "$lib/format-options/number-format.options";
  import { copyToClipboard } from "$lib/utils/copy-to-clipboard";
  import { selectedLocale } from "$lib/store/selected-locale";
import type { OptionValues } from "$lib/types/OptionValues.types";

  let selectedCurrency = "EUR";
  let number = 123456.789;

  let onClick = async (options: OptionValues) => {
    await copyToClipboard(
      `new Intl.NumberFormat("${$selectedLocale}", ${JSON.stringify(
        options
      )}).format(${number})`
    );
  };
</script>

<h2>Input values</h2>

<div>
  <Select
    name="currencies"
    placeholder="Select a currency"
    label="Currency"
    bind:value={selectedCurrency}
    items={Object.entries(currencies)}
  />
  <Input id="amount" label="Amount" bind:value={number} />
</div>

<h2>Output</h2>

<Grid>
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
            output={new Intl.NumberFormat($selectedLocale, {
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