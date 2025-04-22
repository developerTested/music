import { configureStore } from '@reduxjs/toolkit'
import appSlice from './slices/appSlice'
import authSlice from './slices/authSlice'
import playerSlice from "./slices/playerSlice"

export const store = configureStore({
  reducer: {
    app: appSlice,
    auth: authSlice,
    player: playerSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppRootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch