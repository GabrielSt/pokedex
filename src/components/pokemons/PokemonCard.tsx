import React, { useState } from "react";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";
import { useRecoilState } from "recoil";

import { AttackInfo, Pokemon } from "../../graphql/types/pokemons";
import getPokemonTypeColor from "../../utils/getPokemonTypeColor";
import Pokeball from "./Pokeball";
import { pokeballsState } from "../../atoms/pokeballs";
import { pokemonsState } from "../../atoms/pokemons";

import {
  GlassCard,
  InfoWrapper,
  Title,
  Info,
  Type,
  PowerSelection,
  Btn,
  TooltipContent,
  CaptureContainer,
  Image,
} from "./PokemonCard.style";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const [customPokemon, setCustomPokemon] = useState(pokemon);
  const [pokeballs, setPokeballs] = useRecoilState(pokeballsState);
  const [pokemons, setPokemons] = useRecoilState(pokemonsState);

  const chooseAttack = (attack: AttackInfo, type: string) => {
    type === "Fast"
      ? setCustomPokemon({ ...customPokemon, selectedFastAttack: attack })
      : setCustomPokemon({ ...customPokemon, selectedSpecialAttack: attack });
    console.log(customPokemon);
  };

  const randomizeCatch = () => {
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
  };

  const catchPokemon = () => {
    if (pokeballs > 0) {
      if (
        !customPokemon.selectedFastAttack ||
        !customPokemon.selectedFastAttack
      ) {
        Swal.fire({
          icon: "question",
          title: "Not going to choose his attacks?",
          text: "If you not choose, they will be random!!",
          showCloseButton: true,
          showCancelButton: true,
          confirmButtonText: "Yes, i dont care!",
          cancelButtonText: "No, i will choose!",
        }).then((result) => {
          if (result.isConfirmed) {
            setCustomPokemon({
              ...customPokemon,
              selectedFastAttack: customPokemon.attacks.fast[0],
            });
            setCustomPokemon({
              ...customPokemon,
              selectedSpecialAttack: customPokemon.attacks.special[0],
            });
            randomizeCatch();
          }
        });
      } else {
        randomizeCatch();
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
