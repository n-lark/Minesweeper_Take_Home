import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb, faFlag } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../src/app/hooks";
import { distributeMines } from "./features/squaresSlice";
import { useAppDispatch } from "./app/hooks";
import { exposeMines } from "./features/squaresSlice";
import { determineSquare } from "./features/squaresSlice";
import { generateNumber } from "./utility/generateNumber";
// import { Square } from "./Square";

export const Grid: React.FC = () => {
  const [stage, setStage] = useState<number>(0);
  const squares = useAppSelector((state) => state.squares.value);
  const dispatch = useAppDispatch();

  const uncoverSquare = (index: number) => {
    if (stage === 0) {
      dispatch(distributeMines());
      setStage(1);
    }
    if (stage > 0) {
      if (squares[index].mine.isMine === true) {
        return dispatch(exposeMines());
      }
      if (squares[index].mine.isMine === false) {
        return dispatch(determineSquare(index));
      }
    }
  };

  return (
    <StyledWrapper>
      <StyledGrid>
        {squares.map((square, index) => {
          return (
            <StyledDiv
              key={index}
              onClick={() => {
                uncoverSquare(index);
              }}
            >
              {square.mine.show && <FontAwesomeIcon icon={faBomb} />}
              {square.flag && <FontAwesomeIcon icon={faFlag} />}
              {square.numOrBlank && generateNumber(index, squares)}
            </StyledDiv>
          );
        })}
      </StyledGrid>
    </StyledWrapper>
  );
};

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 30px));
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
