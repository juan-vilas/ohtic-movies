import { Filter } from "@/components/FiltersMenu";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  MediaPosition,
  Trending,
  TrendingState,
  WatchListState,
} from "../interfaces/trending";

export const pushMediaList = (
  state: TrendingState,
  action: PayloadAction<Trending>
) => {
  const filter: Filter =
    action.type === "trending/addAllMedia"
      ? "all"
      : action.type === "trending/addMovieMedia"
      ? "movie"
      : action.type === "trending/addTVMedia"
      ? "tv"
      : "all";

  state[filter].page = action.payload.page;
  state[filter].total_pages = action.payload.total_pages;
  state[filter].total_results = action.payload.total_results;
  state[filter].results.push(
    action.payload.results.filter((el) => el.media_type !== "person")
  );
};

export function findMediaPosition(
  state: WatchListState,
  mediaId: number,
  filter: Filter
): MediaPosition {
  let found = false;
  let pagePos = -1;
  let mediaPos = -1;
  let firstNotFullPagePos = 0;
  for (const result of state[filter].results) {
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
    filter,
  };
}
