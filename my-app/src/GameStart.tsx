import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "./app/hooks";
import { resetTimer } from "./features/timerSlice";
import { resetSquares } from "./features/squaresSlice";
import { resetEndGame } from "./features/gameOverSlice";
import {
  resetNumOfSquares,
  setNumOfSquares,
} from "./features/numOfSquaresSlice";

export const GameStart: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetTimer());
    dispatch(resetSquares());
    dispatch(resetNumOfSquares());
    dispatch(resetEndGame());
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
    </StyledWrapper>
  );
};

const StyledLabel = styled.div`
  color: grey;
  padding: 5px;
`;

const StyledRadioWrapper = styled.div`
  padding: 20px;
`;

const StyledInput = styled.input`
  width: 20px;
  height: 20px;
`;

const StyledQuestion = styled.span`
  color: lightgrey;
  font-weight: bold;
  font-size: 16px;
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column;
  border: 1px solid lightgray;
  box-shadow: 10px 5px 5px lightgray;
  margin: 10px;
  width: 700px;
  height: 500px;
  font-family: "Work Sans", sans-serif;
`;

const StyledHeading = styled.h1`
  font-size: 42px;
  font-weight: normal;
  margin-top: 50px;
  color: gray;
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
