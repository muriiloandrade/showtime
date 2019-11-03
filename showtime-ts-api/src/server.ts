import https from 'https';
import fs from 'fs';
import logger from './utils/logger';
import {
  CERT, CERT_KEY, CERT_PASS,
} from './utils/secrets';

import app from './app';

// Connection with the database
import Database from './db';
import dbConfig from './utils/dbConfig';

const httpsOptions = {
  cert: fs.readFileSync(`${CERT}`),
  key: fs.readFileSync(`${CERT_KEY}`),
  passphrase: `${CERT_PASS}`,
};

const db = new Database(dbConfig);

// Cria uma pool de conexões
db.getPool();

db.getConnectionFromPool().then((conn) => {
  if (conn) {
    // Setando a timezone do banco como a timezone do Brasil
    conn.query('SET time_zone = "-03:00"')
      .then((rows) => {
        if (rows[0].stateChanges.systemVariables.time_zone === '-03:00') {
          logger.info('Timezone alterada com sucesso!');
        }
      })
      .catch((err) => {
        if (err) { logger.error('Não foi possível alterar a timezone do banco!'); }
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
