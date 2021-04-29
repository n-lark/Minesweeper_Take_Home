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

export const generateNumber = (
  row: number,
  index: number,
  squares: squareState[][]
) => {
  let totalNum = 0;
  for (let i = 0; i < squares.length; i++) {
    for (let j = 0; j < squares[i].length; j++) {}
  }

  // console.log("upLeft", squares[row - 1][index - 1]);
  // console.log("up", squares[row - 1][index]);
  // console.log("upRight", squares[row - 1][index + 1]);
  // console.log("left", squares[row][index - 1]);
  // console.log("current", squares[row][index]);
  // console.log("right", squares[row][index + 1]);
  // console.log("downleft", squares[row + 1][index - 1]);
  // console.log("down", squares[row + 1][index]);
  // console.log("downRight", squares[row + 1][index + 1]);

  return totalNum;
};

// let totalNum = 0;
// let rowLength = 4;

// if (index !== squares.length - 1 && squares[index + 1].mine.isMine === true) {
//   totalNum++;
// }

// if (index !== 0 && squares[index - 1].mine.isMine === true) {
//   totalNum++;
// }

// if (
//   index !== squares.length - 1 &&
//   squares[index + rowLength] !== undefined &&
//   squares[index + rowLength].mine.isMine === true
// ) {
//   totalNum++;
// }

// if (
//   index !== 0 &&
//   squares[index - rowLength] !== undefined &&
//   squares[index - rowLength].mine.isMine === true
// ) {
//   totalNum++;
// }

// return totalNum;
