import { configureStore } from "@reduxjs/toolkit";
import { timerSliceReducer } from "../features/timerSlice";
import { squaresSliceReducer } from "../features/squaresSlice";
import { boardSliceReducer } from "../features/boardSlice";
import { gameWonOrLostSliceReducer } from "../features/gameWonOrLostSlice";
import { flagsSliceReducer } from "../features/flagsSlice";
import { rulesModalSliceReducer } from "../features/rulesModalSlice";

export const store = configureStore({
  reducer: {
    timer: timerSliceReducer,
    squares: squaresSliceReducer,
    board: boardSliceReducer,
    gameWonOrLost: gameWonOrLostSliceReducer,
    flags: flagsSliceReducer,
    rulesModal: rulesModalSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
