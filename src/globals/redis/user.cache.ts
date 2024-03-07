import Logger from 'bunyan';
import { RedisClientType } from 'redis';
import { IUser } from '@root/types/user.types';
import { ServerError } from '@root/config/errors/error-handler';
import connectToRedis from '@root/config/db/redis';

let pubClient: RedisClientType;
let clientLogger: Logger;

export async function saveUserToCache(user: IUser): Promise<void> {
  try {
    const connection = await connectToRedis('userCache');
    pubClient = connection.pubClient;
    clientLogger = connection.clientLogger;

    const key = user._id.toString();
    const dataToSave = {
      role: user.role,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      gender: user.gender,
      city: user.city,
      country: user.country,
      token: user.token,
      expires: user.expires ? user.expires.toString() : undefined,
      isActive: user.isActive ? 'true' : 'false',
      isLogged: user.isLogged ? 'true' : 'false'
    };

    for (const [itemKey, itemValue] of Object.entries(dataToSave)) {
      if (itemValue !== undefined) {
        await pubClient.HSET(`users:${key}`, itemKey, itemValue);
      }
    }

    clientLogger.info(`User data for user with ID ${key} saved to cache.`);
  } catch (error) {
    clientLogger.error('Error saving user data to cache:', error);
    throw new ServerError('Server error. Try again.');
  }
}

export async function getUserFromCache(userId: string): Promise<unknown | null> {
  try {
    const connection = await connectToRedis('userCache');
    const client = connection.pubClient;
    clientLogger = connection.clientLogger;

    const response = await client.HGETALL('users:' + userId);
    if (Object.keys(response).length === 0) {
      if (clientLogger) {
        clientLogger.info(`No user data found in cache for user ID ${userId}`);
      }
      return null;
    }

    if (clientLogger) {
      clientLogger.info('User data from user cache.');
    }
    return response;
  } catch (error) {
    if (clientLogger) {
      clientLogger.error('Error retrieving user data from cache:', error);
    }
    return null;
  }
}
