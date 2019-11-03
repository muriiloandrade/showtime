import { Configuration } from '../db';

import {
  DB_NAME, DB_HOST, DB_USER, DB_PASS,
} from './secrets';

const dbConfig: Configuration = {
  connectTimeout: 60000,
  multipleStatements: true,
  decimalNumbers: true,
  database: `${DB_NAME}`,
  host: `${DB_HOST}`,
  user: `${DB_USER}`,
  password: `${DB_PASS}`,
  ssl: 'Amazon RDS',
  namedPlaceholders: true,
};

export default dbConfig;
