import HTTP_STATUS from 'http-status-codes';
import bunyanLogger from '@root/config/logger/bunyanLogger';
import { Application, Response, Request, NextFunction } from 'express';
import { BadRequestError, CustomError, NotFoundError, ServerError } from '@root/config/errors/globalErrors';

const log = bunyanLogger('server-error-middleware');

function setupErrorHandlingMiddleware(app: Application): void {
  // Handle requests for routes not found
  app.all('*', (req: Request, res: Response) => {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
  });

  // Global error handling middleware
  app.use((error: Error, _req: Request, res: Response, next: NextFunction) => {
    // Log the error
    log.error('Global error', error, 'Global error message', error.message);

    // Handle custom errors
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json(error.serializeErrors());
    }

    // Handle CastError (Mongoose)
    if (error.name === 'CastError') {
      const message = 'Resource not found';
      const notFoundError = new NotFoundError(message);
      return res.status(notFoundError.statusCode).json(notFoundError.serializeErrors());
    }

    // Handle Mongoose ValidationError
    if (error instanceof Error && error.name === 'ValidationError') {
      const errorWithErrors = error as unknown as { errors: { [key: string]: { message: string } } };
      const message = Object.values(errorWithErrors.errors)
        .map((val: { message: string }) => val.message)
        .join(', ');
      const badRequestError = new BadRequestError(message);
      return res.status(badRequestError.statusCode).json(badRequestError.serializeErrors());
    }

    // Handle Duplicate key errors
    if (error instanceof Error && 'code' in error && error['code'] === 11000) {
      const message = 'Duplicate field value entered';
      const badRequestError = new BadRequestError(message);
      return res.status(badRequestError.statusCode).json(badRequestError.serializeErrors());
    }

    // Handle generic errors
    if (error && error.name?.toLowerCase() === 'error') {
      const message = error?.message || 'Something went wrong';
      const serverError = new ServerError(message);
      return res.status(serverError.statusCode).json(serverError.serializeErrors());
    }

    // If none of the above conditions are met, proceed to the next error handling middleware
    next();
  });
}

export default setupErrorHandlingMiddleware;
