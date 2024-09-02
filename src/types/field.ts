import { SIDES, type Player } from "./teams";

export type Ball = {
  stopped: boolean;
};

export const FIELD_SIDE_SIZE = 4;
export const CHUNK_SLOTS_SIZE = 4;
export const CHUNK_BORDER_SIZE = CHUNK_SLOTS_SIZE / 2;
export const HALF_FIELD_CHUNKS_SIZE = CHUNK_BORDER_SIZE * FIELD_SIDE_SIZE;
export const FIELD_CHUNKS_SIZE = HALF_FIELD_CHUNKS_SIZE * 2;

export interface Field {
  [SIDES.HOME]: FieldHalf;
  [SIDES.AWAY]: FieldHalf;
}

export type FieldHalf = {
  rows: Chunk[][];
};

export type Chunk = { side: SIDES; i: number; j: number; slots: Slot[] };

export type Slot = {
  player?: Player;
  ball?: Ball;
  info?: Info;
};

export type Info = {
  isHighlighted: boolean;
};

export type ChunkCell = {
  i: number;
  j: number;
  side: SIDES;
  slotIndex: number;
};

export type Cell = {
  i: number;
  j: number;
};
