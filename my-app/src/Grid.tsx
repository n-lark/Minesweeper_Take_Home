import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb, faFlag } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../src/app/hooks";
import { useAppDispatch } from "./app/hooks";
import {
  shuffleMines,
  exposeMines,
  markBlank,
  markNumber,
  flagMine,
  unFlagMine,
  markBlankTEST,
  markNumberTEST,
  // collapseBlankSquares,
} from "./features/squaresSlice";
import { generateNumber } from "./utility/generateNumber";
import { searchCoordinates } from "./utility/searchCoordinates";

type gridContainer = {
  rowLength: number;
};

type mineState = {
  show: boolean;
  isMine: boolean;
};

type squareState = {
  blank: boolean;
  flag: boolean;
  number: boolean;
  mine: mineState;
};

export const Grid: React.FC = () => {
  const [firstClick, setFirstClick] = useState<boolean>(true);
  const squares = useAppSelector((state) => state.squares.value);
  const { basis } = useAppSelector((state) => state.numOfSquares.value);
  const dispatch = useAppDispatch();

  const uncoverSquare = (row: number, index: number) => {
    if (firstClick) {
      if (squares[row][index].mine.isMine) {
        dispatch(shuffleMines({ row, index }));
      }
      if (generateNumber(row, index, squares) > 0) {
        dispatch(markNumber({ row, index }));
      }
      if (generateNumber(row, index, squares) === 0) {
        dispatch(markBlank({ row, index }));
        // dispatch(collapseBlankSquares({ row, index }));
        let count = 0;
        let checked = [];

        const mess = (row: number, index: number, squares: squareState[][]) => {
          if (count === 500) {
            return count;
          }
          console.log("MESS", count);
          console.log(checked);
          count++;
          const x = [-1, -1, -1, 0, 0, 1, 1, 1];
          const y = [-1, 0, 1, -1, 1, -1, 0, 1];

          x.forEach((r, i) => {
            if (
              row + r > -1 &&
              row + r < squares.length &&
              index + y[i] > -1 &&
              index + y[i] < squares.length
            ) {
              if (
                generateNumber(row + r, index + y[i], squares) === 0 &&
                searchCoordinates(checked, [row + r, index + y[i]]) === false
              ) {
                let rowToDispatch = row + r;
                let indexToDispatch = index + y[i];
                console.log(rowToDispatch, indexToDispatch);
                dispatch(markBlankTEST({ rowToDispatch, indexToDispatch }));
                checked.push([row + r, index + y[i]]);
                while (count < 50) {
                  return mess(row + r, index + y[i], squares);
                }
              }

              if (generateNumber(row + r, index + y[i], squares) > 0) {
                let rowToDispatchNUM = row + r;
                let indexToDispatchNUM = index + y[i];
                dispatch(
                  markNumberTEST({ rowToDispatchNUM, indexToDispatchNUM })
                );
              }
            }
          });
        };

        return mess(row, index, squares);
      }
      setFirstClick(false);
    }

    if (!firstClick) {
      if (squares[row][index].mine.isMine === true) {
        return dispatch(exposeMines());
      }
      if (generateNumber(row, index, squares) === 0) {
        dispatch(markBlank({ row, index }));
      }
      if (generateNumber(row, index, squares) > 0) {
        dispatch(markNumber({ row, index }));
      }
    }
  };

  return (
    <StyledWrapper>
      <StyledGrid rowLength={basis}>
        {squares.map((square, row) => {
          return square.map((piece, i) => {
            return (
              <StyledDiv
                key={i}
                onClick={(e) => {
                  if (e.altKey) {
                    if (!squares[row][i].flag) {
                      dispatch(flagMine({ row, i }));
                    }
                    if (squares[row][i].flag) {
                      dispatch(unFlagMine({ row, i }));
                    }
                  }
                  if (!e.altKey) {
                    uncoverSquare(row, i);
                  }
                }}
              >
                {piece.mine.show && <FontAwesomeIcon icon={faBomb} />}
                {piece.mine.isMine && <StyledMineSpan />}
                {piece.flag && <FontAwesomeIcon icon={faFlag} />}
                {piece.number && generateNumber(row, i, squares)}
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
  background: pink;
  width: 5px;
  height: 5px;
`;

const StyledBlankSpan = styled.span`
  background-color: #f0f0f0;
  width: 30px;
  height: 30px;
`;

const StyledGrid = styled.div<gridContainer>`
  display: grid;
  grid-template-columns: repeat(${(p) => p.rowLength}, minmax(0, 30px));
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
