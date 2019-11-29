/* eslint-disable @typescript-eslint/camelcase */
import { OkPacket, Pool } from 'mysql2/promise';
import {
  User, Perfil, CheckUser, DbUser,
} from '../models/Users/UserEntity';
import logger from '../utils/logger';

export default class UsersDAO {
  private pool: Pool

  constructor(pool: Pool) {
    this.pool = pool;
  }

  public async checkUserExists(username?: string, id_usuario?: number) {
    try {
      const [rows] = await this.pool
        .query<CheckUser[]>('CALL checkUserExists(:username, :id_usuario)', {
          username,
          id_usuario,
        });
      return { match: rows[0][0].match > 0 };
    } catch (error) {
      logger.error(`Erro ao consultar um usuário!\n${error}`);
      return { match: false };
    }
  }

  public async createUser(user: User, perfil: Perfil) {
    const conn = await this.pool.getConnection();
    try {
      let rows_user;
      let rows_perfil;
      let rows_affected;
      const { match } = await this.checkUserExists(user.username, undefined);
      if (!match) {
        await conn.beginTransaction();
        rows_user = await conn
          .query('INSERT INTO tb_usuario (username, email, password_hash) VALUES (:in_username, :in_email, :in_password_hash);', {
            in_email: user.email,
            in_username: user.username,
            in_password_hash: user.password_hash,
          });

        rows_perfil = await conn
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
        rows_affected = {
          user: (rows_user[0] as OkPacket).insertId,
          perfil: (rows_perfil[0] as OkPacket).insertId,
        };
      }
      return rows_affected;
    } catch (error) {
      conn.rollback();
      logger.error(`Erro na inserção do usuário!\n${error}`);
      return { user: 0, perfil: 0 };
    } finally {
      conn.release();
    }
  }

  public async updateUser(perfil: Perfil) {
    const conn = await this.pool.getConnection();
    try {
      let rows;
      const { match } = await this.checkUserExists(undefined, perfil.id_usuario);
      if (!match) {
        await conn.beginTransaction();
        const query = `UPDATE tb_perfil SET 
          id_pessoa_genero = :id_pessoa_genero,
          id_estado = :id_estado,
          tex_apelido = :tex_apelido,
          tex_nome = :tex_nome,
          tex_foto = :tex_foto,
          tex_website = :tex_website
        WHERE id_usuario = :id_usuario`;

        [rows] = await conn
          .query(query, {
            id_pessoa_genero: perfil.genero,
            id_estado: perfil.estado,
            tex_apelido: perfil.apelido,
            tex_nome: perfil.nome,
            tex_foto: perfil.foto,
            tex_website: perfil.website,
            id_usuario: perfil.id_usuario,
          });
        conn.commit();
      }
      return { affectedRows: (rows as OkPacket).affectedRows };
    } catch (error) {
      logger.info(`Erro ao atualizar o perfil do usuário ${perfil.id_perfil}\n${error}`);
      conn.rollback();
      return { affectedRows: 0 };
    } finally {
      conn.release();
    }
  }

  public async searchUser(username?: string, id_usuario?: number) {
    let query = 'SELECT id_usuario, username, password_hash FROM tb_usuario WHERE';

    if (username) query += ' username = :username';
    if (id_usuario) query += ' id_usuario = :id_usuario';
    try {
      const [rows] = await this.pool
        .query<DbUser[]>(query, {
          username,
          id_usuario,
        });
      return rows;
    } catch (error) {
      logger.info('Erro ao procurar por um usuário!');
      return [] as DbUser[];
    }
  }
}
