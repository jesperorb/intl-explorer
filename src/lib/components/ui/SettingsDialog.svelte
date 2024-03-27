<script lang="ts">
	import Dialog from "./Dialog.svelte";
  import Radio from "./Radio.svelte"
	import { settings, settingsConfiguration, settingsKeys } from '$lib/store/settings';
	import Fieldset from "./Fieldset.svelte";
	import Spacing from "./Spacing.svelte";
	import Card from "./Card.svelte";
	import { camelCaseToWords } from "$lib/utils/format-utils";
  export let show: boolean;

  const onChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    settings.update((s) => ({
      ...s,
      [target.name]: target.value,
    }))
  }

</script>

<Dialog header="Settings" bind:show={show}>
  <div class="grid">
    {#each settingsKeys as key}
      <Card>
        {#if settingsConfiguration[key].type === "radio"}
          <Fieldset role="radiogroup" capitalize legend={camelCaseToWords(key)}>
            {#each settingsConfiguration[key].values as option}
              <Radio
                onChange={onChange}
                label={option}
                id={key + option}
                name={key}
                value={option}
                bind:group={$settings[key]}
              />
            {/each}
          </Fieldset>
        {/if}
        {#if settingsConfiguration[key].hint}
          <Spacing size={2} />
          <p class="hint">{settingsConfiguration[key].hint}</p>
        {/if}
      </Card>
    {/each}
  </div>
  <Spacing />
</Dialog>

<style>
  .grid {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2);
    min-width: 20rem;
	}

  .hint {
    font-style: italic;
  }
</style>