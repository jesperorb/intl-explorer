<script lang="ts">
  import Select from "../Select.svelte";
  import Grid from "../Grid.svelte";
  import OptionSection from "../OptionSection.svelte";
  import Highlight from "../Highlight.svelte";

  import {
    numberFormatOptionsUnit,
  } from "../../options/number-format-options";
  import type { OptionValues } from "../../types/option-values";
  import { copyToClipboard } from "../../utils/copyToClipboard";
  import { unitsAsEntries } from "../../locale-data/units";
import Input from "../Input.svelte";

  export let selectedLocale: string;

  let selectedUnit = "degree";
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
      name="unit"
      placeholder="Select a unit"
      label="Unit"
      bind:value={selectedUnit}
      items={unitsAsEntries}
    />
    <Input id="amount" label="Amount" value={number} />
</div>

<Grid>
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
</Grid>