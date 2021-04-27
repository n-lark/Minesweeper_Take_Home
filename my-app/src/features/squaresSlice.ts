import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { shuffleMineLocations } from "../utility/shuffleMineLocations";

type mineState = {
  show: boolean;
  isMine: boolean;
};

type squareState = {
  blank: boolean;
  flag: boolean;
  number: boolean;
  mine: mineState;
  id?: number;
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
          mine: { show: false, isMine: false },
        });
      }
      state.value.push(...squaresArray);
    },
    distributeMines: (state) => {
      let squaresArray = [];
      for (let i = 0; i < state.value.length; i++) {
        if (i < Math.floor(state.value.length * 0.2)) {
          squaresArray.push({
            blank: false,
            flag: false,
            number: false,
            mine: { show: false, isMine: true },
            id: Math.round(Math.random() * 100000000),
          });
        }
        if (i >= Math.floor(state.value.length * 0.2)) {
          squaresArray.push({
            blank: false,
            flag: false,
            number: false,
            mine: { show: false, isMine: false },
            id: Math.round(Math.random() * 100000000),
          });
        }
      }
      const shuffledArray = shuffleMineLocations(squaresArray);
      state.value = shuffledArray;
    },
    exposeMines: (state) => {
      const minesExposed = state.value.map((square) => {
        if (square.mine.isMine === true) {
          square.mine.show = true;
        }
        return square;
      });
      state.value = minesExposed;
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
  exposeMines,
} = squaresSlice.actions;

export const selectSquares = (state: RootState) => state.squares.value;

export const squaresSliceReducer = squaresSlice.reducer;
