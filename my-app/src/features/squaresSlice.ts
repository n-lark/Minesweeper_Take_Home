import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { shuffleMineLocations } from "../utility/shuffleMineLocations";

type squareState = {
  blank: boolean;
  flag: boolean;
  number: boolean;
  mine: boolean;
};

type squaresInitialState = {
  value: squareState[];
};

const initialState = {
  value: [],
} as squaresInitialState;

export const squaresSlice = createSlice({
  name: "squares",
  initialState,
  reducers: {
    generateSquares: (state, action) => {
      let squaresArray = [];
      for (let i = 0; i < action.payload; i++) {
        squaresArray.push({
          blank: false,
          flag: false,
          number: false,
          mine: false,
        });
      }
      state.value.push(...squaresArray);
    },
    distributeMines: (state, action) => {
      let squaresArray = [];
      for (let i = 0; i < action.payload.length; i++) {
        if (i < Math.floor(action.payload.length * 0.2)) {
          squaresArray.push({
            blank: false,
            flag: false,
            number: false,
            mine: true,
          });
        }
        if (i >= Math.floor(action.payload.length * 0.2)) {
          squaresArray.push({
            blank: false,
            flag: false,
            number: false,
            mine: false,
          });
        }
      }
      const shuffledArray = shuffleMineLocations(squaresArray);
      state.value = shuffledArray;
    },
    resetSquares: (state) => {
      state.value = [];
    },
  },
});

export const {
  generateSquares,
  resetSquares,
  distributeMines,
} = squaresSlice.actions;

export const selectSquares = (state: RootState) => state.squares.value;

export const squaresSliceReducer = squaresSlice.reducer;
