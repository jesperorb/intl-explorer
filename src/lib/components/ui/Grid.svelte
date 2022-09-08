<div>
  <slot />
</div>

<style>
  @media screen and (min-width: 70rem) {
    div {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
    }
  }
</style>
