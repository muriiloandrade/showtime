/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/camelcase */
import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import UsersDAO from '../dao/UsersDAO';
import { User, Perfil } from '../models/Users/UserEntity';
import pool from '../db';


export class UserController {
  public static async create(req: Request, res: Response) {
    const createUsuarioDTO: User = req.body;
    const createPerfilDTO: Perfil = req.body;
    createUsuarioDTO.password_hash = await bcryptjs.hash(createUsuarioDTO.password_hash, 10);

    const novoUsuario = await new UsersDAO(pool).createUser(createUsuarioDTO, createPerfilDTO);

    res.json(novoUsuario);
  }

  public static async searchForUser(req: Request, res: Response) {
    const createUsuarioDTO: User = req.body;
    const userExists = await new UsersDAO(pool)
      .checkUserExists(createUsuarioDTO.username);

    res.json(userExists);
  }

  public static async updateUser(req: Request, res: Response) {
    const updatePerfilDTO: Perfil = req.body;

    const updatePerfil = await new UsersDAO(pool).updateUser(updatePerfilDTO);

    res.json(updatePerfil);
  }
}
