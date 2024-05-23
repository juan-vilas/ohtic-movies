import { Filter } from "@/components/FiltersMenu";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MediaData, WatchListState } from "../interfaces/trending";
import { findMediaPosition } from "./utils";

// Initial state for the watchlist, containing empty results for all, movie, and tv filters.
const initialState: WatchListState = {
  all: { results: [] },
  movie: { results: [] },
  tv: { results: [] },
};

/**
 * Asynchronous thunk function to retrieve the watchlist state from AsyncStorage.
 *
 * @returns {Promise<WatchListState>} A promise that resolves to the retrieved watchlist state.
 */
export const getStorage = createAsyncThunk<WatchListState>(
  "watchlist/getStorage",
  async () => {
    const value = await AsyncStorage.getItem("watchlist");

    if (!!value) {
      return JSON.parse(value);
    }

    return initialState;
  }
);

const watchListSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {
    /**
     * Removes a media item from the state based on the provided mediaId and filter.
     *
     * @param {WatchListState} state - The current state object.
     * @param {PayloadAction<{ mediaId: number; filter: Filter }>} action - The action object containing mediaId and filter.
     * @param {number} action.mediaId - The ID of the media item to be removed.
     * @param {Filter} action.filter - The filter to be applied for removal.
     */
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
      AsyncStorage.setItem("watchlist", JSON.stringify(state));
    },
    /**
     * Adds a new media item to the state based on the provided mediaData and filter.
     * If the watchlist is empty, it creates a new page and adds the media item.
     * If the watchlist is not empty, it adds the media item to the first available page.
     *
     * @param {WatchListState} state - The current state object.
     * @param {PayloadAction<{ mediaData: MediaData; filter: Filter }>} action - The action object containing mediaData and filter.
     * @param {MediaData} action.mediaData - The data of the media item to be added.
     * @param {Filter} action.filter - The filter to be applied for addition.
     */
    addMedia: (
      state,
      action: PayloadAction<{ mediaData: MediaData; filter: Filter }>
    ) => {
      // Add media if watchlist is empty
      if (state[action.payload.filter].results.length === 0) {
        state[action.payload.filter].results.push([action.payload.mediaData]);
        AsyncStorage.setItem("watchlist", JSON.stringify(state));
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
        AsyncStorage.setItem("watchlist", JSON.stringify(state));
      }
    },
  },

  extraReducers: (builder) => {
    // Gets watchlist fron AsyncStorage if it exists
    builder.addCase(getStorage.fulfilled, (state, action) => {
      state = action.payload;
      return state;
    });
  },
});

// Action creators are generated for each case reducer function
export const { addMedia, removeMedia } = watchListSlice.actions;

export default watchListSlice.reducer;
