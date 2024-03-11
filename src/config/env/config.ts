import dotenv from 'dotenv';
import bunyan from 'bunyan';
import { Config } from '@root/types/configTypes';

dotenv.config({});

function getConfig(): Config {
  const PORT: number = parseInt(process.env.PORT || '5000', 10);
  const NODE_ENV: string = process.env.NODE_ENV || '';
  const BASE_PATH: string = process.env.BASE_PATH || '';
  const MONGO_URL: string = process.env.MONGO_URL || '';
  const REDIS_HOST: string = process.env.REDIS_HOST || '';
  const POSTGRES_URL: string = process.env.POSTGRES_URL || '';
  const MYSQL_URL: string = process.env.MYSQL_URL || '';
  const JWT_SECRET: string = process.env.JWT_SECRET || '';
  const REFRESH_JWT_SECRET: string = process.env.REFRESH_JWT_SECRET || '';
  const SECRET_KEY_ONE: string = process.env.SECRET_KEY_ONE || '';
  const SECRET_KEY_TWO: string = process.env.SECRET_KEY_TWO || '';
  const CLIENT_URL: string = process.env.CLIENT_URL || '';
  const SENDGRID_API_KEY: string = process.env.SENDGRID_API_KEY || '';
  const SENDER_EMAIL: string = process.env.SENDER_EMAIL || '';
  const SENDER_EMAIL_PASSWORD: string = process.env.SENDER_EMAIL_PASSWORD || '';

  return {
    PORT,
    NODE_ENV,
    BASE_PATH,
    MONGO_URL,
    REDIS_HOST,
    POSTGRES_URL,
    MYSQL_URL,
    JWT_SECRET,
    REFRESH_JWT_SECRET,
    SECRET_KEY_ONE,
    SECRET_KEY_TWO,
    CLIENT_URL,
    SENDGRID_API_KEY,
    SENDER_EMAIL,
    SENDER_EMAIL_PASSWORD
  };
}

function validateConfig(config: Config): void {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Configuration ${key} is undefined.`);
    }
  }
}

const config: Config = getConfig();
validateConfig(config);

export function createLogger(name: string): bunyan {
  return bunyan.createLogger({ name, level: 'debug' });
}

export { config, validateConfig };
