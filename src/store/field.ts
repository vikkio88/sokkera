import { writable } from "svelte/store";
import { getRandomField, info, resetFieldInfo } from "../libs/generators";
import { SIDES } from "../types/teams";
import { type Chunk } from "../types/field";
import { getAdjacentChunkCells } from "../libs/fieldUtils";

const { subscribe, update } = writable({
  field: getRandomField(),
  turn: SIDES.HOME,
});

export function isHighlighted(chunk: Chunk, index: number): boolean {
  return chunk.slots[index]?.info?.isHighlighted ?? false;
}

export default {
  subscribe,
  slotClick(chunk: Chunk, slotIndex: number) {
    const cC = getAdjacentChunkCells(chunk, slotIndex, 2);
    update((state) => {
      const newField = state.field;
      resetFieldInfo(newField);
      for (const c of cC) {
        newField[c.side].rows[c.i][c.j].slots[c.slotIndex].info = info(true);
      }
      return { ...state, field: newField };
    });
  },
};
