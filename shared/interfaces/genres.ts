/**
 * @typedef {Object} GenresResult
 * @property {Genres[]} genres - The genres
 */
export interface GenresResult {
  genres: Genre[];
}

/**
 * @typedef {Object} Genre
 * @property {number} id - The genre id
 * @property {string} name - The genre name
 */
export interface Genre {
  id: number;
  name: string;
}
