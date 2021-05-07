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
  array: Array<Array<squareType>>,
  rowCurrent: number,
  columnCurrent: number,
  basis: number
): Array<Array<squareType>> => {
  const flatArray = array.flat(Infinity);

  let currentIndex = flatArray.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = flatArray[currentIndex];
    flatArray[currentIndex] = flatArray[randomIndex];
    flatArray[randomIndex] = temporaryValue;
  }

  let nestedArray: Array<Array<squareType>> = [];
  // FOR SHAME USING ANY FIX THIS SHIT
  let tempArray: any = [];

  flatArray.forEach((singleSquare) => {
    tempArray.push(singleSquare);
    if (tempArray.length === basis) {
      nestedArray.push(tempArray);
      tempArray = [];
    }
  });

  if (nestedArray[rowCurrent][columnCurrent].mine.isMine) {
    return shuffleMineLocations(nestedArray, rowCurrent, columnCurrent, basis);
  }

  return nestedArray;
};
