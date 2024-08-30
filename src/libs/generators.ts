import {
  FIELD_SIDE_SIZE,
  type Chunk,
  type Field,
  type Info,
} from "../types/field";
import { SIDES } from "../types/teams";
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

export function resetFieldInfo(
  field: Field,
  check?: (c: Chunk) => boolean,
  apply?: (c: Chunk) => Chunk
) {
  for (const side of [field[SIDES.HOME], field[SIDES.AWAY]]) {
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
