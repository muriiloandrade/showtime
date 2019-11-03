export interface Filmes {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
}
export interface Resultado{
  results: Filmes[];
}
