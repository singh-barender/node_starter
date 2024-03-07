import http from 'http';
import Logger from 'bunyan';
import setupRoutesMiddleware from '@root/routes';
import connectToRedis from '@root/config/db/redis';
import connectToMongoDB from '@root/config/db/mongodb';
import apiMonitoring from '@root/config/server/apiMonitoring';
import setupSecurityMiddleware from '@root/config/server/securityLayer';
import setupStandardMiddleware from '@root/config/server/standardLayer';
import setupErrorHandlingMiddleware from '@root/config/server/errorHandler';
import express, { Application } from 'express';
import { config, createLogger } from '@root/config/env/config';

import 'express-async-errors';

const log: Logger = createLogger('server-setup');
const app: Application = express();

function setupExpressApp(): void {
  apiMonitoring(app);
  setupStandardMiddleware(app);
  setupSecurityMiddleware(app);
  setupRoutesMiddleware(app);
  setupErrorHandlingMiddleware(app);
}

function startServer(app: Application): http.Server {
  const server = http.createServer(app);
  server.listen(config.PORT, () => {
    log.info(`Server running on port ${config.PORT}`);
  });
  return server;
}

function gracefulShutdown(server: http.Server): void {
  server.close(() => {
    log.info('Server closed');
    process.exit(0);
  });
}

async function main() {
  try {
    setupExpressApp();
    const server = startServer(app);
    await Promise.all([connectToMongoDB(), connectToRedis()]);
    process.on('SIGINT', () => {
      log.info('Received SIGINT. Shutting down server gracefully.');
      void gracefulShutdown(server);
    });
    process.on('SIGTERM', () => {
      log.info('Received SIGTERM. Shutting down server gracefully.');
      void gracefulShutdown(server);
    });
  } catch (error) {
    log.error('Failed to start server:', error);
    process.exit(1);
  }
}

void main();

export default app;
