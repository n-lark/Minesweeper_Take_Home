import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

type numType = {
  squaresNum: number;
  basis: number;
};

type numOfSquaresState = {
  value: numType;
};

const initialState: numOfSquaresState = {
  value: { squaresNum: 64, basis: 8 },
};

export const numOfSquaresSlice = createSlice({
  name: "numOfSquares",
  initialState,
  reducers: {
    setNumOfSquares: (state, action) => {
      state.value.squaresNum = action.payload.squaresNum;
      state.value.basis = action.payload.basis;
    },
    resetNumOfSquares: (state) => {
      state.value = { squaresNum: 64, basis: 8 };
    },
  },
});

export const { setNumOfSquares, resetNumOfSquares } = numOfSquaresSlice.actions;

export const selectNumOfSquares = (state: RootState) =>
  state.numOfSquares.value;

export const numOfSquaresSliceReducer = numOfSquaresSlice.reducer;
