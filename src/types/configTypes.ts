export type Config = {
  PORT: number;
  NODE_ENV: string;
  BASE_PATH: string;
  JWT_SECRET: string;
  REFRESH_JWT_SECRET: string;
  SECRET_KEY_ONE: string;
  SECRET_KEY_TWO: string;
  CLIENT_URL: string;
  SENDGRID_API_KEY: string;
  SENDER_EMAIL: string;
  SENDER_EMAIL_PASSWORD: string;
  REDIS_HOST: string;
  MONGO_URL: string;
  POSTGRES_URL: string;
  MYSQL_URL: string;
};
