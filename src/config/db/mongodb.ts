import Logger from 'bunyan';
import bunyanLogger from '@root/config/logger/bunyanLogger';
import mongoose, { Mongoose } from 'mongoose';
import { config } from '@root/config/env/config';

const log: Logger = bunyanLogger('mongodb-connection');

async function connectToMongoDB(): Promise<void> {
  try {
    const dbConnection: Mongoose = await mongoose.connect(config.MONGO_URL);
    log.info('Successfully connected to MongoDB.');
    // Listen to connection events
    dbConnection.connection.on('error', handleMongoError);
    dbConnection.connection.on('disconnected', handleDisconnect);
  } catch (error) {
    log.error('Error connecting to database', error);
    throw error;
  }
}

function handleMongoError(error: Error): void {
  log.error('Mongoose connection error:', error);
}

function handleDisconnect(): void {
  log.info('Mongoose disconnected from database.');
}

export default connectToMongoDB;
