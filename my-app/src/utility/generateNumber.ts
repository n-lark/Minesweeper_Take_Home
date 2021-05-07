type mineType = {
  show: boolean;
  isMine: boolean;
};

type squareType = {
  blank: boolean;
  flag: boolean;
  number: boolean;
  mine: mineType;
};

export const generateNumber = (
  row: number,
  index: number,
  squares: Array<Array<squareType>>
) => {
  let totalNum = 0;

  const x = [-1, -1, -1, 0, 0, 1, 1, 1];
  const y = [-1, 0, 1, -1, 1, -1, 0, 1];

  x.forEach((r, i) => {
    if (
      row + r > -1 &&
      row + r < squares.length &&
      index + y[i] > -1 &&
      index + y[i] < squares.length
    ) {
      if (squares[row + r][index + y[i]].mine.isMine === true) {
        totalNum++;
      }
    }
  });
  return totalNum;
};
