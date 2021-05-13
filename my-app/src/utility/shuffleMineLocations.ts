//Fisher-Yates (aka Knuth) Shuffle.

type mineType = {
  show: boolean;
  isMine: boolean;
};

type squareType = {
  blank: boolean;
  flag: boolean;
  mine: mineType;
  number: boolean;
};

export const shuffleMineLocations = (
  flatArray: Array<squareType>,
  rowCurrent: number,
  columnCurrent: number,
  rowLength: number
): Array<Array<squareType>> => {
  let currentIndex = flatArray.length,
    temporaryValue: squareType,
    randomIndex: number;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = flatArray[currentIndex];
    flatArray[currentIndex] = flatArray[randomIndex];
    flatArray[randomIndex] = temporaryValue;
  }

  let nestedArray: Array<Array<squareType>> = [];
  let tempArray: squareType[] = [];

  flatArray.forEach((singleSquare) => {
    tempArray.push(singleSquare);
    if (tempArray.length === rowLength) {
      nestedArray.push(tempArray);
      tempArray = [];
    }
  });

  if (nestedArray[rowCurrent][columnCurrent].mine.isMine) {
    return shuffleMineLocations(
      flatArray,
      rowCurrent,
      columnCurrent,
      rowLength
    );
  }

  return nestedArray;
};
