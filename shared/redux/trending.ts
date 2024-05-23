import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Trending, TrendingState } from "../interfaces/trending";
import { pushMediaList } from "./utils";

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

export const trendingSlice = createSlice({
  name: "trending",
  initialState,
  reducers: {
    addAllMedia: (state: TrendingState, action: PayloadAction<Trending>) => {
      if (action.payload.page > state.all.page) {
        pushMediaList(state, action);
      }
    },
    addTVMedia: (state: TrendingState, action: PayloadAction<Trending>) => {
      if (action.payload.page > state.tv.page) {
        pushMediaList(state, action);
      }
    },
    addMovieMedia: (state: TrendingState, action: PayloadAction<Trending>) => {
      if (action.payload.page > state.movie.page) {
        pushMediaList(state, action);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addAllMedia, addTVMedia, addMovieMedia } = trendingSlice.actions;

export default trendingSlice.reducer;
