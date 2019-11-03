/* eslint-disable @typescript-eslint/camelcase */
import { PoolConnection, OkPacket } from 'mysql2/promise';
import { User, Perfil } from '../models/Users/UserEntity';
import logger from '../utils/logger';

export default class UsersDAO {
  private conn: PoolConnection

  constructor(conn: PoolConnection) {
    this.conn = conn;
  }

  public async createUser(user: User, perfil: Perfil) {
    const conn = await this.conn;
    try {
      conn.beginTransaction();
      const rows_user = await conn
        .query('INSERT INTO tb_usuario (username, email, password_hash) VALUES (:in_username, :in_email, :in_password_hash);', {
          in_email: user.email,
          in_username: user.username,
          in_password_hash: user.password_hash,
        });

      const rows_perfil = await conn
        .query('INSERT INTO tb_perfil (id_usuario, id_pessoa_genero, id_estado, tex_apelido, tex_nome, tex_foto, tex_website)'
          + 'VALUES (:id_usuario, :genero, :estado, :apelido, :nome, :foto, :website);', {
          id_usuario: (rows_user[0] as OkPacket).insertId,
          nome: perfil.nome,
          apelido: perfil.apelido,
          estado: perfil.estado,
          genero: perfil.genero,
          website: perfil.website,
          foto: perfil.foto,
        });
      conn.commit();

      const rows_affected = {
        user: (rows_user[0] as OkPacket).insertId,
        perfil: (rows_perfil[0] as OkPacket).insertId,
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
