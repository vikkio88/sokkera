import { writable } from "svelte/store";
import { getRandomField } from "../libs/generators";
import { SIDES } from "../types/teams";
import {
  type Chunk,
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