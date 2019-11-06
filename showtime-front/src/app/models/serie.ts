export interface Serie {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
}
export interface Resultado {
  results: Serie[];
}
