import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

type GameWonOrLostType = {
  won: boolean;
  lost: boolean;
};

type GameWonOrLostInitialState = {
  value: GameWonOrLostType;
};

const initialState: GameWonOrLostInitialState = {
  value: { won: false, lost: false },
};

export const gameWonOrLostSlice = createSlice({
  name: "gameWonOrLost",
  initialState,
  reducers: {
    gameIsLost: (state: GameWonOrLostInitialState) => {
      state.value.lost = true;
    },
    gameIsWon: (state: GameWonOrLostInitialState) => {
      state.value.won = true;
    },
    resetGameWonOrLost: (state: GameWonOrLostInitialState) => {
      state.value.lost = false;
      state.value.won = false;
    },
  },
});

export const { gameIsLost, gameIsWon, resetGameWonOrLost } =
  gameWonOrLostSlice.actions;

export const selectGameWonOrLost = (state: RootState) =>
  state.gameWonOrLost.value;

export const gameWonOrLostSliceReducer = gameWonOrLostSlice.reducer;
