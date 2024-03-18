import Logger from 'bunyan';
import bunyanLogger from '@root/config/logger/bunyanLogger';
import mongoose, { Mongoose } from 'mongoose';
import { config } from '@root/config/env/config';

const log: Logger = bunyanLogger('mongodb-connection');
let dbConnection: Mongoose;

async function connectToMongoDB(): Promise<void> {
  try {
    dbConnection = await mongoose.connect(config.MONGO_URL);
    log.info('Successfully connected to MongoDB.');
    // Listen to connection events
    dbConnection.connection.on('error', handleMongoError);
    dbConnection.connection.on('disconnected', handleDisconnect);
    // Gracefully close the connection when the application is shutting down
    process.on('SIGINT', closeMongoConnection);
    process.on('SIGTERM', closeMongoConnection);
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

function closeMongoConnection(): void {
  dbConnection.connection
    .close()
    .then(() => {
      log.info('MongoDB connection closed due to application shutdown.');
      process.exit(0);
    })
    .catch((error) => {
      log.error('Error closing MongoDB connection:', error);
      process.exit(1);
    });
}

export default connectToMongoDB;
