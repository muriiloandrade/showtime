import { RowDataPacket } from 'mysql2';

/* eslint-disable @typescript-eslint/camelcase */
export interface User {
  id?: number;
  username: string;
  email: string;
  password_hash: string;
  created_at?: Date;
  modified_at?: Date;
}

export interface Perfil {
  id?: number;
  id_usuario?: number;
  genero: number;
  estado: number;
  apelido?: string;
  nome: string;
  foto?: string;
  website?: string;
  created_at?: Date;
  modified_at?: Date;
}

export interface CheckUser extends RowDataPacket {
  match: number;
}
