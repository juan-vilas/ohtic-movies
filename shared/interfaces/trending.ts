import { Filter } from "@/components/FiltersMenu";

/**
 * @typedef {Object} MediaPosition
 * @property {number} pagePos - The position of the page
 * @property {number} mediaPos - The position of the media
 * @property {number} firstNotFullPagePos - The position of the first not full page
 * @property {boolean} found - Indicates if the media is found
 * @property {Filter} filter - The filter used
 */
export interface MediaPosition {
  pagePos: number;
  mediaPos: number;
  firstNotFullPagePos: number;
  found: boolean;
  filter: Filter;
}

/**
 * @typedef {Object} WatchListState
 * @property {WatchListShelf} - The watchlist shelf for each media type
 */
export type WatchListState = {
  [mediaType in Filter]: WatchListShelf;
};

/**
 * @typedef {Object} WatchListShelf
 * @property {MediaData[][]} results - The results in the watchlist shelf
 */
export interface WatchListShelf {
  results: MediaData[][];
}

/**
 * @typedef {Object} TrendingState
 * @property {Shelf} - The trending shelf for each media type
 */
export type TrendingState = {
  [mediaType in Filter]: Shelf;
};

/**
 * @typedef {Object} Shelf
 * @property {number} page - The page number
 * @property {MediaData[][]} results - The results in the shelf
 * @property {number} total_pages - The total number of pages
 * @property {number} total_results - The total number of results
 */
export interface Shelf {
  page: number;
  results: MediaData[][];
  total_pages: number;
  total_results: number;
}

/**
 * @typedef {Object} Trending
 * @property {number} page - The page number
 * @property {MediaData[]} results - The trending media data
 * @property {number} total_pages - The total number of pages
 * @property {number} total_results - The total number of results
 */

export interface Trending {
  page: number;
  results: MediaData[];
  total_pages: number;
  total_results: number;
}

/**
 * @typedef {Object} MediaData
 * @property {string} backdrop_path - The backdrop path
 * @property {number} id - The ID of the media
 * @property {string} [original_title] - The original title (optional)
 * @property {string} overview - The overview of the media
 * @property {string} poster_path - The poster path
 * @property {"person" | "movie" | "tv"} media_type - The type of media
 * @property {boolean} adult - Indicates if the media is for adults
 * @property {string} [title] - The title (optional)
 * @property {string} original_language - The original language
 * @property {number[]} genre_ids - The genre IDs
 * @property {number} popularity - The popularity score
 * @property {string} [release_date] - The release date (optional)
 * @property {boolean} [video] - Indicates if there is a video (optional)
 * @property {number} vote_average - The average vote
 * @property {number} vote_count - The total vote count
 * @property {string} [original_name] - The original name (optional)
 * @property {string} [name] - The name (optional)
 * @property {string} [first_air_date] - The first air date (optional)
 * @property {string[]} [origin_country] - The origin countries (optional)
 */
export interface MediaData {
  backdrop_path: string;
  id: number;
  original_title?: string;
  overview: string;
  poster_path: string;
  media_type: "person" | "movie" | "tv";
  adult: boolean;
  title?: string;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  original_name?: string;
  name?: string;
  first_air_date?: string;
  origin_country?: string[];
}
