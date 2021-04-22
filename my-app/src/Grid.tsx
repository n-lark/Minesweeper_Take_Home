import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../src/app/hooks";

export const Grid: React.FC = () => {
  const squares = useAppSelector((state) => state.squares.value);

  return (
    <StyledWrapper>
      <StyledGrid>
        {squares.map((square, index) => {
          return (
            <StyledDiv key={index} onClick={null}>
              {square.mine && <FontAwesomeIcon icon={faBomb} />}
            </StyledDiv>
          );
        })}
      </StyledGrid>
    </StyledWrapper>
  );
};

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 30px));
  border: 0.5px solid lightgray;
  > div {
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StyledDiv = styled.div`
  border: 0.5px solid lightgrey;
`;

const StyledWrapper = styled.div`
  margin: auto;
`;

// the grid will render the appropriate amount of squares, squares should have props to indicate the color(or image) for styled comps,
// like this color: ${(props) => props.color}
