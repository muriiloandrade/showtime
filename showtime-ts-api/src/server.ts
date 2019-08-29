import https from 'https';
import fs from 'fs';
import { createConnection } from 'mysql';
import logger from './utils/logger';
import {
  DB_HOST, DB_NAME, DB_USER, DB_PASS, CERT, CERT_KEY, CERT_PASS,
} from './utils/secrets';

import app from './app';

const httpsOptions = {
  cert: fs.readFileSync(`${CERT}`),
  key: fs.readFileSync(`${CERT_KEY}`),
  passphrase: `${CERT_PASS}`,
};

// Connection with the database
const con = createConnection({
  connectTimeout: 60000,
  multipleStatements: true,
  host: `${DB_HOST}`,
  database: `${DB_NAME}`,
  user: `${DB_USER}`,
  password: `${DB_PASS}`,
});

con.connect((err) => {
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

