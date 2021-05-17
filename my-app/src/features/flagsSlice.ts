import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

type FlagsInititalState = {
  value: number;
};

const initialState: FlagsInititalState = {
  value: 0,
};

type PayloadFlagType = {
  payload: number;
  type: string;
};

export const flagsSlice = createSlice({
  name: "flags",
  initialState,
  reducers: {
    incrementFlags: (state: FlagsInititalState) => {
      state.value += 1;
    },
    decrementFlags: (state: FlagsInititalState) => {
      state.value -= 1;
    },
    determineFlags: (state: FlagsInititalState, action: PayloadFlagType) => {
      state.value = action.payload;
    },
    resetFlags: (state: FlagsInititalState) => {
      state.value = 0;
    },
  },
});

export const { incrementFlags, decrementFlags, resetFlags, determineFlags } =
  flagsSlice.actions;

export const selectFlags = (state: RootState) => state.flags.value;

export const flagsSliceReducer = flagsSlice.reducer;
