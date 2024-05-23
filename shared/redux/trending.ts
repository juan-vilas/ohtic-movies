import { Filter } from "@/components/FiltersMenu";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Trending, TrendingState } from "../interfaces/trending";
import { pushMediaList } from "./utils";

/**
 * Initial state for the trending slice.
 * @type {TrendingState}
 */
const initialState: TrendingState = {
  all: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  movie: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  tv: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
};

const trendingSlice = createSlice({
  name: "trending",
  initialState,
  reducers: {
    /**
     * Reducer function to add media to the trending state.

     * @param {TrendingState} state - The current trending state.
     * @param {PayloadAction<{ trending: Trending; filter: Filter }>} action - The action containing trending data.
     */
    addMedia: (
      state: TrendingState,
      action: PayloadAction<{ trending: Trending; filter: Filter }>
    ) => {
      if (action.payload.trending.page > state[action.payload.filter].page) {
        pushMediaList(state, action);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMedia } = trendingSlice.actions;

export default trendingSlice.reducer;
