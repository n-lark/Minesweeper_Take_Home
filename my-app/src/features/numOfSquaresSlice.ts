import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

type numTypeState = {
  numOfSquares: number;
  rowLength: number;
};

type numOfSquaresInitialState = {
  value: numTypeState;
};

type actionType = {
  payload: numTypeState;
  type: string;
};

const initialState: numOfSquaresInitialState = {
  value: { numOfSquares: 64, rowLength: 8 },
};

export const numOfSquaresSlice = createSlice({
  name: "numOfSquares",
  initialState,
  reducers: {
    setNumOfSquares: (state: numOfSquaresInitialState, action: actionType) => {
      state.value.numOfSquares = action.payload.numOfSquares;
      state.value.rowLength = action.payload.rowLength;
    },
    resetNumOfSquares: (state: numOfSquaresInitialState) => {
      state.value = { numOfSquares: 64, rowLength: 8 };
    },
  },
});

export const { setNumOfSquares, resetNumOfSquares } = numOfSquaresSlice.actions;

export const selectNumOfSquares = (state: RootState) =>
  state.numOfSquares.value;

export const numOfSquaresSliceReducer = numOfSquaresSlice.reducer;
