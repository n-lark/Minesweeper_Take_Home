import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb, faFlag } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../src/app/hooks";
import { flagSquare } from "./features/squaresSlice";
import { useAppDispatch } from "./app/hooks";

type squareState = {
  blank: boolean;
  flag: boolean;
  number: boolean;
  mine: boolean;
};

export const Grid: React.FC = () => {
  const squares = useAppSelector((state) => state.squares.value);
  const dispatch = useAppDispatch();

  const reveal = (square: squareState, index: number) => {
    console.log(square, index);
    // Idea to have null returned depending on what square already is, disable onclick if already a number or whatever
    // need to update squares in state when clicked... hmm new dispatch action??
    dispatch(flagSquare(index));
  };

  return (
    <StyledWrapper>
      <StyledGrid>
        {squares.map((square, index) => {
          return (
            <StyledDiv key={index} onClick={() => reveal(square, index)}>
              {square.mine && <FontAwesomeIcon icon={faBomb} />}
              {square.flag && faFlag}
              {square.number && null}
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
