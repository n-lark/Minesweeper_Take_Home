import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

type RulesInitialState = {
  value: boolean;
};

const initialState: RulesInitialState = {
  value: false,
};

export const rulesModalSlice = createSlice({
  name: "rulesModal",
  initialState,
  reducers: {
    showModal: (state: RulesInitialState) => {
      state.value = true;
    },
    closeModal: (state: RulesInitialState) => {
      state.value = false;
    },
  },
});

export const { showModal, closeModal } = rulesModalSlice.actions;

export const selectRulesModal = (state: RootState) => state.rulesModal.value;

export const rulesModalSliceReducer = rulesModalSlice.reducer;
