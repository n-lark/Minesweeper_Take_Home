import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb, faFlag, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "./app/hooks";
import { formatTime } from "./utility/formatTime";

type iconContainer = {
  time: number;
};

export const GameEnd: React.FC = () => {
  const time = useAppSelector((state) => state.timer.value);
  const gameIsWon = useAppSelector((state) => state.gameWon.value);

  return (
    <StyledWrapper>
      <StyledTimeDiv>Your total time was: {formatTime(time)}</StyledTimeDiv>
      {gameIsWon && (
        <>
          <StyledDiv>Congratulations, you won the game!</StyledDiv>
          <StyledInlineWrapper>
            <StyledIcon time={5}>
              <FontAwesomeIcon icon={faTimes} />
            </StyledIcon>
            <StyledIcon time={4}>
              <FontAwesomeIcon icon={faFlag} />
            </StyledIcon>
            <StyledIcon time={3.5}>
              <FontAwesomeIcon icon={faBomb} />
            </StyledIcon>
            <StyledIcon time={4}>1</StyledIcon>
            <StyledIcon time={3}>
              <FontAwesomeIcon icon={faBomb} />
            </StyledIcon>
            <StyledIcon time={6}>
              <FontAwesomeIcon icon={faTimes} />
            </StyledIcon>
            <StyledIcon time={4.2}>
              <FontAwesomeIcon icon={faFlag} />
            </StyledIcon>
            <StyledIcon time={5}>2</StyledIcon>
          </StyledInlineWrapper>
        </>
      )}
      {!gameIsWon && (
        <>
          <StyledDiv>Sorry, you lost the game.</StyledDiv>
          <StyledDiv>Better luck next time!</StyledDiv>
        </>
      )}
      <StyledLink to="./">
        <StyledButton data-cy="play-again">Play Again</StyledButton>
      </StyledLink>
    </StyledWrapper>
  );
};

const StyledInlineWrapper = styled.div`
  display: inline-block;
`;

const Bombs = keyframes`
  0% { top: -12px; }
  100% { top: 170px; }
`;

const StyledIcon = styled.span<iconContainer>`
  position: relative;
  top: 0;
  padding: 5px;
  font-size: 22px;
  font-weight: bold;
  animation: ${Bombs} ${({ time }) => time}s linear infinite;
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
  color: #595959;
`;

const StyledLink = styled(Link)`
  margin: auto;
  border-radius: 10px;
`;

const StyledDiv = styled.div`
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const StyledTimeDiv = styled.div`
  margin: 50px;
  font-size: 24px;
`;
