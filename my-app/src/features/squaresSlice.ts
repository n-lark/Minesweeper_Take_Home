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
};

type squaresInitialState = {
  value: squareState[][];
};

const initialState = {
  value: [],
} as squaresInitialState;

export const squaresSlice = createSlice({
  name: "squares",
  initialState,
  reducers: {
    generateBlankSquares: (state, action) => {
      let squaresArray = [];
      let nestedArray = [];
      for (let i = 0; i < action.payload; i++) {
        if (i <= Math.floor(action.payload * 0.2)) {
          nestedArray.push({
            blank: false,
            flag: false,
            number: false,
            mine: { show: false, isMine: true },
          });
        }
        if (i > Math.floor(action.payload * 0.2)) {
          nestedArray.push({
            blank: false,
            flag: false,
            number: false,
            mine: { show: false, isMine: false },
          });
        }
        if (nestedArray.length === 4) {
          squaresArray.push(nestedArray);
          nestedArray = [];
        }
      }
      const shuffledSquares = shuffleMineLocations(squaresArray);
      state.value.push(...shuffledSquares);
    },
    shuffleMines: (state, action) => {
      state.value = shuffleMineLocations(
        state.value,
        action.payload.row,
        action.payload.index
      );
    },
    exposeMines: (state) => {
      const minesExposed = state.value.map((square) => {
        return square.map((piece) => {
          if (piece.mine.isMine) {
            piece.mine.show = true;
          }
          return piece;
        });
      });
      state.value = minesExposed;
    },
    // determineSquare: (state, action) => {
    //   const numberSquares = state.value.map((square, index) => {
    //     if (index === action.payload) {
    //       square.number = true;
    //     }
    //     return square;
    //   });
    //   state.value = numberSquares;
    // },
    markBlank: (state, action) => {
      const blankSquares = state.value.map((square) => {
        return square.map((piece) => {
          if (state.value[action.payload.row][action.payload.index] === piece) {
            piece.blank = true;
          }
          return piece;
        });
      });
      state.value = blankSquares;
    },
    resetSquares: (state) => {
      state.value = [];
    },
  },
});

export const {
  generateBlankSquares,
  resetSquares,
  shuffleMines,
  exposeMines,
  // determineSquare,
  markBlank,
} = squaresSlice.actions;

export const selectSquares = (state: RootState) => state.squares.value;

export const squaresSliceReducer = squaresSlice.reducer;
