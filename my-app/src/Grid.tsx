import React from "react";
import styled from "styled-components";

const arrayOfShit = (num: number) => {
  let outArr = []
  for (let i = 0; i< num; i++) {
    outArr.push({blank: false, mineMarked: false, number: false, mineHit: false})
  }
  return outArr
}

const test = arrayOfShit(100)

export const Grid: React.FC = () => {
  return (
    <StyledWrapper>
      <StyledGrid>
        {test.map((square, index) => { return (
          <StyledDiv key={index} onClick={null}>{square.blank && square.blank.toString()}</StyledDiv>
        )})}
      </StyledGrid>
    </StyledWrapper>
  )
}

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 30px)); 
  border: 1px solid gray;
  > div {
    height: 30px;
    display: flex; 
    justify-content: center; 
    align-items: center; 
  }
`;

const StyledDiv = styled.div`
  border : 1px solid grey
`;

const StyledWrapper = styled.div`
  margin: auto; 
  `

// the grid will render the appropriate amount of squares, squares should have props to indicate the color(or image) for styled comps,
// like this color: ${(props) => props.color}