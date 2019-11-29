import bcryptjs from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
// import _ from 'lodash';
import passport from 'passport';
import passportLocal from 'passport-local';

import { pool } from '../db';
import UsersDAO from '../dao/UsersDAO';
import logger from '../utils/logger';
// import { User } from '../models/Users/UserEntity';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((user, done) => {
  done(undefined, user.id_usuario);
});

passport.deserializeUser(async (id: number, done) => {
  const user = await new UsersDAO(pool).searchUser(undefined, id);
  if (user[0].length) {
    done(null, user[0].id_usuario);
  }
});

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password_hash',
},
(username, password, done) => {
  logger.info('Entrei no passport');

  new UsersDAO(pool).checkUserExists(username, undefined).then((row) => {
    if (!row.match) {
      logger.debug('Não existe esse usuário');
      return done(undefined, false, { message: 'Usuário não encontrado!' });
    }

    new UsersDAO(pool).searchUser(username).then((user) => {
      bcryptjs.compare(password, user[0].password_hash).then((isMatch) => {
        if (!isMatch) {
          logger.debug(`Entrou no if do bool: ${isMatch}`);
          return done(undefined, null, { message: 'Usuário ou senha inválidos!' });
        }
        logger.debug(`User: ${user[0].username}`);
        return done(undefined, user[0]);
      }).catch((err) => {
        logger.debug(`Catch BCrypt: ${err}`);
      });
      const isMatch = bcryptjs.compareSync(password, user[0].password_hash);
      if (!isMatch) {
        logger.debug(`Entrou no if do bool: ${isMatch}`);
        return done(undefined, false, { message: 'Usuário ou senha inválidos!' });
      }
      logger.debug(`User: ${user[0]}`);
      return done(undefined, user[0], { message: 'Usuário logado!' });
    }).catch((err) => {
      logger.debug(`Catch Buscar Usuário: ${err}`);
    });
  }).catch((err) => {
    logger.debug(`Catch User não existe: ${err}`);
    return done(undefined, false, { message: 'Não foi possível recuperar um usuário!' });
  });
}));

export default function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) next();
  res.redirect('/user/login');
}

// export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
//   const provider = req.path.split('/').slice(-1)[0];
//   const user = req.user as User;

//   if (_.find(user.))
// }
