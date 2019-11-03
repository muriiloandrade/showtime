/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import UsersDAO from '../dao/UsersDAO';
import { User, Perfil } from '../models/Users/UserEntity';
import Database from '../db';
import dbConfig from '../utils/dbConfig';

// eslint-disable-next-line import/prefer-default-export
export class UserController {
  public async create(req: Request, res: Response) {
    const DAO = new UsersDAO(new Database(dbConfig));

    const createUsuarioDTO: User = req.body;
    const createPerfilDTO: Perfil = req.body;

    const novoUsuario = await DAO.createUser(createUsuarioDTO, createPerfilDTO);

    res.json(novoUsuario);
  }
}
