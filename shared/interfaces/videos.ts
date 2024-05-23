import { getVideos } from "@/shared/apis/MovieAPI";

/**
 * Interface for {@link getVideos} in the MovieAPI
 *
 * @export
 * @interface Videos
 */
export interface Videos {
  id: number;
  results: Array<{
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: "YouTube" | "Vimeo" | "Dailymotion";
    size: number;
    type: "Teaser" | "Featurette";
    official: boolean;
    published_at: string;
    id: string;
  }>;
}
