export interface Serie {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
}

export interface Resultado {
  results: Serie[];
}

export interface Cast {
  cast_id: number;
  character: string;
  credit_id: string;
  gender?: number;
  id: number;
  name: string;
  order: number;
  profile_path?: string;
}

export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: string;
  profile_path: string;
}

export interface SerieDetalhe {
  backdrop_path: string;
  created_by: CreatedBy[];
  overview: string;
  poster_path: string;
  original_name: string;
  release_date: string;
}

export interface SerieCasting {
  cast: Cast[];
}
