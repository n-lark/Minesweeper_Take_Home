import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { resetTimer } from "./features/timerSlice";
import { resetSquares } from "./features/squaresSlice";
import { resetEndGame } from "./features/gameOverSlice";
import { resetFlags } from "./features/flagsSlice";
import { showModal } from "./features/rulesModalSlice";
import { resetGameWon } from "./features/gameWonSlice";
import {
  resetNumOfSquares,
  setNumOfSquares,
} from "./features/numOfSquaresSlice";
import { RulesModal } from "./RulesModal";

export const GameStart: React.FC = () => {
  const dispatch = useAppDispatch();
  const modalControl = useAppSelector((state) => state.rulesModal.value);

  useEffect(() => {
    dispatch(resetTimer());
    dispatch(resetSquares());
    dispatch(resetNumOfSquares());
    dispatch(resetEndGame());
    dispatch(resetFlags());
    dispatch(resetGameWon());
  }, [dispatch]);

  return (
    <StyledWrapper>
      <StyledHeading>Minesweeper</StyledHeading>
      <StyledQuestion>Choose your level</StyledQuestion>
      <StyledRadioWrapper>
        <StyledLabel>
          <StyledInput
            value="easy"
            type="radio"
            name="level"
            onChange={() => {
              dispatch(setNumOfSquares({ squaresNum: 25, basis: 5 }));
            }}
          />
          Easy (5 x 5 grid)
        </StyledLabel>
        <StyledLabel>
          <StyledInput
            value="medium"
            type="radio"
            name="level"
            onChange={() => {
              dispatch(setNumOfSquares({ squaresNum: 64, basis: 8 }));
            }}
          />
          Medium (8 x 8 grid)
        </StyledLabel>
        <StyledLabel>
          <StyledInput
            value="hard"
            type="radio"
            name="level"
            onChange={() => {
              dispatch(setNumOfSquares({ squaresNum: 144, basis: 12 }));
            }}
          />
          Hard (12 x 12 grid)
        </StyledLabel>
      </StyledRadioWrapper>
      <StyledLink to="./Game">
        <StyledButton>Play Game</StyledButton>
      </StyledLink>
      {modalControl && <RulesModal />}
      <StyledRulesButton onClick={() => dispatch(showModal())}>
        How to play
      </StyledRulesButton>
    </StyledWrapper>
  );
};

const StyledRulesButton = styled.button`
  color: grey;
  outline: none;
  border-radius: 10px;
  border: none;
  align-self: flex-end;
  padding: 5px;
  background-color: transparent;
  margin: 10px;
  font-size: 18px;
  font-family: "Work Sans", sans-serif;
`;

const StyledLabel = styled.div`
  color: grey;
  padding: 5px;
  font-size: 18px;
`;

const StyledRadioWrapper = styled.div`
  padding: 20px;
`;

const StyledInput = styled.input`
  width: 20px;
  height: 20px;
  border: 1px solid lightgrey;
  border-radius: 50%; 
  margin-right: 5px;
  appearance:none;
  -moz-appearance: none;
  -webkit-appearance: none;    
  position: relative;
    &:before {
      content: " ";
      position: absolute;
      top: 2px;
      right: 2px;
      bottom: 2px;
      left: 2px;
      border-radius: 100%;
      transition: background .15s; 
    }
    &:checked{
      &:before {
        background-color: grey; 
      }
`;

const StyledQuestion = styled.span`
  color: lightgrey;
  font-weight: bold;
  font-size: 18px;
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column;
  border: 1px solid lightgray;
  box-shadow: 10px 5px 5px lightgray;
  margin: 10px;
  width: 700px;
  height: 600px;
  font-family: "Work Sans", sans-serif;
`;

const StyledHeading = styled.h1`
  font-size: 44px;
  font-weight: normal;
  margin-top: 50px;
  color: gray;
  padding: 30px;
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

const StyledLink = styled(Link)`
  margin: auto;
  border-radius: 10px;
`;
