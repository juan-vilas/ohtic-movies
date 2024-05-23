import { Filter } from "@/components/FiltersMenu";
import { Trending } from "../interfaces/trending";
import { Videos } from "../interfaces/videos";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.EXPO_PUBLIC_API_KEY,
  },
};

/**
 * Gets the trending shows
 *
 * @param {number} page
 * @param {Filter} filter
 * @return {*}  {Promise<Trending>}
 */
export const getTrendingShows = async (
  page: number,
  filter: Filter
): Promise<Trending> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/${filter}/day?page=${page}&language=en-US`,
    options
  );
  const json: Trending = await response.json();
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
    "https://api.themoviedb.org/3/movie/" + movieId + `/videos?language=en-US`,
    options
  );
  const json = await response.json();
  return json;
};
