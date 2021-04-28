//Fisher-Yates (aka Knuth) Shuffle.

type mineState = {
  show: boolean;
  isMine: boolean;
};

type squareState = {
  flag: boolean;
  numOrBlank: boolean;
  mine: mineState;
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
