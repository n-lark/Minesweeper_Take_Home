type SquareType = {
  blank: boolean;
  flag: boolean;
  number: boolean;
  mine: { show: boolean; isMine: boolean };
};

export const isGameWon = (squares: Array<Array<SquareType>>): boolean => {
  let unOpenedSquares: Array<SquareType> = [];

  for (let i = 0; i < squares.length; i++) {
    for (let j = 0; j < squares[i].length; j++) {
      if (
        !squares[i][j].number &&
        !squares[i][j].blank &&
        !squares[i][j].mine.isMine
      ) {
        unOpenedSquares.push(squares[i][j]);
      }
    }
  }

  if (unOpenedSquares.length === 0) {
    return true;
  }
  return false;
};
