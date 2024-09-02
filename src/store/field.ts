import { writable } from "svelte/store";
import { getRandomField, info, FieldManager } from "../libs/generators";
import { SIDES } from "../types/teams";
import { type Chunk, type ChunkCell, type Field } from "../types/field";
import {
  cc,
  ccc,
  getAdjacentChunkCells,
  isSameCellChunk,
} from "../libs/fieldUtils";
type FieldState = {
  field: Field;
  selected: ChunkCell | null;
  turn: SIDES;
};

const { subscribe, update } = writable<FieldState>({
  field: getRandomField(),
  selected: null,
  turn: SIDES.HOME,
});

export function isHighlighted(chunk: Chunk, index: number): boolean {
  return chunk.slots[index]?.info?.isHighlighted ?? false;
}

export default {
  subscribe,
  changeTurn() {
    update((state) => {
      state.turn = state.turn === SIDES.AWAY ? SIDES.HOME : SIDES.AWAY;
      return state;
    });
  },
  onPlayerSlotClick(chunk: Chunk, slotIndex: number) {
    const cellChunk = cc(chunk.i, chunk.j, slotIndex, chunk.side);
    const cC = getAdjacentChunkCells(chunk, slotIndex, 2);
    update((state) => {
      const clickedSelected = isSameCellChunk(state.selected, cellChunk);
      const fieldMgr = new FieldManager(state.field);
      fieldMgr.resetInfo();
      if (!clickedSelected) {
        for (const c of cC) {
          fieldMgr.setSlotInfo(c, info(true));
        }
      }

      return {
        ...state,
        field: fieldMgr.toField(),
        selected: clickedSelected ? null : cellChunk,
      };
    });
  },
  onSlotClick(chunk: Chunk, slotIndex: number) {
    update((state) => {
      if (!state.selected) {
        return state;
      }

      const fieldMgr = new FieldManager(state.field);
      console.log(`clicked on`, {
        cc: ccc(chunk, slotIndex),
        selected: state.selected,
      });

      const slotOrigin = fieldMgr.getSlot(state.selected);

      if (!slotOrigin.player) {
        return state;
      }

      fieldMgr.movePlayer(
        state.selected,
        ccc(chunk, slotIndex)
      )
      fieldMgr.resetInfo();

      return {
        ...state,
        field: fieldMgr.toField(),
        selected: null,
        turn: state.turn === SIDES.AWAY ? SIDES.HOME : SIDES.AWAY,
      };
    });
  },
};
