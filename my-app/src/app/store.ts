import { configureStore } from "@reduxjs/toolkit";
import { timerSliceReducer } from "../features/timerSlice";
import { squaresSliceReducer } from "../features/squaresSlice";
import { numOfSquaresSliceReducer } from "../features/numOfSquaresSlice";
import { gameOverSliceReducer } from "../features/gameOverSlice";
import { flagsSliceReducer } from "../features/flagsSlice";

export const store = configureStore({
  reducer: {
    timer: timerSliceReducer,
    squares: squaresSliceReducer,
    numOfSquares: numOfSquaresSliceReducer,
    gameOver: gameOverSliceReducer,
    flags: flagsSliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// import { configureStore, combineReducers } from '@reduxjs/toolkit'

// type Action = {
//   type: string;
//   payload: undefined,
// }

// type State = {
//   timer: {value: number},
// }

// const combinedReducer = combineReducers({
//     timer: timerSliceReducer
// })

// const rootReducer = (state: any, action: Action) => {
//   if(action.type === "timer/resetTimer") {
//     return {...state, timer: {value: 0}}
//   }
//   console.log("state", state)
//   return combinedReducer(state, action)
// }

// export const store = configureStore({
//   reducer: rootReducer
// })
