import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import Swal from "sweetalert2";
import { pokeballsState } from "../../atoms/pokeballs";
import { pokemonsState } from "../../atoms/pokemons";
import { Pokemon } from "../../graphql/types/pokemons";

interface BackpackProps {
  open: boolean;
  onClose: () => void;
}

const Modal = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  gap: 10px;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
  border-radius: 10px;
  background-color: white;
  color: black;
  padding: 15px;
  .imgContainer {
    position: relative;
  }
`;

const Image = styled.img`
  height: 100px;
  width: 100px;
`;

const XIcon = styled.span.attrs(
  (props: { top: string; right: string }) => props
)`
  position: absolute;
  display: flex;
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  color: gray;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

export const Backpack: React.FC<BackpackProps> = ({ open, onClose }) => {
  const [pokemons, setPokemons] = useRecoilState(pokemonsState);
  const [pokeballs, setPokeballs] = useRecoilState(pokeballsState);

  const releasePokemon = (pokemon: Pokemon) => {
    Swal.fire({
      icon: "question",
      title: "Release the pokemon?",
      text: "Are you sure? this action cant be reverted!!",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes, let it go!",
      cancelButtonText: "No, i love him!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Pokemon released!", "", "success");
        setPokemons((currentPokemonsState) => [
          ...currentPokemonsState.filter((p) => p.id !== pokemon.id),
        ]);
        setPokeballs(pokeballs + 1);
      }
    });
  };
  return (
    <>
      {open && (
        <Modal>
          <Content>
            <XIcon onClick={() => onClose()} top={"10px"} right={"20px"}>
              X
            </XIcon>
            {pokemons.map((p) => (
              <div className="imgContainer">
                <Image src={p.image} />
                <XIcon onClick={() => releasePokemon(p)} top={"0"} right={"0"}>
                  X
                </XIcon>
              </div>
            ))}
          </Content>
        </Modal>
      )}
    </>
  );
};

export default Backpack;
