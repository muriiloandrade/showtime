import {
  createPool, Pool, PoolConnection,
} from 'mysql2/promise';
import dbConfig from './utils/dbConfig';

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

class Database {
  public pool: Pool;

  private connection?: PoolConnection;

  private config: Configuration

  public constructor(config: Configuration) {
    this.config = config;
    this.pool = this.getPool();
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

export default new Database(dbConfig).pool;
