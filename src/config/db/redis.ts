import Logger from 'bunyan';
import { createClient, RedisClientType } from 'redis';
import { config, createLogger } from '@root/config/env/config';

const log: Logger = createLogger('redis-connection');

type RedisClient = ReturnType<typeof createClient>;
let pubClient: RedisClientType;
let subClient: RedisClientType;
let clientLogger: Logger;

async function connectToRedis(cacheName?: string): Promise<{ pubClient: RedisClientType; clientLogger: Logger }> {
  try {
    const client: RedisClient = createClient({ url: config.REDIS_HOST });
    if (cacheName) {
      clientLogger = createLogger(cacheName);
    }

    client.on('error', (error: unknown) => {
      clientLogger.error(error);
    });

    pubClient = client as RedisClientType;
    subClient = pubClient.duplicate() as RedisClientType;

    await Promise.all([pubClient.connect(), subClient.connect()]);
    log.info('Successfully connected to Redis.');

    process.on('SIGINT', gracefulShutdown);
    process.on('SIGTERM', gracefulShutdown);

    return { pubClient, clientLogger };
  } catch (error) {
    log.error('Failed to connect to Redis:', error);
    process.exit(1);
  }
}

function gracefulShutdown(): void {
  try {
    void pubClient.quit();
    void subClient.quit();
    log.info('Redis connection closed due to application shutdown.');
    process.exit(0);
  } catch (error) {
    log.error('Error while closing Redis connection:', error);
    process.exit(1);
  }
}

export default connectToRedis;
