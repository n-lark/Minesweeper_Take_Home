import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { shuffleMineLocations } from "../utility/shuffleMineLocations";

type mineState = {
  show: boolean;
  isMine: boolean;
};

type squareState = {
  flag: boolean;
  numOrBlank: boolean;
  mine: mineState;
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
          flag: false,
          numOrBlank: false,
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
            flag: false,
            numOrBlank: false,
            mine: { show: false, isMine: true },
          });
        }
        if (i >= Math.floor(state.value.length * 0.2)) {
          squaresArray.push({
            flag: false,
            numOrBlank: false,
            mine: { show: false, isMine: false },
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
    determineSquare: (state, action) => {
      const numberSquares = state.value.map((square, index) => {
        if (index === action.payload) {
          square.numOrBlank = true;
        }
        return square;
      });
      state.value = numberSquares;
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
  determineSquare,
} = squaresSlice.actions;

export const selectSquares = (state: RootState) => state.squares.value;

export const squaresSliceReducer = squaresSlice.reducer;
