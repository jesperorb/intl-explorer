<script lang="ts">
  import Select from "@components/Select.svelte";
  import Grid from "@components/Grid.svelte";
  import OptionSection from "@components/OptionSection.svelte";
  import Highlight from "@components/Highlight.svelte";
  import Input from "@components/Input.svelte";

  import { currencies } from "@locale-data/currencies";
  import { numberFormatOptionsCurrency } from "@options/number-format-options";
  import { copyToClipboard } from "@utils/copy-to-clipboard";

  export let selectedLocale: string;

  let selectedCurrency = "EUR";
  let number = 123456.789;

  let onClick = async (options: OptionValues) => {
    await copyToClipboard(
      `new Intl.NumberFormat("${selectedLocale}", ${JSON.stringify(
        options
      )}).format(${number})`
    );
  };
</script>

<div>
  <Select
    name="currencies"
    placeholder="Select a currency"
    label="Currency"
    bind:value={selectedCurrency}
    items={Object.entries(currencies)}
  />
  <Input id="amount" label="Amount" value={number} />
</div>

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
