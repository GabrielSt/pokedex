import { atom } from "recoil";

export const pokeballsState = atom<number>({
  key: "pokeballsState",
  default: 5,
});
