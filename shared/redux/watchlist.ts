import { Filter } from "@/components/FiltersMenu";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MediaData, WatchListState } from "../interfaces/trending";
import { findMediaPosition } from "./utils";

const initialState: WatchListState = {
  all: { results: [] },
  movie: { results: [] },
  tv: { results: [] },
};

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
      AsyncStorage.setItem("watchlist", JSON.stringify(state));
    },
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
    builder.addCase(getStorage.fulfilled, (state, action) => {
      state = action.payload;
      return state;
    });
  },
});

// Action creators are generated for each case reducer function
export const { addMedia, removeMedia } = watchListSlice.actions;

export default watchListSlice.reducer;
