import { writable } from "svelte/store";
import { getRandomField } from "../libs/generators";
import { SIDES } from "../types/teams";
import {
  type Chunk,
  type ChunkCell,
  type Cell,
  CHUNK_BORDER_SIZE,
  HALF_FIELD_CHUNKS_SIZE,
  FIELD_SIDE_SIZE,
  FIELD_CHUNKS_SIZE,
} from "../types/field";

type Config = {
  [SIDES.HOME]: any;
  [SIDES.AWAY]: any;
};

const emptyConfig = (): Config => ({
  [SIDES.HOME]: {},
  [SIDES.AWAY]: {},
});

const { subscribe, update } = writable({
  field: getRandomField(),
  info: { highlighted: emptyConfig(), clickable: emptyConfig() },
  turn: SIDES.HOME,
});

export function isHighlighted(
  config: Config,
  chunk: Chunk,
  index: number
): boolean {
  return config[chunk.side]?.[chunk.i]?.[chunk.j]?.[index];
}

export default {
  subscribe,
  slotClick(chunk: Chunk, slotIndex: number) {
    console.log({ chunk, slotIndex });
    update((state) => ({
      ...state,
      info: { ...state.info, highlighted: emptyConfig() },
    }));
  },
};

export function getAdjacentSlots(chunk: Chunk, slotIndex: number): Cell[] {
  const n = CHUNK_BORDER_SIZE * FIELD_SIDE_SIZE;
  const m = FIELD_CHUNKS_SIZE;

  const v: Cell[] = [];
  const { i, j } = toCell(chunk, slotIndex);

  if (isValidPos(i - 1, j - 1, n, m)) v.push({ i: i - 1, j: j - 1 });
  if (isValidPos(i - 1, j, n, m)) v.push({ i: i - 1, j: j });
  if (isValidPos(i - 1, j + 1, n, m)) v.push({ i: i - 1, j: j + 1 });
  if (isValidPos(i, j - 1, n, m)) v.push({ i: i, j: j - 1 });
  if (isValidPos(i, j + 1, n, m)) v.push({ i: i, j: j + 1 });
  if (isValidPos(i + 1, j - 1, n, m)) v.push({ i: i + 1, j: j - 1 });
  if (isValidPos(i + 1, j, n, m)) v.push({ i: i + 1, j: j });
  if (isValidPos(i + 1, j + 1, n, m)) v.push({ i: i + 1, j: j + 1 });

  return v;
}

export function getAdjacentSlotsWithDistance(
  chunk: Chunk,
  slotIndex: number,
  distance: number = 1
): Cell[] {
  if (distance == 1) {
    return getAdjacentSlots(chunk, slotIndex);
  }

  const n = CHUNK_BORDER_SIZE * FIELD_SIDE_SIZE;
  const m = FIELD_CHUNKS_SIZE;

  const v: Cell[] = [];
  const { i, j } = toCell(chunk, slotIndex);

  for (let di = -distance; di <= distance; di++) {
    for (let dj = -distance; dj <= distance; dj++) {
      if (Math.abs(di) + Math.abs(dj) <= distance) {
        const newI = i + di;
        const newJ = j + dj;
        if (isValidPos(newI, newJ, n, m)) {
          v.push({ i: newI, j: newJ });
        }
      }
    }
  }

  return v;
}

function isValidPos(i: number, j: number, n: number, m: number): boolean {
  return i >= 0 && j >= 0 && i < n && j < m;
}

const SLOT_INDEX_MAP = [
  { i: 0, j: 0 },
  { i: 0, j: 1 },
  { i: 1, j: 0 },
  { i: 1, j: 1 },
];

export function toCell(chunk: Chunk, slotIndex: number): Cell {
  let { i, j, side } = chunk;

  const mappedIndex = SLOT_INDEX_MAP[slotIndex] ?? SLOT_INDEX_MAP[0];

  i = i * CHUNK_BORDER_SIZE + mappedIndex.i;
  if (side == SIDES.AWAY) {
    i += HALF_FIELD_CHUNKS_SIZE;
  }

  j = mappedIndex.j + j * CHUNK_BORDER_SIZE;
  return { i, j };
}

export function toChunkCell(cell: Cell): ChunkCell {
  const side = cell.i >= HALF_FIELD_CHUNKS_SIZE ? SIDES.AWAY : SIDES.HOME;
  const adjustedI = side === SIDES.AWAY ? cell.i - HALF_FIELD_CHUNKS_SIZE : cell.i;

  const chunkI = Math.floor(adjustedI / CHUNK_BORDER_SIZE);
  const chunkJ = Math.floor(cell.j / CHUNK_BORDER_SIZE);

  const localI = adjustedI % CHUNK_BORDER_SIZE;
  const localJ = cell.j % CHUNK_BORDER_SIZE;

  const slotIndex = SLOT_INDEX_MAP.findIndex(
    (index) => index.i === localI && index.j === localJ
  );

  return {
    i: chunkI,
    j: chunkJ,
    side,
    slotIndex: slotIndex >= 0 ? slotIndex : 0,
  };
}
