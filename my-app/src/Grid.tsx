import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb, faFlag } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../src/app/hooks";
import { distributeMines } from "./features/squaresSlice";
import { useAppDispatch } from "./app/hooks";
import { generateMines } from "./utility/generateMines";
// import { Square } from "./Square";

export const Grid: React.FC = () => {
  const [stage, setStage] = useState<number>(0);
  const squares = useAppSelector((state) => state.squares.value);
  const dispatch = useAppDispatch();

  const initialClick = () => {
    if (stage === 0) {
      dispatch(distributeMines(squares));
      setStage(1);
    }
    return null;
  };

  return (
    <StyledWrapper>
      <StyledGrid>
        {squares.map((square, index) => {
          return (
            <StyledDiv key={index} onClick={initialClick}>
              {square.mine && <FontAwesomeIcon icon={faBomb} />}
              {square.flag && <FontAwesomeIcon icon={faFlag} />}
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
