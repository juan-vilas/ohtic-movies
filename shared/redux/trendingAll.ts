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
  name: "trendingAll",
  initialState,
  reducers: {
    getTrendingAll: (state, action: { payload: Trending }) => {
      const newState = action.payload;
      newState.results = newState.results.filter(
        (el) => el.media_type !== "person"
      );
      return newState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getTrendingAll } = trendingSlice.actions;

export default trendingSlice.reducer;
