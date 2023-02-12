import React, { useState } from "react";
import { AttackInfo, Pokemon } from "../../graphql/types/pokemons";
import styled from "styled-components";
import getPokemonTypeColor from "../../utils/getPokemonTypeColor";
import { Tooltip } from "react-tooltip";
import Pokeball from "./Pokeball";
import { useRecoilState } from "recoil";
import { pokeballsState } from "../../atoms/pokeballs";
import { pokemonsState } from "../../atoms/pokemons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const GlassCard = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  width: 320px;
  height: 660px;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.3)
  );
  border-radius: 1rem;
  z-index: 2;
  backdrop-filter: blur(10px);
`;

const Image = styled.img`
  top: 0;
  left: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  min-height: 50%;
  max-height: 50%;
  min-width: 100%;
  max-width: 100%;
`;

const InfoWrapper = styled.div`
  padding: 10px;
  color: black;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 1.4rem;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: normal;
  font-size: 0.8rem;
  padding-bottom: 10px;
  > div {
    display: flex;
    flex-direction: row;
    gap: 3px;
  }
`;

const Type = styled.span.attrs((props: { color: string }) => props)`
  padding: 1px 10px;
  border-radius: 0.4rem;
  background-color: ${(props) => props.color};
`;

const PowerSelection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding-top: 10px;
  border-top: 1px solid #999999;
`;

const Btn = styled.div.attrs(
  (props: { color: string; tooltip: boolean }) => props
)`
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.color || "unset"};
  color: black;
  cursor: pointer;
  padding: ${(props) => (props.tooltip ? "15px 15px" : "15px 0px")};
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease 0s;
  width: ${(props) => (props.tooltip ? "unset" : "45%")};
  justify-content: center;
  :hover {
    box-shadow: 0px 15px 20px rgba(33, 136, 95, 0.6);
    transform: translateY(-2px);
  }
`;

const TooltipContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CaptureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  > div {
    cursor: pointer;
  }
`;

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const [customPokemon, setCustomPokemon] = useState(pokemon);
  const [pokeballs, setPokeballs] = useRecoilState(pokeballsState);
  const [pokemons, setPokemons] = useRecoilState(pokemonsState);
  const MySwal = withReactContent(Swal);

  const chooseAttack = (attack: AttackInfo, type: string) => {
    type === "Fast"
      ? setCustomPokemon({ ...customPokemon, selectedFastAttack: attack })
      : setCustomPokemon({ ...customPokemon, selectedSpecialAttack: attack });
    console.log(customPokemon);
  };

  const catchPokemon = () => {
    if (pokeballs > 0) {
      setPokeballs(pokeballs - 1);
      if (Math.random() < 0.5) {
        Swal.fire({
          icon: "success",
          title: "Gotcha!!",
          text: `You've gotten a ${customPokemon.name}!!`,
        });
        setPokemons((currentPokemonsState) => [
          ...currentPokemonsState,
          customPokemon,
        ]);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "The pokemon have scaped!",
        });
      }
    } else {
      Swal.fire({
        icon: "info",
        title: "Not enough pokeballs",
        text: "You can buy more for only 11.99€!",
        showCancelButton: true,
        confirmButtonText:
          '<a href="https://www.amazon.es/Pokemon-Grinder-Pokeball-pulgadas-trituradora/dp/B01KZLZ3BE/ref=sr_1_19?crid=ERSNAZ8HG3JA&keywords=pokeball&qid=1676169645&sprefix=pokeball%2Caps%2C120&sr=8-19" style="color: white;">Buy more</a>',
        cancelButtonText: "Cancel",
      });
    }
  };

  return (
    <GlassCard>
      <Image src={customPokemon.image} />
      <InfoWrapper>
        <Title>{`#${customPokemon.number} ${customPokemon.name}`}</Title>
        <Info>
          <div>
            <b>Max CP:</b>
            <i>{customPokemon.maxCP}</i>
          </div>
          <div>
            <b>Max HP:</b>
            <i>{customPokemon.maxHP}</i>
          </div>
          <div>
            <b>Weight:</b>
            <i>{`${customPokemon.weight.minimum} ~ ${customPokemon.weight.maximum}`}</i>
          </div>
          <div>
            <b>Height:</b>
            <i>{`${customPokemon.height.minimum} ~ ${customPokemon.height.maximum}`}</i>
          </div>
          <div>
            <b>Class:</b>
            <i>{customPokemon.classification}</i>
          </div>
          <div>
            <b>Types:</b>
            {customPokemon.types.map((t) => {
              const color = getPokemonTypeColor[t];
              return (
                <Type key={t} color={color}>
                  {t}
                </Type>
              );
            })}
          </div>
        </Info>
        <PowerSelection>
          {customPokemon.selectedFastAttack ? (
            <Btn
              id={`${customPokemon.id}-fastAttack`}
              color={getPokemonTypeColor[customPokemon.selectedFastAttack.type]}
            >
              {customPokemon.selectedFastAttack.name}
            </Btn>
          ) : (
            <Btn id={`${customPokemon.id}-fastAttack`}>Fast</Btn>
          )}

          <Tooltip
            anchorId={`${customPokemon.id}-fastAttack`}
            events={["click"]}
            clickable
          >
            <TooltipContent>
              {pokemon?.attacks?.fast &&
                customPokemon.attacks.fast.map((a) => {
                  return (
                    <Btn
                      key={`${customPokemon.id}-${a.name}`}
                      onClick={() => chooseAttack(a, "Fast")}
                      color={getPokemonTypeColor[a.type]}
                      tooltip
                    >
                      {a.name}
                    </Btn>
                  );
                })}
            </TooltipContent>
          </Tooltip>
          {customPokemon.selectedSpecialAttack ? (
            <Btn
              id={`${customPokemon.id}-specialAttack`}
              color={
                getPokemonTypeColor[customPokemon.selectedSpecialAttack.type]
              }
            >
              {customPokemon.selectedSpecialAttack.name}
            </Btn>
          ) : (
            <Btn id={`${customPokemon.id}-specialAttack`}>Special</Btn>
          )}
          <Tooltip
            anchorId={`${customPokemon.id}-specialAttack`}
            events={["click"]}
            clickable
          >
            <TooltipContent>
              {pokemon?.attacks?.special &&
                customPokemon.attacks.special.map((a) => {
                  const color = getPokemonTypeColor[a.type];
                  return (
                    <Btn
                      key={`${customPokemon.id}-${a.name}`}
                      onClick={() => chooseAttack(a, "Special")}
                      color={color}
                      tooltip
                    >
                      {a.name}
                    </Btn>
                  );
                })}
            </TooltipContent>
          </Tooltip>
        </PowerSelection>
      </InfoWrapper>
      <CaptureContainer>
        <div onClick={() => catchPokemon()}>
          <Pokeball />
        </div>
      </CaptureContainer>
    </GlassCard>
  );
};

export default PokemonCard;
