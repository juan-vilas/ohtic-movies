import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Trending } from "../interfaces/trending";

const initialState: Trending = {
  page: 1,
  results: [],
  total_pages: 0,
  total_results: 0,
};

export const trendingSlice = createSlice({
  name: "trendingTV",
  initialState,
  reducers: {
    getTrendingTV: (state, action) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getTrendingTV } = trendingSlice.actions;

export default trendingSlice.reducer;
