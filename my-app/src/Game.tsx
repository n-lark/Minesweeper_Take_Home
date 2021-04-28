import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../src/app/hooks";
import { startTimer } from "./features/timerSlice";
import { generateSquares } from "./features/squaresSlice";
import { Grid } from "./Grid";
import { Timer } from "./Timer";

export const Game: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const gameTimer = setInterval(() => {
      dispatch(startTimer());
    }, 1000);

    return () => {
      clearInterval(gameTimer);
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(generateSquares(16));
  }, [dispatch]);

  return (
    <StyledWrapper>
      <Timer />
      <Grid />
      <StyledLink to="./GameEnd">
        <StyledButton>End Game TEMP</StyledButton>
      </StyledLink>
    </StyledWrapper>
  );
};

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
  border: 1px solid gray;
  background-color: white;
  border-radius: 8px;
  outline: none;
  font-family: "Work Sans", sans-serif;
`;
