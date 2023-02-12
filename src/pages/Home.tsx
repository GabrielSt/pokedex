import React from "react";
import styled from "styled-components";
import { Navbar } from "../components/navbar";
import { PokemonList } from "../components/pokemons";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 100vh; */
  overflow-y: auto;
`;

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Wrapper>
        <PokemonList />
      </Wrapper>
    </>
  );
};

export default Home;
