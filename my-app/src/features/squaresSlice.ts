import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { buildSquares } from "../utility/buildSquares";

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
      const squares = buildSquares(action.payload);
      state.value.push(...squares);
    },
    resetSquares: (state) => {
      state.value = [];
    },
  },
});

export const { generateSquares, resetSquares } = squaresSlice.actions;

export const selectSquares = (state: RootState) => state.squares.value;

export const squaresSliceReducer = squaresSlice.reducer;
