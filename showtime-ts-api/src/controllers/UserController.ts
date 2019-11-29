/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/camelcase */
import { Request, Response, NextFunction } from 'express';
import bcryptjs from 'bcryptjs';
import { body, sanitizeBody, validationResult } from 'express-validator';
import passport from 'passport';
import { IVerifyOptions } from 'passport-local';
import UsersDAO from '../dao/UsersDAO';

import { User, Perfil, NewUser } from '../models/Users/UserEntity';
import { pool } from '../db';
import '../auth/passport';
import logger from '../utils/logger';

export class UserController {
  public static async signUp(req: Request, res: Response, next: NextFunction) {
    const createUsuarioDTO: User = req.body;
    const createPerfilDTO: Perfil = req.body;

    await body('email', 'Email não é válido!').isEmail().run(req);
    await body('password_hash', 'A senha deve ter ao menos 8 caracteres!').isLength({ min: 8, max: 128 }).run(req);
    await body('confirmPassword', 'As senhas não correspondem!').equals(req.body.password_hash).run(req);
    await sanitizeBody('email').normalizeEmail({ gmail_remove_dots: false }).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.redirect('/user/signup');
    }

    createUsuarioDTO.email = escape(createUsuarioDTO.email).trim().toLowerCase();
    createUsuarioDTO.username = escape(createUsuarioDTO.username).trim().toLowerCase();
    createUsuarioDTO.password_hash = await bcryptjs.hash(createUsuarioDTO.password_hash, 10);

    const novoUsuario = await new UsersDAO(pool).createUser(createUsuarioDTO, createPerfilDTO);

    if (!(novoUsuario as NewUser).user && !(novoUsuario as NewUser).perfil) {
      return next();
    }

    const searchedUser = await new UsersDAO(pool)
      .searchUser(createUsuarioDTO.username, undefined);

    req.logIn(searchedUser, (err) => {
      if (err) return next(err);
      res.redirect('/');
    });
  }

  public static async userExists(req: Request, res: Response) {
    const createUsuarioDTO: User = req.body;
    const userExists = await new UsersDAO(pool)
      .searchUser(createUsuarioDTO.username, createUsuarioDTO.id_usuario);

    res.json(userExists);
  }

  public static async updateUser(req: Request, res: Response) {
    const updatePerfilDTO: Perfil = req.body;

    await body('id_usuario', 'Usuário não existe').isInt().run(req);
    await body('nome', 'Digite um nome de usuário').isString().run(req);
    await body('foto', 'Insira um link válido.').isURL({
      allow_underscores: true,
      allow_trailing_dot: false,
    }).optional().run(req);
    await body().run(req);
    await sanitizeBody('email').normalizeEmail({ gmail_remove_dots: false }).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) { return res.redirect('/account'); }

    if (updatePerfilDTO.foto) {
      updatePerfilDTO.foto = escape(updatePerfilDTO.foto).trim().toLowerCase();
    }
    if (updatePerfilDTO.apelido) updatePerfilDTO.apelido = escape(updatePerfilDTO.apelido).trim();
    updatePerfilDTO.nome = escape(updatePerfilDTO.nome).trim();

    const updatePerfil = await new UsersDAO(pool).updateUser(updatePerfilDTO);

    res.json(updatePerfil);
  }

  public static login(req: Request, res: Response, next: NextFunction) {
    const createUsuarioDTO: User = req.body;
    createUsuarioDTO.username = escape(createUsuarioDTO.username).trim().toLowerCase();

    passport.authenticate('local', (err: Error, user: User, info: IVerifyOptions) => {
      if (err) {
        logger.debug(info.message);
        return next(err);
      }
      if (!user) {
        // Cai aqui quando a senha é errada
        logger.debug(info.message);
        return res.redirect('/user/login');
      }

      req.logIn(user, (error) => {
        if (error) return next(error);
        if (req.session) res.redirect(req.session.returnTo || '/');
      });
    })(req, res, next);
  }

  public static logout(req: Request, res: Response) {
    req.logOut();
    if (req.session) {
      req.session.destroy((err) => logger.info(err));
    }
    res.redirect('/');
  }
}
