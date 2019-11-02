import https from 'https';
import fs from 'fs';
import { PoolConnection } from 'mysql2/promise';
import logger from './utils/logger';
import {
  CERT, CERT_KEY, CERT_PASS,
  DB_HOST, DB_NAME, DB_PASS, DB_USER,
} from './utils/secrets';

import app from './app';

// Connection with the database
import Database, { Configuration } from './db';

const httpsOptions = {
  cert: fs.readFileSync(`${CERT}`),
  key: fs.readFileSync(`${CERT_KEY}`),
  passphrase: `${CERT_PASS}`,
};

const dbConfig: Configuration = {
  connectTimeout: 60000,
  multipleStatements: true,
  database: `${DB_NAME}`,
  host: `${DB_HOST}`,
  user: `${DB_USER}`,
  password: `${DB_PASS}`,
};

const db = new Database(dbConfig);

// Cria uma pool de conexões
db.getPool();

db.getConnectionFromPool().then((conn?: PoolConnection) => {
  if (conn) {
    // Setando a timezone do banco como a timezone do Brasil
    conn.query('SET time_zone = "-03:00"').then((rows) => {
      if (rows[1].values.length === 0) {
        logger.info('Timezone alterada com sucesso!');
      }
    }, (qerr) => {
      if (qerr) { logger.error('Não foi possível alterar a timezone do banco!'); }
    });

    logger.info('MySQL up and running!');
    https.createServer(httpsOptions, app)
      .listen(
        app.get('port'), () => {
          logger.info(`HTTPS App running on port ${app.get('port')} in mode ${app.get('env')}!`);
        },
      );
    app.listen(3333, () => {
      logger.info(`HTTP App running on port 3333 in mode ${app.get('env')}!`);
    });
  }
}, (err) => {
  if (err) {
    logger.error(err);
    throw err;
  }
});
