import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb, faFlag } from "@fortawesome/free-solid-svg-icons";
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
      setFirstClick(false);
      dispatch(deployMines({ squaresNum, basis, rowCurrent, columnCurrent }));
    }
    if (squares[rowCurrent][columnCurrent].mine.isMine === true) {
      dispatch(endGame());
      return dispatch(exposeMines());
    }
    if (generateNumber(rowCurrent, columnCurrent, squares) > 0) {
      dispatch(markNumber({ rowCurrent, columnCurrent }));
    }
    if (generateNumber(rowCurrent, columnCurrent, squares) === 0) {
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
