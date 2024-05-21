import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Trending, TrendingState } from "../interfaces/trending";

const initialState: TrendingState = {
  page: 1,
  results: [],
  total_pages: 10,
  total_results: 0,
};

export const trendingSlice = createSlice({
  name: "trendingAll",
  initialState,
  reducers: {
    getTrendingAll: (state, action: { payload: Trending }) => {
      state.page = action.payload.page;
      state.total_pages = action.payload.total_pages;
      state.total_results = action.payload.total_results;
      state.results.push(
        action.payload.results.filter((el) => el.media_type !== "person")
      );
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getTrendingAll } = trendingSlice.actions;

export default trendingSlice.reducer;
