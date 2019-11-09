export interface Filme {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
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

export interface FilmeDetalhe {
  backdrop_path: string;
  created_by: CreatedBy[];
  overview: string;
  poster_path: string;
  title: string;
  release_date: string;
}

export interface FilmeCasting {
  cast: Cast[];
}
export interface Resultado {
  results: Filme[];
}
