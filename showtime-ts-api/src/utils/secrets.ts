import dotenv from 'dotenv';
import dotEnvExpand from 'dotenv-expand';
import fs from 'fs';
import logger from './logger';

if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply environment variables.');
  dotEnvExpand(dotenv.config({ path: '.env' }));
}

export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === 'production';

export const { DB_NAME } = process.env;

if (!DB_NAME) {
  if (prod) {
    logger.error('No database name. Set DB_PROD_NAME environment variable.');
  } else {
    logger.error('No database name. Set DB_LOCAL_NAME environment variable.');
  }
  process.exit(1);
}

export const { DB_HOST } = process.env;

if (!DB_HOST) {
  logger.error('No db address provided. Set DB_HOST environment variable.');
  process.exit(1);
}

export const { DB_USER } = process.env;

if (!DB_USER) {
  logger.error('No db user provided. Set DB_USER environment variable.');
  process.exit(1);
}

export const { DB_PASS } = process.env;

if (!DB_PASS) {
  logger.error('No db pass provided. Set DB_PASS environment variable.');
  process.exit(1);
}

export const CERT = prod ? process.env.CERT : process.env.LOCAL_CERT;

if (!CERT) {
  if (prod) {
    logger.error('No certificate founded. Set CERT environment variable with the path'
      + ' to your certificate.');
  } else {
    logger.error('No certificate founded. Set LOCAL_CERT environment variable with the path'
    + ' to your certificate.');
  }
  process.exit(1);
}

export const CERT_KEY = prod ? process.env.CERT_KEY : process.env.LOCAL_CERT_KEY;

if (!CERT_KEY) {
  if (prod) {
    logger.error('No key for the certificate founded. Set CERT_KEY environment variable'
      + ' with the path to your certificate.');
  } else {
    logger.error('No key for the certificate founded. Set LOCAL_CERT_KEY environment'
      + ' variable with the path to your certificate.');
  }
  process.exit(1);
}

export const CERT_PASS = prod ? process.env.CERT_PASS : process.env.LOCAL_CERT_PASS;

if (!CERT_PASS) {
  if (prod) {
    logger.error('No password for the certificate founded. Set CERT_PASS environment'
      + ' variable with the path to your certificate.');
  } else {
    logger.error('No password for the certificate founded. Set LOCAL_CERT_PASS environment'
    + ' variable with the path to your certificate.');
  }
  process.exit(1);
}
