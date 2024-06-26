import { Filter } from "@/components/FiltersMenu";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  MediaPosition,
  Trending,
  TrendingState,
  WatchListState,
} from "../interfaces/trending";

/**
 * Updates the state by pushing a list of media items based on the action type.
 *
 * @param {TrendingState} state - The current trending state object.
 * @param {PayloadAction<Trending>} action - The action object containing trending data.
 */
export const pushMediaList = (
  state: TrendingState,
  action: PayloadAction<{ trending: Trending; filter: Filter }>
) => {
  state[action.payload.filter].page = action.payload.trending.page;
  state[action.payload.filter].total_pages =
    action.payload.trending.total_pages;
  state[action.payload.filter].total_results =
    action.payload.trending.total_results;
  state[action.payload.filter].results.push(
    action.payload.trending.results.filter((el) => el.media_type !== "person") // Don't push trending people
  );
};

/**
 * Finds the position of a media item in the watchlist state based on mediaId and filter.
 *
 * @param {WatchListState} state - The current watchlist state object.
 * @param {number} mediaId - The ID of the media item to find.
 * @param {Filter} filter - The filter to be applied for search.
 * @returns {MediaPosition} The position information of the media item.
 */
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

export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
}
