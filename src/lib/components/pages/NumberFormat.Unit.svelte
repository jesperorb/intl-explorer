<script lang="ts">
  import Select from "$lib/components/ui/Select.svelte";
  import Grid from "$lib/components/ui/Grid.svelte";
  import OptionSection from "$lib/components/ui/OptionSection.svelte";
  import Highlight from "$lib/components/ui/Highlight.svelte";
  import Input from "$lib/components/ui/Input.svelte";

  import { numberFormatOptionsUnit } from "$lib/format-options/number-format.options";
  import { copyToClipboard } from "$lib/utils/copy-to-clipboard";
  import { unitsAsEntries } from "$lib/locale-data/units";
	import type { OptionValues } from "$lib/types/OptionValues.types";

	export let locale: string;

  let selectedUnit = "degree";
  let number = 123456.789;

  let onClick = async (options: OptionValues) => {
    await copyToClipboard(
      `new Intl.NumberFormat("${locale}", ${JSON.stringify(
        options
      )}).format(${number})`
    );
  };
</script>

<h2>Input values</h2>

<div>
  <Select
    name="unit"
    placeholder="Select a unit"
    label="Unit"
    bind:value={selectedUnit}
    items={unitsAsEntries}
  />
  <Input id="amount" label="Amount" bind:value={number} />
</div>

<h2>Output</h2>

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
            output={new Intl.NumberFormat(locale, {
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
