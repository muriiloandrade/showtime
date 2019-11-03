/* eslint-disable @typescript-eslint/camelcase */
import { Pool } from 'mysql2/promise';
import Database from '../db';
import { User, Perfil } from '../models/Users/UserEntity';
import logger from '../utils/logger';

export default class UsersDAO {
  private pool: Pool

  constructor(db: Database) {
    this.pool = db.getPool();
  }

  public async createUser(user: User, perfil: Perfil) {
    const conn = await this.pool.getConnection();
    try {
      conn.beginTransaction();
      const rows_user = await conn
        .query('SET @out_id_usuario = 0; CALL createUsuario(:in_username, :in_email, :in_password_hash, @out_id_usuario); SELECT @out_id_usuario;', {
          in_email: user.email,
          in_username: user.username,
          in_password_hash: user.password_hash,
        });

      const rows_perfil = await conn
        .query('SET @out_id_perfil = 0; CALL createPerfil(:id_usuario, :genero, :estado, :apelido, :nome, :foto, :website, @out_id_perfil); SELECT @out_id_perfil;', {
          id_usuario: rows_user[0][2][0]['@out_id_usuario'],
          nome: perfil.nome,
          apelido: perfil.apelido,
          estado: perfil.estado,
          genero: perfil.genero,
          website: perfil.website,
          foto: perfil.foto,
        });
      conn.commit();

      const rows_affected = {
        user: rows_user[0][2][0]['@out_id_usuario'],
        perfil: rows_perfil[0][2][0]['@out_id_perfil'],
      };

      return rows_affected;
    } catch (error) {
      conn.rollback();
      logger.error(`Erro na inserção do usuário!\nErro: ${error} `);
      return JSON.parse('{}');
    } finally {
      conn.release();
    }
  }
}
