import { createPool, Pool } from 'mysql2';
import {
  DB_HOST, DB_NAME, DB_USER, DB_PASS,
} from './utils/secrets';

class Database {
  public pool: Pool

  constructor() {
    this.pool = createPool({
      connectTimeout: 60000,
      multipleStatements: true,
      host: `${DB_HOST}`,
      database: `${DB_NAME}`,
      user: `${DB_USER}`,
      password: `${DB_PASS}`,
    });
  }
}

export default new Database().pool;
