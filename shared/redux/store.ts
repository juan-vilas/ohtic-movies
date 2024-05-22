import { configureStore } from "@reduxjs/toolkit";
import trendingAll from "./trendingAll";
import trendingTVReducer from "./trendingTV";
import trendingMoviesReducer from "./trendingMovies";

export const store = configureStore({
  reducer: {
    trendingAll: trendingAll,
    trendingMovies: trendingMoviesReducer,
    trendingTV: trendingTVReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;