import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { startTimer } from "./features/timerSlice";
import { determineFlags } from "./features/flagsSlice";
import { generateBlankSquares } from "./features/squaresSlice";
import { showModal } from "./features/rulesModalSlice";
import { Grid } from "./Grid";
import { Timer } from "./Timer";
import { Flags } from "./Flags";
import { RulesModal } from "./RulesModal";

export const Game: React.FC = () => {
  const dispatch = useAppDispatch();
  const gameLost = useAppSelector((state) => state.gameLost.value);
  const { squaresNum, basis } = useAppSelector(
    (state) => state.numOfSquares.value
  );
  const modalControl = useAppSelector((state) => state.rulesModal.value);
  const gameIsWon = useAppSelector((state) => state.gameWon.value);
  const numOfFlags = Math.floor(basis * basis * 0.15 + 1);

  useEffect(() => {
    const gameTimer = setInterval(() => {
      dispatch(startTimer());
    }, 1000);

    if (gameLost || gameIsWon) {
      clearInterval(gameTimer);
    }

    return () => {
      clearInterval(gameTimer);
    };
  }, [dispatch, gameLost, gameIsWon]);

  useEffect(() => {
    dispatch(generateBlankSquares({ squaresNum, basis }));
    dispatch(determineFlags(numOfFlags));
  }, [squaresNum, basis, dispatch, numOfFlags]);

  return (
    <StyledWrapper>
      {modalControl && <RulesModal />}
      <StyledHeaderWrapper>
        <Flags />
        <Timer />
      </StyledHeaderWrapper>
      {gameIsWon && <StyledGameVerdict>You won!</StyledGameVerdict>}
      {gameLost && <StyledGameVerdict>Game Over</StyledGameVerdict>}
      <Grid />
      <StyledLink to="./GameEnd">
        <StyledButton data-cy="end-game">End Game</StyledButton>
      </StyledLink>
      <StyledRulesButton onClick={() => dispatch(showModal())}>
        How to play
      </StyledRulesButton>
    </StyledWrapper>
  );
};

const StyledHeaderWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;
`;

const StyledGameVerdict = styled.div`
  color: #595959;
  font-size: 36px;
  position: fixed;
  margin-top: 15px;
`;

const StyledRulesButton = styled.button`
  color: #595959;
  outline: none;
  border-radius: 10px;
  border: none;
  align-self: flex-end;
  padding: 10px;
  background-color: transparent;
  margin: 10px;
  font-size: 18px;
  font-family: "Work Sans", sans-serif;
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
  border: 1px solid lightgray;
  box-shadow: 10px 5px 5px lightgray;
  margin: 10px;
  width: 700px;
  height: 600px;
  font-family: "Work Sans", sans-serif;
`;

const StyledLink = styled(Link)`
  margin: auto;
  border-radius: 10px;
`;

const StyledButton = styled.button`
  color: #595959;
  font-size: 20px;
  padding: 10px 16px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 8px;
  outline: none;
  font-family: "Work Sans", sans-serif;
`;
