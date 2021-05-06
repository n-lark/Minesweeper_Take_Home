import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import { useAppSelector } from "./app/hooks";
import { startTimer } from "./features/timerSlice";
import { determineFlags } from "./features/flagsSlice";
import { generateBlankSquares } from "./features/squaresSlice";
import { Grid } from "./Grid";
import { Timer } from "./Timer";
import { Flags } from "./Flags";

export const Game: React.FC = () => {
  const dispatch = useAppDispatch();
  const gameOver = useAppSelector((state) => state.gameOver.value);
  const { squaresNum, basis } = useAppSelector(
    (state) => state.numOfSquares.value
  );
  const numOfFlags = Math.floor(basis * basis * 0.15 + 1);

  // useEffect(() => {
  //   const gameTimer = setInterval(() => {
  //     dispatch(startTimer());
  //   }, 1000);

  //   return () => {
  //     clearInterval(gameTimer);
  //   };
  // }, [dispatch]);

  useEffect(() => {
    dispatch(generateBlankSquares({ squaresNum, basis }));
    dispatch(determineFlags(numOfFlags));
  }, [squaresNum, basis, dispatch, numOfFlags]);

  return (
    <StyledWrapper>
      <Timer />
      <Flags />
      {gameOver && <StyledGameOver>Game Over</StyledGameOver>}
      <Grid />
      <StyledLink to="./GameEnd">
        <StyledButton>End Game</StyledButton>
      </StyledLink>
    </StyledWrapper>
  );
};

const StyledGameOver = styled.div`
  color: grey;
  font-size: 26px;
  position: fixed;
  margin-top: 15px;
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
  border: 1px solid lightgray;
  box-shadow: 10px 5px 5px lightgray;
  margin: 10px;
  width: 700px;
  height: 500px;
`;

const StyledLink = styled(Link)`
  margin: auto;
  border-radius: 10px;
`;

const StyledButton = styled.button`
  color: gray;
  font-size: 20px;
  padding: 10px 16px;
  border: 1px solid lightgray;
  background-color: white;
  border-radius: 8px;
  outline: none;
  font-family: "Work Sans", sans-serif;
`;
