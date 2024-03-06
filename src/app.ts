import express, { Application, json, urlencoded, Response, Request, NextFunction } from 'express';
import hpp from 'hpp';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieSession from 'cookie-session';
import rateLimit from 'express-rate-limit';
import HTTP_STATUS from 'http-status-codes';
import dbConnect from '@root/db.connect';
import setupRoutesMiddleware from '@root/routes';
import passportJwt from '@root/globals/jwt/strategy';
import { config, createLogger } from '@root/config';
import { CustomError } from '@root/globals/helpers/error-handlers';

import 'express-async-errors';

const log = createLogger('server');
const app: Application = express();

function setupSecurityMiddleware(app: Application) {
  app.set('trust proxy', 1);
  app.use(
    cookieSession({
      name: 'session',
      keys: [config.SECRET_KEY_ONE!, config.SECRET_KEY_TWO!],
      maxAge: 24 * 7 * 3600000,
      secure: config.NODE_ENV !== 'development',
      sameSite: 'none'
    })
  );
  app.use(hpp());
  app.use(helmet());
  app.use(
    cors({
      origin: config.CLIENT_URL!,
      credentials: true,
      optionsSuccessStatus: 200,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    })
  );
  app.use(
    rateLimit({
      windowMs: 10 * 60 * 1000, // 10 mins
      max: 500
    })
  );
}

function setupStandardMiddleware(app: Application) {
  app.use(compression());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.use(passportJwt.initialize());
}

function setupErrorHandlingMiddleware(app: Application) {
  app.all('*', (req: Request, res: Response) => {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
  });
  // Global Error Handler
  app.use((error: Error, _req: Request, res: Response, next: NextFunction) => {
    log.error(error);
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json(error.serializeErrors());
    }
    next();
  });
}

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
dbConnect();
