import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import Backpack from "../../assets/backpack";
import { pokeballsState } from "../../atoms/pokeballs";
import { Pokeball } from "../pokemons";
import { pokemonsState } from "../../atoms/pokemons";

const Nav = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  justify-content: space-between;
  top: 0px;
  padding: 0 35px;
  gap: 10px;
  width: calc(100% - 70px);
  height: 70px;
  background: white;
  z-index: 10;
  box-shadow: 0 20px 15px -2px rgba(0, 0, 0, 0.8);
  color: black;
  > div {
    display: flex;
    flex-direction: row;
    position: relative;
    align-items: center;
    gap: 10px;
  }
  .stacked {
    display: none;
  }
  .separated {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }
  @media screen and (max-width: 640px) {
    padding: 0 20px;
    width: calc(100% - 40px);

    .stacked {
      display: flex;
    }
    .separated {
      display: none;
    }
  }
`;

const Quantity = styled.span`
  position: absolute;
  display: flex;
  top: 0;
  right: 0;
  padding: 2px;
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  color: white;
  font-size: 0.8rem;
  justify-content: center;
  align-items: center;
`;

export const Navbar: React.FC = () => {
  const [pokeballs, setPokeballs] = useRecoilState(pokeballsState);
  const [pokemons, setPokemons] = useRecoilState(pokemonsState);
  return (
    <Nav>
      <div>
        Pokeballs left:
        <div className="stacked">
          <Pokeball />
          <Quantity>{pokeballs}</Quantity>
        </div>
        <div className="separated">
          {[...Array(pokeballs)].map((x, i) => (
            <Pokeball key={i} />
          ))}
        </div>
      </div>
      <div>
        <Backpack width={40} height={40} />
        <Quantity>{pokemons.length}</Quantity>
      </div>
    </Nav>
  );
};

export default Navbar;
