import { createSlice } from "@reduxjs/toolkit";
import { MovieData, WatchListState } from "../interfaces/trending";

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
        return;
      }

      const { found, firstNotFullPagePos } = findMediaPosition(
        state,
        action.payload.id
      );

      // Save media
      if (!found) {
        state.results[firstNotFullPagePos].push(action.payload);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMedia, removeMedia } = watchListSlice.actions;

export default watchListSlice.reducer;

export function findMediaPosition(state: WatchListState, mediaId: number) {
  let found = false;
  let pagePos = -1;
  let mediaPos = -1;
  let firstNotFullPagePos = 0;
  for (const result of state.results) {
    pagePos++;
    // If shelf is full, continue to the next one
    if (result.length >= 20) {
      firstNotFullPagePos++;
      continue;
    }
    // If media is already in watchlist, don't save it
    for (const media of result) {
      mediaPos++;
      if (media.id === mediaId) {
        found = true;
        break;
      }
    }
    if (!found) {
      mediaPos = -1;
    } else {
      break;
    }
  }

  return {
    pagePos,
    mediaPos,
    firstNotFullPagePos,
    found: pagePos >= 0 && mediaPos >= 0,
  };
}
