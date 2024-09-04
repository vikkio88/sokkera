<script>
  import Field from "./components/Field.svelte";
  import Padded from "./components/shared/Padded.svelte";
  import gameState, { Phase } from "./store/field";
  import { SIDES } from "./types/teams";
</script>

<main>
  <Padded>
    {#if $gameState.phase == Phase.Selection}
      <h2>Selection</h2>
    {/if}
  </Padded>
  <Field />
  <Padded>
    {#if $gameState.phase == Phase.Match}
      <button on:click={() => gameState.changeTurn()}>
        Turn: {$gameState.turn.side === SIDES.HOME ? "Home" : "Away"}</button
      >
    {/if}
  </Padded>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    
    /* Should set this if mobile layout */
    /* align-items: center; */
  }
</style>
