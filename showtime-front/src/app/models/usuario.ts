export class Usuario {
  username: string;
  email: string;
  password_hash: string;
  genero: number;
  estado: number;
  apelido: string;
  nome: string;
  foto: string;
  website: string;
}
export interface Resultado {
  results: Usuario;
}
