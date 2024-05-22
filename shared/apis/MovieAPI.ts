import { Trending } from "../interfaces/trending";
import { Videos } from "../interfaces/videos";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.EXPO_PUBLIC_API_KEY,
  },
};

export const getTrendingAll = async (page: number): Promise<Trending> => {
  console.log("page", page);
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?page=${page}&language=en-US`,
    options
  );
  const json = await response.json();
  return json;
};

export const getTrendingTV = async (page: number): Promise<Trending> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/tv/day?page=${page}&language=en-US`,
    options
  );
  const json = await response.json();
  return json;
};

export const getTrendingMovies = async (page: number): Promise<Trending> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?page=${page}&language=en-US`,
    options
  );
  const json = await response.json();
  return json;
};

export const getVideos = async (movieId: number): Promise<Videos> => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/" + movieId + `/videos?language=en-US`,
    options
  );
  const json = await response.json();
  return json;
};
