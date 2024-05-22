import { createSlice } from "@reduxjs/toolkit";
import { Trending, TrendingState } from "../interfaces/trending";
import { pushPage } from "./utils";

const initialState: TrendingState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

export const trendingSlice = createSlice({
  name: "trendingMovies",
  initialState,
  reducers: {
    getTrendingMovies: (state, action: { payload: Trending }) => {
      pushPage(state, action);
    },
  },
});

// Action creators are generated for each case reducer function
export const { getTrendingMovies } = trendingSlice.actions;

export default trendingSlice.reducer;
