<script lang="ts">
  import EmptyTile from "./EmptyTile.svelte";
  import Player from "./Player.svelte";

  import gameState, { canBeClicked, isHighlighted } from "../store/field";
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
                  on:click={() => gameState.onPlayerSlotClick(chunk, slotIndex)}
                  number={slot.player.number}
                  disabled={canBeClicked(chunk, slotIndex, $gameState.turn)}
                  team={slot.player.team}
                />
              {:else}
                <EmptyTile
                  highlight={isHighlighted(chunk, slotIndex)}
                  on:click={() => gameState.onSlotClick(chunk, slotIndex)}
                />
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
    flex: 6;
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
    background-color: var(--field-bg-color);
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    flex: 1;
  }
</style>
