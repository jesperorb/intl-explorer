<script lang="ts">
  import Grid from "@components/Grid.svelte";
  import OptionSection from "@components/OptionSection.svelte";
  import Highlight from "@components/Highlight.svelte";
  import Input from "@components/Input.svelte";

  import { listFormatOptions } from "@options/list-format-options";
  import { copyToClipboard } from "@utils/copy-to-clipboard";

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
