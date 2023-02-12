import React from "react";
import { getPokemons } from "../../graphql/api/pokemons";
import PokemonCard from "./PokemonCard";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  justify-content: center;
  align-items: center;
  color: black;
  margin-top: 70px;
`;

const List = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const PokemonList: React.FC = () => {
  const pokemons = getPokemons();

  console.log(pokemons);
  return (
    <Container>
      <h1>Choose your team!</h1>
      <List>
        {pokemons &&
          pokemons.map((p) => <PokemonCard key={p.id} pokemon={p} />)}
      </List>
    </Container>
  );
};

export default PokemonList;
