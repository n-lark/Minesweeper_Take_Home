//Fisher-Yates (aka Knuth) Shuffle.

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

export const shuffleMineLocations = (
  array: squareState[][],
  row?: number,
  index?: number
): squareState[][] => {
  const rowLength = array.length;
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

  let nestedArray: squareState[][] = [];

  // FOR SHAME USING ANY FIX THIS SHIT
  let tempArray: any[] = [];
  flatArray.forEach((ele) => {
    tempArray.push(ele);
    if (tempArray.length === rowLength) {
      nestedArray.push(tempArray);
      tempArray = [];
    }
  });

  if (
    row !== undefined &&
    index !== undefined &&
    nestedArray[row][index].mine.isMine
  ) {
    console.log("ARE WE HERE");
    return shuffleMineLocations(nestedArray, row, index);
  }

  return nestedArray;
};
