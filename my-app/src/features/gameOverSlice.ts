import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

interface gameOverInitialState {
  value: boolean;
}

const initialState: gameOverInitialState = {
  value: false,
};

export const gameOverSlice = createSlice({
  name: "gameOver",
  initialState,
  reducers: {
    endGame: (state) => {
      state.value = true;
    },
    resetEndGame: (state) => {
      state.value = false;
    },
  },
});

export const { endGame, resetEndGame } = gameOverSlice.actions;

export const selectTimer = (state: RootState) => state.gameOver.value;

export const gameOverSliceReducer = gameOverSlice.reducer;
