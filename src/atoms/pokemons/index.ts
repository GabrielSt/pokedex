import { atom } from "recoil";
import { Pokemon } from "../../graphql/types/pokemons";

export const pokemonsState = atom<Pokemon[]>({
  key: "pokemonsState",
  default: [],
});
