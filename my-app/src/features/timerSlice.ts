import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

interface timerInitialState {
  value: number;
}

const initialState: timerInitialState = {
  value: 0,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startTimer: (state) => {
      state.value += 1;
    },
    resetTimer: (state) => {
      state.value = 0;
    },
  },
});

export const { startTimer, resetTimer } = timerSlice.actions;

export const selectTimer = (state: RootState) => state.timer.value;

export const timerSliceReducer = timerSlice.reducer;
