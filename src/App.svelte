<script>
  import Field from "./components/Field.svelte";
  import gameState, { Phase } from "./store/field";
  import { SIDES } from "./types/teams";
</script>

<main>
  <Field />
  {#if $gameState.phase == Phase.Selection}
    <h2>Selection</h2>
  {/if}
  {#if $gameState.phase == Phase.Match}
    <button on:click={() => gameState.changeTurn()}>
      Turn: {$gameState.turn.side === SIDES.HOME ? "Home" : "Away"}</button
    >
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
