import { Filter } from "@/components/FiltersMenu";
import { PayloadAction, createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  SearchParams,
  TrendingShowsParams,
  getTrendingShows,
  search,
} from "../apis/MovieAPI";
import { TrendingState } from "../interfaces/trending";
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
     * Reducer function to clear media state.

     * @param {TrendingState} state - The current trending state.
     * @param {PayloadAction<{ filter: Filter }>} action - The action containing the filter to clear.
     */
    clearMedia: (
      state: TrendingState,
      action: PayloadAction<{
        filter: Filter;
      }>
    ) => {
      state[action.payload.filter] = {
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0,
      };
      return state;
    },
  },
  extraReducers: (builder) => {
    /**
     * Reducer function to add media to the trending state.

     * @param {TrendingState} state - The current trending state.
     * @param {PayloadAction<TrendingShowsParams & SearchParams>} action - The action containing trending data.
     */
    builder.addMatcher(
      isAnyOf(getTrendingShows.fulfilled, search.fulfilled),
      (state, action) => {
        const arg = action.meta.arg as TrendingShowsParams & SearchParams;
        const filter = arg?.filter || "all";

        if (action.payload.page > state[filter].page) {
          pushMediaList(state, {
            payload: { trending: action.payload, filter: filter },
            type: action.type,
          });
        }
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { clearMedia } = trendingSlice.actions;

export default trendingSlice.reducer;
