import { test, expect, describe } from "vitest";
import { getAdjacentSlots, toCell, toChunkCell } from "./field";
import type { Chunk, ChunkCell, Slot } from "../types/field";
import { SIDES } from "../types/teams";

// make a chunk
const c = (
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

// make a slot
const s = (
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

describe("slots utils", () => {
  test("coordinates conversion Chunk & SlotIndex to Cell", () => {
    // first chunk
    let testChunk = c(0, 0);
    expect(toCell(testChunk, 0)).toEqual({ i: 0, j: 0 });
    expect(toCell(testChunk, 1)).toEqual({ i: 0, j: 1 });
    expect(toCell(testChunk, 2)).toEqual({ i: 1, j: 0 });
    expect(toCell(testChunk, 3)).toEqual({ i: 1, j: 1 });

    // first row second column
    testChunk = c(0, 1);
    expect(toCell(testChunk, 0)).toEqual({ i: 0, j: 2 });
    expect(toCell(testChunk, 1)).toEqual({ i: 0, j: 3 });
    expect(toCell(testChunk, 2)).toEqual({ i: 1, j: 2 });
    expect(toCell(testChunk, 3)).toEqual({ i: 1, j: 3 });

    // second row
    testChunk = c(1, 0);
    expect(toCell(testChunk, 0)).toEqual({ i: 2, j: 0 });

    // Edge
    testChunk = c(3, 0);
    expect(toCell(testChunk, 0)).toEqual({ i: 6, j: 0 });

    // Other side
    // first row
    testChunk = c(0, 0, SIDES.AWAY);
    expect(toCell(testChunk, 0)).toEqual({ i: 8, j: 0 });
    expect(toCell(testChunk, 1)).toEqual({ i: 8, j: 1 });
    expect(toCell(testChunk, 2)).toEqual({ i: 9, j: 0 });
    expect(toCell(testChunk, 3)).toEqual({ i: 9, j: 1 });

    testChunk = c(0, 2, SIDES.AWAY);
    expect(toCell(testChunk, 0)).toEqual({ i: 8, j: 4 });
    expect(toCell(testChunk, 1)).toEqual({ i: 8, j: 5 });
  });

  test("coordinates conversion Cell to ChunkCell", () => {
    let testCell = { i: 0, j: 0 };
    expect(toChunkCell(testCell)).toEqual({
      i: 0,
      j: 0,
      side: SIDES.HOME,
      slotIndex: 0,
    });

    testCell = { i: 0, j: 1 };
    expect(toChunkCell(testCell)).toEqual({
      i: 0,
      j: 0,
      side: SIDES.HOME,
      slotIndex: 1,
    });

    testCell = { i: 1, j: 0 };
    expect(toChunkCell(testCell)).toEqual({
      i: 0,
      j: 0,
      side: SIDES.HOME,
      slotIndex: 2,
    });

    testCell = { i: 1, j: 1 };
    expect(toChunkCell(testCell)).toEqual({
      i: 0,
      j: 0,
      side: SIDES.HOME,
      slotIndex: 3,
    });

    testCell = { i: 0, j: 2 };
    expect(toChunkCell(testCell)).toEqual({
      i: 0,
      j: 1,
      side: SIDES.HOME,
      slotIndex: 0,
    });

    testCell = { i: 0, j: 3 };
    expect(toChunkCell(testCell)).toEqual({
      i: 0,
      j: 1,
      side: SIDES.HOME,
      slotIndex: 1,
    });

    testCell = { i: 2, j: 0 };
    expect(toChunkCell(testCell)).toEqual({
      i: 1,
      j: 0,
      side: SIDES.HOME,
      slotIndex: 0,
    });

    testCell = { i: 6, j: 0 };
    expect(toChunkCell(testCell)).toEqual({
      i: 3,
      j: 0,
      side: SIDES.HOME,
      slotIndex: 0,
    });

    testCell = { i: 8, j: 0 };
    expect(toChunkCell(testCell)).toEqual({
      i: 0,
      j: 0,
      side: SIDES.AWAY,
      slotIndex: 0,
    });

    testCell = { i: 8, j: 1 };
    expect(toChunkCell(testCell)).toEqual({
      i: 0,
      j: 0,
      side: SIDES.AWAY,
      slotIndex: 1,
    });

    testCell = { i: 9, j: 0 };
    expect(toChunkCell(testCell)).toEqual({
      i: 0,
      j: 0,
      side: SIDES.AWAY,
      slotIndex: 2,
    });

    testCell = { i: 9, j: 1 };
    expect(toChunkCell(testCell)).toEqual({
      i: 0,
      j: 0,
      side: SIDES.AWAY,
      slotIndex: 3,
    });

    testCell = { i: 8, j: 4 };
    expect(toChunkCell(testCell)).toEqual({
      i: 0,
      j: 2,
      side: SIDES.AWAY,
      slotIndex: 0,
    });

    testCell = { i: 8, j: 5 };
    expect(toChunkCell(testCell)).toEqual({
      i: 0,
      j: 2,
      side: SIDES.AWAY,
      slotIndex: 1,
    });
  });

  test("adjacent slots", () => {
    // top left
    let chunk = c(0, 0);
    // top left slot
    expect(getAdjacentSlots(chunk, 0)).toEqual([
      s(0, 0, 1),
      s(0, 0, 2),
      s(0, 0, 3),
    ]);

    // top right
    chunk = c(0, 3);
    // top right slot
    expect(getAdjacentSlots(chunk, 1)).toEqual([
      s(0, 3, 0),
      s(0, 3, 2),
      s(0, 3, 3),
    ]);
  });
});
