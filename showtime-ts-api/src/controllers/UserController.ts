import { Request, Response } from 'express';
import UsersDAO from '../dao/UsersDAO';
import { User, Perfil } from '../models/Users/UserEntity';
import pool from '../db';

// eslint-disable-next-line import/prefer-default-export
export class UserController {
  public static async create(req: Request, res: Response) {
    const conn = await pool.getConnection();
    const createUsuarioDTO: User = req.body;
    const createPerfilDTO: Perfil = req.body;

    const novoUsuario = await new UsersDAO(conn).createUser(createUsuarioDTO, createPerfilDTO);

    res.json(novoUsuario);
  }
}
