/* eslint-disable @typescript-eslint/camelcase */
import { OkPacket, Pool } from 'mysql2/promise';
import { User, Perfil, CheckUser } from '../models/Users/UserEntity';
import logger from '../utils/logger';

export default class UsersDAO {
  private pool: Pool

  constructor(pool: Pool) {
    this.pool = pool;
  }

  public async checkUserExists(username?: string) {
    try {
      const [rows] = await this.pool
        .query<CheckUser[]>('SELECT COUNT(username) as `match` FROM tb_usuario WHERE username = :username;', {
          username,
        });
      return { match: rows[0].match > 0 };
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
      let rows_affected = {};
      if (await this.checkUserExists()) {
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
      return JSON.parse('{}');
    } finally {
      conn.release();
    }
  }

  public async updateUser(perfil: Perfil) {
    const conn = await this.pool.getConnection();
    let affectedRows;
    try {
      if (await this.checkUserExists()) {
        await conn.beginTransaction();
        const query = `UPDATE tb_perfil SET 
          id_pessoa_genero = :id_pessoa_genero,
          id_estado = :id_estado,
          tex_apelido = :tex_apelido,
          tex_nome = :tex_nome,
          tex_foto = :tex_foto,
          tex_website = :tex_website
        WHERE id_usuario = :id_usuario`;

        const [rows] = await conn
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
        affectedRows = {
          updated: (rows as OkPacket).affectedRows,
        };
      }
      return affectedRows;
    } catch (error) {
      logger.info(`Erro ao atualizar o perfil do usuário ${perfil.id}\n${error}`);
      conn.rollback();
      return JSON.parse('{}');
    } finally {
      conn.release();
    }
  }
}
