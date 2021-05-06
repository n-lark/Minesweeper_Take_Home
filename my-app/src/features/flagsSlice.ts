import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

interface flagsInitialState {
  value: number;
}

const initialState: flagsInitialState = {
  value: 0,
};

export const flagsSlice = createSlice({
  name: "flags",
  initialState,
  reducers: {
    incrementFlags: (state) => {
      state.value += 1;
    },
    decrementFlags: (state) => {
      state.value -= 1;
    },
    determineFlags: (state, action) => {
      state.value = action.payload;
    },
    resetFlags: (state) => {
      state.value = 0;
    },
  },
});

export const {
  incrementFlags,
  decrementFlags,
  resetFlags,
  determineFlags,
} = flagsSlice.actions;

export const selectFlags = (state: RootState) => state.flags.value;

export const flagsSliceReducer = flagsSlice.reducer;
