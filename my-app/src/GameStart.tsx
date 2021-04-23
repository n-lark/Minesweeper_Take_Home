import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "./app/hooks";
import { resetTimer } from "./features/timerSlice";
import { resetSquares } from "./features/squaresSlice";

export const GameStart: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetTimer());
    dispatch(resetSquares());
  });

  return (
    <StyledWrapper>
      <StyledHeading>Minesweeper</StyledHeading>
      <StyledLink to="./Game">
        <StyledButton>Play Game</StyledButton>
      </StyledLink>
    </StyledWrapper>
  );
};

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
  border: 1px solid gray;
  background-color: white;
  border-radius: 8px;
  outline: none;
  font-family: "Work Sans", sans-serif;
`;

const StyledLink = styled(Link)`
  margin: auto;
  border-radius: 10px;
`;
