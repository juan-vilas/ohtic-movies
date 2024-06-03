import { Filter } from "@/components/FiltersMenu";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLocales } from "react-native-localize";
import { MovieCast } from "../interfaces/casting";
import { GenresResult } from "../interfaces/genres";
import { MediaData, Trending } from "../interfaces/trending";
import { Videos } from "../interfaces/videos";

const localeTag = getLocales()[0].languageTag;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.EXPO_PUBLIC_API_KEY,
  },
};

interface TrendingShowsParams {
  page: number;
  filter: Filter;
}

/**
 * Gets the trending shows
 *
 * @param {number} page
 * @param {Filter} filter
 * @return {*}  {Promise<Trending>}
 */
export const getTrendingShows = createAsyncThunk(
  "trending/getTrendingShows",
  async ({ page, filter }: TrendingShowsParams): Promise<Trending> => {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/${filter}/day?page=${page}&language=${localeTag}`,
      options
    );
    const json: Trending = await response.json();
    return json;
  }
);

/**
 * Gets the casting for a show
 *
 * @param {number} mediaId
 * @param {MovieCast["media_type"]} mediaType
 * @return {*}  {Promise<MovieCast>}
 */
export const getCredits = async (
  mediaId: number,
  mediaType: MediaData["media_type"]
): Promise<MovieCast> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${mediaId}/credits`,
    options
  );
  const json: MovieCast = await response.json();
  return json;
};

/**
 * Search for movies and TV shows in a single request.
 *
 * @param {string} query
 * @param {number} page
 * @return {*}  {Promise<Trending>}
 */
export const search = async (
  query: string,
  page: number
): Promise<Trending> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${query}&page=${page}&language=${localeTag}`,
    options
  );
  const json: Trending = await response.json();
  return json;
};

/**
 * Gets the genres for a specific media type
 *
 * @param {MediaData["media_type"]} mediaType
 * @return {*}  {Promise<GenresResult>}
 */
export const getGenres = async (
  mediaType: MediaData["media_type"]
): Promise<GenresResult> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/${mediaType}/list`,
    options
  );
  const json: GenresResult = await response.json();
  return json;
};

/**
 * Gets trailers/teasers from the shows
 *
 * @param {number} movieId
 * @return {*}  {Promise<Videos>}
 */
export const getVideos = async (movieId: number): Promise<Videos> => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/" +
      movieId +
      `/videos?language=${localeTag}`,
    options
  );
  const json = await response.json();
  return json;
};
