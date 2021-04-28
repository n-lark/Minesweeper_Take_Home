type mineState = {
  show: boolean;
  isMine: boolean;
};

type squareState = {
  flag: boolean;
  numOrBlank: boolean;
  mine: mineState;
};

export const generateNumber = (index: number, squares: squareState[]) => {
  let totalNum = 0;
  let rowLength = 4;

  if (index !== squares.length - 1 && squares[index + 1].mine.isMine === true) {
    console.log("index again", index);
    console.log("bomb", squares[index + 1]);
    totalNum++;
  }

  if (index !== 0 && squares[index - 1].mine.isMine === true) {
    console.log("index again", index);
    console.log("bomb", squares[index - 1]);
    totalNum++;
  }

  if (
    index !== squares.length - 1 &&
    squares[index + rowLength] !== undefined &&
    squares[index + rowLength].mine.isMine === true
  ) {
    console.log("index again", index);
    console.log("bomb", squares[index + 1]);
    totalNum++;
  }

  if (
    index !== 0 &&
    squares[index - rowLength] !== undefined &&
    squares[index - rowLength].mine.isMine === true
  ) {
    console.log("index again", index);
    console.log("bomb", squares[index - 1]);
    totalNum++;
  }

  return totalNum;
};
