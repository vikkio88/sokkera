import {
  FIELD_SIDE_SIZE,
  type Ball,
  type Chunk,
  type ChunkCell,
  type Field,
  type FieldHalf,
  type Info,
  type Slot,
} from "../types/field";
import { SIDES, type Player } from "../types/teams";
import { maybe } from "./random";

function getRandomPlayer() {
  return {
    team: Math.random() < 0.5 ? SIDES.HOME : SIDES.AWAY,
    number: Math.floor(Math.random() * 98) + 2,
  };
}

export function info(isHighlighted: boolean = false): Info {
  return { isHighlighted };
}

export function getRandomField(): Field {
  const r = Array.from({ length: FIELD_SIDE_SIZE });
  return {
    [SIDES.HOME]: {
      rows: r.map((_, i) => r.map((_, j) => getRandomChunk(i, j, SIDES.HOME))),
    },
    [SIDES.AWAY]: {
      rows: r.map((_, i) => r.map((_, j) => getRandomChunk(i, j, SIDES.AWAY))),
    },
  };
}
function getRandomChunk(i: number, j: number, side: SIDES): Chunk {
  return {
    side: side,
    i,
    j,
    slots: [
      { player: maybe(0.1) ? getRandomPlayer() : undefined, info: info() },
      { player: maybe(0.1) ? getRandomPlayer() : undefined, info: info() },
      { player: maybe(0.1) ? getRandomPlayer() : undefined, info: info() },
      { player: maybe(0.1) ? getRandomPlayer() : undefined, info: info() },
    ],
  };
}

export class FieldManager implements Field {
  [SIDES.HOME]: FieldHalf;
  [SIDES.AWAY]: FieldHalf;

  constructor(field: Field) {
    this[SIDES.HOME] = field[SIDES.HOME];
    this[SIDES.AWAY] = field[SIDES.AWAY];
  }

  resetInfo(check?: (c: Chunk) => boolean, apply?: (c: Chunk) => Chunk) {
    for (const side of [this[SIDES.HOME], this[SIDES.AWAY]]) {
      for (const row of side.rows) {
        for (const chunk of row) {
          chunk.slots.forEach((s) => (s.info = info()));
          if (check && apply && check(chunk)) {
            apply(chunk);
          }
        }
      }
    }
  }

  getSlot(c: ChunkCell): Slot {
    return this[c.side].rows[c.i][c.j].slots[c.slotIndex];
  }

  setSlotInfo(c: ChunkCell, info: Info) {
    const slot = this.getSlot(c);
    if (!slot) {
      return;
    }
    slot.info = info;
    this[c.side].rows[c.i][c.j].slots[c.slotIndex] = { ...slot };
  }

  movePlayer(from: ChunkCell, to: ChunkCell) {
    const fromSlot = this.getSlot(from);
    this.setSlot(to, fromSlot.player, fromSlot.ball);
    this.setSlot(from);
  }

  setSlot(c: ChunkCell, player?: Player, ball?: Ball) {
    const slot = this.getSlot(c);
    if (!slot) {
      return;
    }
    slot.player = player;
    slot.ball = ball;
    this[c.side].rows[c.i][c.j].slots[c.slotIndex] = { ...slot };
  }


  toField(): Field {
    return {
      [SIDES.HOME]: this[SIDES.HOME],
      [SIDES.AWAY]: this[SIDES.AWAY],
    };
  }
}
