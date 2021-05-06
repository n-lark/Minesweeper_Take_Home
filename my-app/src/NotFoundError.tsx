import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const NotFoundError: React.FC = () => {
  return (
    <StyledWrapper>
      <StyledDiv>Oops! Something weird happened.</StyledDiv>
      <StyledLink to="./">
        <StyledButton>Restart Game</StyledButton>
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
  height: 600px;
  font-family: "Work Sans", sans-serif;
`;

const StyledDiv = styled.div`
  font-size: 24px;
  margin-top: 100px;
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
