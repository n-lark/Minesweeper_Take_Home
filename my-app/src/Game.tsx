import React from 'react';
import styled from "styled-components";


export const Game: React.FC = () => {
  return (
    <StyledWrapper>
    <StyledDiv>This is the main game</StyledDiv>
    </StyledWrapper>
  )
}


const StyledWrapper = styled.div`
  display: flex;
  justify-content: center; 
  border: 1px solid lightgray;
  box-shadow: 10px 5px 5px lightgray; 
  margin: 10px; 
  width: 700px; 
  height: 500px; 
`; 

const StyledDiv = styled.div`
  
  `