import { configureStore } from "@reduxjs/toolkit";
import trendingReducer from "./trending";
import watchListReducer from "./watchlist";

export const store = configureStore({
  reducer: {
    trending: trendingReducer,
    watchList: watchListReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
