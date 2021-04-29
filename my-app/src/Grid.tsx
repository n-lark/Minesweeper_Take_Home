import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb, faFlag } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../src/app/hooks";
import { useAppDispatch } from "./app/hooks";
import { shuffleMines, exposeMines, markBlank } from "./features/squaresSlice";
// import { determineSquare } from "./features/squaresSlice";
import { generateNumber } from "./utility/generateNumber";
// import { Square } from "./Square";

export const Grid: React.FC = () => {
  const [firstClick, setFirstClick] = useState<boolean>(true);
  const squares = useAppSelector((state) => state.squares.value);
  const dispatch = useAppDispatch();

  const uncoverSquare = (row: number, index: number) => {
    if (firstClick) {
      if (squares[row][index].mine.isMine) {
        dispatch(shuffleMines({ row, index }));
      }
      setFirstClick(false);
    }
    if (!firstClick) {
      if (squares[row][index].mine.isMine === true) {
        return dispatch(exposeMines());
      }
      if (generateNumber(row, index, squares) === 0) {
        return dispatch(markBlank({ row, index }));
      }

      // dispatch(determineSquare(index));
    }
  };

  return (
    <StyledWrapper>
      <StyledGrid>
        {squares.map((square, row) => {
          return square.map((piece, i) => {
            return (
              <StyledDiv
                key={i}
                onClick={() => {
                  uncoverSquare(row, i);
                }}
              >
                {piece.mine.show && <FontAwesomeIcon icon={faBomb} />}
                {piece.mine.isMine && <StyledMineSpan />}
                {piece.flag && <FontAwesomeIcon icon={faFlag} />}
                {/* {piece.number && generateNumber(index, squares)} */}
                {piece.blank && <StyledBlankSpan />}
              </StyledDiv>
            );
          });
        })}
      </StyledGrid>
    </StyledWrapper>
  );
};

const StyledMineSpan = styled.span`
  border: 1px solid red;
  width: 30px;
  height: 30px;
`;

const StyledBlankSpan = styled.span`
  background-color: lightgrey;
  width: 30px;
  height: 30px;
`;

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
