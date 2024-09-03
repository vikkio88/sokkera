import { writable } from "svelte/store";
import { getEmptyField, info, FieldManager } from "../libs/generators";
import { SIDES, type Player } from "../types/teams";
import { type Chunk, type ChunkCell, type Field } from "../types/field";
import {
  cc,
  ccc,
  getAdjacentChunkCells,
  isSameCellChunk,
} from "../libs/fieldUtils";

type Turn = {
  side: SIDES;
  movedPlayers: Player[];
};

type FieldState = {
  field: Field;
  selected: ChunkCell | null;
  turn: Turn;
};

const { subscribe, update } = writable<FieldState>({
  field: getEmptyField(),
  selected: null,
  turn: {
    side: SIDES.HOME,
    movedPlayers: [],
  },
});

export function isHighlighted(chunk: Chunk, index: number): boolean {
  return chunk.slots[index]?.info?.isHighlighted ?? false;
}

export function canBeClicked(
  chunk: Chunk,
  slotIndex: number,
  turn: Turn
): boolean {
  const slotPlayer = chunk.slots[slotIndex].player ?? null;
  if (slotPlayer) {
    return (
      turn.side !== slotPlayer.team ||
      turn.movedPlayers.some(
        (p) => p.number === slotPlayer.number && slotPlayer.number === p.number
      )
    );
  }

  return true;
}

export default {
  subscribe,
  changeTurn() {
    update((state) => {
      const side = state.turn.side === SIDES.AWAY ? SIDES.HOME : SIDES.AWAY;
      const movedPlayers: Player[] = [];
      return {
        ...state,
        turn: {
          ...state.turn,
          side,
          movedPlayers,
        },
      };
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

      let movedPlayers = [...state.turn.movedPlayers];

      movedPlayers = [...movedPlayers, slotOrigin.player];
      fieldMgr.movePlayer(state.selected, ccc(chunk, slotIndex));
      fieldMgr.resetInfo();

      return {
        ...state,
        field: fieldMgr.toField(),
        selected: null,
        turn: {
          ...state.turn,
          // side: state.turn.side === SIDES.AWAY ? SIDES.HOME : SIDES.AWAY, // check if moved all the players
          movedPlayers,
        },
      };
    });
  },
};
