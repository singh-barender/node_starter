import http from 'http';
import Logger from 'bunyan';
import setupRoutesMiddleware from '@root/routes';
import connectToRedis from '@root/config/db/redis';
import connectToMongoDB from '@root/config/db/mongodb';
import setupSecurityMiddleware from '@root/config/server/security-layer';
import setupStandardMiddleware from '@root/config/server/standard-layer';
import setupErrorHandlingMiddleware from '@root/config/server/global-errors';
import express, { Application } from 'express';
import { config, createLogger } from '@root/config/env/config';

import 'express-async-errors';

const log: Logger = createLogger('server-setup');
const app: Application = express();

async function setupExpressApp(): Promise<Application> {
  setupStandardMiddleware(app);
  setupSecurityMiddleware(app);
  setupRoutesMiddleware(app);
  setupErrorHandlingMiddleware(app);
  return app;
}

async function startServer(app: Application): Promise<http.Server> {
  const server = http.createServer(app);
  server.listen(config.PORT, () => {
    log.info(`Server running on port ${config.PORT}`);
  });
  return server;
}

async function gracefulShutdown(server: http.Server): Promise<void> {
  server.close(() => {
    log.info('Server closed');
    process.exit(0);
  });
}

async function main() {
  try {
    const expressApp = await setupExpressApp();
    const server = await startServer(expressApp);
    await Promise.all([connectToMongoDB(), connectToRedis()]);
    process.on('SIGINT', () => {
      log.info('Received SIGINT. Shutting down server gracefully.');
      gracefulShutdown(server);
    });
    process.on('SIGTERM', () => {
      log.info('Received SIGTERM. Shutting down server gracefully.');
      gracefulShutdown(server);
    });
  } catch (error) {
    log.error('Failed to start server:', error);
    process.exit(1);
  }
}
main();

export default app;
