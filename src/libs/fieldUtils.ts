import { SIDES } from "../types/teams";
import {
  type Chunk,
  type ChunkCell,
  type Cell,
  CHUNK_BORDER_SIZE,
  HALF_FIELD_CHUNKS_SIZE,
  FIELD_SIDE_SIZE,
  FIELD_CHUNKS_SIZE,
  type Slot,
} from "../types/field";

// make a chunk
export const ck = (
  i: number,
  j: number,
  s = SIDES.HOME,
  slots: Slot[] = []
): Chunk => ({
  i,
  j,
  side: s,
  slots,
});

/**
 * Create a ChunkCell from i,j,slotIndex and Side
 */
export const cc = (
  i: number,
  j: number,
  s: number,
  side: SIDES = SIDES.HOME
): ChunkCell => ({
  i,
  j,
  slotIndex: s,
  side,
});

/**
 * Create ChunkCell from chunk and slotIndex
 */
export const ccc = (c: Chunk, slotIndex: number): ChunkCell => ({
  i: c.i,
  j: c.j,
  slotIndex,
  side: c.side,
});

// make a cell
export const c = (i: number, j: number): Cell => ({ i, j });

export function getAdjacentChunkCells(
  chunk: Chunk,
  slotIndex: number,
  distance: number = 1
): ChunkCell[] {
  return getAdjacentCells(toCell(chunk, slotIndex), distance).map(toChunkCell);
}

export function getAdjacentCells(cell: Cell, distance: number = 1): Cell[] {
  const { i, j } = cell;
  const rows = FIELD_CHUNKS_SIZE;
  const cols = CHUNK_BORDER_SIZE * FIELD_SIDE_SIZE;
  const cells: Cell[] = [];

  if (i < 0 || j < 0 || i > rows || j > cols) {
    return cells;
  }

  for (let di = -distance; di <= distance; di++) {
    for (let dj = -distance; dj <= distance; dj++) {
      const ni = i + di;
      const nj = j + dj;

      // Ensure the new coordinates are within the bounds of the matrix
      if (
        ni >= 0 &&
        ni < rows &&
        nj >= 0 &&
        nj < cols &&
        // make sure itself is not a point
        !(nj === j && ni === i)
      ) {
        cells.push({ i: ni, j: nj });
      }
    }
  }

  return cells;
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
  const adjustedI =
    side === SIDES.AWAY ? cell.i - HALF_FIELD_CHUNKS_SIZE : cell.i;

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

export function isSameCellChunk(a: ChunkCell | null, b: ChunkCell): boolean {
  if (!a) {
    return false;
  }
  const { i, j, slotIndex, side } = a;

  return b.i === i && b.j === j && b.slotIndex === slotIndex && b.side == side;
}
