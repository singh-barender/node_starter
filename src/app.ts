import express, { Application } from 'express';
import { config, createLogger } from '@root/config/env/config';
import http from 'http';
import setupRoutesMiddleware from '@root/routes';
import connection from '@root/config/db/connection';
import setupSecurityMiddleware from '@root/config/server/security-layer';
import setupStandardMiddleware from '@root/config/server/standard-layer';
import setupErrorHandlingMiddleware from '@root/config/server/global-errors';

import 'express-async-errors';

const log = createLogger('server');
const app: Application = express();

async function startServer(app: Application) {
  try {
    const httpServer = new http.Server(app);
    httpServer.listen(config.PORT, () => {
      log.info(`Server running on port ${config.PORT}`);
    });
  } catch (error) {
    log.error(error);
  }
}

setupSecurityMiddleware(app);
setupStandardMiddleware(app);
setupRoutesMiddleware(app);
setupErrorHandlingMiddleware(app);
startServer(app);
connection();
