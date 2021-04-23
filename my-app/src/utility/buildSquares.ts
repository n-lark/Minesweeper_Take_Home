import { shuffleMineLocations } from "./shuffleMineLocations";

export const buildSquares = (numOfSquares: number) => {
  let squaresArray = [];
  for (let i = 0; i < numOfSquares; i++) {
    if (i < Math.floor(numOfSquares * 0.2)) {
      squaresArray.push({
        blank: false,
        flag: false,
        number: false,
        mine: true,
      });
    }
    if (i >= Math.floor(numOfSquares * 0.2)) {
      squaresArray.push({
        blank: false,
        flag: false,
        number: false,
        mine: false,
      });
    }
  }
  const shuffledArray = shuffleMineLocations(squaresArray);
  return shuffledArray;
};

// note for future me, the mine locations will need to be moved in time, the first click is guaranteed to not be a mine, so mines should be distributed after first onclick.
