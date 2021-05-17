import React, { useEffect, useState } from "react";
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
import { gameIsLost, gameIsWon } from "./features/gameWonOrLostSlice";
import { generateNumber } from "./utility/generateNumber";
import { searchCoordinates } from "./utility/searchCoordinates";
import { isGameWon } from "./utility/isGameWon";

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
  const [firstClickCoordinates, setFirstClickCoordinates] = useState<
    Array<number>
  >([]);
  const squares = useAppSelector((state) => state.squares.value);
  const { numOfSquares, rowLength } = useAppSelector(
    (state) => state.board.value
  );
  const { lost, won } = useAppSelector((state) => state.gameWonOrLost.value);
  const dispatch = useAppDispatch();
  const checkedCoordinates: Array<Array<number>> = [];

  useEffect(() => {
    if (won) {
      return null;
    }
    if (isGameWon(squares) && !firstClick) {
      dispatch(gameIsWon());
      dispatch(exposeMines());
    }
  }, [squares, dispatch, won, firstClick]);

  const expandSquares = (
    row: number,
    column: number,
    squares: Array<Array<squareState>>
  ): void => {
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
          !searchCoordinates(checkedCoordinates, [rowCurrent, columnCurrent]) &&
          !squares[rowCurrent][columnCurrent].flag
        ) {
          dispatch(markBlank({ rowCurrent, columnCurrent }));
          checkedCoordinates.push([rowCurrent, columnCurrent]);
          return expandSquares(rowCurrent, columnCurrent, squares);
        }
        if (
          generateNumber(rowCurrent, columnCurrent, squares) > 0 &&
          !squares[rowCurrent][columnCurrent].flag
        ) {
          dispatch(markNumber({ rowCurrent, columnCurrent }));
        }
      }
    });
  };

  const uncoverSquare = (
    rowCurrent: number,
    columnCurrent: number
  ): { payload: undefined; type: string } => {
    if (lost) {
      return null;
    }
    if (firstClick) {
      dispatch(
        deployMines({ numOfSquares, rowLength, rowCurrent, columnCurrent })
      );
      setFirstClickCoordinates([rowCurrent, columnCurrent]);
      setFirstClick(false);
    }
    if (!firstClick) {
      setFirstClickCoordinates([]);
    }
    if (
      squares[rowCurrent][columnCurrent].mine.isMine === true &&
      !firstClick
    ) {
      dispatch(gameIsLost());
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
      expandSquares(rowCurrent, columnCurrent, squares);
    }
  };

  if (firstClickCoordinates.length === 2) {
    uncoverSquare(firstClickCoordinates[0], firstClickCoordinates[1]);
  }

  return (
    <StyledWrapper>
      <StyledGrid data-cy="grid" rowLength={rowLength}>
        {squares.map((square, row) => {
          return square.map((piece, i) => {
            return (
              <StyledDiv
                data-cy={`row${row}column${i}`}
                key={i}
                onClick={(e) => {
                  if (
                    e.altKey &&
                    !firstClick &&
                    !squares[row][i].number &&
                    !squares[row][i].blank
                  ) {
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
                }}
              >
                {piece.mine.show && (
                  <FontAwesomeIcon data-cy={`mine${row}${i}`} icon={faBomb} />
                )}
                {piece.flag && (
                  <FontAwesomeIcon
                    data-cy={`flag${row}${i}`}
                    icon={
                      piece.flag && !piece.mine.isMine && lost
                        ? faTimes
                        : faFlag
                    }
                  />
                )}
                {piece.mine.isMine && <StyledMineSpan />}
                {piece.number && !piece.flag && generateNumber(row, i, squares)}
                {piece.blank && !piece.flag && (
                  <StyledBlankSpan data-cy={`blank${row}${i}`} />
                )}
              </StyledDiv>
            );
          });
        })}
      </StyledGrid>
    </StyledWrapper>
  );
};

const StyledMineSpan = styled.div`
  background-color: pink;
  height: 5px;
  width: 5px;
`;

const StyledBlankSpan = styled.span`
  background-color: #f0f0f0;
  width: 30px;
  height: 30px;
`;

const StyledGrid = styled.div<gridContainer>`
  display: grid;
  grid-template-columns: repeat(
    ${({ rowLength }) => rowLength},
    minmax(0, 30px)
  );
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
  color: #595959;
  box-shadow: inset 1px 1px grey;
`;

const StyledWrapper = styled.div`
  margin: auto;
`;
