import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

type timerInitialState = {
  value: number;
};

const initialState: timerInitialState = {
  value: 0,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startTimer: (state: timerInitialState) => {
      state.value += 1;
    },
    resetTimer: (state: timerInitialState) => {
      state.value = 0;
    },
  },
});

export const { startTimer, resetTimer } = timerSlice.actions;

export const selectTimer = (state: RootState) => state.timer.value;

export const timerSliceReducer = timerSlice.reducer;
