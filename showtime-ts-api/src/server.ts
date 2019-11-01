import https from 'https';
import fs from 'fs';
import { PoolConnection, QueryError, RowDataPacket } from 'mysql2';
import logger from './utils/logger';
import {
  CERT, CERT_KEY, CERT_PASS,
} from './utils/secrets';

import app from './app';

// Connection with the database
import pool from './db';

const httpsOptions = {
  cert: fs.readFileSync(`${CERT}`),
  key: fs.readFileSync(`${CERT_KEY}`),
  passphrase: `${CERT_PASS}`,
};

pool.getConnection((err, conn: PoolConnection) => {
  // Setando a timezone do banco como a timezone do Brasil
  conn.query('SET time_zone = "-03:00"', (qerr: QueryError, rows: RowDataPacket[]) => {
    if (qerr) { logger.error('Não foi possível alterar a timezone do banco!'); }

    if (rows[0].affectedRows === 0) { logger.info('Timezone alterada com sucesso!'); }
  });

  if (err) {
    logger.error(err);
    throw err;
  }
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
});
