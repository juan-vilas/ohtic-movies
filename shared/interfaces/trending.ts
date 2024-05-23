import { Filter } from "@/components/FiltersMenu";

export interface MediaPosition {
  pagePos: number;
  mediaPos: number;
  firstNotFullPagePos: number;
  found: boolean;
  filter: Filter;
}

export type WatchListState = {
  [mediaType in Filter]: WatchListShelf;
};
export interface WatchListShelf {
  results: MediaData[][];
}

export type TrendingState = {
  [mediaType in Filter]: Shelf;
};

export interface Shelf {
  page: number;
  results: MediaData[][];
  total_pages: number;
  total_results: number;
}

export interface Trending {
  page: number;
  results: MediaData[];
  total_pages: number;
  total_results: number;
}

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
