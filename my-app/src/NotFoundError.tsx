import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBomb,
  faFlag,
  faTimes,
  faPastafarianism,
} from "@fortawesome/free-solid-svg-icons";

export const NotFoundError: React.FC = () => {
  return (
    <StyledWrapper>
      <StyledDiv>Oops! Something weird happened.</StyledDiv>
      <StyledIconWrapper>
        <StyledIcon>
          <FontAwesomeIcon icon={faBomb} />
        </StyledIcon>
        <StyledIcon>
          <FontAwesomeIcon icon={faTimes} />
        </StyledIcon>
        <StyledIcon>2</StyledIcon>
        <StyledIcon>
          <FontAwesomeIcon icon={faFlag} />
        </StyledIcon>
        <StyledIcon>
          <FontAwesomeIcon icon={faPastafarianism} />
        </StyledIcon>
        <StyledIcon>
          <FontAwesomeIcon icon={faBomb} />
        </StyledIcon>
        <StyledIcon>1</StyledIcon>
        <StyledIcon>
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
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const StyledIcon = styled.span`
  display: inline-block;
  animation: ${rotate} 3s linear infinite;
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
  color: grey;
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
