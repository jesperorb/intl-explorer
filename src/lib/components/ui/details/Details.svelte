<script lang="ts">
	import ChevronUp from "$lib/components/ui/icons/ChevronUp.svelte";

  export let open: boolean | undefined = undefined;
  export let id: string | undefined = undefined;
  export let fullWidth: boolean | undefined = true;
</script>

<details open={open} id={id} class:fullWidth={fullWidth}>
  <summary>
    <span class="summary-title">
      <slot name="summary"></slot>
    </span>
    <div class="summary-icon" aria-hidden><ChevronUp/></div>
  </summary>
  <div>
    <slot></slot>
  </div>
</details>  

<style>
  details {
    position: relative;
    border: 1px solid var(--lightergray);
    padding: var(--spacing-2);
    border-radius: 4px;
    display: inline-block;
  }

  .fullWidth {
    display: block;
  }

  details[open] > summary {
    padding-bottom: var(--spacing-4);
    margin-bottom: var(--spacing-4);
    border-bottom: 1px solid var(--lightergray);
  }

  details[open] .summary-icon {
    transform: rotate(180deg);
  }

	.summary-title {
		user-select: none;
	}
  .summary-icon {
    pointer-events: none;
    opacity: 0.5;
    transition: all 300ms;
    width: 24px;
    height: 24px;
  }
  summary {
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  summary::-webkit-details-marker {
		display: none;
	}
  summary:hover {
		cursor: pointer;
	}
  summary:hover > .summary-icon {
    opacity: 1;
  }
</style>