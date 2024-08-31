import { writable } from "svelte/store";
import { getRandomField, info, resetFieldInfo } from "../libs/generators";
import { SIDES } from "../types/teams";
import { type Chunk, type ChunkCell, type Field } from "../types/field";
import { cc, getAdjacentChunkCells, isSameCellChunk } from "../libs/fieldUtils";
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
  slotClick(chunk: Chunk, slotIndex: number) {
    const cellChunk = cc(chunk.i, chunk.j, slotIndex, chunk.side);
    const cC = getAdjacentChunkCells(chunk, slotIndex, 2);
    update((state) => {
      const clickedSelected = isSameCellChunk(state.selected, cellChunk);
      const newField = state.field;
      resetFieldInfo(newField);
      if (!clickedSelected) {
        for (const c of cC) {
          newField[c.side].rows[c.i][c.j].slots[c.slotIndex].info = info(true);
        }
      }

      return {
        ...state,
        field: newField,
        selected: clickedSelected ? null : cellChunk,
      };
    });
  },
};
