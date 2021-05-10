import { configureStore } from "@reduxjs/toolkit";
import { timerSliceReducer } from "../features/timerSlice";
import { squaresSliceReducer } from "../features/squaresSlice";
import { numOfSquaresSliceReducer } from "../features/numOfSquaresSlice";
import { gameOverSliceReducer } from "../features/gameOverSlice";
import { flagsSliceReducer } from "../features/flagsSlice";
import { rulesModalSliceReducer } from "../features/rulesModalSlice";
import { gameWonSliceReducer } from "../features/gameWonSlice";

export const store = configureStore({
  reducer: {
    timer: timerSliceReducer,
    squares: squaresSliceReducer,
    numOfSquares: numOfSquaresSliceReducer,
    gameOver: gameOverSliceReducer,
    flags: flagsSliceReducer,
    rulesModal: rulesModalSliceReducer,
    gameWon: gameWonSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
