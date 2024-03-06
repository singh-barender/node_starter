import { Application } from 'express';
import { config } from '@root/config/env/config';
import hpp from 'hpp';
import cors from 'cors';
import helmet from 'helmet';
import cookieSession from 'cookie-session';
import rateLimit from 'express-rate-limit';

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
      windowMs: 60 * 1000, // 1 min
      max: 100
    })
  );
}

export default setupSecurityMiddleware;
