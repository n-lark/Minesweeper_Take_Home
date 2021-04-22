import { configureStore } from '@reduxjs/toolkit'
import {timerSliceReducer} from "../features/timerSlice"


export const store = configureStore({
  reducer: {
    timer: timerSliceReducer
  }
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch