<script lang="ts">
  export let highlight: boolean = false;
</script>

<button
  class="no-button emptyTile"
  class:highlight
  on:click
  disabled={!highlight}
>
</button>

<style>
  .emptyTile {
    padding: 1rem;
    margin: 0.1rem;
    border-radius: 0.5rem;
    height: 1rem;
    width: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
    background-color: var(--field-bg-color2);

    align-self: center;
    justify-self: center;
  }

  .emptyTile:disabled {
    cursor: not-allowed;
  }

  .highlight {
    background-color: orange;
    opacity: 0.5;
  }

  @media (max-width: 767px) {
    .emptyTile {
      height: 1rem;
      width: 1rem;
      font-size: 1.1rem;
    }
  }
</style>
