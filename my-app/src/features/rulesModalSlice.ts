import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

type rulesInitialState = {
  value: boolean;
};

const initialState: rulesInitialState = {
  value: false,
};

export const rulesModalSlice = createSlice({
  name: "rulesModal",
  initialState,
  reducers: {
    showModal: (state: rulesInitialState) => {
      state.value = true;
    },
    closeModal: (state: rulesInitialState) => {
      state.value = false;
    },
  },
});

export const { showModal, closeModal } = rulesModalSlice.actions;

export const selectRulesModal = (state: RootState) => state.rulesModal.value;

export const rulesModalSliceReducer = rulesModalSlice.reducer;
