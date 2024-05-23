import { createSlice } from "@reduxjs/toolkit";
import { MovieData, WatchListState } from "../interfaces/trending";
import { findMediaPosition } from "./utils";

const initialState: WatchListState = {
  results: [],
};

export const watchListSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {
    removeMedia: (state, action: { payload: number }) => {
      const mediaId = action.payload;
      const { pagePos, mediaPos, found } = findMediaPosition(state, mediaId);
      if (found) {
        state.results[pagePos].splice(mediaPos, 1);
      }
    },
    addMedia: (state, action: { payload: MovieData }) => {
      // Add media if watchlist is empty
      if (state.results.length === 0) {
        state.results.push([action.payload]);
        console.log("added media 1 ");
        return;
      }

      const { found, firstNotFullPagePos } = findMediaPosition(
        state,
        action.payload.id
      );

      // Save media
      if (!found) {
        state.results[firstNotFullPagePos].push(action.payload);
        console.log("added media 2");
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMedia, removeMedia } = watchListSlice.actions;

export default watchListSlice.reducer;
