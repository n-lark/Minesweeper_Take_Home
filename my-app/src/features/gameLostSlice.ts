import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

type gameLostInitialState = {
  value: boolean;
};

const initialState: gameLostInitialState = {
  value: false,
};

export const gameLostSlice = createSlice({
  name: "gameLost",
  initialState,
  reducers: {
    gameIsLost: (state: gameLostInitialState) => {
      state.value = true;
    },
    resetGameLost: (state: gameLostInitialState) => {
      state.value = false;
    },
  },
});

export const { gameIsLost, resetGameLost } = gameLostSlice.actions;

export const selectTimer = (state: RootState) => state.gameLost.value;

export const gameLostSliceReducer = gameLostSlice.reducer;
