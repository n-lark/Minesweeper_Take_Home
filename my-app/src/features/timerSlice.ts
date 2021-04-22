import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from "../app/store"

interface TimerState { 
  value: number
}

const initialState: TimerState = { 
  value: 0
}

export const timerSlice = createSlice({ 
  name: "timer", 
  initialState, 
  reducers: {
    startTimer: (state) => {
      state.value += 1;
    },
    resetTimer: (state) => {}
  },
})

export const {startTimer, resetTimer} = timerSlice.actions;

export const selectTimer = (state: RootState) => state.timer.value;

export const timerSliceReducer = timerSlice.reducer;