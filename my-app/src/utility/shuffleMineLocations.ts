//Fisher-Yates (aka Knuth) Shuffle.

type SquareType = {
  blank: boolean;
  flag: boolean;
  mine: { show: boolean; isMine: boolean };
  number: boolean;
};

export const shuffleMineLocations = (
  flatArray: Array<SquareType>,
  rowCurrent: number,
  columnCurrent: number,
  rowLength: number
): Array<Array<SquareType>> => {
  let currentIndex = flatArray.length,
    temporaryValue: SquareType,
    randomIndex: number;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = flatArray[currentIndex];
    flatArray[currentIndex] = flatArray[randomIndex];
    flatArray[randomIndex] = temporaryValue;
  }

  let nestedArray: Array<Array<SquareType>> = [];
  let tempArray: SquareType[] = [];

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
