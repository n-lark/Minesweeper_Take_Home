import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

type BoardType = {
  numOfSquares: number;
  rowLength: number;
};

type BoardInitialState = {
  value: BoardType;
};

type PayloadBoardType = {
  payload: BoardType;
  type: string;
};

const initialState: BoardInitialState = {
  value: { numOfSquares: 64, rowLength: 8 },
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoard: (state: BoardInitialState, action: PayloadBoardType) => {
      state.value.numOfSquares = action.payload.numOfSquares;
      state.value.rowLength = action.payload.rowLength;
    },
    resetBoard: (state: BoardInitialState) => {
      state.value = { numOfSquares: 64, rowLength: 8 };
    },
  },
});

export const { setBoard, resetBoard } = boardSlice.actions;

export const selectBoard = (state: RootState) => state.board.value;

export const boardSliceReducer = boardSlice.reducer;
