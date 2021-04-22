//Fisher-Yates (aka Knuth) Shuffle.

type squareState = {
  blank: boolean;
  flag: boolean;
  number: boolean;
  mine: boolean;
};

export const shuffleMineLocations = (array: squareState[]) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};
