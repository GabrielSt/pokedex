import { useQuery } from "@apollo/client";
import { pokemonsQuery } from "../queries/pokemons";
import { Pokemon } from "../types/pokemons";

export const getPokemons = (): Pokemon[] => {
  const { data: { pokemons = [] } = {} } = useQuery(pokemonsQuery, {
    variables: { first: 150 },
  });

  return pokemons;
};
