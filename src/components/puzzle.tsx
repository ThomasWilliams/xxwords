import React, { useContext } from "react";
import styled from "styled-components";
import { puzzleContext } from "./app";
import Grid from "./grid";

const PuzzleDiv = styled.div`
  font-family: sans-serif;
`;

const Puzzle: React.FC = () => {
  const context = useContext(puzzleContext);
  const { cells, direction, position } = context;

  console.log(`Current direction: ${direction}`);
  console.log(`Current position: ${position}`);

  return (
    <PuzzleDiv className="Puzzle">
      <Grid cells={cells} direction={direction} position={position} />
    </PuzzleDiv>
  );
};

export default Puzzle;
