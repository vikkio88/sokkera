<script lang="ts">
  import EmptyTile from "./EmptyTile.svelte";
  import Player from "./Player.svelte";

  import gameState, { isHighlighted } from "../store/field";
  import { SIDES } from "../types/teams";
</script>

<div class="field">
  {#each [$gameState.field[SIDES.HOME].rows, $gameState.field[SIDES.AWAY].rows] as side}
    {#each side as row}
      <div class="row">
        {#each row as chunk}
          <div class="chunk">
            {#each chunk.slots as slot, slotIndex}
              {#if slot.player}
                <Player
                  on:click={() => gameState.slotClick(chunk, slotIndex)}
                  number={slot.player.number}
                  disabled={$gameState.turn !== slot.player.team}
                  team={slot.player.team}
                />
              {:else}
                <EmptyTile highlight={isHighlighted(chunk, slotIndex)} />
              {/if}
            {/each}
          </div>
        {/each}
      </div>
    {/each}
  {/each}
</div>

<style>
  .field {
    display: flex;
    flex-direction: column;
    min-height: 90vh;
    gap: 0.1rem;
  }

  .field .row {
    display: flex;
    flex-direction: row;
    gap: 0.1rem;
    flex: 1;
  }

  .chunk {
    background-color: #d0ffd6;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    flex: 1;
  }
</style>
