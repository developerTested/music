import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, REHYDRATE, PERSIST } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import appSlice from './slices/appSlice'
import authSlice from './slices/authSlice'
import playerSlice from "./slices/playerSlice"
import musicSlice from "./slices/musicSlice"

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ["auth"]
};

const authPersistConfig = {
  key: 'auth',
  storage,
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice),
  app: appSlice,
  player: playerSlice,
  music: musicSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [REHYDRATE, PERSIST]
      },
    }),
})

export const persistedStore = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppRootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch