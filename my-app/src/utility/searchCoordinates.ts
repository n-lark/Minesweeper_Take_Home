export const searchCoordinates = (
  array: Array<number>[],
  cords: Array<number>
) => {
  let found = false;

  for (let i = 0; i < array.length; i++) {
    console.log(array[i][0], cords[0]);
    if (array[i][0] === cords[0] && array[i][1] === cords[1]) {
      found = true;
    }
  }

  return found;
};
