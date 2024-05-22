import { Trending, TrendingState } from "../interfaces/trending";

export const pushPage = (
  state: TrendingState,
  action: { payload: Trending }
) => {
  state.page = action.payload.page;
  state.total_pages = action.payload.total_pages;
  state.total_results = action.payload.total_results;
  state.results.push(
    action.payload.results.filter((el) => el.media_type !== "person")
  );
};
