import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb, faFlag, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "./app/hooks";
import { useAppDispatch } from "./app/hooks";
import {
  deployMines,
  exposeMines,
  markBlank,
  markNumber,
  flagMine,
  unFlagMine,
} from "./features/squaresSlice";
import { incrementFlags, decrementFlags } from "./features/flagsSlice";
import { endGame } from "./features/gameOverSlice";
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
  const { squaresNum, basis } = useAppSelector(
    (state) => state.numOfSquares.value
  );
  const gameOver = useAppSelector((state) => state.gameOver.value);
  const dispatch = useAppDispatch();
  const checkedCoordinates = [];

  const expandSquares = (
    row: number,
    column: number,
    squares: squareState[][]
  ) => {
    const x = [-1, -1, -1, 0, 0, 1, 1, 1];
    const y = [-1, 0, 1, -1, 1, -1, 0, 1];

    x.forEach((r, i) => {
      let rowCurrent = row + r;
      let columnCurrent = column + y[i];
      if (
        rowCurrent > -1 &&
        rowCurrent < squares.length &&
        columnCurrent > -1 &&
        columnCurrent < squares.length
      ) {
        if (
          generateNumber(rowCurrent, columnCurrent, squares) === 0 &&
          !searchCoordinates(checkedCoordinates, [rowCurrent, columnCurrent])
        ) {
          dispatch(markBlank({ rowCurrent, columnCurrent }));
          checkedCoordinates.push([rowCurrent, columnCurrent]);
          return expandSquares(rowCurrent, columnCurrent, squares);
        }
        if (generateNumber(rowCurrent, columnCurrent, squares) > 0) {
          dispatch(markNumber({ rowCurrent, columnCurrent }));
        }
      }
    });
  };

  const uncoverSquare = (rowCurrent: number, columnCurrent: number) => {
    if (gameOver) {
      return null;
    }
    if (firstClick) {
      dispatch(deployMines({ squaresNum, basis, rowCurrent, columnCurrent }));
      setFirstClick(false);
    }
    if (
      squares[rowCurrent][columnCurrent].mine.isMine === true &&
      !firstClick
    ) {
      dispatch(endGame());
      return dispatch(exposeMines());
    }
    if (generateNumber(rowCurrent, columnCurrent, squares) > 0 && !firstClick) {
      dispatch(markNumber({ rowCurrent, columnCurrent }));
    }
    if (
      generateNumber(rowCurrent, columnCurrent, squares) === 0 &&
      !firstClick
    ) {
      dispatch(markBlank({ rowCurrent, columnCurrent }));
      return expandSquares(rowCurrent, columnCurrent, squares);
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
                id={`square${row}${i}`}
                onClick={(e) => {
                  if (e.altKey && !firstClick) {
                    if (!squares[row][i].flag) {
                      dispatch(flagMine({ row, i }));
                      dispatch(decrementFlags());
                    }
                    if (squares[row][i].flag) {
                      dispatch(unFlagMine({ row, i }));
                      dispatch(incrementFlags());
                    }
                  }
                  if (squares[row][i].flag && !e.altKey) {
                    return null;
                  }
                  if (!e.altKey) {
                    uncoverSquare(row, i);
                  }
                  // if (firstClick) {
                  //   let element: HTMLElement = document.getElementById(
                  //     `square${row}${i}`
                  //   ) as HTMLElement;
                  //   element.click();
                  // }
                }}
              >
                {piece.mine.show && <FontAwesomeIcon icon={faBomb} />}
                {piece.mine.isMine && <StyledMineSpan />}
                {piece.flag && (
                  <FontAwesomeIcon
                    icon={
                      piece.flag && !piece.mine.isMine && gameOver
                        ? faTimes
                        : faFlag
                    }
                  />
                )}
                {piece.number && !piece.flag && generateNumber(row, i, squares)}
                {piece.blank && !piece.flag && <StyledBlankSpan />}
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
  color: grey;
`;

const StyledWrapper = styled.div`
  margin: auto;
`;
