import https from 'https';
import fs from 'fs';
import logger from './utils/logger';
import {
  CERT, CERT_KEY, CERT_PASS,
} from './utils/secrets';

import pool from './db';
import app from './app';

const httpsOptions = {
  cert: fs.readFileSync(`${CERT}`),
  key: fs.readFileSync(`${CERT_KEY}`),
  passphrase: `${CERT_PASS}`,
};

// Pega uma conexão do pool de conexões para testar o estado do banco
pool.getConnection().then(() => {
  // Setando a timezone do banco como a timezone do Brasil
  // conn.query('SET time_zone = "-03:00"')
  //   .then((rows) => {
  //     if (rows[0].stateChanges.systemVariables.time_zone === '-03:00') {
  //       logger.info('Timezone alterada com sucesso!');
  //     }
  //   })
  //   .catch((err) => {
  //     if (err) { logger.error('Não foi possível alterar a timezone do banco!'); }
  //   });
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
}, (err) => {
  if (err) {
    logger.error(err);
    throw err;
  }
});
