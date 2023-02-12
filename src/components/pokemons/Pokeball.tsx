import React from "react";
import styled from "styled-components";

const PokeballContainer = styled.div.attrs(
  (props: { top: string; left: string }) => props
)`
  box-sizing: border-box;
  border: 2px solid #262122;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  /* margin: 0 auto; */
  background: linear-gradient(
    #ba0c2f 0%,
    #ba0c2f 48%,
    #262122 48%,
    #262122 52%,
    #fff 52%,
    #fff 100%
  );

  :before,
  :after {
    content: " ";
    border-radius: 100%;
    display: block;
    position: absolute;
  }

  :before {
    background: #262122;
    width: 15px;
    height: 15px;
    margin-top: 15px;
    margin-left: 15px;
  }

  :after {
    background: #fff;
    width: 11px;
    height: 11px;
    margin-top: 15px;
    margin-left: 15px;
    border: double 3px #262122;
  }
`;

export const Pokeball: React.FC = () => {
  return (
    <>
      <PokeballContainer />
    </>
  );
};

export default Pokeball;
