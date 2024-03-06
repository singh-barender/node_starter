import Logger from 'bunyan';
import mongoose from 'mongoose';
import { config, createLogger } from '@root/config/env/config';

const log: Logger = createLogger('setupDatabase');

export default () => {
  return new Promise<void>((resolve, reject) => {
    const connect = () => {
      mongoose
        .connect(config.DATABASE_URL)
        .then(() => {
          log.info('Successfully connected to database.');
          resolve();
        })
        .catch((error) => {
          log.error('Error connecting to database', error);
          reject(error);
        });
    };

    connect();

    // Listen to connection events to handle connection state changes
    mongoose.connection.on('connected', () => log.info('Mongoose connected to database.'));
    mongoose.connection.on('error', (error) => {
      log.error('Mongoose connection error:', error);
      reject(error);
    });
    mongoose.connection.on('disconnected', () => log.info('Mongoose disconnected from database.'));

    // Gracefully close the connection when the application is shutting down
    process.on('SIGINT', () => {
      mongoose.connection.close().then(() => {
        log.info('MongoDB connection closed due to application shutdown.');
        process.exit(0);
      });
    });
  });
};
