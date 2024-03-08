import Logger from 'bunyan';
import connectToRedis from '@root/config/db/redis';
import { RedisClientType } from 'redis';
import { IUser, IUserSubset } from '@root/types/userTypes';
import { ServerError } from '@root/config/errors/globalErrors';

let pubClient: RedisClientType;
let clientLogger: Logger;

async function redisConnection(): Promise<void> {
  const connection = await connectToRedis('userCache');
  pubClient = connection.pubClient;
  clientLogger = connection.clientLogger;
}

export async function saveUserToCache(user: IUser): Promise<void> {
  try {
    if (!pubClient || !clientLogger) {
      await redisConnection();
    }

    const key = (user._id as string).toString();
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

export async function getUserFromCache(userId: string): Promise<IUserSubset | null> {
  try {
    if (!pubClient || !clientLogger) {
      await redisConnection();
    }

    const response = await pubClient.HGETALL('users:' + userId);
    if (Object.keys(response).length === 0) {
      clientLogger.info(`No user data found in cache for user ID ${userId}`);
      return null;
    }

    const user: IUserSubset = {
      _id: response._id,
      username: response.username,
      firstName: response.firstName,
      lastName: response.lastName,
      email: response.email,
      gender: response.gender,
      city: response.city,
      country: response.country,
      createdOn: new Date(response.createdOn),
      token: response.token,
      expires: parseInt(response.expires),
      isActive: response.isActive === 'true',
      isLogged: response.isLogged === 'true',
      role: response.role
    };

    clientLogger.info('User data from user cache.');
    return user;
  } catch (error) {
    clientLogger.error('Error retrieving user data from cache:', error);
    return null;
  }
}

export async function updateSingleUserItemInCache(userId: string, prop: string, value: unknown): Promise<IUserSubset | null> {
  try {
    if (!pubClient || !clientLogger) {
      await redisConnection();
    }
    await pubClient.HSET(`users:${userId}`, `${prop}`, JSON.stringify(value));
    const updatedUser: IUserSubset | null = await getUserFromCache(userId);
    return updatedUser;
  } catch (error) {
    clientLogger.error(error);
    throw new ServerError('Server error. Try again.');
  }
}

export async function getTotalUsersInCache(): Promise<number> {
  try {
    if (!pubClient || !clientLogger) {
      await redisConnection();
    }
    const count: number = await pubClient.ZCARD('user');
    return count;
  } catch (error) {
    clientLogger.error(error);
    throw new ServerError('Server error. Try again.');
  }
}
