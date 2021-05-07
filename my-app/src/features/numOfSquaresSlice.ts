import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

type numTypeState = {
  squaresNum: number;
  basis: number;
};

type numOfSquaresInitialState = {
  value: numTypeState;
};

type actionType = {
  payload: numTypeState;
  type: string;
};

const initialState: numOfSquaresInitialState = {
  value: { squaresNum: 64, basis: 8 },
};

export const numOfSquaresSlice = createSlice({
  name: "numOfSquares",
  initialState,
  reducers: {
    setNumOfSquares: (state: numOfSquaresInitialState, action: actionType) => {
      state.value.squaresNum = action.payload.squaresNum;
      state.value.basis = action.payload.basis;
    },
    resetNumOfSquares: (state: numOfSquaresInitialState) => {
      state.value = { squaresNum: 64, basis: 8 };
    },
  },
});

export const { setNumOfSquares, resetNumOfSquares } = numOfSquaresSlice.actions;

export const selectNumOfSquares = (state: RootState) =>
  state.numOfSquares.value;

export const numOfSquaresSliceReducer = numOfSquaresSlice.reducer;
