import { Filter } from "@/components/FiltersMenu";

export interface WatchListState {
  results: MovieData[][];
}

export type TrendingState = {
  [mediaType in Filter]: Shelf;
};

export interface Shelf {
  page: number;
  results: MovieData[][];
  total_pages: number;
  total_results: number;
}

export interface Trending {
  page: number;
  results: MovieData[];
  total_pages: number;
  total_results: number;
}

export interface MovieData {
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
