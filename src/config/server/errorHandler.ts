import HTTP_STATUS from 'http-status-codes';
import { createLogger } from '@root/config/env/config';
import { CustomError } from '@root/config/errors/globalErrors';
import { Application, Response, Request, NextFunction } from 'express';

const log = createLogger('server');

function setupErrorHandlingMiddleware(app: Application) {
  app.all('*', (req: Request, res: Response) => {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
  });
  app.use((error: Error, _req: Request, res: Response, next: NextFunction) => {
    log.error('Global error', error);
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json(error.serializeErrors());
    }
    next();
  });
}

export default setupErrorHandlingMiddleware;
