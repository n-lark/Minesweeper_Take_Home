import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

type TimerInitialState = {
  value: number;
};

const initialState: TimerInitialState = {
  value: 0,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startTimer: (state: TimerInitialState) => {
      state.value += 1;
    },
    resetTimer: (state: TimerInitialState) => {
      state.value = 0;
    },
  },
});

export const { startTimer, resetTimer } = timerSlice.actions;

export const selectTimer = (state: RootState) => state.timer.value;

export const timerSliceReducer = timerSlice.reducer;
