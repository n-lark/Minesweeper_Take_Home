import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { resetTimer } from "./features/timerSlice";
import { resetSquares } from "./features/squaresSlice";
import { resetFlags } from "./features/flagsSlice";
import { showModal } from "./features/rulesModalSlice";
import { resetGameWonOrLost } from "./features/gameWonOrLostSlice";
import { resetBoard, setBoard } from "./features/boardSlice";
import { RulesModal } from "./RulesModal";

export const GameStart: React.FC = () => {
  const dispatch = useAppDispatch();
  const modalControl = useAppSelector((state) => state.rulesModal.value);

  useEffect(() => {
    dispatch(resetTimer());
    dispatch(resetSquares());
    dispatch(resetBoard());
    dispatch(resetFlags());
    dispatch(resetGameWonOrLost());
  }, [dispatch]);

  return (
    <StyledWrapper>
      <StyledHeading>Minesweeper</StyledHeading>
      <StyledRadioWrapper>
        <StyledLabel>
          <StyledInput
            value="easy"
            type="radio"
            name="level"
            onChange={() => {
              dispatch(setBoard({ numOfSquares: 64, rowLength: 8 }));
            }}
          />
          Easy (8 x 8 grid)
        </StyledLabel>
        <StyledLabel>
          <StyledInput
            value="medium"
            type="radio"
            name="level"
            onChange={() => {
              dispatch(setBoard({ numOfSquares: 100, rowLength: 10 }));
            }}
          />
          Medium (10 x 10 grid)
        </StyledLabel>
        <StyledLabel>
          <StyledInput
            data-cy="chose-level-hard"
            value="hard"
            type="radio"
            name="level"
            onChange={() => {
              dispatch(setBoard({ numOfSquares: 144, rowLength: 12 }));
            }}
          />
          Hard (12 x 12 grid)
        </StyledLabel>
      </StyledRadioWrapper>
      <StyledLink to="./Game">
        <StyledButton data-cy="start-game">Play Game</StyledButton>
      </StyledLink>
      {modalControl && <RulesModal />}
      <StyledRulesButton
        data-cy="rulesModal"
        onClick={() => dispatch(showModal())}
      >
        How to play
      </StyledRulesButton>
    </StyledWrapper>
  );
};

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

const StyledLabel = styled.div`
  color: #595959;
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
  font-size: 46px;
  font-weight: normal;
  margin-top: 50px;
  color: #595959;
  padding: 30px;
`;

const StyledButton = styled.button`
  color: #595959;
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
