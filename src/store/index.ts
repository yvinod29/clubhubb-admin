import { configureStore } from '@reduxjs/toolkit'
// ...
import { setupListeners } from '@reduxjs/toolkit/query'
import authReducer  from "./state/authSlice";
import postReducer from './state/postSlice'
import { authApi } from './api/authApi';
import { postApi } from './api/postApi';
export const store = configureStore({
  reducer: {
    auth:authReducer,
    [authApi.reducerPath]: authApi.reducer, 
    post:postReducer,
    [postApi.reducerPath]:postApi.reducer,  
  },
  
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(authApi.middleware,postApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)