import compression from 'compression';
import passportJwt from '@root/globals/jwt/strategy';
import { Application, json, urlencoded } from 'express';

function setupStandardMiddleware(app: Application) {
  app.use(compression());
  app.use(json({ limit: '50mb' }));
  app.use(passportJwt.initialize());
  app.use(urlencoded({ extended: true, limit: '50mb' }));
}

export default setupStandardMiddleware;
