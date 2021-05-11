import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBomb,
  faFlag,
  faTimes,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

type IconContainer = {
  time: number;
};

export const NotFoundError: React.FC = () => {
  return (
    <StyledWrapper>
      <StyledDiv>Oops! Something weird happened.</StyledDiv>
      <StyledIconWrapper>
        <StyledIcon time={5}>
          <FontAwesomeIcon icon={faBomb} />
        </StyledIcon>
        <StyledIcon time={3}>
          <FontAwesomeIcon icon={faTimes} />
        </StyledIcon>
        <StyledIcon time={4}>2</StyledIcon>
        <StyledIcon time={3}>
          <FontAwesomeIcon icon={faFlag} />
        </StyledIcon>
        <StyledIcon time={2}>
          <FontAwesomeIcon icon={faQuestion} />
        </StyledIcon>
        <StyledIcon time={6}>
          <FontAwesomeIcon icon={faBomb} />
        </StyledIcon>
        <StyledIcon time={2}>1</StyledIcon>
        <StyledIcon time={4}>
          <FontAwesomeIcon icon={faFlag} />
        </StyledIcon>
      </StyledIconWrapper>
      <StyledLink to="./">
        <StyledButton>Restart Game</StyledButton>
      </StyledLink>
    </StyledWrapper>
  );
};

const rotate = keyframes`
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0deg);
  }
`;

const StyledIcon = styled.span<IconContainer>`
  display: inline-block;
  animation: ${rotate} ${({ time }) => time}s linear infinite;
  padding: 10px;
  font-weight: bold;
`;

const StyledIconWrapper = styled.div`
  margin-top: 60px;
  font-size: 30px;
  padding: 5px;
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column;
  color: #595959;
  border: 1px solid lightgray;
  box-shadow: 10px 5px 5px lightgray;
  margin: 10px;
  width: 700px;
  height: 600px;
  font-family: "Work Sans", sans-serif;
`;

const StyledDiv = styled.div`
  font-size: 30px;
  margin: 100px 0px 50px 0px;
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
