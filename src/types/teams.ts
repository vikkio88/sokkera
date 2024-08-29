export enum SIDES {
  HOME,
  AWAY,
}

export type Player = {
  number: number;
  team: SIDES;
};