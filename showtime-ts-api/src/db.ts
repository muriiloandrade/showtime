import {
  createPool, Pool,
} from 'mysql2/promise';
import MySQLStore from 'express-mysql-session';
import dbConfig from './utils/dbConfig';

export interface Configuration {
  host: string
  database: string
  user: string
  password: string
  port: number
  multipleStatements: boolean
  connectTimeout: number
  decimalNumbers: boolean
  namedPlaceholders: boolean
  ssl: string
}

class Database {
  public pool: Pool;

  public sessionStore: MySQLStore;

  private config: Configuration

  public constructor(config: Configuration) {
    this.config = config;
    this.pool = this.getPool();
    this.sessionStore = new MySQLStore({
      database: config.database,
      createDatabaseTable: true,
      host: config.host,
      password: config.password,
      user: config.user,
      port: config.port,
      expiration: 172800000,
      checkExpirationInterval: 900000,
      schema: {
        tableName: 'tb_sessao',
        columnNames: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          session_id: 'id_sessao',
          expires: 'sessao_expires',
          data: 'sessao_dados',
        },
      },
    }, this.pool);
  }

  public getPool() {
    if (!this.pool) {
      this.pool = createPool({
        connectTimeout: this.config.connectTimeout,
        multipleStatements: this.config.multipleStatements,
        host: this.config.host,
        database: this.config.database,
        user: this.config.user,
        password: this.config.password,
        decimalNumbers: this.config.decimalNumbers,
        ssl: this.config.ssl,
        namedPlaceholders: this.config.namedPlaceholders,
      });
    }
    return this.pool;
  }
}

export const { pool, sessionStore } = new Database(dbConfig);
