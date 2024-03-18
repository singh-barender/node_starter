import http from 'http';
import Logger from 'bunyan';
import express from 'express';
import setupRoutesMiddleware from '@root/routes';
import connectToRedis from '@root/config/db/redis';
import connectToMongoDB from '@root/config/db/mongodb';
import bunyanLogger from '@root/config/logger/bunyanLogger';
import apiMonitoring from '@root/config/server/apiMonitoring';
import setupSecurityMiddleware from '@root/config/server/securityLayer';
import setupStandardMiddleware from '@root/config/server/standardLayer';
import setupErrorHandlingMiddleware from '@root/config/server/errorHandler';
import { config } from '@root/config/env/config';
import { handleShutdownSignals, handleUncaughtErrors } from '@root/config/errors/serverHandler';

import 'express-async-errors';

const app: express.Application = express();
const log: Logger = bunyanLogger('app-server-setup');

async function setupServer(): Promise<http.Server> {
  try {
    apiMonitoring(app);
    setupStandardMiddleware(app);
    setupSecurityMiddleware(app);
    setupRoutesMiddleware(app);
    setupErrorHandlingMiddleware(app);

    const server = http.createServer(app);
    await Promise.all([connectToMongoDB(), connectToRedis()]);

    return server;
  } catch (error) {
    log.error('Failed to setup server:', error);
    throw error;
  }
}

async function startServer(): Promise<void> {
  try {
    const server = await setupServer();
    server.listen(config.PORT, () => {
      log.info(`Server running on port ${config.PORT}`);
    });
    handleUncaughtErrors(server);
    handleShutdownSignals(server);
  } catch (error) {
    process.exit(1);
  }
}

startServer().catch((error) => {
  log.error('Failed to start server:', error);
  process.exit(1);
});

export default app;
