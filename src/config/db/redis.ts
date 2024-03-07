import Logger from 'bunyan';
import { RedisClientType, createClient } from 'redis';
import { config, createLogger } from '@root/config/env/config';

const log: Logger = createLogger('redis-connection');
let pubClient: RedisClientType;
let subClient: RedisClientType;

async function connectToRedis(): Promise<void> {
  try {
    pubClient = createClient({ url: config.REDIS_HOST }) as RedisClientType;
    subClient = pubClient.duplicate() as RedisClientType;
    await Promise.all([pubClient.connect(), subClient.connect()]);
    log.info('Successfully connected to Redis.');
    // Listen for shutdown signals
    process.on('SIGINT', gracefulShutdown);
    process.on('SIGTERM', gracefulShutdown);
  } catch (error) {
    log.error('Failed to connect to Redis:', error);
    process.exit(1);
  }
}

async function gracefulShutdown(): Promise<void> {
  try {
    await Promise.all([pubClient.quit(), subClient.quit()]);
    log.info('Redis connection closed due to application shutdown.');
    process.exit(0);
  } catch (error) {
    log.error('Error while closing Redis connection:', error);
    process.exit(1);
  }
}

export default connectToRedis;
