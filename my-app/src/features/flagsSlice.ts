import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

type flagsInitialState = {
  value: number;
};

const initialState: flagsInitialState = {
  value: 0,
};

type actionType = {
  payload: number;
  type: string;
};

export const flagsSlice = createSlice({
  name: "flags",
  initialState,
  reducers: {
    incrementFlags: (state: flagsInitialState) => {
      state.value += 1;
    },
    decrementFlags: (state: flagsInitialState) => {
      state.value -= 1;
    },
    determineFlags: (state: flagsInitialState, action: actionType) => {
      state.value = action.payload;
    },
    resetFlags: (state: flagsInitialState) => {
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
