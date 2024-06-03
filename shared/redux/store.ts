import { configureStore } from "@reduxjs/toolkit";
import trendingReducer from "./trending";
import watchListReducer from "./watchlist";

export const store = configureStore({
  reducer: {
    trending: trendingReducer,
    watchList: watchListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
