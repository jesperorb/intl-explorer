<script lang="ts">
  import Grid from "../Grid.svelte";
  import OptionSection from "../OptionSection.svelte";
  import Highlight from "../Highlight.svelte";
  import { listFormatOptions } from "../../options/list-format-options";
  import type { OptionValues } from "../../types/option-values";
  import { copyToClipboard } from "../../utils/copyToClipboard";
import Input from "../Input.svelte";

  const toArray = (string: string) => string.split(",");
  const toStyle = (string: string | boolean | number) => string as Intl.Style;

  export let selectedLocale: string;

  let list = "Miso,Sesam,Mami";

  let onClick = async (options: OptionValues) => {
    await copyToClipboard(
      `new Intl.ListFormat("${selectedLocale}", ${JSON.stringify(options)}).format([])`
    );
  };
</script>

<div>
  <Input id="list" label="List" value={list} />
</div>

<Grid>
  {#each [...listFormatOptions] as [option, values]}
    <OptionSection header={option}>
      {#each values as value}
        {#if value !== undefined}
          <Highlight
            {onClick}
            values={{ [option]: value }}
            output={new Intl.ListFormat(selectedLocale, {
              [option]: value,
            }).format(toArray(list))}
          />
        {/if}
      {/each}
    </OptionSection>
  {/each}
  <OptionSection header={"conjunction + style"}>
    {#each listFormatOptions.get("style") as value}
      {#if value !== undefined}
        <Highlight
          values={{
            type: "conjunction",
            style: value,
          }}
          output={new Intl.ListFormat(selectedLocale, {
            type: "conjunction",
            style: toStyle(value),
          }).format(toArray(list))}
        />
      {/if}
    {/each}
  </OptionSection>
  <OptionSection header={"disjunction + style"}>
    {#each listFormatOptions.get("style") as value}
      {#if value !== undefined}
        <Highlight
          values={{
            type: "disjunction",
            style: value,
          }}
          output={new Intl.ListFormat(selectedLocale, {
            type: "disjunction",
            style: toStyle(value),
          }).format(toArray(list))}
        />
      {/if}
    {/each}
  </OptionSection>
  <OptionSection header={"unit + style"}>
    {#each listFormatOptions.get("style") as value}
      {#if value !== undefined}
        <Highlight
          values={{
            type: "unit",
            style: value,
          }}
          output={new Intl.ListFormat(selectedLocale, {
            type: "unit",
            style: toStyle(value),
          }).format(toArray(list))}
        />
      {/if}
    {/each}
  </OptionSection>
</Grid>
