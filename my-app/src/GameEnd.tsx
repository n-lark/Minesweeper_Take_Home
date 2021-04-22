import React from "react"
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector } from './app/hooks'
import {formatTime} from "./utility/formatTime"


export const GameEnd: React.FC = () => {
  const time = useAppSelector(state => state.timer.value)


  return (
    <StyledWrapper>
    <StyledDiv>Your total time was: {formatTime(time)}</StyledDiv>
    <StyledLink to="./">
      <StyledButton>Play Again</StyledButton>
    </StyledLink>
    </StyledWrapper>
  )
}


const StyledButton = styled.button`
  color: gray;
  font-size: 20px;
  padding: 10px 16px;
  border: 1px solid gray;
  background-color: white; 
  border-radius: 8px;
  outline: none;
  font-family: 'Work Sans', sans-serif;
`

const StyledWrapper = styled.div`
  display: flex;
  align-items: center; 
  flex-flow: column; 
  border: 1px solid lightgray;
  box-shadow: 10px 5px 5px lightgray; 
  margin: 10px; 
  width: 700px; 
  height: 500px; 
  font-family: 'Work Sans', sans-serif;
`; 

const StyledLink = styled(Link)`
  margin: auto;
  border-radius: 10px;
`;

const StyledDiv = styled.div`
  color: grey; 
  margin-top: 50px; 
  `
