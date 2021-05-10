import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

type gameWonInitialState = {
  value: boolean;
};

const initialState: gameWonInitialState = {
  value: false,
};

export const gameWonSlice = createSlice({
  name: "gameWon",
  initialState,
  reducers: {
    setGameWon: (state: gameWonInitialState) => {
      state.value = true;
    },
    resetGameWon: (state: gameWonInitialState) => {
      state.value = false;
    },
  },
});

export const { setGameWon, resetGameWon } = gameWonSlice.actions;

export const selectTimer = (state: RootState) => state.gameWon.value;

export const gameWonSliceReducer = gameWonSlice.reducer;
