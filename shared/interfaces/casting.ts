/**
 * @typedef {Object} MovieResult
 * @property {number} id - The movie id
 * @property {Cast[]} cast - The casting result
 * @property {any[]} crew - The crew
 */
export interface MovieCast {
  id: number;
  cast: Cast[];
  crew: any[];
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}
