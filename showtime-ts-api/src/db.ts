import {
  createPool, Pool, PoolConnection,
} from 'mysql2/promise';
import logger from './utils/logger';

export interface Configuration {
  host: string
  database: string
  user: string
  password: string
  multipleStatements: boolean
  connectTimeout: number
}

export default class Database {
  private pool?: Pool;

  private connection?: PoolConnection;

  private config: Configuration

  constructor(config: Configuration) {
    this.config = config;
  }

  public async getPool() {
    if (!this.pool) {
      this.pool = await createPool({
        connectTimeout: this.config.connectTimeout,
        multipleStatements: this.config.multipleStatements,
        host: this.config.host,
        database: this.config.database,
        user: this.config.user,
        password: this.config.password,
      });
    }
    return this.pool;
  }

  public async getConnectionFromPool() {
    await this.getPool().then((pool) => {
      pool.getConnection().then((conn) => {
        this.connection = conn;
      });
    });
    return this.connection;
  }

  public async beginTransaction() {
    await this.getConnectionFromPool().then((conn) => {
      if (conn) conn.beginTransaction();
    }, (err) => {
      logger.info(`Não foi possível abrir a transação: ${err}`);
    });
  }

  public async commit() {
    await this.getConnectionFromPool().then((conn) => {
      if (conn) conn.commit();
    }, (err) => {
      logger.info(`Não foi possível commitar a transação: ${err}`);
    });
  }

  public async rollback() {
    await this.getConnectionFromPool().then((conn) => {
      if (conn) conn.rollback();
    }, (err) => {
      logger.info(`Não foi possível dar rollback na transação: ${err}`);
    });
  }
}
