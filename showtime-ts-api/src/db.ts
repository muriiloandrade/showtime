import {
  createPool, Pool, PoolConnection,
} from 'mysql2/promise';

export interface Configuration {
  host: string
  database: string
  user: string
  password: string
  multipleStatements: boolean
  connectTimeout: number
  decimalNumbers: boolean
  namedPlaceholders: boolean
  ssl: string
}

export default class Database {
  private pool?: Pool;

  private connection?: PoolConnection;

  private config: Configuration

  constructor(config: Configuration) {
    this.config = config;
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

  public async getConnectionFromPool() {
    const pool = this.getPool();

    if (!this.connection) {
      this.connection = await pool.getConnection();
    }

    return this.connection;
  }
}
