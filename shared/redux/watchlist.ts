import { Filter } from "@/components/FiltersMenu";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MediaData, WatchListState } from "../interfaces/trending";
import { findMediaPosition } from "./utils";

const initialState: WatchListState = {
  all: { results: [] },
  movie: { results: [] },
  tv: { results: [] },
};

export const watchListSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {
    removeMedia: (
      state,
      action: PayloadAction<{ mediaId: number; filter: Filter }>
    ) => {
      const { pagePos, mediaPos, found } = findMediaPosition(
        state,
        action.payload.mediaId,
        action.payload.filter
      );
      if (found) {
        state[action.payload.filter].results[pagePos].splice(mediaPos, 1);
      }
    },
    addMedia: (
      state,
      action: PayloadAction<{ mediaData: MediaData; filter: Filter }>
    ) => {
      // Add media if watchlist is empty
      if (state[action.payload.filter].results.length === 0) {
        state[action.payload.filter].results.push([action.payload.mediaData]);
        return;
      }

      const { found, firstNotFullPagePos } = findMediaPosition(
        state,
        action.payload.mediaData.id,
        action.payload.filter
      );

      // Save media
      if (!found) {
        state[action.payload.filter].results[firstNotFullPagePos].push(
          action.payload.mediaData
        );
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMedia, removeMedia } = watchListSlice.actions;

export default watchListSlice.reducer;
