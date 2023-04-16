<script lang="ts" context="module">
  interface Option { label: string, value: string; disabled?: boolean  }
</script>
<script lang="ts">
  import { uid, onClickOutside } from "./ComboBoxContext.svelte";

  export let disabled: boolean | undefined = undefined;
  export let error: string | undefined = undefined;
  export let id = uid();
  export let label: string | undefined = "";
  export let name: string;
  export let options: Option[] = [];
  export let placeholder: string | undefined = undefined;
  export let readonly: boolean | undefined = undefined;
  export let required: boolean | undefined = undefined;
  export let value = "";

  export let filter = (text: string) => {
    const sanitized = text.trim().toLowerCase();
		return options.reduce((a, o) => {
			let match;
      if(o.label.toLowerCase().includes(sanitized)) {
				match = o;
			}
			match && a.push(match);
			return a;
		}, [] as Option[])
  };

  let listElement: HTMLUListElement;
  let inputElement: HTMLInputElement;
  let list: Option[] = [];
  let isListOpen: boolean = false;
	let selectedOption: any;

  async function onInputKeyup(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement | null;
    switch (event.key) {
      case "Escape":
      case "ArrowUp":
      case "ArrowLeft":
      case "ArrowRight":
      case "Enter":
      case "Tab":
      case "Shift":
        break;
      case "ArrowDown":
        await showList(target?.value);
        const option = listElement.querySelector(`[role="option"]:not([aria-disabled="true"])`) as HTMLElement | null;
        option?.focus();

        event.preventDefault();
        event.stopPropagation();
        break;

      default:
        await showList(target?.value);
    }
  }

  function onInputKeydown(event: KeyboardEvent) {
    let flag = false;

    switch (event.key) {
      case "Escape":
        hideList();
        flag = true;
        break;

      case "Tab":
        hideList();
        break;
    }

    if (flag) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  async function onInputClick(event: MouseEvent) {
    const target = event.target as HTMLInputElement | null;
    await showList(target?.value);
    // Scroll selected option into view.
    listElement.querySelector(`[role="option"][data-value="${value}"]`)?.scrollIntoView();
  }

  function onOptionClick(event: MouseEvent) {
    const target = event.target as HTMLElement | null;
		if (!target?.matches(`[role="option"]:not([aria-disabled="true"])`)) {
      return;
    }
		
		selectOption(target);
		hideList();
  }

  function onListKeyDown(event: KeyboardEvent) {
    let flag = false;
    const target = event.target as HTMLElement | null;

    switch (event.key) {
      case "ArrowUp":
        let prevOptionElement = target?.previousElementSibling as HTMLElement | null;

        while (prevOptionElement) {
          if (prevOptionElement.matches(`[role="option"]:not([aria-disabled="true"])`)) break;
          prevOptionElement = prevOptionElement.previousElementSibling as HTMLElement | null;
        }

        prevOptionElement?.focus();
        flag = true;
        break;

      case "ArrowDown":
        let nextOptionElement = target?.nextElementSibling as HTMLElement | null;

        while (nextOptionElement) {
          if (nextOptionElement.matches(`[role="option"]:not([aria-disabled="true"])`)) break;
          nextOptionElement = nextOptionElement.nextElementSibling as HTMLElement | null;
        }

        nextOptionElement?.focus();
        flag = true;
        break;

      case "Enter":
        selectOption(target);
        hideList();
        flag = true;
        break;

      case "Escape":
        hideList();
        flag = true;
        break;

      case "Tab":
        hideList();
        break;

      default:
        inputElement.focus();
    }

    if (flag) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  async function showList(inputValue: string | undefined) {
    const isExactMatch = options.some((o) =>
       o.label === inputValue
    );

    list = inputValue === "" || isExactMatch ? options : filter(inputValue ?? "");
		isListOpen = true;
  }

  function hideList() {
    if (!isListOpen) return;

    if (selectedOption) {
      inputElement.value = selectedOption.text;
    }

    isListOpen = false;
    inputElement.focus();
  }

  function selectOption(optionElement: HTMLElement | null) {
		value = optionElement?.dataset.value ?? "";
		
    selectedOption = {
      text: optionElement?.dataset.text ?? "",
      value: optionElement?.dataset.value ?? ""
    };
	}
</script>

<div class="combobox">
  <label class="combobox__label label" for={id}>
    {label}
    {#if error}
      <span class="form-validation-error">
        {error}
      </span>
    {/if}
  </label>

  <div class="input-container" use:onClickOutside={hideList}>
    <slot name="icon-start" />

    <input
      bind:this={inputElement}
      on:focus
      on:blur
      on:input
      on:keyup={onInputKeyup}
      on:keydown={onInputKeydown}
      on:mousedown={onInputClick}
      class="combobox__input"
      {id}
      {name}
      type="text"
      {disabled}
      autocapitalize="none"
      autocomplete="off"
      {readonly}
      {placeholder}
      spellcheck="false"
			role="combobox"
			aria-autocomplete="list"
			aria-expanded={isListOpen}
      aria-controls=""
      aria-required={required ? "true" : undefined}
    />

    <ul
      class="combobox__list"
      role="listbox"
			aria-label={label}
      hidden={!isListOpen}
      on:click={onOptionClick}
      on:keydown={onListKeyDown}
      bind:this={listElement}
    >
      {#each list as option (option)}
          <li
            class="list__option"
						class:--disabled={option.disabled}
            role="option"
            tabindex={option.disabled === true ? undefined : -1}
            data-text={option.label}
            data-value={option.value}
            aria-selected={value === option.value}
						aria-disabled={option.disabled}
          >
            	<slot name="option" {option}>
                {option.label}
              </slot>
							{#if option.value === value}
                <svg viewBox="0 0 24 24" class="icon">
  								<polyline points="20 6 9 17 4 12"></polyline>
								</svg>
              {/if}
          </li>
			{:else}
				<li class="list__no-results">
					No results available
				</li>
      {/each}
    </ul>

    <div class="visually-hidden" role="status" aria-live="polite">
      {list.length} results available.
    </div>
  </div>
</div>

<style>
	.combobox {
		--accent-color: #06113C;
		--background-color: white;
		--border-radius: 1em;
		
		--option-border: ;
		--option-padding: ;
		
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}
	
  .input-container {
    position: relative;
  }
	
	.combobox__input {
		margin: 0;
		width: 100%;
		padding: 0.8rem 1rem;
		border: 0.175rem solid gray;
		border-radius: 0.3rem;
	}
	
	.combobox__input:focus {
		outline: none;
	}
	
	.combobox:focus-within .combobox__input {
		border-color: var(--accent-color);
	}

  .combobox__list {
		/* Reset */
		list-style: none;
		margin: 0;
    padding: 0.3rem;
		/* Position and Size */
    position: absolute;
    inset-inline-start: 0;
    inset-block-start: calc(100% + 0.3rem);
		min-width: 100%;
		max-height: 40vh;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
    z-index: 100;
    
    background-color: var(--background-color);
    border-radius: 0.3em;
		border: 0.175rem solid var(--accent-color);
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;    
  }
	
	.list__no-results {
		padding: 0.8rem 1rem;
	}

  .list__option {
    display: flex;
    align-items: center;
    justify-content: space-between;
		padding: 0.8rem 1rem;
		border: 0.2rem solid transparent;
		border-radius: 0.3rem;
  }

  .list__option > :global(*) {
    pointer-events: none;
  }
	
	.list__option.--disabled {
		pointer-events: none;
		opacity: 0.4;
	}

  .list__option:focus,
  .list__option:not([aria-disabled="true"]):hover {
		outline: none;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
  }
	
	.list__option:active {
    cursor: pointer;
    outline: none;
    color: white;
    background-color: var(--accent-color) !important;
  }

  .list__option:focus :global(svg),
  .list__option:hover :global(svg) {
    --icon-color: white !important;
  }
</style>
