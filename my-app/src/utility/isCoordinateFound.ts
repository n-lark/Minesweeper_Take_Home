export const isCoordinateFound = (
  array: Array<Array<number>>,
  coordinates: Array<number>
): boolean => {
  let found = false;

  for (let i = 0; i < array.length; i++) {
    if (array[i][0] === coordinates[0] && array[i][1] === coordinates[1]) {
      found = true;
    }
  }

  return found;
};
